// src/app/services/panopto-auth.service.ts
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PanoptoAuthService {
  private accessToken: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private http: HttpClient) {}

  getAuthorizationUrl(): string {
    const params = new HttpParams()
      .set("response_type", "code")
      .set("client_id", environment.panopto.clientId)
      .set("redirect_uri", environment.panopto.redirectUri)
      .set("scope", "openid api videos.read videos.write folders.read folders.write")
      .set("nonce", "12345");
    return `${environment.panopto.authUrl}?${params.toString()}`;
  }

  exchangeCodeForToken(code: string): Observable<any> {
    const body = {
      client_id: environment.panopto.clientId,
      client_secret: environment.panopto.clientSecret,
      redirect_uri: environment.panopto.redirectUri,
      code: code,
      grant_type: "authorization_code",
    };
    return this.http.post(environment.panopto.tokenUrl, body);
  }

  setAccessToken(token: string): void {
    this.accessToken.next(token);
  }

  getAccessToken(): Observable<string> {
    return this.accessToken.asObservable();
  }
}
