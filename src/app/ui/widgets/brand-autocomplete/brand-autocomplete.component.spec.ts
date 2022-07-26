import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandAutocompleteComponent } from './brand-autocomplete.component';

describe('BrandAutocompleteComponent', () => {
  let component: BrandAutocompleteComponent;
  let fixture: ComponentFixture<BrandAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandAutocompleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
