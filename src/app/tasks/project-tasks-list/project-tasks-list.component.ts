import { Component, Input } from '@angular/core';
import { Project, Task} from 'src/app/api/models/doubtfire-model';

@Component({
  selector: 'f-project-tasks-list',
  templateUrl: './project-tasks-list.component.html',
  styleUrls: ['./project-tasks-list.component.scss'],
})
export class ProjectTasksListComponent {
  @Input() project!: Project;

  taskText(task: Task): string {
    const name = task.definition?.name || 'Unnamed Task';
    const match = name.match(/(\d+(\.\d+)?)/);
    const result = match ? match[0] : name;
    console.log(`Task name: ${name}, Extracted number: ${result}`);
    return result;
  }
  toggleTooltip(task: Task): void {
    task.showTooltip = !task.showTooltip;
  }
  getStatusClass(task: Task): string {
    switch (task.status) {
      case 'complete':
        return 'task-complete';
      case 'working_on_it':
      case 'fix_and_resubmit':
        return 'task-doing';
      case 'discuss':
        return 'task-discuss';
      case 'ready_for_feedback':
        return 'task-ready-for-feedback';
      case 'need_help':
        return 'task-need-help';
      case 'fail':
      case 'time_exceeded':
        return 'task-fail';
      default:
        return 'task-not-started';
    }
  }
  ngOnInit() {
    console.log('Project tasks:', this.project.tasks);
  }
}
