import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerInsightComponent } from './ui/pages/customer-insight/customer-insight.component';
import { DashboardPageComponent } from './ui/pages/dashboard-page/dashboard-page.component';
import { DealProductPageComponent } from './ui/pages/deal-product-page/deal-product-page.component';
import { InventoryPageComponent } from './ui/pages/inventory-page/inventory-page.component';
import { LoginPageComponent } from './ui/pages/login-page/login-page.component';
import { MultiProductPageComponent } from './ui/pages/multi-product-page/multi-product-page.component';
import { OrderPageComponent } from './ui/pages/order-page/order-page.component';
import { ProductBrandPageComponent } from './ui/pages/product-brand-page/product-brand-page.component';
import { ProductCategoryPageComponent } from './ui/pages/product-category-page/product-category-page.component';
import { ProductPageComponent } from './ui/pages/product-page/product-page.component';
import { PurchasePageComponent } from './ui/pages/purchase-page/purchase-page.component';
import { WarehousePageComponent } from './ui/pages/warehouse-page/warehouse-page.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    children: [
      {
        path: 'product',
        component: ProductPageComponent,
      },
      {
        path: 'multi-product',
        component: MultiProductPageComponent,
      },
      {
        path: 'product-category',
        component: ProductCategoryPageComponent,
      },
      {
        path: 'product-brand',
        component: ProductBrandPageComponent,
      },
      {
        path: 'deal-product',
        component: DealProductPageComponent,
      },
      {
        path: 'orders',
        component: OrderPageComponent,
      },
      {
        path: 'customer-insight',
        component: CustomerInsightComponent,
      },
      {
        path: 'inventory',
        component: InventoryPageComponent,
      },
      {
        path: 'purchase',
        component: PurchasePageComponent,
      },
      {
        path: 'warehouse',
        component: WarehousePageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
