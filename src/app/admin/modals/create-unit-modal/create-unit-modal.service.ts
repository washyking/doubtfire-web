// create-unit-modal
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateUnitModalComponent } from './create-unit-modal.component';

@Injectable({
  providedIn: 'root',
})
export class CreateUnitModalService {
  constructor(public dialog: MatDialog) {}
  show(units): void {
    const dialogRef = this.dialog.open(CreateUnitModalComponent, {
      data: { units },
    });
  }
}
