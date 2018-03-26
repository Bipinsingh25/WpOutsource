using DomainModelLibrary;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WorkpackMVC.Auth
{
  public interface ITokenProvider
  {
    string CreateToken(User user, DateTime expiry);

    // TokenValidationParameters is from Microsoft.IdentityModel.Tokens
    TokenValidationParameters GetValidationParameters();
  }
}
