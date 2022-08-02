import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartConstraint } from 'src/app/models/product';

@Component({
  selector: 'app-cart-constraints-widget',
  templateUrl: './cart-constraints-widget.component.html',
  styleUrls: ['./cart-constraints-widget.component.scss'],
})
export class CartConstraintsWidgetComponent implements OnInit {
  @Input() constraint: CartConstraint = {} as CartConstraint;
  @Output() constraintChange: EventEmitter<CartConstraint> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {
    if (!this.constraint) {
      this.constraint = {} as CartConstraint;
    }
  }
  change() {
    this.constraintChange.emit(this.constraint);
  }
}
