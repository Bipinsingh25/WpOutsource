import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const routes: Routes = [
];

@NgModule({
    declarations: [
        // components
        // LoadingIndicatorComponent,
        // NotificationComponent,
        // pipes
        // KeysPipe,
        // HumanizePipe,
        //SidebarMenuPipe
    ], 
    exports: [
        // components
        // LoadingIndicatorComponent,
        // NotificationComponent,
        // modules
        CommonModule,
        // pipes
        // KeysPipe,
        // HumanizePipe
    ],
    imports: [
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
    ]
})
export class SharedModule { }
