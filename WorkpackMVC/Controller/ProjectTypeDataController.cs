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
  public class ProjectTypeDataController : Controller
  {
    private readonly IMapper _mapper;
    private readonly IBLProjectTypeRepository _projectTypeRepository;
    public ProjectTypeDataController(IBLProjectTypeRepository projectTypeRepository, IMapper mapper)
    {
      _mapper = mapper;
      _projectTypeRepository = projectTypeRepository;
    }

    [HttpGet]
    public IEnumerable<ProjectTypes> Get()
    {
      var identity = (ClaimsIdentity)User.Identity;
      string userId = identity.FindFirst("UserId").Value;
      string CompanyId = identity.FindFirst("CompanyId").Value;
      return _projectTypeRepository.GetAllProjectTypes();
    }

    [HttpPost]
    public ProjectTypes Post([FromBody]ProjectTypes projectType)
    {
      try
      {
        projectType.EntityState = DomainModelLibrary.EntityState.Added;
        _projectTypeRepository.AddProjectType(projectType);
      }
      catch(Exception ex)
      {
        //retrurn ex.Message;
      }
      return projectType;
    }

    [HttpPut]
    public ProjectTypes Put([FromBody]ProjectTypes projectType)
    {
      try
      {
        //projectType.EntityState = DomainModelLibrary.EntityState.Modified;
        //_projectTypeRepository.UpdateProjectType(projectType);
      }
      catch (Exception ex)
      {
        ex.ToString();
      }
      return projectType;
    }

    //// DELETE api/values/5
    [HttpDelete("{id}")]
    public ProjectTypes Delete(int id)
    {
      ProjectTypes projectType = null;
      try
      {
        projectType = _projectTypeRepository.GetProjectTypeByID(id);
        projectType.EntityState = DomainModelLibrary.EntityState.Deleted;
        _projectTypeRepository.RemoveProjectType(projectType);
      }
      catch (Exception e)
      {
        // return e.ToString();
      }
      return projectType;
    }


  }
}
