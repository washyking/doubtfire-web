import { Component, Input, Inject } from '@angular/core';
import { DoubtfireConstants } from 'src/app/config/constants/doubtfire-constants';

@Component({
  selector: 'portfolio-welcome-step',
  templateUrl: 'portfolio-welcome-step.component.html',
})
export class PortfolioWelcomeStepComponent {
  constructor(private constants: DoubtfireConstants) { }
  public externalName = this.constants.ExternalName

  advanceActiveTab(advanceBy) {
    console.log(advanceBy)
    return advanceBy
  }
}