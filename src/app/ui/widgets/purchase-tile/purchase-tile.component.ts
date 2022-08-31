import { Component, Input, OnInit } from '@angular/core';
import { Purchase } from 'src/app/models/purchase';

@Component({
  selector: 'app-purchase-tile',
  templateUrl: './purchase-tile.component.html',
  styleUrls: ['./purchase-tile.component.scss'],
})
export class PurchaseTileComponent implements OnInit {
  @Input() purchase: Purchase = {} as Purchase;

  constructor() {}

  ngOnInit(): void {}
}
