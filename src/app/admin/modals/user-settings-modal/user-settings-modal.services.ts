import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { UserSettingsModalComponent } from './user-settings-modal.component';

@Injectable({
  providedIn: 'root',
})
export class UserSettingsModalService {
  constructor(public dialog: MatDialog) {}

  // make a promise for users.coffee to update the users list after create user
  public show(user: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let dialogRef: MatDialogRef<UserSettingsModalComponent>;
      dialogRef = this.dialog.open(UserSettingsModalComponent, {
        data: user,
      });
      dialogRef.afterClosed().subscribe((result) => {
        // create/update successful resolve
        // else reject with info message
        if (result) {
          resolve(result);
        } else {
          reject('Cancelled Update/Create');
        }
      });
    });
  }
}
