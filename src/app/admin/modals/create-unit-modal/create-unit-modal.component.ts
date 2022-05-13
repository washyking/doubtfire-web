// create-unit-modal
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { analyticsService, Unit, alertService } from 'src/app/ajs-upgraded-providers';
import { DoubtfireConstants } from 'src/app/config/constants/doubtfire-constants';

@Component({
  selector: 'df-create-break-modal',
  templateUrl: 'create-unit-modal.component.html',
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
    console.log(this.data);
  }
  saveUnit() {
    this.Unit.create(
      { unit: this.unit },
      (response) => {
        console.log('success');
        this.alertService.add('success', 'Unit created.', 2000);
        this.dialogRef.close();
        this.units.push(response);
        this.analyticsService.event('Unit Admin', 'Saved New Unit');
      },
      (response) => {
        console.log('err');
        this.alertService.add('danger', 'Error creating unit - #{response.data.error}');
      }
    );
  }
  externalName = this.DoubtfireConstants.ExternalName;
}
