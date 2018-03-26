import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { ToasterModule } from 'angular2-toaster';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BlockUIModule } from 'ng-block-ui';

// Components
import { AppComponent } from './app.component';

// Routes
import { routes } from './app.routes';

// Modules
import { developmentReducer, productionReducer } from './reducers/index';
import { ServiceModule } from './services/index';
import { AppEffectsModule } from './effects/index';
import { UiModule } from './ui/ui.module';
import { Messages } from "./models/AppMessages";
import { TokenInterceptor } from './../auth/token.interceptor';

import { CanActivateViaAuthGuard } from './guard/auth.guard';


// adding rx operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/of';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        StoreModule.forRoot(productionReducer),
        StoreDevtoolsModule.instrument({
            maxAge: 25, //  Retains last 25 states
        }),
        RouterModule.forRoot(routes),
        ToasterModule,
        ServiceModule,
        AppEffectsModule,
        HttpClientModule,
        UiModule,
        BlockUIModule
    ],
    providers: [
      CanActivateViaAuthGuard,
      Messages,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
      }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
