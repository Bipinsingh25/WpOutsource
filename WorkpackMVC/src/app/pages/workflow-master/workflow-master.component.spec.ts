import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowMasterComponent } from './workflow-master.component';

describe('WorkflowMasterComponent', () => {
  let component: WorkflowMasterComponent;
  let fixture: ComponentFixture<WorkflowMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
