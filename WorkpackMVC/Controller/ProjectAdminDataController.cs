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
  public class ProjectAdminDataController : Controller
  {
    private readonly IMapper _mapper;
    private readonly IBLProjectsAdminRepository _projectAdminRepository;
    public ProjectAdminDataController(IBLProjectsAdminRepository projectAdminRepository, IMapper mapper)
    {
      _mapper = mapper;
      _projectAdminRepository = projectAdminRepository;
    }

    [HttpGet]
    public IEnumerable<ProjectsAdmin> Get()
    {
      var identity = (ClaimsIdentity)User.Identity;
      string userId = identity.FindFirst("UserId").Value;
      string CompanyId = identity.FindFirst("CompanyId").Value;
      return _projectAdminRepository.GetAllProjectsAdmin();
    }

    [HttpPost]
    public ProjectsAdmin Post([FromBody]ProjectsAdmin projectsAdmin)
    {
      try
      {
        projectsAdmin.EntityState = DomainModelLibrary.EntityState.Added;
        _projectAdminRepository.AddProjectsAdmin(projectsAdmin);
      }
      catch (Exception ex)
      {
        //retrurn ex.Message;
      }
      return projectsAdmin;
    }

    [HttpPut]
    public ProjectsAdmin Put([FromBody]ProjectsAdmin projectsAdmin)
    {
      try
      {
        //projectType.EntityState = DomainModelLibrary.EntityState.Modified;
        //_projectAdminRepository.UpdateProjectType(projectType);
      }
      catch (Exception ex)
      {
        ex.ToString();
      }
      return projectsAdmin;
    }

    //// DELETE api/values/5
    [HttpDelete("{id}")]
    public ProjectsAdmin Delete(int id)
    {
      ProjectsAdmin projectsAdmin = null;
      try
      {
        projectsAdmin = _projectAdminRepository.GetProjectsAdminByID(id);
        projectsAdmin.EntityState = DomainModelLibrary.EntityState.Deleted;
        _projectAdminRepository.RemoveProjectsAdmin(projectsAdmin);
      }
      catch (Exception e)
      {
        // return e.ToString();
      }
      return projectsAdmin;
    }
  }
}
