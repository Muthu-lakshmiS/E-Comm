import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { ClientService } from 'src/app/service/client-service.service';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { AppComponent } from 'src/app/app.component';
import { AppSession } from 'src/app/utils/app-session';
@Component({
  selector: 'app-country-select',
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.scss'],
})
export class CountrySelectComponent implements OnInit {
  isLoading = false;
  countries: any[] = [];
  selectedCountry: any = {};
  constructor(
    private clientService: ClientService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<any, any>,
    private changeDetect: ChangeDetectorRef
  ) {
    if (context.data) {
      this.selectedCountry = context.data;
    }
  }

  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    this.countries = await this.clientService.get<any>(
      'commons/countryAvailable',
      ''
    );
    this.changeDetect.detectChanges();
    console.log(this.countries);
  }

  setCountry(country: any) {
    this.selectedCountry = country;
    AppSession.setValue(AppSession.Country, this.selectedCountry);
    location.reload();
    this.changeDetect.detectChanges();
  }

  async save() {}
}
