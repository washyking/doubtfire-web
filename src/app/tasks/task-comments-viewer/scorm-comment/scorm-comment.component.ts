import {Component, OnInit, Input} from '@angular/core';
import {Task, ScormComment, User, UserService, TestAttemptService} from 'src/app/api/models/doubtfire-model';

@Component({
  selector: 'f-scorm-comment',
  templateUrl: './scorm-comment.component.html',
  styleUrls: ['./scorm-comment.component.scss'],
})
export class ScormCommentComponent implements OnInit {
  @Input() task: Task;
  @Input() comment: ScormComment;

  user: User;

  constructor(
    private userService: UserService,
    private testAttemptService: TestAttemptService,
  ) {
    this.user = this.userService.currentUser;
  }

  ngOnInit() {}

  get canOverridePass(): boolean {
    return this.user.isStaff && !this.comment.testAttempt.successStatus;
  }

  reviewScormTest() {
    window.open(
      `#/task_def_id/${this.task.taskDefId}/scorm-player/review/${this.comment.testAttempt.id}`,
      '_blank',
    );
  }

  passScormAttempt() {
    this.testAttemptService.overrideSuccessStatus(this.comment.testAttempt.id, true);
  }

  deleteScormAttempt() {
    this.testAttemptService.deleteAttempt(this.comment.testAttempt.id);
  }
}
