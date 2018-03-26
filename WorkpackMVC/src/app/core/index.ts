import { HttpService } from './services/http';
import { NgModule } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpHandler } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';

export function httpInterceptor(
    //backend: XHRBackend,
    //defaultOptions: RequestOptions,
) {
    return new HttpService(null);
}

@NgModule({
    declarations: [
    ],
    exports: [
    ],
    imports: [
    ],
    providers: [
    ]
})
export class CoreModule { }

