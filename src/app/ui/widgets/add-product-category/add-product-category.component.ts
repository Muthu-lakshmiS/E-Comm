import { Component, Inject, OnInit } from '@angular/core';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { ProductCategory } from 'src/app/models/product-category';
import { ClientService } from 'src/app/service/client-service.service';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'app-add-product-category',
  templateUrl: './add-product-category.component.html',
  styleUrls: ['./add-product-category.component.scss'],
})
export class AddProductCategoryComponent implements OnInit {
  isLoading = false;
  category: ProductCategory = {} as ProductCategory;
  constructor(
    private clientService: ClientService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<any, any>
  ) {}

  ngOnInit(): void {}

  async save() {
    this.isLoading = true;
    let category = await this.clientService.post<ProductCategory>(
      'productCategory',
      this.category
    );
    this.context.completeWith(category);
  }
}
