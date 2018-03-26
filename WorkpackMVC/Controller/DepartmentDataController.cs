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

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WorkpackMVC
{
  [Authorize]
  [Route("api/[controller]")]
  public class DepartmentDataController : Controller
  {

    private readonly IMapper _mapper;
    private readonly IBLDepartmentRepository _departmentRepository;
    public DepartmentDataController(IBLDepartmentRepository departmentRepository, IMapper mapper)
    {
      _mapper = mapper;
      _departmentRepository = departmentRepository;
    }
    // GET: api/values
    [HttpGet]
    public IEnumerable<Department> Get()
    {
      var identity = (ClaimsIdentity)User.Identity;
      string userId = identity.FindFirst("UserId").Value;
      string CompanyId = identity.FindFirst("CompanyId").Value;
      return _departmentRepository.GetAllDepartments();
    }

    // GET api/values/5
    [HttpGet("{id}")]
    public string GeSingleDepartment(int id)
    {
      return "value";
    }

    //// POST api/values
    [HttpPost]
    public Department Post([FromBody]Department Department)
    {
      try
      {
        Department.EntityState = DomainModelLibrary.EntityState.Added;
        Department.DepartmentName = Department.DepartmentName;
        Department.DepartmentCode = Department.DepartmentCode;
        _departmentRepository.AddDepartment(Department);
      }
      catch (Exception ex)
      {
        //return ex.Message;
      }
      return Department;
    }

    //PUT api/values/5
    [HttpPut]
    public Department Put([FromBody]Department Department)
    {
      try
      {
        Department.EntityState = DomainModelLibrary.EntityState.Modified;
        Department.DepartmentName = Department.DepartmentName;
        Department.DepartmentCode = Department.DepartmentCode;
        _departmentRepository.UpdateDepartment(Department);
      }
      catch (Exception ex)
      {
        ex.ToString();
      }
      return Department;
    }

    //// DELETE api/values/5
    [HttpDelete("{id}")]
    public Department Delete(int id)
    {
      Department dept = null;
      try
      {
        dept = _departmentRepository.GetDepartmentByID(id);
        dept.EntityState = DomainModelLibrary.EntityState.Deleted;
        _departmentRepository.RemoveDepartment(dept);
      }
      catch (Exception e)
      {
        // return e.ToString();
      }
      return dept;
    }
  }
}
