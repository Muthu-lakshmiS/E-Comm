import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiProductPageComponent } from './multi-product-page.component';

describe('MultiProductPageComponent', () => {
  let component: MultiProductPageComponent;
  let fixture: ComponentFixture<MultiProductPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiProductPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
