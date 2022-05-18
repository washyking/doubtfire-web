// create-unit-modal service
// Migrated by Mitchell Burcheri
// Help from Ray Guo
// Migrated Semester 1 2022

import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateUnitModalComponent } from './create-unit-modal.component';

@Injectable({
  // creates a provider for the service
  providedIn: 'root',
})
export class CreateUnitModalService {
  constructor(public dialog: MatDialog) {}
  show(units): void {
    // show dialog box for CreateUnitModalComponent
    const dialogRef = this.dialog.open(CreateUnitModalComponent, {
      // the data being collected is the unit code and unit name
      data: { units },
    });
  }
}
