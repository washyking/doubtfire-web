import {Component} from '@angular/core';
import {StateService} from '@uirouter/core';
import {UserService} from 'src/app/api/models/doubtfire-model';
import {TiiService} from 'src/app/api/services/tii.service';
import {AlertService} from 'src/app/common/services/alert.service';
import {DoubtfireConstants} from 'src/app/config/constants/doubtfire-constants';

@Component({
  selector: 'f-all-projects-list',
  templateUrl: './all-projects-list.component.html',
  // styleUrls: ['./all-projects-list.component.scss'],
})
export class AllProjectsListComponent {
  constructor(
    private constants: DoubtfireConstants,
    private tiiService: TiiService,
    private userService: UserService,
    private alertService: AlertService,
    private state: StateService,
  ) {


  }
}
