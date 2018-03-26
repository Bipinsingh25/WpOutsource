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
  public class RoleDataController : Controller
  {

    private readonly IMapper _mapper;
    private readonly IBLRoleRepository _roleRepository;
    public RoleDataController(IBLRoleRepository roleRepository, IMapper mapper)
    {
      _mapper = mapper;
      _roleRepository = roleRepository;
    }

    public IEnumerable<RoleViewItem> Get()
    {
      List<Role> lt = _roleRepository.GetAllRoles().ToList();
      var RoleVieItemLit = _mapper.Map<List<Role>, List<RoleViewItem>>(lt);
      return RoleVieItemLit;
    }

    //public IEnumerable<string> Get()
    //{
    //  return new string[] { "Abdul", "Nirmal", "Adeel" };
    //}

    // GET api/values/5
    [HttpGet("{id}")]
    public string GeSingleRole(int id)
    {
      return "value";
    }

    //// POST api/values
    [HttpPost]
    public Role Post([FromBody]Role role)
    {
      try
      {
        role.EntityState = DomainModelLibrary.EntityState.Added;

       
        role.CreatedOn = DateTime.Now;

        _roleRepository.AddRole(role);
      }

      catch (Exception ex) {

        //return ex.Message;

      }

      return role;


    }

    //PUT api/values/5
    [HttpPut]
    public Role Put([FromBody]Role role)
    {
      try
      {
        role.EntityState = DomainModelLibrary.EntityState.Modified;
        role.ModifiedOn = DateTime.Now;
        _roleRepository.UpdateRole(role);
      }

      catch (Exception ex)
      {

        ex.ToString();

      }

      return role;
    }

    //// DELETE api/values/5
    [HttpDelete("{id}")]
    public Role Delete(int id)
    {
      Role role = null;
      try
      {
        role = _roleRepository.GetRoleByID(id);
        role.EntityState = DomainModelLibrary.EntityState.Deleted;
        _roleRepository.RemoveRole(role);

      }
      catch (Exception e)
      {
        // return e.ToString();
      }
      return role;
    }

    //[HttpDelete("{id}")]
    //public string DeleteRole(string id)
    //{
    //  //try
    //  //{
    //  //  Role role = _roleRepository.GetRoleByID(id);
    //  //  role.EntityState = DomainModelLibrary.EntityState.Deleted;
    //  //  _roleRepository.RemoveRole(role);

    //  //}
    //  //catch (Exception e)
    //  //{
    //  //  return e.ToString();
    //  //}
    //  return id.ToString();
    //}
  
}


}
