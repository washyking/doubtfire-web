import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-video-selector',
  templateUrl: './video-selector.component.html',
  styleUrls: ['./video-selector.component.css'],
})
export class VideoSelectorComponent {
  constructor(
    public dialogRef: MatDialogRef<VideoSelectorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { videos: any[] }
  ) {}

  selectVideo(video: any) {
    this.dialogRef.close(video); // Close the dialog and return the selected video
  }

  // Add methods for navigating folders and selecting videos
}
