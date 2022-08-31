import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryTileComponent } from './inventory-tile.component';

describe('InventoryTileComponent', () => {
  let component: InventoryTileComponent;
  let fixture: ComponentFixture<InventoryTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryTileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
