import { Component, OnInit, Inject, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { taskService, groupService, analyticsService, gradeService } from 'src/app/ajs-upgraded-providers';

@Component({
  selector: 'project-tasks-list',
  templateUrl: './project-tasks-list.component.html',
  styleUrls: ['./project-tasks-list.component.scss'],
})
export class ProjectTasksListComponent implements OnInit {
  @Input() unit: any;
  @Input() project: any;
  // @Input() onSelect: any;
  // @Input() onChange: any;

  constructor(
    @Inject(taskService) private ts: any,
    @Inject(groupService) private grounds: any,
    @Inject(analyticsService) private analytics: any,
    @Inject(gradeService) private grades: any
  ) {}

  ngOnInit() {
    console.log(this.unit,   11111)
  }

  get statusClass(): string {
    return this.ts.statusClass;
  }

  get statusText(): string {
   return this.ts.statusText;
  }

  get hideGroupSetName(): boolean {
    return this.unit.group_sets.length === 0;
  }

  public groupSetName(id): string {
    return this.grounds.groupSetName(id, this.unit);
  }

  public taskDefinition(task): any {
    return this.ts.taskDefinitionFn(this.unit);
  }

  public taskDisabled(task): boolean {
    return this.taskDefinition(task).target_grade > this.project.target_grade;
  };

  public taskText(task) {
    let result = task.definition.abbreviation;
    if (task.definition.is_graded) {
      if (task.grade != null) {
        result += " (" + this.grades.gradeAcronyms[task.grade] + ")";
      } else {
        result += " (?)";
      }
    }
    if (task.definition.max_quality_pts > 0) {
      if (task.quality_pts != null) {
        result += " (" + task.quality_pts + "/" + task.definition.max_quality_pts + ")";
      } else {
        result += " (?/" + task.definition.max_quality_pts + ")";
      }
    }
    return result;
  };



  // ngOnInit() {
  //   this.analytics.event('Student Project View', "Showed Task Button List");
  //   this.statusClass = this.ts.statusClass;
  //   this.statusText = this.ts.statusText;
  //   this.taskDefinition = this.ts.taskDefinitionFn(this.unit);

  //   this.taskDisabled = function(task) {
  //     return this.taskDefinition(task).target_grade > this.project.target_grade;
  //   };

  //   this.groupSetName = function(id) {
  //     return this.grounds.groupSetName(id, this.unit);
  //   };

  //   this.hideGroupSetName = this.unit.group_sets.length === 0;

  //   this.taskText = function(task) {
  //     let result = task.definition.abbreviation;
  //     if (task.definition.is_graded) {
  //       if (task.grade != null) {
  //         result += " (" + this.grounds.gradeAcronyms[task.grade] + ")";
  //       } else {
  //         result += " (?)";
  //       }
  //     }
  //     if (task.definition.max_quality_pts > 0) {
  //       if (task.quality_pts != null) {
  //         result += " (" + task.quality_pts + "/" + task.definition.max_quality_pts + ")";
  //       } else {
  //         result += " (?/" + task.definition.max_quality_pts + ")";
  //       }
  //     }
  //     return result;
  //   };
  // }
}

// angular.module('doubtfire.tasks.project-tasks-list', []).directive('projectTasksList', function() {
//   return {
//     replace: true,
//     restrict: 'E',
//     templateUrl: 'tasks/project-tasks-list/project-tasks-list.tpl.html',
//     scope: {
//       unit: "=",
//       project: "=",
//       onSelect: "=",
//       inMenu: '@'
//     },
//     controller: function($scope, $modal, taskService, groupService, analyticsService, gradeService) {
//       analyticsService.event('Student Project View', "Showed Task Button List");
//       $scope.statusClass = taskService.statusClass;
//       $scope.statusText = taskService.statusText;
//       $scope.taskDefinition = taskService.taskDefinitionFn($scope.unit);
//       $scope.taskDisabled = function(task) {
//         return $scope.taskDefinition(task).target_grade > $scope.project.target_grade;
//       };
//       $scope.groupSetName = function(id) {
//         return groupService.groupSetName(id, $scope.unit);
//       };
//       $scope.hideGroupSetName = $scope.unit.group_sets.length === 0;
//       return $scope.taskText = function(task) {
//         var result;
//         result = task.definition.abbreviation;
//         if (task.definition.is_graded) {
//           if (task.grade != null) {
//             result += " (" + gradeService.gradeAcronyms[task.grade] + ")";
//           } else {
//             result += " (?)";
//           }
//         }
//         if (task.definition.max_quality_pts > 0) {
//           if (task.quality_pts != null) {
//             result += " (" + task.quality_pts + "/" + task.definition.max_quality_pts + ")";
//           } else {
//             result += " (?/" + task.definition.max_quality_pts + ")";
//           }
//         }
//         return result;
//       };
//     }
//   };
// });
