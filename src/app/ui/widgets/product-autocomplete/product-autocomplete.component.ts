import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { tuiReplayedValueChangesFrom } from '@taiga-ui/cdk';
import { map } from 'rxjs/operators';
import { Doc, OpenSearchResp } from 'src/app/models/solr-resp';
@Component({
  selector: 'app-product-autocomplete',
  templateUrl: './product-autocomplete.component.html',
  styleUrls: ['./product-autocomplete.component.scss']
})
export class ProductAutocompleteComponent implements OnInit {
  lastRefId = '';
  lastSearchQuery = '';
  @Output() select = new EventEmitter<Doc>();
  @Output() focusChange = new EventEmitter<string>();
  private readonly user = new FormControl('');
  readonly testForm = new FormGroup({
    user: this.user,
  });

  readonly users$ = tuiReplayedValueChangesFrom<string>(this.user).pipe(
    map((value) => {
      this.onSearch(value);
      return [];
    })
  );
  settings = {
    inputDirection: 'ltr',
    displayKey: 'name',
    placeholder: 'Input here',
    height: 300,
    limit: 0,
    subtitleEnabled: true,
    subTitleKey: '',
    minorTitleEnabled: false,
    minorTitleKey: '',
    heading: '',
    noDataText: '',
  };
  dropdowndata: Doc[] | undefined = [];
  onSelect(data: any): void {
    this.select.emit(data);
    this.testForm.setValue({ user: data.name });
  }
  onBlur(data: any) {}

  getLogo(response: any) {
    return 'https://cdn2.sbazar.app/' + JSON.parse(response).images[0];
  }

  onSearch(value: string) {
    value = value.toLowerCase();
    let searchQuery = '';
    searchQuery = `https://search.sbazar.app/product/select?indent=true&q.op=OR&q=indexData:${value}* OR indexData:*${value}* OR indexData:${value}~10`;
    this.lastSearchQuery = value;

    if (value)
      this._httpClient
        .get<OpenSearchResp>(searchQuery)
        .subscribe((resp: OpenSearchResp) => {
          this.dropdowndata = resp.response?.docs;
          this.changeDetector.detectChanges();
        });
  }

  focusOut(event: any) {
    if (this.lastSearchQuery) this.focusChange.emit(this.lastSearchQuery);
  }

  constructor(
    private _httpClient: HttpClient,
    private changeDetector: ChangeDetectorRef
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    // if (this.lastRefId != this.refId) {
    //   this.lastRefId = this.refId;
    //   this.user.setValue('');
    // }
  }
  ngOnInit(): void {
    this.user.valueChanges.subscribe((value) => {
      if (!value) {
        this.select.emit({});
      }
    });
  }
}
