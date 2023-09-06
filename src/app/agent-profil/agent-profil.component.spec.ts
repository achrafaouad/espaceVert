import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentProfilComponent } from './agent-profil.component';

describe('AgentProfilComponent', () => {
  let component: AgentProfilComponent;
  let fixture: ComponentFixture<AgentProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentProfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
