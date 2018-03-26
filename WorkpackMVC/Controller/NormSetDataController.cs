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
  [Route("api/NormSetData")]
  public class NormSetDataController : Controller
  {
    private readonly IMapper _mapper;
    private readonly IBLNormSetRepository _normSetRepository;
    public NormSetDataController(IBLNormSetRepository normSetRepository, IMapper mapper)
    {
      _mapper = mapper;
      _normSetRepository = normSetRepository;
    }
    // GET: api/values
    [HttpGet]
    public IEnumerable<NormSet> Get()
    {
      var identity = (ClaimsIdentity)User.Identity;
      string userId = identity.FindFirst("UserId").Value;
      string CompanyId = identity.FindFirst("CompanyId").Value;
      return _normSetRepository.GetAllNormSet(Convert.ToInt32(CompanyId));
    }

    // GET api/values/5
    [HttpGet("{id}")]
    public string GeSingleDepartment(int id)
    {
      return "value";
    }

    //// POST api/values
    [HttpPost]
    public NormSet Post([FromBody]NormSet normSet)
    {
      try
      {
        normSet.EntityState = DomainModelLibrary.EntityState.Added;
        _normSetRepository.AddNormSet(normSet);
      }
      catch (Exception ex)
      {
        //return ex.Message;
      }
      return normSet;
    }

    //PUT api/values/5
    [HttpPut]
    public NormSet Put([FromBody]NormSet normSet)
    {
      try
      {
        normSet.EntityState = DomainModelLibrary.EntityState.Modified;
        _normSetRepository.UpdateNormSet(normSet);
      }
      catch (Exception ex)
      {
        ex.ToString();
      }
      return normSet;
    }

    //// DELETE api/values/5
    [HttpDelete("{id}")]
    public NormSet Delete(int id)
    {
      NormSet normSet = null;
      try
      {
        normSet = _normSetRepository.GetNormSetByID(id);
        normSet.EntityState = DomainModelLibrary.EntityState.Deleted;
        _normSetRepository.RemoveNormSet(normSet);
      }
      catch (Exception e)
      {
        // return e.ToString();
      }
      return normSet;
    }
  }
}
