import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import {
  TuiRootModule,
  TuiDialogModule,
  TuiAlertModule,
  TUI_SANITIZER,
  TuiLoaderModule,
  TuiSvgModule,
  TuiDataListModule,
  TuiTextfieldControllerModule,
  TuiTooltipModule,
  TuiHintModule,
} from '@taiga-ui/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './ui/pages/login-page/login-page.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiSidebarModule } from '@taiga-ui/addon-mobile';
import { DashboardPageComponent } from './ui/pages/dashboard-page/dashboard-page.component';
import {
  TuiAccordionModule,
  TuiCarouselModule,
  TuiInputCountModule,
  TuiInputModule,
  TuiStepperModule,
  TuiTabsModule,
} from '@taiga-ui/kit';
import { TuiActiveZoneModule, TuiLetModule } from '@taiga-ui/cdk';
import { ProductPageComponent } from './ui/pages/product-page/product-page.component';
import { MultiProductPageComponent } from './ui/pages/multi-product-page/multi-product-page.component';
import { DealProductPageComponent } from './ui/pages/deal-product-page/deal-product-page.component';
import { OrderPageComponent } from './ui/pages/order-page/order-page.component';
import { CustomerInsightComponent } from './ui/pages/customer-insight/customer-insight.component';
import { MultiTextInputComponent } from './ui/widgets/multi-text-input/multi-text-input.component';
import { ProductCategoryPageComponent } from './ui/pages/product-category-page/product-category-page.component';
import { AddProductCategoryComponent } from './ui/widgets/add-product-category/add-product-category.component';
import { PageHeaderComponent } from './ui/widgets/page-header/page-header.component';
import { ProductBrandPageComponent } from './ui/pages/product-brand-page/product-brand-page.component';
import { AddBrandComponent } from './ui/widgets/add-brand/add-brand.component';
import { AddProductComponent } from './ui/widgets/add-product/add-product.component';
import { CountrySelectComponent } from './ui/widgets/country-select/country-select.component';
import { BrandAutocompleteComponent } from './ui/widgets/brand-autocomplete/brand-autocomplete.component';
import { CategoryAutocompleteComponent } from './ui/widgets/category-autocomplete/category-autocomplete.component';
import { ProductAutocompleteComponent } from './ui/widgets/product-autocomplete/product-autocomplete.component';
import { ProductVarientComponent } from './ui/widgets/product-varient/product-varient.component';
import { InventoryPageComponent } from './ui/pages/inventory-page/inventory-page.component';
import { PurchasePageComponent } from './ui/pages/purchase-page/purchase-page.component';
import { AddPurchaseComponent } from './ui/widgets/add-purchase/add-purchase.component';
import { WarehousePageComponent } from './ui/pages/warehouse-page/warehouse-page.component';
import { AddWarehouseComponent } from './ui/widgets/add-warehouse/add-warehouse.component';
import { TuiToolbarModule } from '@taiga-ui/addon-editor';
import { ProductTileComponent } from './ui/widget/product-tile/product-tile.component';
export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    DashboardPageComponent,
    ProductPageComponent,
    MultiProductPageComponent,
    DealProductPageComponent,
    OrderPageComponent,
    CustomerInsightComponent,
    MultiTextInputComponent,
    ProductCategoryPageComponent,
    AddProductCategoryComponent,
    PageHeaderComponent,
    ProductBrandPageComponent,
    AddBrandComponent,
    AddProductComponent,
    CountrySelectComponent,
    BrandAutocompleteComponent,
    CategoryAutocompleteComponent,
    ProductAutocompleteComponent,
    ProductVarientComponent,
    InventoryPageComponent,
    PurchasePageComponent,
    AddPurchaseComponent,
    WarehousePageComponent,
    AddWarehouseComponent,
    ProductTileComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiDataListModule,
    TuiLetModule,
    TuiRootModule,
    BrowserAnimationsModule,
    TuiDialogModule,
    TuiCarouselModule,
    TuiSidebarModule,
    TuiAccordionModule,
    TuiActiveZoneModule,
    TuiAlertModule,
    TuiTabsModule,
    TuiInputCountModule,
    TuiSvgModule,
    TuiLoaderModule,
    TuiToolbarModule,
    TuiTooltipModule,
    TuiHintModule,
    TuiStepperModule,

    LottieModule.forRoot({ player: playerFactory }),
  ],
  providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
  bootstrap: [AppComponent],
})
export class AppModule {}

//ng g c ui/widgets/add-product
