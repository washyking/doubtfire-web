import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { taskService, groupService, gradeService } from 'src/app/ajs-upgraded-providers';
import { DoubtfireConstants } from 'src/app/config/constants/doubtfire-constants';

import { ProjectTasksListComponent } from './project-tasks-list.component';

describe('ProjectTasksListComponent', () => {
  let component: ProjectTasksListComponent;
  let fixture: ComponentFixture<ProjectTasksListComponent>;
  let taskServiceStub: jasmine.SpyObj<any>;
  let groupServiceStub: jasmine.SpyObj<any>;
  let gradeServiceStub: jasmine.SpyObj<any>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ProjectTasksListComponent],
        providers: [
          { provide: taskService, useValue: taskServiceStub },
          { provide: groupService, useValue: groupServiceStub },
          { provide: gradeService, useValue: gradeServiceStub },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTasksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
