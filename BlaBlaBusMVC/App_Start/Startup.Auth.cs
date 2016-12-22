using System;
using Microsoft.AspNet.Identity;
using Microsoft.Owin;
using Owin;
using BlaBlaBusMVC.Models;
using Microsoft.Owin.Security.OAuth;
using BlaBlaBusMVC.Helpers;

namespace BlaBlaBusMVC
{
    public partial class Startup
    {
        public static OAuthBearerAuthenticationOptions OAuthBearerOptions { get; private set; }

        // For more information on configuring authentication, please visit http://go.microsoft.com/fwlink/?LinkId=301864
        public void ConfigureAuth(IAppBuilder app)
        {
            // Configure the db context, user manager and signin manager to use a single instance per request
            app.CreatePerOwinContext(ApplicationDbContext.Create);
            app.CreatePerOwinContext<ApplicationUserManager>(ApplicationUserManager.Create);
            app.CreatePerOwinContext<ApplicationSignInManager>(ApplicationSignInManager.Create);
        }

        public void ConfigureOAuth(IAppBuilder app)
        {
            app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);
            OAuthBearerOptions = new OAuthBearerAuthenticationOptions();

            var oauthServerOptions = new OAuthAuthorizationServerOptions()
            {
                AllowInsecureHttp = true,
                TokenEndpointPath = new PathString("/token"),
                AccessTokenExpireTimeSpan = TimeSpan.FromMinutes(30),
                Provider = new ApplicationOAuthProvider(),
            };

            // Token Generation
            app.UseOAuthAuthorizationServer(oauthServerOptions);
            app.UseOAuthBearerAuthentication(OAuthBearerOptions);
        }
    }
}