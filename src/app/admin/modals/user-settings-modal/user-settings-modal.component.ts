import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { currentUser, alertService } from 'src/app/ajs-upgraded-providers';
import { User, UserService } from 'src/app/api/models/doubtfire-model';
import { DoubtfireConstants } from 'src/app/config/constants/doubtfire-constants';

@Component({
  selector: 'user-settings-modal',
  templateUrl: 'user-settings-modal.component.html',
  styleUrls: ['user-settings-modal.component.scss'],
})
export class UserSettingsModalComponent implements OnInit {
  // create or not
  isNew: boolean = true;
  // user information list
  user: User = new User({
    username: '',
    first_name: '',
    last_name: '',
    nickname: '',
    email: '',
    opt_in_to_research: false,
    system_role: '',
    receive_task_notifications: false,
    receive_portfolio_notifications: false,
    receive_feedback_notifications: false,
    has_run_first_time_setup: false
  });
  users: User[] = new Array<User>();

  externalName: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(currentUser) public CurrentUser: any,
    @Inject(alertService) private alerts: any,
    public dialogRef: MatDialogRef<UserSettingsModalComponent>,
    private constants: DoubtfireConstants,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.constants.ExternalName.subscribe((result) => {
      this.externalName = result;
    })

    // edit detail
    if (this.data.id) {
      this.isNew = false;
      // send user data
      this.user = this.data;

      // or search basic on ID
      // this.userService.query({ id: this.data.id }).subscribe((data) => {
      //   this.user = data[0]
      // })
    } else { // add
      this.userService.query().subscribe(data => {
        this.users = data;
      })

    }

  }

  // create new user
  public createNewUser() {
    this.userService.create({
      user: this.user
    }).subscribe(response => {
      this.dialogRef.close();
      if (this.users){
        return this.users.push(response);
      }
    }, (err) => {
      this.alerts.add('danger', err?.error?.error, 3000);
    })
  }

  // user edit
  public updateExistingUser() {
    const { id, first_name, last_name } = this.user;
    this.userService.update(this.currentWebcalWith(this.user)).subscribe(response => {
      this.userService.save(response)
      this.dialogRef.close();
    }, (err) => {
      this.alerts.add('danger', err?.error?.error, 3000);
    })
  }

  // show example on table
  private currentWebcalWith(o: Partial<User>): User {
    return new User({ ...o });
  }

  saveUser() {
    if (this.isNew) {
      this.createNewUser()
    } else {
      this.updateExistingUser()
    }
  }
}
