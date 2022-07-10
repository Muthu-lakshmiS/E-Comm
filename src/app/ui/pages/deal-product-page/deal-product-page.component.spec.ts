import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealProductPageComponent } from './deal-product-page.component';

describe('DealProductPageComponent', () => {
  let component: DealProductPageComponent;
  let fixture: ComponentFixture<DealProductPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealProductPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
