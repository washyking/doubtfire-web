import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioWelcomeStepComponent } from './portfolio-welcome-step.component';

describe('PortfolioWelcomeStepComponent', () => {
  let component: PortfolioWelcomeStepComponent;
  let fixture: ComponentFixture<PortfolioWelcomeStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PortfolioWelcomeStepComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioWelcomeStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});