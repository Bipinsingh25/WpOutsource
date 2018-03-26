using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using System.IO;
using BusinessLibrary;
using DataAccessLibrary;
using AutoMapper;
using Newtonsoft.Json.Serialization;
using WorkpackMVC.Auth;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Workpack
{
  public class Startup
  {
    public Startup(IHostingEnvironment env)
    {
      var builder = new ConfigurationBuilder()
          .SetBasePath(env.ContentRootPath)
          .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
          .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
          .AddEnvironmentVariables();
      Configuration = builder.Build();
    }

    public IConfigurationRoot Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {

      services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
               .AddJwtBearer(cfg =>
               {
                 cfg.RequireHttpsMetadata = false;
                 cfg.SaveToken = true;

                 cfg.TokenValidationParameters = new TokenValidationParameters()
                 {
                   ValidIssuer = "workpack",
                   ValidAudience = "you",
                   IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("rlyaKithdrYVl6Z80ODU350md")) //Secret
                 };

               });

      //var tokenProvider = new RsaJwtTokenProvider("issuer", "audience", "mykeyname");
      //services.AddSingleton<ITokenProvider>(tokenProvider);
      //services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
      //    .AddJwtBearer(options =>
      //    {
      //      options.RequireHttpsMetadata = false;
      //      options.TokenValidationParameters = tokenProvider.GetValidationParameters();
      //    });
      //// This is for the [Authorize] attributes.
      //services.AddAuthorization(auth =>
      //{
      //  auth.DefaultPolicy = new AuthorizationPolicyBuilder()
      //      .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
      //      .RequireAuthenticatedUser()
      //      .Build();
      //});



      // Add framework services.
      // Add framework services.
      services.AddDbContextPool<WorkpackDBContext>(options =>
              options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

      // Add framework services.
      services.AddMvc().AddJsonOptions(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver()); ;
      services.AddAutoMapper();
      services.AddScoped<ITest, Test>();
      services.AddScoped(typeof(IGenericDataRepository<>), typeof(GenericDataRepository<>));
      services.AddScoped<IBLAcceptanceClassRepository, BLAcceptanceClassRepository>();
      services.AddScoped<IBLActivityLogRepository, BLActivityLogRepository>();
      services.AddScoped<IBLCurrencyRepository, BLCurrencyRepository>();
      services.AddScoped<IBLCompanyRepository, BLCompanyRepository>();
      services.AddScoped<IBLConfigFileRepository, BLConfigFileRepository>();
      services.AddScoped<IBLDesignationRepository, BLDesignationRepository>();
      services.AddScoped<IBLDepartmentRepository, BLDepartmentRepository>();
      services.AddScoped<IBLEmailTemplateRepository, BLEmailTemplateRepository>();
      services.AddScoped<IBLEstimationTaskDetailRepository, BLEstimationTaskDetailRepository>();
      services.AddScoped<IBLExUsersRepository, BLExUsersRepository>();
      services.AddScoped<IBLNormSetRepository, BLNormSetRepository>();
      services.AddScoped<IBLPriorityRepository, BLPriorityRepository>();
      services.AddScoped<IBLProjectsAdminRepository, BLProjectsAdminRepository>();
      services.AddScoped<IBLProjectCreationRepository, BLProjectCreationRepository>();
      services.AddScoped<IBLProjectStatusRepository, BLProjectStatusRepository>();
      services.AddScoped<IBLProjectTypeRepository, BLProjectTypeRepository>();
      services.AddScoped<IBLRoleRepository, BLRoleRepository>();
      services.AddScoped<IBLSimilarProjectRepository, BLSimilarProjectRepository>();
      services.AddScoped<IBLUserRepository, BLUserRepository>();


    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
    {
      app.UseAuthentication();

      //loggerFactory.AddConsole(Configuration.GetSection("Logging"));
      //loggerFactory.AddDebug();

      //if (env.IsDevelopment())
      //{
      //  app.UseDeveloperExceptionPage();
      //  app.UseBrowserLink();
      //}
      //else
      //{
      //  app.UseExceptionHandler("/Home/Error");
      //}

      //app.UseStaticFiles();

      //app.UseMvc(routes =>
      //{
      //  routes.MapRoute(
      //      name: "default",
      //      template: "api/{controller=Home}/{action=Index}/{id?}");
      //});

      app.Use(async (context, next) =>
      {
        await next();
        if (context.Response.StatusCode == 404 &&
           !Path.HasExtension(context.Request.Path.Value) &&
           !context.Request.Path.Value.StartsWith("/api/"))
        {
          context.Request.Path = "/index.html";
          await next();
        }
      });

      app.UseMvcWithDefaultRoute();

      app.UseDefaultFiles();
      app.UseStaticFiles();


    }
  }
}
