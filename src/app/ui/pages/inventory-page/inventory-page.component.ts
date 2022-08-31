import { Component, OnInit } from '@angular/core';
import { Inventory } from 'src/app/models/inventory';
import { ClientService } from 'src/app/service/client-service.service';

@Component({
  selector: 'app-inventory-page',
  templateUrl: './inventory-page.component.html',
  styleUrls: ['./inventory-page.component.scss']
})
export class InventoryPageComponent implements OnInit {
inventories:Inventory[] = [];
  constructor(private _clientService:ClientService) { }

  async ngOnInit(): Promise<void> {
    this.inventories  = await this._clientService.post<Inventory[]>('productInventory/search',{});
  }

}
