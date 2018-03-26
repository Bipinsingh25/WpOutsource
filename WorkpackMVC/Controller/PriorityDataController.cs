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
    public class PriorityDataController : Controller
    {
    private readonly IMapper _mapper;
    private readonly IBLPriorityRepository _priorityRepository;
    public PriorityDataController(IBLPriorityRepository projectStatusRepository, IMapper mapper)
    {
      _mapper = mapper;
      _priorityRepository = projectStatusRepository;
    }

    [HttpGet]
    public IEnumerable<Priority> Get()
    {
      var identity = (ClaimsIdentity)User.Identity;
      string userId = identity.FindFirst("UserId").Value;
      string CompanyId = identity.FindFirst("CompanyId").Value;
      return _priorityRepository.GetAllPrioritys();
    }

    [HttpPost]
    public Priority Post([FromBody]Priority priority)
    {
      try
      {
        priority.EntityState = DomainModelLibrary.EntityState.Added;
        _priorityRepository.AddPriority(priority);
      }
      catch (Exception ex)
      {
        //retrurn ex.Message;
      }
      return priority;
    }

    [HttpPut]
    public Priority Put([FromBody]Priority priority)
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
      return priority;
    }

    //// DELETE api/values/5
    [HttpDelete("{id}")]
    public Priority Delete(int id)
    {
      Priority priority = null;
      try
      {
        priority = _priorityRepository.GetPriorityByID(id);
        priority.EntityState = DomainModelLibrary.EntityState.Deleted;
        _priorityRepository.RemovePriority(priority);
      }
      catch (Exception e)
      {
        // return e.ToString();
      }
      return priority;
    }
  }
}
