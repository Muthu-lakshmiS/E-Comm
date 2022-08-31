import { Component, Inject, OnInit } from '@angular/core';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { ProductBrand } from 'src/app/models/product-brand';
import { ClientService } from 'src/app/service/client-service.service';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.scss'],
})
export class AddBrandComponent implements OnInit {
  isLoading = false;
  brand: ProductBrand = {} as ProductBrand;
  constructor(
    private clientService: ClientService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<any, any>
  ) {
    if (context.data) {
      this.brand = context.data as ProductBrand;
    }
  }

  ngOnInit(): void {}

  async save() {
    this.isLoading = true;
    this.brand.active = true;
    if (this.brand._id) {
      let brand = await this.clientService.put<ProductBrand>(
        'brand',
        this.brand._id,
        this.brand
      );
      this.context.completeWith(brand);
    } else {
      let brand = await this.clientService.post<ProductBrand>(
        'brand',
        this.brand
      );
      this.context.completeWith(brand);
    }
  }
}
