// src/app/components/video-metadata.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PanoptoAuthService } from '../services/panopto-auth.service';

@Component({
  selector: 'app-video-metadata',
  template: `
    <div *ngIf="metadata">
      <h3>{{ metadata.Name }}</h3>
      <p>Folder: {{ metadata.ParentFolder?.Name || 'N/A' }}</p>
      <p><strong>Embed URL:</strong> <a [href]="metadata.Urls?.EmbedUrl" target="_blank">Embed Video</a></p>
      <p><strong>Folder URL:</strong> <a [href]="metadata.Urls?.FolderUrl" target="_blank">Folder</a></p>
    </div>
  `,
  styles: [
    `
      h3 {
        margin-top: 0;
      }
    `,
  ],
})
export class VideoMetadataComponent implements OnInit {
  @Input() videoId: string;
  metadata: any = null;
  accessToken: string = null;

  constructor(private http: HttpClient, private authService: PanoptoAuthService) {
    this.authService.getAccessToken().subscribe((token) => {
      this.accessToken = token;
    });
  }

  ngOnInit() {
    if (!this.accessToken) {
      console.error('Access token is required to fetch metadata.');
      return;
    }

    this.http
      .get(`${environment.panopto.apiEndpoint}/folders/${this.videoId}`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      })
      .subscribe(
        (response) => {
          this.metadata = response;
        },
        (error) => {
          console.error('Failed to fetch metadata', error);
        }
      );
  }
}
