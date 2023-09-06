import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentProfilEditComponent } from './agent-profil-edit.component';

describe('AgentProfilEditComponent', () => {
  let component: AgentProfilEditComponent;
  let fixture: ComponentFixture<AgentProfilEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentProfilEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentProfilEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
