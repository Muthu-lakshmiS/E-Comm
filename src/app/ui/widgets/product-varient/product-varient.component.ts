import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { tuiAssertIsHTMLElement } from '@taiga-ui/cdk';
import { Dimension, PriceInfo, VarientProduct } from 'src/app/models/product';

@Component({
  selector: 'app-product-varient',
  templateUrl: './product-varient.component.html',
  styleUrls: ['./product-varient.component.scss'],
})
export class ProductVarientComponent implements OnInit {
  @Input()
  varient: VarientProduct = {} as VarientProduct;
  productVarient: VarientProduct = {} as VarientProduct;
  @Input()
  backOffice = false;
  addDimension: boolean = false;
  measurementUnit: string[] = [];

  @Output()
  onVarientAdd: EventEmitter<VarientProduct> = new EventEmitter();
  constructor() {
    this.measurementUnit.push('KILO_GRAM');
    this.measurementUnit.push('GRAM');
    this.measurementUnit.push('LITRE');
    this.measurementUnit.push('MILI_GRAM');
    this.measurementUnit.push('PIECE');
  }

  ngOnInit(): void {
    if (this.varient.varientCode) {
      this.productVarient = this.varient;
    }
    if (!this.productVarient.price) {
      this.productVarient.price = {} as PriceInfo;
    }
  }

  save() {
    this.onVarientAdd.emit(this.productVarient);
  }

  onDimensionAdd() {
    if (this.addDimension) {
      this.productVarient.dimension = {} as Dimension;
    }
  }

  getMeasurementUnit(unit: string) {
    return unit.replace('_', ' ').toLowerCase();
  }
}
