import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { UserSettingsModalComponent } from './user-settings-modal.component';

@Injectable({
  providedIn: 'root',
})
export class UserSettingsModalService {
  constructor(public dialog: MatDialog) {}

  public show(user: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let dialogRef: MatDialogRef<UserSettingsModalComponent>;
      dialogRef = this.dialog.open(UserSettingsModalComponent, {
        data: user,
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          resolve(result);
        } else {
          reject('Cancelled Update/Create');
        }
      });
    });
  }
}
