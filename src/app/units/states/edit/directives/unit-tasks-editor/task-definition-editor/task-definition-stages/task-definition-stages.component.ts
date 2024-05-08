import {Component, Inject, Input, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {TaskDefinition, Stage, StageOption} from 'src/app/api/models/task-definition';
import {Unit} from 'src/app/api/models/unit';
import {StageService} from 'src/app/api/services/stage.service';
import {alertService} from 'src/app/ajs-upgraded-providers';
@Component({
  selector: 'f-task-definition-stages',
  templateUrl: 'task-definition-stages.component.html',
  styleUrls: ['task-definition-stages.component.scss'],
})
export class TaskDefinitionStagesComponent {
  @Input() taskDefinition: TaskDefinition;
  @ViewChild('stageTable', {static: true}) table: MatTable<any>;

  public columns: string[] = ['title', 'preamble', 'options', 'row-actions'];

  constructor(
    @Inject(alertService) private alerts: any,
    private stageService: StageService,
  ) {}

  public get unit(): Unit {
    return this.taskDefinition?.unit;
  }

  public addStage(): void {
    if (this.taskDefinition.hasStages()) {
      const message = `Task Definitiion has ${this.taskDefinition.stages.length} stages`;
      console.warn(message);
      this.alerts.add('danger', message, 6000);
    }
    const newLength = this.taskDefinition.stages.length + 1;
    const newStage: Stage = {
      id: newLength,
      taskDefinitionId: this.taskDefinition.id,
      title: 'Source Code: Structs and Enums',
      preamble: '**Source Code: Structs and Enums**',
      options: [
        [
          'Use of structs and enumerations',
          [
            'Effectively utilises structs and enumerations',
            'Partially addresses use of structs and enums',
            'Needs improvement in use of structs and enums (Resubmit)',
            'Does not address use of structs and enums (Redo)',
          ],
        ],
        [
          'Code Quality',
          [
            'Well-organised code structure',
            'Partially organised code structure',
            'Appropriately commented code',
            'Insufficient comments',
            'Lack of comments',
            'Room for optimisation or clarification',
          ],
        ],
      ],
    };
    this.stageService.createStage(newStage);
    this.taskDefinition.stages.push(newStage);
    const message = `Added stage ${newStage.title} to ${this.taskDefinition.name}`;
    this.alerts.add('success', message);
    // const message = `Warning: adding stages not currently supported. Attempted to add stage to ${this.taskDefinition.name}.`;
    // console.warn(message);
    // this.alerts.add('danger', message, 6000);
    // console.log(`Adding stage to ${this.taskDefinition.name}`);
    this.table.renderRows();
  }

  addFeedbackOption(stage: Stage, optionIndex: number): void {
    const message = `Warning: adding feedback options not currently supported. Attempted to add ${stage} at ${optionIndex}.`;
    console.warn(message);
  }

  addNewCriteria(stage: Stage): void {
    const message = `Warning: adding criteria to stages not currently supported. Attempted to add criteria to ${stage}`;
    this.alerts.add('danger', message, 6000);
    console.warn(message);
  }

  updatePreamble(stage: Stage): void {
    stage.preamble = `**${stage.title}**`;
  }

  public removeStage(stage: Stage): void {
    this.stageService.deleteStage(stage.id).subscribe({
      next: () => this.alerts('success', 'Removed Feedback Stage', 2000),
      error: (message) => this.alerts.add('danger', message, 6000),
    });
  }

  // formatOptionsAsMarkdown(options: string[]): string {
  //   return options.map((option) => `- ${option}`).join('\n');
  // }

  parseMarkdownToList(criterion: StageOption, markdownText: string): void {
    const lines = markdownText.split('\n');
    criterion[1] = lines
      .map((line) => line.trim().replace(/^- /, ''))
      .filter((line) => line !== '');
  }
}
