import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DoubtfireConstants } from 'src/app/config/constants/doubtfire-constants';
import { PortfolioWelcomeStepComponent } from './portfolio-welcome-step.component';

describe('PortfolioWelcomeStepComponent', () => {
  let component: PortfolioWelcomeStepComponent;
  let fixture: ComponentFixture<PortfolioWelcomeStepComponent>;
  let doubtfireConstantsStub: Partial<DoubtfireConstants>;

  beforeEach(
    // waitForAsync(() => {
    //   TestBed.configureTestingModule({
    //     declarations: [PortfolioWelcomeStepComponent],
    //     providers: [{ provide: DoubtfireConstants, useValue: doubtfireConstantsStub }],
    //   }).compileComponents();
    // })
    async () => {
      await TestBed.configureTestingModule({
        declarations: [PortfolioWelcomeStepComponent],
        providers: [{ provide: DoubtfireConstants, useValue: doubtfireConstantsStub }],
      })
        .compileComponents();
    }
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioWelcomeStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});