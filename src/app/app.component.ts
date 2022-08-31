import { Component, Inject, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { TuiDialogService } from '@taiga-ui/core';
import { ClientService } from './service/client-service.service';
import { AppSession } from './utils/app-session';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { CountrySelectComponent } from './ui/widgets/country-select/country-select.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'amber_bird_angular';
  constructor(
    private router: Router,
    private clientService: ClientService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector
  ) {
    if (AppSession.checkSession(AppSession.LoginAuth)) {
      clientService.setAuthToken(
        AppSession.getValue(AppSession.LoginAuth).accessToken
      );
      if (location.pathname == '/') {
        router.navigate(['dashboard/product']);
      }

      if (!AppSession.checkSession(AppSession.Country)) {
        this.openCountry();
      } else {
      }
      // router.navigate(['dashboard/product-brand']);
    } else router.navigate(['login']);
  }
  openCountry() {
    this.dialogService
      .open(new PolymorpheusComponent(CountrySelectComponent, this.injector), {
        size: 'l',
        closeable: true,
        dismissible: false,
      })
      .subscribe();
  }
}
