import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelperCardconponentComponent } from './helper-cardconponent.component';

describe('HelperCardconponentComponent', () => {
  let component: HelperCardconponentComponent;
  let fixture: ComponentFixture<HelperCardconponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelperCardconponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelperCardconponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
