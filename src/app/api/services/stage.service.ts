import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Stage} from 'src/app/api/models/task-definition';
import {catchError, map, retry} from 'rxjs/operators';
import API_URL from 'src/app/config/constants/apiURL';

@Injectable({
  providedIn: 'root',
})
export class StageService {
  private readonly apiBaseUrl = `${API_URL}/feedback_api`;
  private readonly stageEndpoint = '/stages';
  private readonly stagesByIdEndpoint = `/stages/:id:`;

  constructor(private http: HttpClient) {}

  createStage(stage: Stage): Observable<Stage> {
    const endpointUrl = this.apiBaseUrl;
    console.log(`Creating stage ${stage} at ${endpointUrl}`);
    return this.http.put(this.apiBaseUrl, stage).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorText = 'Error creating Stage';
        console.error(`${errorText}:`, error);
        return throwError(`${errorText}.`);
      }),
      map((stage: Stage) => stage),
    );
  }

  getStagesByTaskDefinition(taskDefinitionId: number): Observable<Stage[]> {
    const endpointUrl = `${this.apiBaseUrl}/${taskDefinitionId}`;
    return this.http.get(endpointUrl).pipe(
      retry(3),
      catchError((error: HttpErrorResponse) => {
        const errorText = 'Error fetching stage by task definition';
        console.error(`${errorText}:`, error);
        return throwError(`${errorText}.`);
      }),
      map((stages: Stage[]) => stages),
    );
  }

  updateStage(stage: Stage) {
    const endpointUrl = `${this.stageEndpoint}/${stage.id}`;
    return this.http.put(endpointUrl, stage);
  }

  deleteStage(stageId: number) {
    const endpointUrl = `${this.apiBaseUrl}/${stageId}`;
    const response = this.http.delete(endpointUrl);
    return response;
  }
}
