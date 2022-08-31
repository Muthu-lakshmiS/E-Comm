import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseTileComponent } from './purchase-tile.component';

describe('PurchaseTileComponent', () => {
  let component: PurchaseTileComponent;
  let fixture: ComponentFixture<PurchaseTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseTileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
