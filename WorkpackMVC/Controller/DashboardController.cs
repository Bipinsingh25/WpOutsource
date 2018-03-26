using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BusinessLibrary;
using DomainModelLibrary;
using DomainModelLibrary.AutoMapperEntity;
using AutoMapper;
using DataAccessLibrary;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace WorkpackMVC
{
    [Produces("application/json")]
    [Route("api/Dashboard")]
    public class DashboardController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IBLProjectCreationRepository _projectcreationRepository;
        private readonly IBLTaskListRepository _tasklistRepository;
        private readonly IBLDeliverableListRepository _deliverableListRepository;
        private readonly IBLTaskMilestoneTargetDates _taskMilestoneTargetDatesRepository;

    public DashboardController(IBLTaskListRepository tasklist, IBLProjectCreationRepository projectcreation, IBLDeliverableListRepository deliverableList, IBLTaskMilestoneTargetDates taskMilestoneTargetDates, IMapper mapper)
    {
      _mapper = mapper;
      _tasklistRepository = tasklist;
      _projectcreationRepository = projectcreation;
      _deliverableListRepository = deliverableList;
      _taskMilestoneTargetDatesRepository = taskMilestoneTargetDates;
    }
    
    //project dashboard function
    [HttpGet]
    [ActionName("getProjectByUserID")]
    public List<usp_searchUserProject_Result> searchUserProject(Project project, Int32 UserID, int ProjectStatusArchived)
    {
      List<usp_searchUserProject_Result> lst = null;
      try
      {
        lst = _projectcreationRepository.searchUserProject(project, Convert.ToInt32(UserID), Convert.ToInt32(ProjectStatusArchived)).ToList<usp_searchUserProject_Result>();
      }
      catch (Exception e)
      {
        // return e.ToString();
      }
      return lst;
    }
    
    [HttpGet]
    [ActionName("getMilestoneTaskByProjectID")]
    public List<usp_getProjectMilestoneTask_Result> getMilestoneTaskByProjectID(string ProjectID, string CompanyId)
    {
      List<usp_getProjectMilestoneTask_Result> result = null;
      try
      {
       
        result = _tasklistRepository.getMilestoneTaskByProjectID(Convert.ToInt32(ProjectID), Convert.ToInt32(CompanyId));
      }
      catch (Exception ex)
      {
      }

      return result;
    }

    [HttpGet]
    [ActionName("GetPrediccessorTask")]
    public List<GetPrediccessorTask_Result> GetPrediccessorTask(string ProjectId, string TaskID, string TaskTypeId)
    {
      List<GetPrediccessorTask_Result> result = null;
      try
      {
        
        result = _tasklistRepository.GetPrediccessorTask(Convert.ToInt32(ProjectId), Convert.ToInt32(TaskID), Convert.ToInt32(TaskTypeId));
      }
      catch (Exception ex)
      {
      }

      return result;
    }
    //end project dashboard function
                
   //get Deliverable list
    [HttpGet]
    [ActionName("getDeliverableTaskByUserID")]
    public OperationResult getDeliverableTaskByUserID(string UserID, int Deliverablelst, string ProjectStatus)
    {
      OperationResult result = new OperationResult();
      try
      {

        
        List<object> list = new List<object>();     
        List<int> prid = new List<int>();
        var ls = _deliverableListRepository.getDeliverableTaskByUserID(Convert.ToString(UserID), Deliverablelst, Convert.ToInt32(CommonLibrary.TaskStatusID.TaskAssigned));
        prid = _projectcreationRepository.GetAllProjectIDByProjectStatus(ProjectStatus);
        var lst = ls.Where(a => prid.Contains(a.ProjectID)).ToList();
       // HttpContext.Current.Session["Deliverablelst"] = Deliverablelst;
        if (lst.Count() > 0)
        {
          for (int i = 0; i < lst.Count(); i++)
          {
            if (lst[i].TaskProgress == "Untitled")
            {
              lst[i].TaskProgress = " ";
            }

            if (lst[i].ProjectName.Contains("No Project Selected"))
            {
              lst[i].ProjectName = " ";
            }
            if (lst[i].TaskType == "Not Selected")
            {
              lst[i].TaskType = " ";
            }

          }
        }
        //list.Add(lst);
        result.list.Add(lst.ToList<object>());
      }
      catch (Exception ex)
      {
        return result;
      }

      return result;
    }
    
    [HttpGet]
    [ActionName("getDeliverableTaskMilestoneByProjectID")]
    public OperationResult getDeliverableTaskMilestoneByProjectID(string ProjectID, string TaskID)
    {
      OperationResult result = new OperationResult();
      try
      {
        int vTaskId = Convert.ToInt32(TaskID);
        int FileStatusID = Convert.ToInt32(CommonLibrary.FileStatusID.Approved);
        List<object> dtMilestoneTargetDateTable = (from q in _taskMilestoneTargetDatesRepository.getTaskTypeWiseProgressByTaskID(Convert.ToInt32(TaskID), FileStatusID)
                                                   select new
                                                   {
                                                     Acronym = q.ProjectMilestone,
                                                     Weightage = q.PercentWeitage,
                                                     ActualTaskMilestoneTargetDates = Convert.ToDateTime(q.ActualTaskMilestoneTargetDates).ToString("MM/dd/yyyy"),
                                                     PlannedTaskMilestoneTargetDates = Convert.ToDateTime(q.TaskMilestoneTargetDates).ToString("MM/dd/yyyy"),
                                                     PlannedStartDate = Convert.ToDateTime(q.PlannedStartDate).ToString("MM/dd/yyyy"),
                                                     ActualStartDate = Convert.ToDateTime(q.ActualStartDate).ToString("MM/dd/yyyy"),
                                                     ActualEndDate = q.ActualEndDate,
                                                     IsApproved = q.IsApproved,
                                                     CurrentDate = Convert.ToDateTime(q.CurrentDate).ToString("MM/dd/yyyy"),
                                                     UploadedFileCount = q.UploadedFileCount,
                                                     MilestoneUploadedFileCount = q.MileStoneUploadedFileCount,
                                                     Delay = q.Delay,
                                                     DummyText = q.DummyText
                                                   }).ToList<object>();

      
        result.list.Add(dtMilestoneTargetDateTable);
       
      }
      catch (Exception ex)
      {
        return result;
      }

      return result;
    }
    
  }


}
