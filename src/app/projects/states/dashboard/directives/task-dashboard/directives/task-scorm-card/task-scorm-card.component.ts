import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {
  Task,
  TestAttempt,
  TestAttemptService,
  User,
  UserService,
} from 'src/app/api/models/doubtfire-model';
import {ScormExtensionModalService} from 'src/app/common/modals/scorm-extension-modal/scorm-extension-modal.service';

@Component({
  selector: 'f-task-scorm-card',
  templateUrl: './task-scorm-card.component.html',
  styleUrls: ['./task-scorm-card.component.scss'],
})
export class TaskScormCardComponent implements OnInit, OnChanges {
  @Input() task: Task;
  attemptsLeft: number;
  latestCompletedAttempt: TestAttempt;
  user: User;

  constructor(
    private extensions: ScormExtensionModalService,
    private testAttemptService: TestAttemptService,
    private userService: UserService,
  ) {
    this.user = this.userService.currentUser;
  }

  ngOnInit() {
    this.refreshAttemptData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.task && changes.task.currentValue) {
      this.refreshAttemptData();
    }
  }

  refreshAttemptData(): void {
    this.attemptsLeft = undefined;
    this.getAttemptsLeft();
    this.latestCompletedAttempt = undefined;
    this.testAttemptService.getLatestCompletedAttempt(this.task).subscribe((attempt) => {
      this.latestCompletedAttempt = attempt;
    });
  }

  getAttemptsLeft(): void {
    if (this.task.definition.scormAttemptLimit != 0) {
      this.task.fetchTestAttempts().subscribe((attempts) => {
        let count = attempts.length;
        if (count > 0 && attempts[0].terminated === false) count--;
        this.attemptsLeft =
          this.task.definition.scormAttemptLimit + this.task.scormExtensions - count;
      });
    }
  }

  checkIfPassed(): boolean {
    if (this.latestCompletedAttempt) {
      return this.latestCompletedAttempt.successStatus;
    }
    return false;
  }

  launchScormPlayer(): void {
    window.open(
      `#/projects/${this.task.project.id}/task_def_id/${this.task.taskDefId}/scorm-player/normal`,
      '_blank',
    );
  }

  reviewLatestCompletedAttempt(): void {
    window.open(
      `#/task_def_id/${this.task.taskDefId}/scorm-player/review/${this.latestCompletedAttempt.id}`,
      '_blank',
    );
  }

  requestExtraAttempt(): void {
    this.extensions.show(this.task, () => {
      this.task.refresh();
    });
  }
}
