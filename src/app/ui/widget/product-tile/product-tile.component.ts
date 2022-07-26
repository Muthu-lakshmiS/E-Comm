import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product, VarientProduct } from 'src/app/models/product';

@Component({
  selector: 'app-product-tile',
  templateUrl: './product-tile.component.html',
  styleUrls: ['./product-tile.component.scss'],
})
export class ProductTileComponent implements OnInit {
  @Input()
  product: Product = {} as Product;
  @Output()
  variantAdd: EventEmitter<VarientProduct> = new EventEmitter();
  selectedVarients: number[] = [];

  constructor() {}

  ngOnInit(): void {}

  onVarientAdd(varient: VarientProduct) {
    this.selectedVarients.push(varient.weight);
    this.variantAdd.emit(varient);
  }
}
