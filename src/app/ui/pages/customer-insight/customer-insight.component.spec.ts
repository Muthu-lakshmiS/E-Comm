import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerInsightComponent } from './customer-insight.component';

describe('CustomerInsightComponent', () => {
  let component: CustomerInsightComponent;
  let fixture: ComponentFixture<CustomerInsightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerInsightComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerInsightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
