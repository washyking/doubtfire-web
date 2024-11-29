// src/app/components/panopto-video.component.ts
import { Component } from "@angular/core";

@Component({
  selector: "app-panopto-video",
  template: `
    <div>
      <label for="embed-code">Embed Code:</label>
      <textarea id="embed-code" [(ngModel)]="embedCode"></textarea>
      <div [innerHTML]="embedCode"></div>
    </div>
  `,
  styles: [
    `
      textarea {
        width: 100%;
        height: 100px;
      }
      div {
        margin-top: 20px;
      }
    `,
  ],
})
export class PanoptoVideoComponent {
  embedCode: string = "";
}
