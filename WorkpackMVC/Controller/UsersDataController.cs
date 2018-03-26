using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BusinessLibrary;
using DomainModelLibrary;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WorkpackMVC
{
  [Authorize]
  [Route("api/[controller]/[action]")]
  public class UsersDataController : Controller
  {
    private readonly IMapper _mapper;
    private readonly IBLUserRepository _userRepository;
    public UsersDataController(IBLUserRepository userRepository, IMapper mapper)
    {
      _mapper = mapper;
      _userRepository = userRepository;
    } 

    // GET: api/values //Test34
    [HttpGet]
    [ActionName("Get")]
    public IEnumerable<usp_getUserList_Result> Get(User user)
    {
      var identity = (ClaimsIdentity)User.Identity;
      string CompanyId = identity.FindFirst("CompanyId").Value;
      user.CompanyId = Convert.ToInt32(CompanyId);
      List<usp_getUserList_Result> ul= _userRepository.GetuserList(user).ToList();
      return ul;
    }

    [HttpGet]
    [ActionName("GetUsersForProjectsAdminAndMembers")]
    public IEnumerable<Object> GetUsersForProjectsAdminAndMembers()
    {
      var identity = (ClaimsIdentity)User.Identity;
      string CompanyId = identity.FindFirst("CompanyId").Value;
      List<DropdownData> ul = _userRepository.GetUsersForProjectsAdminAndMembers(Convert.ToInt32(CompanyId));
      return ul;
    }

    // GET api/values/5
    [HttpGet("{id}")]
    public string Get(int id)
    {
      return "value";
    }

    [HttpGet]
    [ActionName("getUserRoleAssigned")]
    public List<usp_getUserRoleAssigned_Result> getUserRoleAssigned(int id)
    {
      List<usp_getUserRoleAssigned_Result> lst = _userRepository.GetAllRolesByUser(id).ToList();
      return lst;
    }

    //// POST api/values
    [HttpPost]
    [ActionName("Post")]
    public OperationResult Post([FromBody]UserPost userPost)
    {
      var identity = (ClaimsIdentity)User.Identity;
      string CompanyId = identity.FindFirst("CompanyId").Value;
      string UserId = identity.FindFirst("UserId").Value;
      return _userRepository.CreateOrEditUser(userPost.user, userPost.userRole, Convert.ToInt32(CompanyId), Convert.ToInt32(UserId));
    }

    //PUT api/values/5
    [HttpPut]
    [ActionName("Put")]
    public OperationResult Put([FromBody]UserPost userPost)
    {
      var identity = (ClaimsIdentity)User.Identity;
      string CompanyId = identity.FindFirst("CompanyId").Value;
      string UserId = identity.FindFirst("UserId").Value;
      return _userRepository.CreateOrEditUser(userPost.user, userPost.userRole, Convert.ToInt32(CompanyId), Convert.ToInt32(UserId)); ;
    }

    //// DELETE api/values/5
    [HttpDelete("{id}")]
    [ActionName("Delete")]
    public User Delete(int id)
    {
      User user = null;
      try
      { 
        user = _userRepository.GetuserByID(id);
        user.EntityState = DomainModelLibrary.EntityState.Deleted;
        _userRepository.Removeuser(user);
      }
      catch (Exception e)
      {
        // return e.ToString();
      }
      return user;
    }

  }

  public class UserPost
  {
    public User user { get; set; }
    public UserRole[] userRole { get; set; }
    public List<IFormFile> files { get; set; }

  }

}
