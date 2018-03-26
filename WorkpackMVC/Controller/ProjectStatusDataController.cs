using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using BusinessLibrary;
using DomainModelLibrary;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WorkpackMVC
{
  [Route("api/[controller]")]
  public class ProjectStatusDataController : Controller
  {
    private readonly IMapper _mapper;
    private readonly IBLProjectStatusRepository _projectStatusRepository;
    public ProjectStatusDataController(IBLProjectStatusRepository projectStatusRepository, IMapper mapper)
    {
      _mapper = mapper;
      _projectStatusRepository = projectStatusRepository;
    }

    [HttpGet]
    public IEnumerable<ProjectStatu> Get()
    {
      var identity = (ClaimsIdentity)User.Identity;
      string userId = identity.FindFirst("UserId").Value;
      string CompanyId = identity.FindFirst("CompanyId").Value;
      return _projectStatusRepository.GetAllProjectStatus();
    }

    [HttpPost]
    public ProjectStatu Post([FromBody]ProjectStatu projectStatus)
    {
      try
      {
        projectStatus.EntityState = DomainModelLibrary.EntityState.Added;
        _projectStatusRepository.AddProjectStatus(projectStatus);
      }
      catch (Exception ex)
      {
        //retrurn ex.Message;
      }
      return projectStatus;
    }

    [HttpPut]
    public ProjectStatu Put([FromBody]ProjectStatu projectStatus)
    {
      try
      {
        //projectType.EntityState = DomainModelLibrary.EntityState.Modified;
        //_projectStatusRepository.UpdateProjectType(projectType);
      }
      catch (Exception ex)
      {
        ex.ToString();
      }
      return projectStatus;
    }

    //// DELETE api/values/5
    [HttpDelete("{id}")]
    public ProjectStatu Delete(int id)
    {
      ProjectStatu projectStatus = null;
      try
      {
        projectStatus = _projectStatusRepository.GetProjectStatusByID(id);
        projectStatus.EntityState = DomainModelLibrary.EntityState.Deleted;
        _projectStatusRepository.RemoveProjectStatus(projectStatus);
      }
      catch (Exception e)
      {
        // return e.ToString();
      }
      return projectStatus;
    }
  }
}
