import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  Product,
  ProductSummary,
  VarientProduct,
} from 'src/app/models/product';

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

  constructor() {}

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
    productSummary.id = this.product._id;
    productSummary.images = this.product.images;
    productSummary.varient = varient;
    this.variantAdd.emit(productSummary);
  }
}
