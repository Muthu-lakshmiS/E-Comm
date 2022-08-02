import { Component, Inject, OnInit } from '@angular/core';
import { VarientProduct } from 'src/app/models/product';

import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { TuiDialogContext } from '@taiga-ui/core';
import { TuiThemeIosComponent } from '@taiga-ui/addon-mobile';
import { visitAll } from '@angular/compiler';

@Component({
  selector: 'app-common-dialog',
  templateUrl: './common-dialog.component.html',
  styleUrls: ['./common-dialog.component.scss'],
})
export class CommonDialogComponent implements OnInit {
  varient: VarientProduct = {} as VarientProduct;
  type: string = '';
  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<any, any>
  ) {
    this.type = context.data.type;
    if (this.type == 'varient') {
      this.varient = context.data.data;
    }
  }

  onVareintAdd(varient: VarientProduct) {
    this.context.completeWith(varient);
  }

  ngOnInit(): void {}
}
