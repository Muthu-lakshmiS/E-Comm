import { Component, Inject, Injector, OnInit } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { AnimeUtil } from 'src/app/utils/animation-lottie';
import { AddBrandComponent } from '../../widgets/add-brand/add-brand.component';
import { AddWarehouseComponent } from '../../widgets/add-warehouse/add-warehouse.component';

@Component({
  selector: 'app-warehouse-page',
  templateUrl: './warehouse-page.component.html',
  styleUrls: ['./warehouse-page.component.scss'],
})
export class WarehousePageComponent implements OnInit {
  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector
  ) {}

  ngOnInit(): void {}

  getHeaderAnime() {
    return AnimeUtil.warehouseAnime;
  }

  event(eventName: any) {
    if (eventName.event == 'add') {
      this.dialogService
        .open(new PolymorpheusComponent(AddWarehouseComponent, this.injector), {
          size: 'l',
          closeable: true,
          dismissible: false,
        })
        .subscribe();
    }
  }
}
