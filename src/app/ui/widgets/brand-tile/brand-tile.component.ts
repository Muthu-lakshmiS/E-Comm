import { Component, Inject, Injector, Input, OnInit } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { ProductCategory } from 'src/app/models/product-category';
import { ClientService } from 'src/app/service/client-service.service';
import { NotificationService } from 'src/app/utils/notification-service';
import { AddProductCategoryComponent } from '../add-product-category/add-product-category.component';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { ProductBrand } from 'src/app/models/product-brand';
import { AddBrandComponent } from '../add-brand/add-brand.component';
@Component({
  selector: 'app-brand-tile',
  templateUrl: './brand-tile.component.html',
  styleUrls: ['./brand-tile.component.scss'],
})
export class BrandTileComponent implements OnInit {
  @Input()
  brand: ProductBrand = {} as ProductBrand;
  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private _clientService: ClientService,
    private _notify: NotificationService
  ) {}

  ngOnInit(): void {}

  editBrand() {
    this.dialogService
      .open<any>(new PolymorpheusComponent(AddBrandComponent, this.injector), {
        size: 'l',
        data: this.brand,
        closeable: true,
        dismissible: false,
      })
      .subscribe((response) => {
        this.brand = response;
        this._notify.success({ message: 'Brand  updated' });
      });
  }

  deleteBrand() {
    this._clientService.deleteData('brand', this.brand._id, this.brand);
  }
}
