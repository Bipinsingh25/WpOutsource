using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BusinessLibrary;
using DomainModelLibrary;
using DomainModelLibrary.AutoMapperEntity;
using DataAccessLibrary;
using AutoMapper;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860
namespace WorkpackMVC
{
    [Route("api/[controller]")]
    public class DesignationDataController : Controller
    {
    private readonly IMapper _mapper;
    private readonly IBLDesignationRepository _designationRepository;
    public DesignationDataController(IBLDesignationRepository designationRepository, IMapper mapper)
    {
      _mapper = mapper;
      _designationRepository = designationRepository;
    }


    //public IEnumerable<string> Get()
    //{
    //  return new string[] { "Abdul", "Nirmal", "Adeel" };
    //}

    public IEnumerable<Designation> Get()
    {
      IEnumerable<Designation> lst= _designationRepository.GetAllDesignations();
      return lst;
    }
    // GET api/values/5
    [HttpGet("{id}")]
    public string GeSingleDesignation(int id)
    {
      return "value";
    }

    //// POST api/values
    [HttpPost]
    public Designation Post([FromBody]Designation designation)
    {
      try
      {
        designation.EntityState = DomainModelLibrary.EntityState.Added;
        designation.DesignationName = designation.DesignationName;
        designation.DesignationCode = designation.DesignationCode;
        _designationRepository.AddDesignation(designation);
      }
      catch (Exception ex)
      {
        //return ex.Message;
      }
      return designation;
    }

    //PUT api/values/5
    [HttpPut]
    public Designation Put([FromBody]Designation designation)
    {
      try
      {
        designation.EntityState = DomainModelLibrary.EntityState.Modified;
        designation.DesignationName = designation.DesignationName;
        designation.DesignationCode = designation.DesignationCode;
        _designationRepository.UpdateDesignation(designation);
      }
      catch (Exception ex)
      {
        ex.ToString();
      }
      return designation;
    }

    //// DELETE api/values/5
    [HttpDelete("{id}")]
    public Designation Delete(int id)
    {
      Designation designation = null;
      try
      {
        designation = _designationRepository.GetDesignationByID(id);
        designation.EntityState = DomainModelLibrary.EntityState.Deleted;
        _designationRepository.RemoveDesignation(designation);
      }
      catch (Exception e)
      {
        // return e.ToString();
      }
      return designation;
    }

  }

}
