import {Entity} from 'ngx-entity-service';
import {Task} from './doubtfire-model';

export class TestAttempt extends Entity {
  id: number;
  attemptNumber: number;
  terminated: boolean;
  completionStatus: boolean;
  successStatus: boolean;
  scoreScaled: number;
  cmiDatamodel: string;
  attemptedTime: Date;

  task: Task;

  constructor(task: Task) {
    super();
    this.task = task;
  }
}
