import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { analyticsService, Unit, alertService } from 'src/app/ajs-upgraded-providers';
import { DoubtfireConstants } from 'src/app/config/constants/doubtfire-constants';

@Component({
  selector: 'df-create-break-modal',
  templateUrl: 'create-unit-modal.component.html',
  styleUrls: ['create-unit-modal.component.scss'],
})
export class CreateUnitModalComponent implements OnInit {
  units: any = this.data.units;
  unit: any = { code: null, name: null };
  constructor(
    @Inject(analyticsService) private analyticsService: any,
    @Inject(Unit) private Unit: any,
    @Inject(alertService) private alertService: any,
    @Inject(DoubtfireConstants) private DoubtfireConstants: any,
    public dialogRef: MatDialogRef<CreateUnitModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.analyticsService.event('Unit Admin', 'Started to Create Unit');
  }
  saveUnit() {
    // Saves unit using the inputted unit code and unit name
    this.Unit.create(
      // Create unit using the unit code and unit name. This is the inputted data.
      { unit: this.unit },
      // response is the data inputted
      (response) => {
        // If successful, log unit creation is successful and push unit to units
        this.alertService.add('success', 'Unit created.', 2000);
        // closes dialog box
        this.dialogRef.close();
        // pushes unit code and unit name to list of units
        this.units.push(response);
        this.analyticsService.event('Unit Admin', 'Saved New Unit');
      },
      (response) => {
        // If unsuccessful, log that there is an error creating unit
        this.alertService.add('danger', `Error creating unit - ${response.data.error}`, 6000);
      }
    );
  }
  externalName: string;
}
