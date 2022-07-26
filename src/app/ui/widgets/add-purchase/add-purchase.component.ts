import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Product, VarientProduct } from 'src/app/models/product';
import { Purchase } from 'src/app/models/purchase';
import { ClientService } from 'src/app/service/client-service.service';

class StepperStep {
  status: 'normal' | 'pass' | 'error' = 'normal';
  disable: boolean = false;
  icon: string = '';
  name: string = '';
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
  constructor(
    private _clientService: ClientService,
    private changeRef: ChangeDetectorRef
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
  }

  checkDisable() {
    return true;
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

  ngOnInit(): void {}
}
