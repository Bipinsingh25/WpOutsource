import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageWorkflowsComponent } from './manage-workflows.component';

describe('ManageWorkflowsComponent', () => {
  let component: ManageWorkflowsComponent;
  let fixture: ComponentFixture<ManageWorkflowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageWorkflowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageWorkflowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
