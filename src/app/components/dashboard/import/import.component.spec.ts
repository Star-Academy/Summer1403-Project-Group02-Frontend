import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportComponent } from './import.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ImportComponent', () => {
  let component: ImportComponent;
  let fixture: ComponentFixture<ImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, ImportComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show mian block status when empty graph', () => {
    let main_status = fixture.nativeElement.querySelector('#import-main tui-block-status');
    expect(main_status.hidden).toBeFalsy();
  });

  it('should disabled run button when empty graph', () => {
    let run_btn = fixture.nativeElement.querySelector('#import-main button');
    expect(run_btn.disabled).toBeTruthy();
  });

  // test api (remove btn & drop dwon & etc)

  // test api empty (show block status)

  // test api error

});
