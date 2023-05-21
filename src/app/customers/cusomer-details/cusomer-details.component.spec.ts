import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CusomerDetailsComponent } from './cusomer-details.component';

describe('CusomerDetailsComponent', () => {
  let component: CusomerDetailsComponent;
  let fixture: ComponentFixture<CusomerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CusomerDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CusomerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
