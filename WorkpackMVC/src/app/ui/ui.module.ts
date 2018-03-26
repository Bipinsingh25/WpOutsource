import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { MainComponent } from './layout/main/main.component';
import { SidebarMenuPipe } from "../pipes/sidebar/sidebarMenu.pipe";

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        LayoutComponent,
        HeaderComponent,
        SidebarComponent,
        MainComponent,
        SidebarMenuPipe
    ],
    exports: [
        LayoutComponent,
    ]
})
export class UiModule { }
