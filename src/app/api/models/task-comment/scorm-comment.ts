import {Task, TaskComment, TestAttempt} from '../doubtfire-model';

export class ScormComment extends TaskComment {
  testAttempt: TestAttempt;

  constructor(task: Task) {
    super(task);
  }
}
