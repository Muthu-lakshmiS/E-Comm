import {
  ChangeDetectorRef,
  Component,
  Inject,
  Injector,
  OnInit,
} from '@angular/core';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { CategorySummary, ProductCategory } from 'src/app/models/product-category';
import { ClientService } from 'src/app/service/client-service.service';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { NotificationService } from 'src/app/utils/notification-service';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
@Component({
  selector: 'app-add-product-category',
  templateUrl: './add-product-category.component.html',
  styleUrls: ['./add-product-category.component.scss'],
})
export class AddProductCategoryComponent implements OnInit {
  isLoading = false;
  category: ProductCategory = {} as ProductCategory;
  childCategories: ProductCategory[] = [];
  constructor(
    private clientService: ClientService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<any, any>,
    private _notify: NotificationService,
    @Inject(Injector) private readonly injector: Injector,
    private changeRef: ChangeDetectorRef
  ) {
    if (context.data) {
      this.category = context.data as ProductCategory;
      this.searchChild();
    }
  }
  async searchChild() {
    this.childCategories = await this.clientService.post<ProductCategory[]>(
      'productCategory/search',
      {
        parentCategoryId: this.category._id,
      }
    );
    this.changeRef.detectChanges();
  }
  deleteCategory(category:any) {
    this.clientService.deleteData(
      'productCategory',
      category._id,
      category
    );
  }


  addChildCategory(childCategory: ProductCategory) {
    if(!childCategory.parent){
      childCategory.parent = {} as CategorySummary;
      childCategory.parent.id = this.category._id;
      childCategory.parent.name = this.category.name;
      childCategory.parent.logoId = this.category.logoId;
    }
    this.dialogService
      .open<any>(
        new PolymorpheusComponent(AddProductCategoryComponent, this.injector),
        {
          size: 'l',
          data: childCategory,
          closeable: true,
          dismissible: false,
        }
      )
      .subscribe((response) => {
        this.category = response;
        this._notify.success({ message: 'Category  updated' });
      });
  }

  ngOnInit(): void {}

  async save() {
    this.isLoading = true;
    if (this.category._id) {
      let category = await this.clientService.put<ProductCategory>(
        'productCategory',
        this.category._id,
        this.category
      );
      this.context.completeWith(category);
    } else {
      let category = await this.clientService.post<ProductCategory>(
        'productCategory',
        this.category
      );
      this.context.completeWith(category);
    }
  }

  addChild() {
    let childCategory = {} as ProductCategory;
    childCategory.parentCategoryId = this.category._id;
    childCategory.parent = {} as CategorySummary;
    childCategory.parent.id = this.category._id;
    childCategory.parent.name = this.category.name;
    childCategory.parent.logoId = this.category.logoId;

    this.dialogService
      .open<any>(
        new PolymorpheusComponent(AddProductCategoryComponent, this.injector),
        {
          size: 'l',
          data: childCategory,
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
