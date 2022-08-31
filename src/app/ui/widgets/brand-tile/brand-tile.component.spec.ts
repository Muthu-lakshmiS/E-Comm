import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandTileComponent } from './brand-tile.component';

describe('BrandTileComponent', () => {
  let component: BrandTileComponent;
  let fixture: ComponentFixture<BrandTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandTileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
