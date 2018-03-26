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
    [Route("api/ProjectData")]
    public class ProjectDataController : Controller
    {
    private readonly IMapper _mapper;
    private readonly IBLProjectCreationRepository _projectsRepository;
    public ProjectDataController(IBLProjectCreationRepository projectsRepository, IMapper mapper)
    {
      _mapper = mapper;
      _projectsRepository = projectsRepository;
    }

    [HttpGet]
    public IEnumerable<Project> Get()
    {
      var identity = (ClaimsIdentity)User.Identity;
      string userId = identity.FindFirst("UserId").Value;
      string CompanyId = identity.FindFirst("CompanyId").Value;
      return _projectsRepository.GetAllProject(Convert.ToInt32(CompanyId));
    }

    [HttpPost]
    public Project Post([FromBody]Project projects)
    {
      try
      {
        projects.EntityState = DomainModelLibrary.EntityState.Added;
        _projectsRepository.AddProject(projects);
      }
      catch (Exception ex)
      {
        //retrurn ex.Message;
      }
      return projects;
    }

    [HttpPut]
    public Project Put([FromBody]Project projects)
    {
      try
      {
        //projectType.EntityState = DomainModelLibrary.EntityState.Modified;
        //_projectsRepository.UpdateProjectType(projectType);
      }
      catch (Exception ex)
      {
        ex.ToString();
      }
      return projects;
    }

    //// DELETE api/values/5
    [HttpDelete("{id}")]
    public Project Delete(int id)
    {
      Project projects = null;
      try
      {
        projects = _projectsRepository.GetProjectByID(id);
        projects.EntityState = DomainModelLibrary.EntityState.Deleted;
        _projectsRepository.RemoveProject(projects);
      }
      catch (Exception e)
      {
        // return e.ToString();
      }
      return projects;
    }
  }
}
