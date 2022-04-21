import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
@Component({
  selector: 'task-outcomes-card',
  templateUrl: 'task-outcomes-card.component.html',
  styleUrls: ['task-outcomes-card.component.scss'],
})
export class TaskOutcomesCardComponent implements OnInit, OnChanges {
  // 该组件可传递的参数
  @Input() taskDef: any;
  @Input() unit: any;

  alignments: any = [];

  constructor() {}

  ngOnInit(): void {}

  // 监听传递给组件的值
  ngOnChanges(changes: SimpleChanges) {
    if (changes.unit?.currentValue && changes.taskDef?.currentValue?.id) {
      this.alignments = this.unit.staffAlignmentsForTaskDefinition(this.taskDef)
    }
  
  }
   
}

