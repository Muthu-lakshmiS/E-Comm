import { Component, Inject, Injector, OnInit } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { AddBrandComponent } from '../../widgets/add-brand/add-brand.component';

@Component({
  selector: 'app-product-brand-page',
  templateUrl: './product-brand-page.component.html',
  styleUrls: ['./product-brand-page.component.scss'],
})
export class ProductBrandPageComponent implements OnInit {
  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector
  ) {}

  ngOnInit(): void {}

  event(eventName: any) {
    if (eventName.event == 'add') {
      this.dialogService
        .open(new PolymorpheusComponent(AddBrandComponent, this.injector), {
          size: 'l',
          closeable: true,
          dismissible: false,
        })
        .subscribe();
    }
  }
}
