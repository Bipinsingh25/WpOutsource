export class ToDoList {
  MileStoneID: number;
  PendingFor: string;
  ProjectTaskID: number;
  ProjectName: string;
  TaskName: string;
  Stage: string;
  FileFolderPath: string;
  Delay: number;

  constructor(){
    this.MileStoneID = null;
    this.PendingFor = '';
    this.ProjectTaskID = null;
    this.ProjectName = '';
    this.TaskName = '';
    this.Stage = '';
    this.FileFolderPath = '';
    this.Delay = null;
  }
}
