export class TaskGrid {
  ProjectTaskID: Number;
  ProjectName: String;
  TaskName: String;
  TaskOwner: String;
  DepartmentName: String;
  Type: String;
  left: Number;
  lineMomentTransform: Number;
  RoadmapData: any[];

  constructor() {
    this.ProjectTaskID = null;
    this.ProjectName = '';
    this.TaskName = '';
    this.TaskOwner = '';
    this.Type = '';
    this.DepartmentName = '';
    this.left = 0;
    this.lineMomentTransform = 0;
    this.RoadmapData = [];
  }
}
