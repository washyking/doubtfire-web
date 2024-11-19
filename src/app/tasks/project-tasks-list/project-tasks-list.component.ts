import { Component, Input } from '@angular/core';
import { Project, Task } from 'src/app/api/models/doubtfire-model';

@Component({
  selector: 'f-project-tasks-list',
  templateUrl: './project-tasks-list.component.html',
  styleUrls: ['./project-tasks-list.component.scss'],
})
export class ProjectTasksListComponent {
  @Input() project!: Project;
  selectedTask: Task | null = null;

  taskText(task: Task): string {
    const name = task.definition?.name || 'Unnamed Task';
    const match = name.match(/(\d+\.\d+)\s*-\s*([A-Za-z\s]+)/);
    if (match) {
      const number = match[1];
      const level = this.getLevelFromName(name);
      return `${number}${level}`;
    }
    return name;
  }

  getLevelFromName(name: string): string {
    if (name.includes('Pass')) return 'P';
    if (name.includes('Credit')) return 'C';
    if (name.includes('Distinction')) return 'D';
    if (name.includes('High Distinction')) return 'HD';
    return '';
  }

  selectTask(task: Task): void {
    if (this.selectedTask) {
      this.selectedTask.showTooltip = false;
    }
    this.selectedTask = this.selectedTask === task ? null : task;
    if (this.selectedTask) {
      this.selectedTask.showTooltip = true;
    }
  }

  getStatusClass(task: Task): string {
    let statusClass = '';
    switch (task.status) {
      case 'complete':
        statusClass = 'task-complete';
        break;
      case 'working_on_it':
      case 'fix_and_resubmit':
        statusClass = 'task-doing';
        break;
      case 'discuss':
        statusClass = 'task-discuss';
        break;
      case 'ready_for_feedback':
        statusClass = 'task-ready-for-feedback';
        break;
      case 'need_help':
        statusClass = 'task-need-help';
        break;
      case 'fail':
      case 'time_exceeded':
        statusClass = 'task-fail';
        break;
      default:
        statusClass = 'task-not-started';
    }
    if (this.selectedTask === task) {
      statusClass += ' selected';
    }
    return statusClass;
  }

  ngOnInit() {
    console.log('Project tasks:', this.project.tasks);
  }
}
