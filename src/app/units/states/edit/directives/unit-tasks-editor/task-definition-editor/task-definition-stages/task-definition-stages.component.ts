import {Component, Input, ViewChild} from '@angular/core';
import {MatTable} from '@angular/material/table';
import {TaskDefinition} from 'src/app/api/models/task-definition';
import {Unit} from 'src/app/api/models/unit';
import {Stage} from 'src/app/api/models/task-definition';
@Component({
  selector: 'f-task-definition-stages',
  templateUrl: 'task-definition-stages.component.html',
  styleUrls: ['task-definition-stages.component.scss'],
})
export class TaskDefinitionStagesComponent {
  @Input() public taskDefinition: TaskDefinition;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @ViewChild('stageTable', {static: true}) table: MatTable<any>;

  public columns: string[] = ['title', 'preamble', 'options', 'row-actions'];

  public get unit(): Unit {
    return this.taskDefinition?.unit;
  }

  public addStage() {
    // check if the stages proprty exists in the taskDefinition object

    if (!('stages' in this.taskDefinition)) {
      // cannot add a stage if the stages property does not exist
      console.error('Cannot add a stage if the stages property does not exist');
      // exit the function
      return;
    }

    const newLength = this.taskDefinition.stages.length + 1;
    this.taskDefinition.stages.push({
      id: newLength,
      taskDefinitionId: this.taskDefinition.id,
      title: `Stage ${newLength}`,
      preamble: '',
      options: [],
    });
    this.table.renderRows();
  }

  public removeStage(stage: Stage) {
    this.taskDefinition.stages = this.taskDefinition.stages.filter(
      (aStage) => aStage.id != stage.id,
    );
  }
}
