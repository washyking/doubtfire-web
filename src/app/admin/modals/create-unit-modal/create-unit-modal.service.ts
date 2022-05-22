// Co-authored-by: Mitchell Burcheri <mburcheri@deakin.edu.au>
// Co-authored-by: Ray Guo <rguo@deakin.edu.au>

import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateUnitModalComponent } from './create-unit-modal.component';

@Injectable({
  // creates a provider for the service
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
