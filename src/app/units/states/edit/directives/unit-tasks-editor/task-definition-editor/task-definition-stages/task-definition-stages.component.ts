import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MatTable} from '@angular/material/table';
import {TaskDefinition, Stage} from 'src/app/api/models/task-definition';
import {Unit} from 'src/app/api/models/unit';
import {StageService} from 'src/app/api/services/stage.service';
import {alertService} from 'src/app/ajs-upgraded-providers';
@Component({
  selector: 'f-task-definition-stages',
  templateUrl: 'task-definition-stages.component.html',
  styleUrls: ['task-definition-stages.component.scss'],
})
export class TaskDefinitionStagesComponent implements OnInit {
  @Input() taskDefinition: TaskDefinition;
  @ViewChild('stageTable', {static: true}) table: MatTable<any>;

  public columns: string[] = ['title', 'order', 'row-actions'];
  public stages: Stage[] = [];
  private successAlertTime: number = 2000;
  private dangerAlertTime: number = 6000;
  private warningAlertTime: number = 6000;

  constructor(
    @Inject(alertService) private alerts: any,
    private stageService: StageService,
  ) {}

  ngOnInit(): void {
    this.loadStages();
  }

  public get unit(): Unit {
    return this.taskDefinition?.unit;
  }

  private loadStages(): void {
    if (this.taskDefinition?.id) {
      this.stageService.getStagesByTaskDefinition(this.taskDefinition.id).subscribe(
        (response) => {
          this.stages = response;
          this.sortStages();
          this.table.renderRows();
        },
        (error) => {
          this.alerts.add(
            'danger',
            `Failed to fetch stages for task definition ${this.taskDefinition.id}. ${error}`,
            this.dangerAlertTime,
          );
        },
      );
    }
  }

  private sortStages(): void {
    this.stages.sort((a, b) => a.order - b.order);
    this.updateStageOrder();
  }

  private updateStageOrder(movedStage: Stage = null): void {
    this.stages.forEach((stage, index) => {
      stage.order = index + 1;
      this.updateStage(stage, stage === movedStage); // Only show alert for the moved stage
    });
  }

  public addStage(): void {
    const newLength = this.stages.length + 1;
    const newStage: Stage = {
      id: newLength,
      taskDefinitionId: this.taskDefinition.id,
      title: 'Enter Stage Description',
      order: newLength,
    };

    this.stageService.createStage(newStage).subscribe(
      (response) => {
        this.stages.push(response);
        this.sortStages();
        this.table.renderRows();

        const message = `Added stage ${response.title} to ${this.taskDefinition.name}`;
        this.alerts.add('success', message, this.successAlertTime);
      },
      (error) => {
        this.alerts.add('danger', `Failed to create stage. ${error}`, this.dangerAlertTime);
      },
    );
  }

  public removeStage(stage: Stage): void {
    this.stageService.deleteStage(stage.id).subscribe({
      next: () => {
        this.stages = this.stages.filter((s) => s.id !== stage.id);
        this.sortStages();
        this.alerts.add('success', 'Removed Feedback Stage', this.successAlertTime);
      },
      error: (message) => this.alerts.add('danger', message, this.dangerAlertTime),
    });
  }

  public updateStage(stage: Stage, showAlert: boolean = true): void {
    this.stageService.updateStage(stage).subscribe(
      (response: Stage) => {
        if (showAlert) {
          const message = `Updated stage ${response.title}`;
          this.alerts.add('success', message, this.successAlertTime);
        }
      },
      (error) => {
        this.alerts.add('danger', `Failed to update stage. ${error}`, this.dangerAlertTime);
      },
    );
  }

  public moveStageUp(index: number): void {
    if (index > 0) {
      [this.stages[index], this.stages[index - 1]] = [this.stages[index - 1], this.stages[index]];
      this.updateStageOrder(this.stages[index - 1]); // Pass the correct stage
      this.table.renderRows();
    }
  }

  public moveStageDown(index: number): void {
    if (index < this.stages.length - 1) {
      [this.stages[index], this.stages[index + 1]] = [this.stages[index + 1], this.stages[index]];
      this.updateStageOrder(this.stages[index + 1]); // Pass the correct stage
      this.table.renderRows();
    }
  }
}
