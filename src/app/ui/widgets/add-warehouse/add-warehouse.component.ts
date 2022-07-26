import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { Address, GeoAddress, Warehouse } from 'src/app/models/warehouse';
import { ClientService } from 'src/app/service/client-service.service';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { AppSession } from 'src/app/utils/app-session';
import { TuiHideSelectedPipe } from '@taiga-ui/kit';
import { DataRef } from 'src/app/models/purchase';
@Component({
  selector: 'app-add-warehouse',
  templateUrl: './add-warehouse.component.html',
  styleUrls: ['./add-warehouse.component.scss'],
})
export class AddWarehouseComponent implements OnInit {
  warehouse: Warehouse = {} as Warehouse;
  coOrdinates: string = '';
  isLoading = false;
  constructor(
    private _clientService: ClientService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<any, any>,
    private changeDetect: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (!this.warehouse.address) {
      this.warehouse.address = {} as Address;
    }
    this.warehouse.countryCode = AppSession.getValue(AppSession.Country)._id;
    this.warehouse.address.country = AppSession.getValue(
      AppSession.Country
    ).name;
  }

  async save() {
    this.isLoading = true;
    this.warehouse.address.geoAddress = {} as GeoAddress;
    this.warehouse.address.geoAddress.type = 'point';
    this.warehouse.address.geoAddress.coordinates = this.coOrdinates
      .split(',')
      .reverse()
      .map(function (item) {
        return parseFloat(item);
      });
    this.warehouse.manager = {} as DataRef;
    this.warehouse.manager = {
      _id: '9851201e-de88-47ee-a8e5-ad130b36760c',
      name: 'Warehouse Manager',
    };
    var response = await this._clientService.post('warehouse', this.warehouse);
    this.context.completeWith(response);
  }
}
