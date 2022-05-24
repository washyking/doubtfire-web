import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateUnitModalComponent } from './create-unit-modal.component';

@Injectable({
  providedIn: 'root',
})
export class CreateUnitModalService {
  constructor(public dialog: MatDialog) {}
  show(units: any): void {
    // show dialog box for CreateUnitModalComponent
    this.dialog.open(CreateUnitModalComponent, {
      // the data being collected is the unit code and unit name
      data: { units },
    });
  }
}
