import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationListComponentComponent } from './notification-list-component.component';

describe('NotificationListComponentComponent', () => {
  let component: NotificationListComponentComponent;
  let fixture: ComponentFixture<NotificationListComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationListComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
