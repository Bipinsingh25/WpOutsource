import { Component, ViewContainerRef, ChangeDetectionStrategy } from '@angular/core';
import { ToasterModule,ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
    title = 'Workpack';

    constructor() {
    }
}
