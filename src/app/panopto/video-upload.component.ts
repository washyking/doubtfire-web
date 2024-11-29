// src/app/components/video-upload.component.ts
import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { PanoptoAuthService } from "../api/services/panopto-auth.service";

@Component({
  selector: "app-video-upload",
  template: `
    <div>
      <label for="folderId">Folder ID:</label>
      <input id="folderId" [(ngModel)]="folderId" placeholder="Enter folder ID" />
    </div>
    <input type="file" (change)="onFileSelected($event)" />
    <button [disabled]="!selectedFile || !folderId" (click)="onUpload()">Upload</button>
  `,
  styles: [
    `
      input {
        margin: 10px 0;
      }
      button {
        margin-top: 10px;
      }
    `,
  ],
})
export class VideoUploadComponent {
  selectedFile: File = null;
  folderId: string = ""; // User-provided folder ID
  accessToken: string = null; // Dynamically fetched

  constructor(private http: HttpClient, private authService: PanoptoAuthService) {
    // Subscribe to accessToken updates
    this.authService.getAccessToken().subscribe((token) => {
      this.accessToken = token;
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    if (!this.folderId || !this.selectedFile || !this.accessToken) {
      console.error("Folder ID, file, or access token is missing!");
      return;
    }

    const uploadData = new FormData();
    uploadData.append("file", this.selectedFile, this.selectedFile.name);

    this.http
      .post(
        `${environment.panopto.apiEndpoint}/folders/${this.folderId}/sessions`,
        uploadData,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`, // Dynamically set token
          },
        }
      )
      .subscribe(
        (response) => {
          console.log("Upload successful", response);
        },
        (error) => {
          console.error("Upload failed", error);
        }
      );
  }
}
