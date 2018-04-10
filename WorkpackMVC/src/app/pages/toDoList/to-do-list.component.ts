import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ToDoList} from '../../models/toDoList';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as _ from 'lodash';
import {ToDoListService} from '../../services/to-do-list.service';
import {GetToDoListAction} from '../../actions/toDoList.actions';
import {BlockUI, NgBlockUI} from 'ng-block-ui';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {
  toDoList$: Observable<ToDoList[]>;
  @BlockUI('blockUI-list') blockUI: NgBlockUI;
  toDoListData: any;
  constructor(private store: Store<fromRoot.AppState>, private toDoListService: ToDoListService) {
    this.toDoList$ = this.store.select(fromRoot.getToDoList);
    this.blockUI.start('Loading...');
    this.store.dispatch(new GetToDoListAction());
  }

  ngOnInit() {
    this.toDoList$
      .do(() => this.blockUI.start('Loading...'))
      .subscribe(
        data => {
          if (data !== null) {
            this.toDoListData = _.clone(data);
            this.blockUI.stop();
            console.log('this.toDoListData', this.toDoListData);
          }
        }, err => {
          console.log('Error in retrieving data');
        }
      );
  }

}
