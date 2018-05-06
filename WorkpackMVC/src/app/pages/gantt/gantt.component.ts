import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";


import "dhtmlx-gantt";
import {} from "@types/dhtmlxgantt";
import {TaskService} from '../../services/task.service';
import {LinkService} from '../../services/link.service';
import {Link} from '../../models/link';
import {Task} from '../../models/task';
import {Observable} from 'rxjs/Observable';

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
  template: "<div #gantt_here style='width: 100%; height: 100%;'></div>",
})
export class GanttComponent implements OnInit {
  @ViewChild("gantt_here") ganttContainer: ElementRef;
  tasksData = {
    data:[
      {id:1, text:"Project #1", start_date:"01-04-2013", duration:18},
      {id:2, text:"Task #1", start_date:"02-04-2013", duration:8, parent:1, progress: 0.6},
      {id:3, text:"Task #2", start_date:"11-04-2013", duration:8, parent:1, progress: 0.4}
    ],
    links :[
      {id: 1, source: 2, target: 3, type: "0"}
    ]
  };

  constructor(private taskService: TaskService, private linkService: LinkService) {
  }

  ngOnInit() {
    gantt.config.xml_date = "%Y-%m-%d %H:%i";

    gantt.init(this.ganttContainer.nativeElement);
    gantt.parse(this.tasksData);
    gantt.attachEvent("onAfterTaskAdd", (id, item) => {
      console.log('onAfterTaskAdd');
      this.taskService.insert(this.serializeTask(item, true))
        .subscribe((response) => {
          console.log('response',response);
          if (response.id != id) {
            gantt.changeTaskId(id, response.id);
          }
        });
    });

    gantt.attachEvent("onAfterTaskUpdate", (id, item) => {
      console.log('onAfterTaskUpdate');
      this.taskService.update(this.serializeTask(item));
    });

    gantt.attachEvent("onAfterTaskDelete", (id) => {
      this.taskService.remove(id);
    });

    gantt.attachEvent("onAfterLinkAdd", (id, item) => {
      console.log('onAfterLinkAdd');
      this.linkService.insert(this.serializeLink(item, true))
        .subscribe((response) => {
          if (response.id != id) {
            gantt.changeLinkId(id, response.id);
          }
        });
    });

    gantt.attachEvent("onAfterLinkUpdate", (id, item) => {
      console.log('onAfterLinkUpdate');
      this.linkService.update(this.serializeLink(item));
    });

    gantt.attachEvent("onAfterLinkDelete", (id) => {
      this.linkService.remove(id);
    });

    /*Observable.forkJoin([this.taskService.get(), this.linkService.get()])
      .subscribe(([data, links]) => {
        gantt.parse({data, links});
      });*/
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
}
