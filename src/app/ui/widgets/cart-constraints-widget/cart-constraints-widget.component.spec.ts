import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartConstraintsWidgetComponent } from './cart-constraints-widget.component';

describe('CartConstraintsWidgetComponent', () => {
  let component: CartConstraintsWidgetComponent;
  let fixture: ComponentFixture<CartConstraintsWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartConstraintsWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartConstraintsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
