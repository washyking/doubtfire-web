import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { VideoSelectorComponent } from '../panopto/video-selector.component';

@Component({
  selector: 'app-panopto-video',
  templateUrl: './panopto-video.component.html',
  styleUrls: ['./panopto-video.component.css'],
})
export class PanoptoVideoComponent implements OnInit {
  videos: any[] = [];
  embedCode: string = '';

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  ngOnInit() {
    this.fetchVideos();
  }

  fetchVideos() {
    this.http.get('/api/panopto/fetch-videos?folder_id=my-folder-id').subscribe(
      (response: any) => {
        this.videos = response.videos || [];
      },
      (error) => {
        console.error('Error fetching videos:', error);
      }
    );
  }

  openVideoSelector() {
    const dialogRef = this.dialog.open(VideoSelectorComponent, {
      width: '600px',
      data: { videos: this.videos },
    });

    dialogRef.afterClosed().subscribe((selectedVideo) => {
      if (selectedVideo) {
        this.embedCode = `<iframe src="${selectedVideo.embedUrl}" width="560" height="315" frameborder="0" allowfullscreen></iframe>`;
      }
    });
  }
}
