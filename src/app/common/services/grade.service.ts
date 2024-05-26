import {Injectable} from '@angular/core';
import {Project} from 'src/app/api/models/project';

@Injectable({
  providedIn: 'root',
})
export class GradeService {
  allGradeValues = [0, 1, 2, 3, 4];
  gradeValues = [1, 2, 3, 4];

  grades = {
    0: 'Fail',
    1: 'Pass',
    2: 'Credit',
    3: 'Distinction',
    4: 'High Distinction',
  };

  gradeViewData = [
    {value: 0, viewValue: 'Fail'},
    {value: 1, viewValue: 'Pass'},
    {value: 2, viewValue: 'Credit'},
    {value: 3, viewValue: 'Distinction'},
    {value: 4, viewValue: 'High Distinction'},
  ];

  public gradeNumbers = {
    F: 0,
    P: 1,
    C: 2,
    D: 3,
    HD: 4,
  };

  public gradeAcronyms = {
    Fail: 'F',
    Pass: 'P',
    Credit: 'C',
    Distinction: 'D',
    'High Distinction': 'HD',
    0: 'F',
    1: 'P',
    2: 'C',
    3: 'D',
    4: 'HD',
  };

  public gradeColors = {
    // Fail
    0: '#808080',
    F: '#808080',
    // Pass
    1: '#FF0000',
    P: '#FF0000',
    // Credit
    2: '#FF8000',
    C: '#FF8000',
    // Distinction
    3: '#0080FF',
    D: '#0080FF',
    // High Distinction
    4: '#80FF00',
    HD: '#80FF00',
  };

  public gradeFor = (project: Project): string => {
    return this.gradeNumbers[project.targetGrade];
  };
}
