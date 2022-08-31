import { ThisReceiver } from '@angular/compiler';
import {
  Component,
  EventEmitter,
  Inject,
  Injector,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import {
  Product,
  ProductSummary,
  VarientProduct,
} from 'src/app/models/product';
import { ClientService } from 'src/app/service/client-service.service';
import { NotificationService } from 'src/app/utils/notification-service';
import { AddProductComponent } from '../../widgets/add-product/add-product.component';
import { CommonDialogComponent } from '../../widgets/common-dialog/common-dialog.component';

@Component({
  selector: 'app-product-tile',
  templateUrl: './product-tile.component.html',
  styleUrls: ['./product-tile.component.scss'],
})
export class ProductTileComponent implements OnInit {
  @Input()
  product: Product = {} as Product;
  @Output()
  variantAdd: EventEmitter<ProductSummary> = new EventEmitter();
  @Output()
  varientRemove: EventEmitter<string> = new EventEmitter();
  selectedVarients: number[] = [];

  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private _clientService: ClientService,
    private _notify: NotificationService
  ) {}

  ngOnInit(): void {}

  onVarientAdd(varient: VarientProduct) {
    if (this.selectedVarients.includes(varient.weight)) {
      this.selectedVarients = this.selectedVarients.filter(function (item) {
        return item !== varient.weight;
      });
      this.varientRemove.emit(this.product._id + '@' + varient.varientCode);
      return;
    }
    this.selectedVarients.push(varient.weight);
    let productSummary = {} as ProductSummary;
    productSummary.category = this.product.category;
    productSummary.countryCode = this.product.countryCode;
    productSummary.name = this.product.name;
    productSummary.description = this.product.description;
    productSummary._id = this.product._id;
    productSummary.images = this.product.images;
    productSummary.varient = varient;
    this.variantAdd.emit(productSummary);
  }
  editProduct() {
    this.dialogService
      .open<any>(
        new PolymorpheusComponent(AddProductComponent, this.injector),
        {
          size: 'auto',
          data: this.product,
          closeable: true,
          dismissible: false,
        }
      )
      .subscribe((response) => {
        this._notify.success({ message: 'Product  updated' });
      });
  }
  edit(varient: VarientProduct, varientAtIndex: number) {
    this.dialogService
      .open<any>(
        new PolymorpheusComponent(CommonDialogComponent, this.injector),
        {
          size: 'auto',
          data: {
            type: 'varient',
            data: varient,
          },
          closeable: true,
          dismissible: false,
        }
      )
      .subscribe((response) => {
        this.product.varients[varientAtIndex] = response as VarientProduct;
        this._clientService.put('product', this.product._id, this.product);
        this._notify.success({ message: 'Product varient updated' });
      });
  }
}
