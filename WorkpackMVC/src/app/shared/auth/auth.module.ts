import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { LoginComponent } from './login/login.component';


import { routing } from './auth.routing';
import { Routes, RouterModule } from '@angular/router';

@NgModule({
    imports: [
        routing,
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ],
    declarations: [
        LoginComponent
    ]
})
export class AuthModule {}
