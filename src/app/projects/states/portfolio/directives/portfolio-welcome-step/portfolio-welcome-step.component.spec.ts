import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DoubtfireConstants } from 'src/app/config/constants/doubtfire-constants';
import { PortfolioWelcomeStepComponent } from './portfolio-welcome-step.component';

describe('PortfolioWelcomeStepComponent', () => {
  let component: PortfolioWelcomeStepComponent;
  let fixture: ComponentFixture<PortfolioWelcomeStepComponent>;
  let doubtfireConstantsStub: jasmine.SpyObj<any>;

  beforeEach(
    waitForAsync(() => {
      doubtfireConstantsStub = {
        ExternalName: "",
      };

      TestBed.configureTestingModule({
        declarations: [PortfolioWelcomeStepComponent],
        providers: [{ provide: DoubtfireConstants, useValue: doubtfireConstantsStub }],
      }).compileComponents();
    })
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