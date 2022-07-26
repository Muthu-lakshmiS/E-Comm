import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { ClientService } from 'src/app/service/client-service.service';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import {
  Brand,
  CategorySummary,
  MarketingInfo,
  Product,
} from 'src/app/models/product';
import { AnimeUtil } from 'src/app/utils/animation-lottie';
import { AppSession } from 'src/app/utils/app-session';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  product: Product = {} as Product;
  index = 0;
  images: any[] = [];
  isLoading = false;
  productTypes: any[] = [];
  keywords: string = '';
  constructor(
    private clientService: ClientService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<any, any>,
    private changeDetect: ChangeDetectorRef
  ) {
    this.productTypes.push({
      type: 'Food',
      name: 'FOOD',
    });
    this.productTypes.push({
      type: 'Other',
      name: 'OTHER',
    });
    if (!this.product.marketingInfo) {
      this.product.marketingInfo = {} as MarketingInfo;
    }
  }

  marketingAnimation() {
    return AnimeUtil.marketingAnime;
  }

  brandAdd(brand: any) {
    this.product.brand = {} as Brand;
    this.product.brand.id = brand.id;
    this.product.brand.name = brand.name;
    this.product.brand.logoId = JSON.parse(brand.extraData).logoId;
  }

  categoryAdd(category: any) {
    this.product.category = {} as CategorySummary;
    this.product.category.id = category.id;
    this.product.category.name = JSON.parse(category.extraData).name;
    this.product.category.logoId = JSON.parse(category.extraData).logoId;
    this.product.category.parentCategoryId = JSON.parse(
      category.extraData
    ).parentCategoryId;
    this.product.category.subCategory = JSON.parse(
      category.extraData
    ).subCategory;
  }

  addImage() {
    this.images.push({ url: '' });
  }
  removeImage(index: number) {
    this.images.splice(index, 1);
    this.updateProductImage();
  }
  updateProductImage() {
    this.product.images = [];
    for (let image of this.images) {
      if (image.url) {
        this.product.images.push(image.url);
      }
    }
  }

  ngOnInit(): void {}

  save() {
    this.isLoading = true;
    this.product.keywords = this.keywords.split(',');
    this.product.countryCode = AppSession.getValue(AppSession.Country)._id;
    this.clientService.post<Product>('product', this.product);
    this.context.completeWith({});
  }
}
