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
import {TuiSidebarModule} from '@taiga-ui/addon-mobile';
import { DashboardPageComponent } from './ui/pages/dashboard-page/dashboard-page.component';
import {TuiAccordionModule} from '@taiga-ui/kit';
import { TuiActiveZoneModule } from '@taiga-ui/cdk';
import { ProductPageComponent } from './ui/pages/product-page/product-page.component';
import { MultiProductPageComponent } from './ui/pages/multi-product-page/multi-product-page.component';
import { DealProductPageComponent } from './ui/pages/deal-product-page/deal-product-page.component';
import { OrderPageComponent } from './ui/pages/order-page/order-page.component';
import { CustomerInsightComponent } from './ui/pages/customer-insight/customer-insight.component';
export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [AppComponent, LoginPageComponent, DashboardPageComponent, ProductPageComponent, MultiProductPageComponent, DealProductPageComponent, OrderPageComponent, CustomerInsightComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    TuiRootModule,
    BrowserAnimationsModule,
    TuiDialogModule,
    TuiSidebarModule,
    TuiAccordionModule,
    TuiActiveZoneModule,
    TuiAlertModule,
    TuiLoaderModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
  bootstrap: [AppComponent],
})
export class AppModule {}
