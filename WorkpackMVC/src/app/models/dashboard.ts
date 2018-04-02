export class Dashboard {
  ProjectID: Number;
  ProjectName: String;
  ProjectCode: String;
  StartDate: Date;
  EndDate: Date;
  Clientname: String;
  ClientCode: Number;
  ClientProjectNo: String;
  ProjectStageID: Number;
  StageName: String;
  ProjectLeader: String;

  constructor() {
    this.ProjectID = null;
    this.ProjectName = '';
    this.ProjectCode = '';
    this.StartDate = null;
    this.EndDate = null;
    this.Clientname = '';
    this.ClientCode = null;
    this.ClientProjectNo = '';
    this.ProjectStageID = null;
    this.StageName = '';
    this.ProjectLeader = '';
  }
}
