import { Component } from '@angular/core';

@Component({
    selector: 'app-layout',
    template: `
        <app-header></app-header>
        <app-main>
            <ng-content></ng-content>
        </app-main>
    `,
    styles: []
})
export class LayoutComponent { }
