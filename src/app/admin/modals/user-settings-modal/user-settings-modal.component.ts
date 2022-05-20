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
  // init
  user: User;
  isNew: boolean;
  externalName: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(currentUser) public CurrentUser: any,
    @Inject(alertService) private alerts: any,
    public dialogRef: MatDialogRef<UserSettingsModalComponent>,
    private constants: DoubtfireConstants,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // assign values
    this.user = this.data ? this.data : new User();
    this.isNew = this.user.id ? false : true;
    this.constants.ExternalName.subscribe((response) => {
      this.externalName = response;
    });
  }

  // create new user
  public createNewUser() {
    this.userService
      .create({
        user: this.user,
      })
      .subscribe({
        next: (response) => {
          this.dialogRef.close({ action: 'create', user: response });
        },
        error: (err) => {
          this.alerts.add('danger', err?.error?.error, 3000);
        },
      });
  }

  // user edit
  public updateExistingUser() {
    this.userService.update(new User(this.user)).subscribe({
      next: (response) => {
        this.userService.save(response);
        this.dialogRef.close({ action: 'update' });
      },
      error: (err) => {
        this.alerts.add('danger', err?.error?.error, 3000);
      },
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
