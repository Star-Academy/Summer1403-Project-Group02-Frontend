import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetCardComponent } from './dataset-card.component';

describe('DatasetCardComponent', () => {
  let component: DatasetCardComponent;
  let fixture: ComponentFixture<DatasetCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatasetCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatasetCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
