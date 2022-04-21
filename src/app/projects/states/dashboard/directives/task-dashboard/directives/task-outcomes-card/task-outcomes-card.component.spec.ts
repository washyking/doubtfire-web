import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskOutcomesCardComponent } from './task-outcomes-card.component';

describe('TaskOutcomesCardComponent', () => {
  let component: TaskOutcomesCardComponent;
  let fixture: ComponentFixture<TaskOutcomesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskOutcomesCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskOutcomesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});