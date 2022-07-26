import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBrandPageComponent } from './product-brand-page.component';

describe('ProductBrandPageComponent', () => {
  let component: ProductBrandPageComponent;
  let fixture: ComponentFixture<ProductBrandPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductBrandPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductBrandPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
