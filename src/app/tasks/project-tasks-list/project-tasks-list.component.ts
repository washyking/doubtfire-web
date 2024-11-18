import {Component, Input, Output, EventEmitter, OnInit, Inject} from '@angular/core';
import {TaskService} from 'src/app/api/services/task.service';
import {analyticsService} from 'src/app/ajs-upgraded-providers';
import {GradeService} from 'src/app/common/services/grade.service';
import {Unit, Project, Task} from 'src/app/api/models/doubtfire-model';
@Component({
  selector: 'f-project-tasks-list',
  templateUrl: './project-tasks-list.component.html',
  styleUrls: ['./project-tasks-list.component.scss'],
})
export class ProjectTasksListComponent implements OnInit {
  @Input() unit!: Unit;
  @Input() project!: Project;
  @Input() inMenu!: string;
  @Output() selectTask = new EventEmitter<Task>();

  groupTasks: Array<{groupSet: unknown; name: string}> = [];

  constructor(
    private taskService: TaskService,
    @Inject(analyticsService)
    private analyticsService: { event: (eventName: string, eventDescription: string) => void },
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
      {groupSet: null, name: 'Individual Work'},
    ];
  }

  get hideGroupSetName(): boolean {
    return this.unit.groupSets.length === 0;
  }

  taskText(task: Task): string {
    let result = task.definition.abbreviation;

    if (task.definition.isGraded) {
      result += task.grade ? ` (${this.gradeService.gradeAcronyms[task.grade]})` : ' (?)';
    }

    if (task.definition.maxQualityPts > 0) {
      result += task.qualityPts
        ? ` (${task.qualityPts}/${task.definition.maxQualityPts})`
        : ` (?/${task.definition.maxQualityPts})`;
    }

    return result;
  }

  taskDisabled(task: Task): boolean {
    return task.definition.targetGrade > this.project.targetGrade;
  }

  onSelectTask(task: Task): void {
    this.selectTask.emit(task);
  }
}
