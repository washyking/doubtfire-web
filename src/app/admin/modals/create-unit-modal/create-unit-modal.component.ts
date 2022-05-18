// create-unit-modal component
// Migrated by Mitchell Burcheri
// Help from Ray Guo
// Migrated Semester 1 2022

// Importing modules
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { analyticsService, Unit, alertService } from 'src/app/ajs-upgraded-providers';
import { DoubtfireConstants } from 'src/app/config/constants/doubtfire-constants';

// Angular component decorator
@Component({
  selector: 'df-create-break-modal',
  templateUrl: 'create-unit-modal.component.html',
})

// CreateUnitModalComponent for exporting to other programs
export class CreateUnitModalComponent implements OnInit {
  // Defining variables
  units: any = this.data.units;
  unit: any = { code: null, name: null };
  constructor(
    // data being injected such as: CreateUnitModalComponent(analyticsService,Unit,alertService,DoubtfireConstants,MAT_DIALOG_DATA)
    @Inject(analyticsService) private analyticsService: any,
    @Inject(Unit) private Unit: any,
    @Inject(alertService) private alertService: any,
    @Inject(DoubtfireConstants) private DoubtfireConstants: any,
    public dialogRef: MatDialogRef<CreateUnitModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    // Runs when task is run
    // Analytics Service event is created
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
      () => {
        // If unsuccessful, log that there is an error creating unit
        this.alertService.add('danger', 'Error creating unit - #{response.data.error}');
      }
    );
  }
  // The line below is required for this task to compile
  externalName = this.DoubtfireConstants.ExternalName;
}
