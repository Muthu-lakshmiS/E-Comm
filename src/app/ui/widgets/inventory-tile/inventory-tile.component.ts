import { Component, Input, OnInit } from '@angular/core';
import { Inventory } from 'src/app/models/inventory';

@Component({
  selector: 'app-inventory-tile',
  templateUrl: './inventory-tile.component.html',
  styleUrls: ['./inventory-tile.component.scss'],
})
export class InventoryTileComponent implements OnInit {
  @Input()
  inventory: Inventory = {} as Inventory;
  constructor() {}

  ngOnInit(): void {}
}
