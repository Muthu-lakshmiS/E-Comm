import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerInsightComponent } from './ui/pages/customer-insight/customer-insight.component';
import { DashboardPageComponent } from './ui/pages/dashboard-page/dashboard-page.component';
import { DealProductPageComponent } from './ui/pages/deal-product-page/deal-product-page.component';
import { LoginPageComponent } from './ui/pages/login-page/login-page.component';
import { MultiProductPageComponent } from './ui/pages/multi-product-page/multi-product-page.component';
import { OrderPageComponent } from './ui/pages/order-page/order-page.component';
import { ProductPageComponent } from './ui/pages/product-page/product-page.component';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
