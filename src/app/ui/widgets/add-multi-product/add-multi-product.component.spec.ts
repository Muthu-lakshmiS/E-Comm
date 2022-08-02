import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMultiProductComponent } from './add-multi-product.component';

describe('AddMultiProductComponent', () => {
  let component: AddMultiProductComponent;
  let fixture: ComponentFixture<AddMultiProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMultiProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMultiProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
