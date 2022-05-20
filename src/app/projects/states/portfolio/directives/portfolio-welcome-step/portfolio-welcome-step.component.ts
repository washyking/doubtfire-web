import { Component, Input, Inject, OnInit } from '@angular/core';
import { DoubtfireConstants } from 'src/app/config/constants/doubtfire-constants';

@Component({
  selector: 'portfolio-welcome-step',
  templateUrl: 'portfolio-welcome-step.component.html',
})
export class PortfolioWelcomeStepComponent {
  @Input() advanceActiveTabs: any;
  constructor(private constants: DoubtfireConstants) { }
  public externalName: any;

  public advanceActiveTab(input: number) {
    return this.advanceActiveTabs(input)
  }

  ngOnInit(): void {
    this.externalName = this.constants.ExternalName;
  }
}