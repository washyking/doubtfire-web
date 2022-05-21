import { Component, Input, Inject, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { alertService, taskService, extensionModal } from 'src/app/ajs-upgraded-providers';
import { MatSelectChange } from '@angular/material/select';
import * as _ from 'lodash'

@Component({
  selector: 'task-status-card',
  templateUrl: 'task-status-card.component.html',
  styleUrls: ['task-status-card.component.scss'],
})
export class TaskStatusCardComponent implements OnInit, OnChanges {

  @Input() task: any = {};

  triggers: any = [];
  statusHelp: any = {
    reason: '',
    action: ''
  }
  unit: any = {
    my_role: ''
  }
  statusLabel: string = ''
  canApplyForExtension: boolean = false
  inSubmittedState: boolean = false
  requiresFileUpload: boolean = false

  constructor(
    @Inject(extensionModal) private ExtensionModal,
    @Inject(taskService) private ts: any,
  ) {}

  ngOnInit(): void {
    console.log(this.unit.my_role !== 'Student', this.canApplyForExtension, this.inSubmittedState, this.requiresFileUpload);
    console.log(this.task);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.task?.currentValue) {
      this.reapplyTriggers();
    }
  }

  private reapplyTriggers() {
    this.statusLabel = this.task.statusLabel();
    this.statusHelp = this.task.statusHelp();
    this.unit = this.task.unit();
    this.canApplyForExtension = this.task.canApplyForExtension();
    this.inSubmittedState = this.task.inSubmittedState();
    this.requiresFileUpload = this.task.requiresFileUpload();

    this.triggers =  _.map(this.ts.statusKeys, this.ts.statusData);

  };
  public triggerTransition(event: MatSelectChange) {
    console.log(event.value)
    return this.task.triggerTransition(event.value);
  }

  public applyForExtension() {
    return this.ExtensionModal.show(this.task, function() {
      return this.task.refresh();
    });
  }
  
  public updateFilesInSubmission() {
    return this.ts.presentTaskSubmissionModal(this.task, this.task.status, true);
  }
}

