import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";


import "dhtmlx-gantt";
import 'dhtmlx-gantt/codebase/ext/dhtmlxgantt_critical_path';

import 'dhtmlx-gantt/codebase/ext/dhtmlxgantt_auto_scheduling';

import {} from "@types/dhtmlxgantt";
import {TaskService} from '../../services/task.service';
import {LinkService} from '../../services/link.service';
import {Link} from '../../models/link';
import {Task} from '../../models/task';
import {Observable} from 'rxjs/Observable';
import {GanttService} from '../../services/gantt.service';

@Component({
  selector: "gantt",
  styles: [
      `
      :host {
        display: block;
        height: 600px;
        position: relative;
        width: 100%;
      }
    `],
  providers: [TaskService, LinkService],
  template: `<label><input type="radio" name="scale" value="day" (change)="radioButtonCheck($event)"/>Day
    scale</label>
  <label><input type="radio" name="scale" value="week" (change)="radioButtonCheck($event)"/>Week scale</label>
  <label><input type="radio" name="scale" value="month" (change)="radioButtonCheck($event)"/>Month scale</label>
  <label><input type="radio" name="scale" value="year" checked (change)="radioButtonCheck($event)"/>Year scale</label>
  <div #gantt_here style='width: 100%; height: 100%;'></div>`
})
export class GanttComponent implements OnInit {
  @ViewChild("gantt_here") ganttContainer: ElementRef;
  tasksData = {
    data: [
      {id: 1, text: "Project #1", start_date: "01-04-2013", duration: 18, type: "project"},
      {id: 2, text: "Task #1", start_date: "02-04-2013", duration: 8, parent: 1},
      {id: 3, text: "Task #2", start_date: "02-04-2013", duration: 0, parent: 1, type: "milestone"},
      {id: 4, text: "Task #3", start_date: "13-04-2013", duration: 8, parent: 1}
    ],
    links: [
      {id: 1, source: 1, target: 2, type: "1"},
      {id: 2, source: 2, target: 3, type: "0"}
    ]
  };

  constructor(private taskService: TaskService, private linkService: LinkService, private ganttService: GanttService) {
    console.log('in gantt component');
  }

  ngOnInit() {
    console.log('in ng oninit');
    gantt.config.xml_date = "%m/%d/%Y";
    this.setScaleConfig("year");
    gantt.config.highlight_critical_path = true;
    gantt.config.auto_scheduling = true;
    /*gantt.config.lightbox.sections = [
      {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
      {name: "type", type: "typeselect", map_to: "type"},
      {name: "time", type: "duration", map_to: "auto"}
    ];*/
    gantt.init(this.ganttContainer.nativeElement);
    gantt.parse(this.tasksData);
    console.log('gantt', gantt);
    gantt.isCriticalTask(gantt.getTask(3));// ->'false'
    gantt.isCriticalTask(gantt.getTask(4));// ->'true'
    /*this.ganttService.getChartData().subscribe(data => {
      console.log('data', data);
      if (data) {
        this.tasksData = data;
        gantt.parse(this.tasksData);
        this.tasksData.data.forEach(task => {
          gantt.isCriticalTask(gantt.getTask(task.id));
        });

        this.tasksData.links.forEach(link => {
          gantt.isCriticalLink(gantt.getLink(link.id));
        });
      }
    }, err => {
      console.log('error in gantt get chart data', err);
    });*/
    gantt.attachEvent("onAfterTaskAdd", (id, item) => {
      console.log('onAfterTaskAdd');
      this.taskService.insert(this.serializeTask(item, true))
        .subscribe((response) => {
          console.log('response', response);
          if (response.id != id) {
            gantt.changeTaskId(id, response.id);
          }
        });
    });

    gantt.attachEvent("onAfterTaskUpdate", (id, item) => {
      console.log('onAfterTaskUpdate', id, item);
      this.taskService.update(this.serializeTask(item));
    });

    gantt.attachEvent("onAfterTaskDelete", (id) => {
      console.log('onAfterTaskDelete', id);
      this.taskService.remove(id);
    });

    gantt.attachEvent("onAfterLinkAdd", (id, item) => {
      console.log('onAfterLinkAdd', id, item);
      this.linkService.insert(this.serializeLink(item, true))
        .subscribe((response) => {
          if (response.id != id) {
            gantt.changeLinkId(id, response.id);
          }
        });
    });

    gantt.attachEvent("onAfterLinkUpdate", (id, item) => {
      console.log('onAfterLinkUpdate', id, item);
      this.linkService.update(this.serializeLink(item));
    });

    gantt.attachEvent("onAfterLinkDelete", (id) => {
      this.linkService.remove(id);
    });
  }

  private setScaleConfig(level) {
    switch (level) {
      case "day":
        gantt.config.scale_unit = "day";
        gantt.config.step = 1;
        gantt.config.date_scale = "%d %M";
        gantt.templates.date_scale = null;

        gantt.config.scale_height = 27;

        gantt.config.subscales = [];
        break;
      case "week":
        var weekScaleTemplate = function (date) {
          var dateToStr = gantt.date.date_to_str("%d %M");
          var endDate = gantt.date.add(gantt.date.add(date, 1, "week"), -1, "day");
          return dateToStr(date) + " - " + dateToStr(endDate);
        };

        gantt.config.scale_unit = "week";
        gantt.config.step = 1;
        gantt.templates.date_scale = weekScaleTemplate;

        gantt.config.scale_height = 50;

        gantt.config.subscales = [
          {unit: "day", step: 1, date: "%D"}
        ];
        break;
      case "month":
        gantt.config.scale_unit = "month";
        gantt.config.date_scale = "%F, %Y";
        gantt.templates.date_scale = null;

        gantt.config.scale_height = 50;

        gantt.config.subscales = [
          {unit: "day", step: 1, date: "%j, %D"}
        ];

        break;
      case "year":
        gantt.config.scale_unit = "year";
        gantt.config.step = 1;
        gantt.config.date_scale = "%Y";
        gantt.templates.date_scale = null;

        gantt.config.min_column_width = 50;
        gantt.config.scale_height = 90;

        gantt.config.subscales = [
          {unit: "month", step: 1, date: "%M"}
        ];
        break;
    }
  }

  private serializeTask(data: any, insert: boolean = false): Task {
    return this.serializeItem(data, insert) as Task;
  }

  private serializeLink(data: any, insert: boolean = false): Link {
    return this.serializeItem(data, insert) as Link;
  }

  private serializeItem(data: any, insert: boolean): any {
    var result = {};

    for (let i in data) {
      if (i.charAt(0) == "$" || i.charAt(0) == "_") continue;
      if (insert && i == "id") continue;
      if (data[i] instanceof Date) {
        result[i] = gantt.templates.xml_format(data[i]);
      }
      else {
        result[i] = data[i];
      }
    }
    return result;
  }

  radioButtonCheck(event) {
    console.log('event', event);
    this.setScaleConfig(event.target.value);
    gantt.render();
  }
}
