import {Component, Input, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {TaskDefinition, Stage} from 'src/app/api/models/task-definition';
import {Unit} from 'src/app/api/models/unit';
@Component({
  selector: 'f-task-definition-stages',
  templateUrl: 'task-definition-stages.component.html',
  styleUrls: ['task-definition-stages.component.scss'],
})
export class TaskDefinitionStagesComponent {
  @Input() taskDefinition: TaskDefinition;
  @ViewChild('stageTable', {static: true}) table: MatTable<any>;

  public columns: string[] = ['title', 'preamble', 'options', 'row-actions'];

  public get unit(): Unit {
    return this.taskDefinition?.unit;
  }

  public addStage(): void {
    console.log(`Adding stage to ${this.taskDefinition.name}`);
    const newLength = this.taskDefinition.stages.length + 1;
    const newStage: Stage = {
      id: newLength,
      taskDefinitionId: this.taskDefinition.id,
      title: `Stage ${newLength}`,
      preamble: `**Stage ${newLength}**`,
      options: [['Criteria', ['Option1', 'Option2']]],
    };
    this.taskDefinition.addStage(newStage);
    this.table.renderRows();
  }

  addFeedbackOption(stage: Stage, optionIndex: number): void {
    // Assuming each option is an array of [string, string[]]
    // Adding a default new feedback option
    stage.options[optionIndex][1].push('New Feedback Option');
  }

  addNewCriteria(stage: Stage): void {
    // Adding a new criteria with an empty feedback options array
    stage.options.push(['New Criteria', ['Initial Feedback']]);
  }

  public removeStage(stage: Stage): void {
    this.taskDefinition.removeStage(stage.id);
  }
}
