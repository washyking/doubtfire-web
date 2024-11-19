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
    const assignmentMatch = name.match(/Assignment\s*(\d+)/i);
    const testMatch = name.match(/Test\s*(\d+)/i);

    if (assignmentMatch) {
      return `A${assignmentMatch[1]}`;
    } else if (testMatch) {
      return `T${testMatch[1]}`;
    }

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
    this.selectedTask = this.selectedTask === task ? null : task;
  }

  getStatusClass(task: Task): string {
    let statusClass = '';
    switch (task.status) {
      case 'complete':
        statusClass = 'task-complete';
        break;
      case 'working_on_it':
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
        statusClass = 'task-fail';
        break;
      case 'time_exceeded':
        statusClass = 'task-time-exceeded';
        break;
      case 'fix_and_resubmit':
        statusClass = 'task-fix-and-resubmit';
        break;
      case 'demonstrate':
        statusClass = 'task-demonstrate';
        break;
      case 'redo':
        statusClass = 'task-redo';
        break;
      case 'feedback_exceeded':
        statusClass = 'task-feedback-exceeded';
        break;
      default:
        statusClass = 'task-not-started';
    }
    if (this.selectedTask === task) {
      statusClass += ' selected';
    }
    return statusClass;
  }

  getTooltipText(task: Task): string {
    const statusNames: { [key: string]: string } = {
      ready_for_feedback: 'Ready for Feedback',
      not_started: 'Not Started',
      working_on_it: 'Working On It',
      need_help: 'Need Help',
      redo: 'Redo',
      feedback_exceeded: 'Feedback Exceeded',
      resubmit: 'Resubmit',
      discuss: 'Discuss',
      demonstrate: 'Demonstrate',
      complete: 'Complete',
      fail: 'Fail',
      time_exceeded: 'Time Exceeded'
    };

    const statusDisplayName = statusNames[task.status] || task.status;
    const taskDefinitionName = task.definition?.name.replace(/Task\s*\d+\.\d+\s*-\s*/i, '') || 'Unnamed Task';

    return `<strong>${taskDefinitionName}</strong>: ${statusDisplayName}`;
  }

  ngOnInit() {
    console.log('Project tasks:', this.project.tasks);
  }
}
