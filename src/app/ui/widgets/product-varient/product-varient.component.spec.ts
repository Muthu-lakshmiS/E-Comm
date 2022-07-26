import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductVarientComponent } from './product-varient.component';

describe('ProductVarientComponent', () => {
  let component: ProductVarientComponent;
  let fixture: ComponentFixture<ProductVarientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductVarientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductVarientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
