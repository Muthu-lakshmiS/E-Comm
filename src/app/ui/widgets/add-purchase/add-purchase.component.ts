import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { tuiPure } from '@taiga-ui/cdk';
import { TuiDialogContext } from '@taiga-ui/core';
import { TuiFileLike } from '@taiga-ui/kit';
import { map, Observable, of, share, startWith, switchMap, tap } from 'rxjs';
import {
  Product,
  ProductSummary,
  VarientProduct,
} from 'src/app/models/product';
import {
  ConsignmentDetails,
  DataRef,
  Purchase,
  PurchaseFrom,
} from 'src/app/models/purchase';
import { ClientService } from 'src/app/service/client-service.service';
import { AppSession } from 'src/app/utils/app-session';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
class StepperStep {
  status: 'normal' | 'pass' | 'error' = 'normal';
  disable: boolean = false;
  icon: string = '';
  name: string = '';
}
class RejectedFile {
  constructor(readonly file: TuiFileLike, readonly reason: string) {}
}

function convertRejected({ file, reason }: RejectedFile): TuiFileLike {
  return {
    name: file.name,
    size: file.size,
    type: file.type,
    content: reason,
  };
}
@Component({
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.scss'],
})
export class AddPurchaseComponent implements OnInit {
  purchase: Purchase = {} as Purchase;
  selectedVarient: VarientProduct = {} as VarientProduct;
  currentStep = 0;
  isLoading = false;
  showAddVarientPanel = false;
  product: Product = {} as Product;
  map: Map<String, StepperStep> = new Map();
  warehouse: DataRef = {} as DataRef;
  readonly control = new FormControl();
  constructor(
    private _clientService: ClientService,
    private changeRef: ChangeDetectorRef,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<any, any>
  ) {
    this.map.set('1', {
      status: 'normal',
      disable: false,
      icon: 'tuiIconDragLarge',
      name: 'Select product',
    });
    this.map.set('2', {
      status: 'normal',
      disable: true,
      icon: 'tuiIconStarFilledLarge',
      name: 'Select variant',
    });
    this.map.set('3', {
      status: 'normal',
      disable: true,
      icon: 'tuiIconGeoLarge',
      name: 'Select Warehouse',
    });
    this.map.set('4', {
      status: 'normal',
      disable: true,
      icon: 'tuiIconInfoCircleLarge',
      name: 'Purchase details',
    });
    this.map.set('5', {
      status: 'normal',
      disable: true,
      icon: 'tuiIconLinkLarge',
      name: 'Upload attachments',
    });
    this.map.set('6', {
      status: 'normal',
      disable: true,
      icon: 'tuiIconBellLarge',
      name: 'Purchase alert',
    });
    this.purchase.consignmentDetails = {} as ConsignmentDetails;
    this.purchase.countrycode = AppSession.getValue(AppSession.Country)._id;
    this.purchase.purchaseFrom = {} as PurchaseFrom;
  }

  @tuiPure
  get loading$(): Observable<ReadonlyArray<File>> {
    return this.requests$.pipe(
      map((file) => (file instanceof File ? [file] : [])),
      startWith([])
    );
  }

  @tuiPure
  get rejected$(): Observable<ReadonlyArray<TuiFileLike>> {
    return this.requests$.pipe(
      map((file) =>
        file instanceof RejectedFile ? [convertRejected(file)] : []
      ),
      tap(({ length }) => {
        if (length) {
          this.control.setValue(null);
        }
      }),
      startWith([])
    );
  }
  @tuiPure
  private get requests$(): Observable<RejectedFile | File> {
    return this.control.valueChanges.pipe(
      switchMap((file) =>
        file ? this.serverRequest(file).pipe(startWith(file)) : of(null)
      ),
      share()
    );
  }
  private serverRequest(file: File): Observable<RejectedFile | File | any> {
    let formData = new FormData();
    formData.append('file', file);
    formData.append(
      'payload',
      '{"bucketName":"AMBER_BIRD_DOCS","purpose":"official-docs","dirPrefix":"PUBLIC_DOCS"}'
    );
    formData.append('reportProgress', 'true');
    var options = { content: formData };
    var resp = this._clientService.postSync('fileStorage/upload', formData);
    resp.subscribe((data: any) => {
      if (!this.purchase.documents) {
        this.purchase.documents = [];
      }
      this.purchase.documents.push(data._id);
      this.changeRef.detectChanges();
    });
    return resp;
  }

  checkDisable() {
    if (this.currentStep == 0) {
      return !this.product._id;
    } else if (this.currentStep == 1) {
      return !this.selectedVarient.weight;
    } else if (this.currentStep == 2) {
      return !this.warehouse._id;
    } else if (this.currentStep == 3) {
      return !(
        this.purchase.amountPaid &&
        this.purchase.amountTotal &&
        +this.purchase.amountTotal ==
          (this.purchase.amountPending ? +this.purchase.amountPending : 0) +
            +this.purchase.amountPaid &&
        +this.purchase.consignmentDetails.totalStock > 0 &&
        this.purchase.billingId &&
        this.purchase.purchaseFrom.name
      );
    } else if (this.currentStep == 4) {
      return !(this.purchase.documents && this.purchase.documents.length > 0);
    } else if (this.currentStep == 5) {
      return false;
    }
    return true;
  }

  create() {
    this.purchase.brand = this.product.brand;
    this.purchase.product = {} as ProductSummary;
    this.purchase.product._id = this.product._id;
    this.purchase.product.category = this.product.category;
    this.purchase.product.countryCode = this.product.countryCode;
    this.purchase.product.images = this.product.images;
    this.purchase.product.description = this.product.description;
    this.purchase.product.name = this.product.name;
    this.purchase.product.varient = this.selectedVarient;
    this.purchase.warehouse = this.warehouse;
    this._clientService.post('purchase', this.purchase);
    this.context.completeWith(undefined);
  }
  onVarientSelect(variant: VarientProduct) {
    this.selectedVarient = variant;
  }
  async addVarient(varient: VarientProduct) {
    this.showAddVarientPanel = false;
    varient.varientCode = this.product.varients.length + 1 + '';
    this.isLoading = true;
    this.product.varients.push(varient);
    this.product = await this._clientService.put(
      'product',
      this.product._id,
      this.product
    );
    this.isLoading = false;
    this.changeRef.detectChanges();
  }
  async onProductSelect(product: any) {
    if (product.id) {
      console.log(product);
      this.isLoading = true;
      this.product = await this._clientService.get<Product>(
        'product',
        product.id
      );
      this.currentStep = 1;
      this.isLoading = false;
      this.changeRef.detectChanges();
    }
  }

  ngOnInit(): void {
    this.warehouse._id = '00002';
    this.warehouse.name = 'Center warehouse';
  }
}
