export class User {
  UserID: number;
  CompanyId: number;
  FirstName: string;
  LastName: string;
  EmailID1: string;
  DepartmentID: number;
  DepartmentName?: string;
  DesignationID: number;
  DesignationName?: string;
  ReportingTo: number;
  isActive?: boolean;
  Status: string;
  ImagePath?: string;
}
