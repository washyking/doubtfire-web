import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Task} from 'src/app/api/models/doubtfire-model';

@Component({
  selector: 'f-task-scorm-card',
  templateUrl: './task-scorm-card.component.html',
  styleUrls: ['./task-scorm-card.component.scss'],
})
export class TaskScormCardComponent implements OnChanges {
  @Input() task: Task;
  attemptsLeft: number;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.task && changes.task.currentValue) {
      this.attemptsLeft = undefined;
      this.getAttemptsLeft();
    }
  }

  getAttemptsLeft(): void {
    if (this.task.definition.scormAttemptLimit != 0) {
      this.task.fetchTestAttempts().subscribe((attempts) => {
        let count = attempts.length;
        if (count > 0 && attempts[0].terminated === false) count--;
        this.attemptsLeft = this.task.definition.scormAttemptLimit - count;
      });
    }
  }

  launchScormPlayer(): void {
    window.open(
      `#/projects/${this.task.project.id}/task_def_id/${this.task.taskDefId}/scorm-player/normal`,
      '_blank',
    );
  }

  requestMoreAttempts(): void {}
}
