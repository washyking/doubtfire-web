import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { TaskService } from 'src/app/api/services/task.service';
import { AnalyticsService } from 'src/app/common/services/analytics.service';
import { GradeService } from 'src/app/common/services/grade.service';
import { Unit, Project, Task } from 'src/app/api/models/doubtfire-model';

@Component({
  selector: 'project-tasks-list',
  templateUrl: './project-tasks-list.component.html',
  styleUrls: ['./project-tasks-list.component.scss'],
})
export class ProjectTasksListComponent implements OnInit {
  @Input() unit!: Unit;
  @Input() project!: Project;
  @Input() inMenu!: string;
  @Output() onSelect = new EventEmitter<Task>();

  groupTasks: Array<{ groupSet: any; name: string }> = [];

  constructor(
    private taskService: TaskService,
    private analyticsService: AnalyticsService,
    private gradeService: GradeService
  ) {}

  ngOnInit(): void {
    this.analyticsService.event('Student Project View', 'Showed Task Button List');

    // Populate group tasks
    this.groupTasks = [
      ...this.unit.groupSets.map((gs) => ({
        groupSet: gs,
        name: gs.name,
      })),
      { groupSet: null, name: 'Individual Work' },
    ];
  }

  statusClass(status: string): string {
    return this.taskService.statusClass(status);
  }

  statusText(status: string): string {
    return this.taskService.statusText(status);
  }

  taskDisabled(task: Task): boolean {
    return task.definition.targetGrade > this.project.targetGrade;
  }

  groupSetName(id: number): string {
    return this.unit.groupSetsCache.get(id)?.name || 'Individual Work';
  }

  get hideGroupSetName(): boolean {
    return this.unit.groupSets.length === 0;
  }

  taskText(task: Task): string {
    let result = task.definition.abbreviation;

    if (task.definition.isGraded) {
      if (task.grade) {
        result += ` (${this.gradeService.gradeAcronyms[task.grade]})`;
      } else {
        result += ' (?)';
      }
    }

    if (task.definition.maxQualityPts > 0) {
      if (task.qualityPts) {
        result += ` (${task.qualityPts}/${task.definition.maxQualityPts})`;
      } else {
        result += ` (?/${task.definition.maxQualityPts})`;
      }
    }

    return result;
  }

  onSelectTask(task: Task): void {
    this.onSelect.emit(task); // Emit selected task
  }
}
