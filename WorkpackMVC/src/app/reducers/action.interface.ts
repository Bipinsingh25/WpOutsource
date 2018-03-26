import {Action as NgRXAction} from '@ngrx/store';
export interface Action extends NgRXAction {
    payload?: any;
}