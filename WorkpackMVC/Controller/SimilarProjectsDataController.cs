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
  public class SimilarProjectsDataController : Controller
  {
    private readonly IMapper _mapper;
    private readonly IBLSimilarProjectRepository _similarProjectsRepository;
    public SimilarProjectsDataController(IBLSimilarProjectRepository similarProjectsRepository, IMapper mapper)
    {
      _mapper = mapper;
      _similarProjectsRepository = similarProjectsRepository;
    }

    [HttpGet]
    public IEnumerable<SimilarProject> Get()
    {
      var identity = (ClaimsIdentity)User.Identity;
      string userId = identity.FindFirst("UserId").Value;
      string CompanyId = identity.FindFirst("CompanyId").Value;
      return _similarProjectsRepository.GetAllSimilarProject(Convert.ToInt32(CompanyId));
    }

    [HttpPost]
    public SimilarProject Post([FromBody]SimilarProject similarProject)
    {
      try
      {
        similarProject.EntityState = DomainModelLibrary.EntityState.Added;
        _similarProjectsRepository.AddSimilarProject(similarProject);
      }
      catch (Exception ex)
      {
        //retrurn ex.Message;
      }
      return similarProject;
    }

    [HttpPut]
    public SimilarProject Put([FromBody]SimilarProject similarProject)
    {
      try
      {
        //projectType.EntityState = DomainModelLibrary.EntityState.Modified;
        //_similarProjectsRepository.UpdateProjectType(projectType);
      }
      catch (Exception ex)
      {
        ex.ToString();
      }
      return similarProject;
    }

    //// DELETE api/values/5
    [HttpDelete("{id}")]
    public SimilarProject Delete(int id)
    {
      SimilarProject similarProject = null;
      try
      {
        similarProject = _similarProjectsRepository.GetSimilarProjectByID(id);
        similarProject.EntityState = DomainModelLibrary.EntityState.Deleted;
        _similarProjectsRepository.RemoveSimilarProject(similarProject);
      }
      catch (Exception e)
      {
        // return e.ToString();
      }
      return similarProject;
    }
  }
}
