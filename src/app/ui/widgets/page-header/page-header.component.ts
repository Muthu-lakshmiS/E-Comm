import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AnimationLoader, AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent implements OnInit {
  @Input()
  header: string = '';
  @Output()
  event: EventEmitter<any> = new EventEmitter();
  @Input()
  //@ts-ignore
  headerAnime: AnimationOptions;
  constructor() {}

  ngOnInit(): void {}

  create() {
    this.event.emit({
      event: 'add',
    });
  }
}
