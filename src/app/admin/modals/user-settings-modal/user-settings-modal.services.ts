import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { User } from 'src/app/api/models/doubtfire-model';
import { UserSettingsModalComponent } from './user-settings-modal.component';

@Injectable({
  providedIn: 'root',
})
export class UserSettingsModalService {
  constructor(public dialog: MatDialog) {}

  // make a Observable for users.coffee to update the users list after create user
  public show(user: User): Observable<any> {
    return new Observable(subscriber => {
      let dialogRef: MatDialogRef<UserSettingsModalComponent>;
      dialogRef = this.dialog.open(UserSettingsModalComponent, {
        data: user,
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          subscriber.next(result);
        } else {
          subscriber.next('Cancelled Update/Create');
        }
        subscriber.complete();
      });
    });
  }
}
