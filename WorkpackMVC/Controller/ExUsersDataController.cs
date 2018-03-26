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
  [Route("api/ExUsersData")]
  public class ExUsersDataController : Controller
  {
    private readonly IMapper _mapper;
    private readonly IBLExUsersRepository _exUsersRepository;
    public ExUsersDataController(IBLExUsersRepository exUsersRepository, IMapper mapper)
    {
      _mapper = mapper;
      _exUsersRepository = exUsersRepository;
    }

    [HttpGet]
    public IEnumerable<ExUsers> Get()
    {
      var identity = (ClaimsIdentity)User.Identity;
      string userId = identity.FindFirst("UserId").Value;
      string CompanyId = identity.FindFirst("CompanyId").Value;
      return _exUsersRepository.GetAllExUsers(Convert.ToInt32(CompanyId));
    }

    [HttpPost]
    public ExUsers Post([FromBody]ExUsers exUser)
    {
      try
      {
        exUser.EntityState = DomainModelLibrary.EntityState.Added;
        _exUsersRepository.AddExUsers(exUser);
      }
      catch (Exception ex)
      {
        //retrurn ex.Message;
      }
      return exUser;
    }

    [HttpPut]
    public ExUsers Put([FromBody]ExUsers exUser)
    {
      try
      {
        //projectType.EntityState = DomainModelLibrary.EntityState.Modified;
        //_exUsersRepository.UpdateProjectType(projectType);
      }
      catch (Exception ex)
      {
        ex.ToString();
      }
      return exUser;
    }

    //// DELETE api/values/5
    [HttpDelete("{id}")]
    public ExUsers Delete(int id)
    {
      ExUsers exUser = null;
      try
      {
        exUser = _exUsersRepository.GetExUsersByID(id);
        exUser.EntityState = DomainModelLibrary.EntityState.Deleted;
        _exUsersRepository.RemoveExUsers(exUser);
      }
      catch (Exception e)
      {
        // return e.ToString();
      }
      return exUser;
    }
  }
}
