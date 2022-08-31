import { Component, Inject, Injector, Input, OnInit } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { ProductCategory } from 'src/app/models/product-category';
import { ClientService } from 'src/app/service/client-service.service';
import { NotificationService } from 'src/app/utils/notification-service';
import { AddProductCategoryComponent } from '../add-product-category/add-product-category.component';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'app-category-tile',
  templateUrl: './category-tile.component.html',
  styleUrls: ['./category-tile.component.scss'],
})
export class CategoryTileComponent implements OnInit {
  @Input()
  category: ProductCategory = {} as ProductCategory;
  childCategories: ProductCategory[] = [];
  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private clientService: ClientService,
    private _notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.searchChild();
  }

  deleteCategory() {
    this.clientService.deleteData(
      'productCategory',
      this.category._id,
      this.category
    );
  }

  async searchChild() {
    this.childCategories = await this.clientService.post<ProductCategory[]>(
      'productCategory/search',
      {
        parentCategoryId: this.category._id,
      }
    );
  }

  editCategory() {
    this.dialogService
      .open<any>(
        new PolymorpheusComponent(AddProductCategoryComponent, this.injector),
        {
          size: 'l',
          data: this.category,
          closeable: true,
          dismissible: false,
        }
      )
      .subscribe((response) => {
        this.category = response;
        this._notify.success({ message: 'Category  updated' });
      });
  }
}
