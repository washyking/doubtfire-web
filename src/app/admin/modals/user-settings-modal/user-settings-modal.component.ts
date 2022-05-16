import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { currentUser, alertService } from 'src/app/ajs-upgraded-providers';
import { User, UserService } from 'src/app/api/models/doubtfire-model';
import { DoubtfireConstants } from 'src/app/config/constants/doubtfire-constants';

@Component({
  selector: 'df-user-settings-modal',
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
    has_run_first_time_setup: false,
  });
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
    this.externalName = this.constants.ExternalName.getValue();

    // edit detail
    if (this.data.id) {
      this.isNew = false;
      // send user data
      this.user = this.data;
    }
  }

  // create new user
  public createNewUser() {
    this.userService
      .create({
        user: this.user,
      })
      .subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: (err) => {
          this.alerts.add('danger', err?.error?.error, 3000);
        }
      });
  }

  // user edit
  public updateExistingUser() {
    this.userService.update(new User(this.user)).subscribe({
      next: (response) => {
        this.userService.save(response);
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.alerts.add('danger', err?.error?.error, 3000);
      }
    });
  }

  saveUser() {
    if (this.isNew) {
      this.createNewUser();
    } else {
      this.updateExistingUser();
    }
  }
}
