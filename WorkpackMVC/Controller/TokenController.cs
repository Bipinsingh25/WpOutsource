using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DomainModelLibrary;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using WorkpackMVC.Auth;
using WorkpackMVC.Model;

namespace WorkpackMVC
{

  [Route("api/[controller]")]
  public class TokenController : Controller
  {

    //public TokenController(ITokenProvider tokenProvider) // We'll create this later, don't worry.
    //{
    //  _tokenProvider = tokenProvider;
    //}

    [AllowAnonymous]
    [Route("api/token")]
    [HttpPost]
    public IActionResult Post([FromQuery] string username, [FromQuery] string password)
    {

      if (!ModelState.IsValid) return BadRequest("Token failed to generate");

      var user = (username == "password" && password == "username");

      if (!user) return Unauthorized();

      //Add Claims
      var claims = new[]
      {
                new Claim(JwtRegisteredClaimNames.UniqueName, "data"),
                new Claim(JwtRegisteredClaimNames.Sub, "data"),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

      var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("rlyaKithdrYVl6Z80ODU350md")); //Secret
      var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

      var token = new JwtSecurityToken("me",
          "you",
          claims,
          expires: DateTime.Now.AddMinutes(30),
          signingCredentials: creds);

      return Ok(new JsonWebToken()
      {
        access_token = new JwtSecurityTokenHandler().WriteToken(token),
        expires_in = 600000,
        token_type = "bearer"
      });
    }

    public IActionResult Get([FromQuery] string grant_type, [FromQuery] string username, [FromQuery] string password, [FromQuery] string refresh_token)
    {
      //if (!ModelState.IsValid) return BadRequest("Token failed to generate");

      // Authenticate depending on the grant type.
      User user = GetUserByCredentials(username, password);

      //if (!user) return Unauthorized();

      //Add Claims
      var claims = new[]
      {
                new Claim("UserId", Convert.ToString(user.UserID)),
                new Claim("UserName", Convert.ToString(user.FirstName + " " + user.LastName)),
                new Claim("UserCode", Convert.ToString(user.UserCode)),
                new Claim("CompanyId", Convert.ToString(user.CompanyId)),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

      var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("rlyaKithdrYVl6Z80ODU350md")); //Secret
      var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

      var token = new JwtSecurityToken("workpack",
          "you",
          claims,
          expires: DateTime.Now.AddMinutes(60),
          signingCredentials: creds);

      return Ok(new JsonWebToken()
      {
        access_token = new JwtSecurityTokenHandler().WriteToken(token),
        user = user,
        expires_in = 600000,
        token_type = "bearer"
      });

    }

    private User GetUserByToken(string refreshToken)
    {
      // TODO: Check token against your database.
      if (refreshToken == "test")
        return new User { FirstName = "test" };

      return null;
    }

    private User GetUserByCredentials(string username, string password)
    {
      // TODO: Check username/password against database.

      if (username == "bipinsin@gmail.com" && password == "test@123")
        return new User { UserID = 1, FirstName = username, LastName = "Singh", UserCode = "bipSin", CompanyId = 1 };

      return new User { UserID = 1, FirstName = username, LastName = "Singh", UserCode = "bipSin", CompanyId = 1 };
    }

    private string GenerateRefreshToken(User user)
    {
      // TODO: Create and persist a refresh token.
      return "test";
    }
  }
}
