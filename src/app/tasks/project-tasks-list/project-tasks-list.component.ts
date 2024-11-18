import { Component, Input } from '@angular/core';
import { Project, Task} from 'src/app/api/models/doubtfire-model';

@Component({
  selector: 'f-project-tasks-list',
  templateUrl: './project-tasks-list.component.html',
  styleUrls: ['./project-tasks-list.component.scss'],
})
export class ProjectTasksListComponent {
  @Input() project!: Project;

  taskText(task: any): string {
    if (task.definition && task.definition.name) {
      return task.definition.name;
    }
    // Fallback text if name is not available
    return 'Unnamed Task';
  }

  ngOnInit() {
    console.log('Project tasks:', this.project.tasks);
  }
}
