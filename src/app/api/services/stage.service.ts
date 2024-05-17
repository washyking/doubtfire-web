import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Stage} from 'src/app/api/models/task-definition';
import {catchError, map, retry} from 'rxjs/operators';
import API_URL from 'src/app/config/constants/apiURL';

@Injectable({
  providedIn: 'root',
})
export class StageService {
  private readonly apiBaseUrl = `${API_URL}`;
  private readonly stageEndpoint = `${API_URL}/stages/`;
  private readonly stagesByIdEndpoint = `/stages/:id:`;

  constructor(private http: HttpClient) {}

  createStage(stage: Stage): Observable<any> {
    const endpointUrl = this.stageEndpoint;
    const formData = new FormData();
    formData.append('task_definition_id', stage.taskDefinitionId.toString());
    formData.append('title', stage.title);
    formData.append('order', stage.id.toString());

    return this.http
      .post(endpointUrl, {
        'task_definition_id': stage.taskDefinitionId,
        'title': stage.title,
        'order': stage.order,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const errorText = 'Error creating Stage';
          console.error(`${errorText}:`, error);
          return throwError(`${errorText}.`);
        }),
      );
  }

  getStagesByTaskDefinition(taskDefinitionId: number): Observable<Stage[]> {
    const endpointUrl = `${this.stageEndpoint}?task_definition_id=${taskDefinitionId}`;
    return this.http.get(endpointUrl).pipe(
      retry(3),
      catchError((error: HttpErrorResponse) => {
        const errorText = 'Error fetching stage by task definition';
        console.error(`${errorText}:`, error);
        return throwError(`${errorText}.`);
      }),
      map((stages: any[]) => stages),
    );
  }

  updateStage(stage: Stage) {
    const endpointUrl = `${this.stageEndpoint}/${stage.id}`;
    return this.http.put(endpointUrl, stage);
  }

  deleteStage(stageId: number) {
    const endpointUrl = `${this.stageEndpoint}${stageId}`;
    const response = this.http.delete(endpointUrl);
    return response;
  }
}
