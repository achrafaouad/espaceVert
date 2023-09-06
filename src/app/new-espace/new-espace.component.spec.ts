import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEspaceComponent } from './new-espace.component';

describe('NewEspaceComponent', () => {
  let component: NewEspaceComponent;
  let fixture: ComponentFixture<NewEspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEspaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewEspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
