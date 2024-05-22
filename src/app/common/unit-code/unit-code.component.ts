import {trigger, state, style, animate, transition} from '@angular/animations';
import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription, interval} from 'rxjs';

@Component({
  selector: 'f-unit-code',
  templateUrl: './unit-code.component.html',
  styleUrls: ['./unit-code.component.css'],
  animations: [
    trigger('flip', [
      state('in', style({transform: 'translateY(0%)', opacity: 1})),
      state('out', style({transform: 'translateY(100%)', opacity: 0})),
      transition('void => in', [
        style({transform: 'translateY(-100%)', opacity: 0}),
        animate('500ms ease-in-out'),
      ]),
      transition('in => out', [
        animate('500ms ease-in-out', style({transform: 'translateY(100%)', opacity: 0})),
      ]),
    ]),
  ],
})
export class UnitCodeComponent implements OnInit, OnDestroy {
  @Input() unit_code: string;
  @Input() width = 90;
  @Input() isDropdown = false;

  currentIndex = 0; // Index of the currently displayed code part
  showState = 'in'; // Animation state
  subscription: Subscription;

  get isDualBadge() {
    return this.unit_code?.includes('/');
  }

  get unitCodeParts() {
    return this.isDualBadge ? this.unit_code.split('/') : [this.unit_code];
  }

  ngOnInit(): void {
    if (this.isDropdown) {
      this.width += 24;
    }

    this.startFlipping();
  }

  startFlipping() {
    const source = interval(3000);
    this.subscription = source.subscribe(() => {
      this.showState = 'out'; // Trigger animation out
      setTimeout(() => {
        this.currentIndex = (this.currentIndex + 1) % this.unitCodeParts.length;
        this.showState = 'in'; // Trigger animation in after a delay
      }, 200); // Delay to match the animation duration
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
