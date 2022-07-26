import { Component, Inject, Injector, OnInit } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { AnimeUtil } from 'src/app/utils/animation-lottie';
import { AddProductCategoryComponent } from '../../widgets/add-product-category/add-product-category.component';
@Component({
  selector: 'app-product-category-page',
  templateUrl: './product-category-page.component.html',
  styleUrls: ['./product-category-page.component.scss'],
})
export class ProductCategoryPageComponent implements OnInit {
  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector
  ) {}

  getHeaderAnime(){
    return AnimeUtil.categoryAnime;
  }

  event(eventName: any) {
    if (eventName.event == 'add') {
      this.dialogService
        .open(
          new PolymorpheusComponent(AddProductCategoryComponent, this.injector),
          {
            size: 'l',
            closeable: true,
            dismissible: false,
          }
        )
        .subscribe();
    }
  }

  ngOnInit(): void {}
}