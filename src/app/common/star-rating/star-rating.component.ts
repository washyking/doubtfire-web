import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit {
  @Input() maxRating: any;
  @Input() selectedRating: any;
  @Output() newSelectedRating = new EventEmitter<number>();

  @Input() readOnly: boolean = true;

  stars = [];
  circles = ["one", "two", "three", "four", "five"]; // Allow for more than five?
  @Input() type: string = "star";

  constructor() {}

  ngOnInit(): void {
    for (let i = 0; i < this.maxRating; i++) {
      this.stars.push(i);
    }
  }

  selectStar(value: number): void {
    this.selectedRating = value;
    this.newSelectedRating.emit(value);
  }
}
