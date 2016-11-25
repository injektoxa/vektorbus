using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using BlaBlaBusMVC.Models;
using BlaBlaBusMVC.ViewModels;
using System.Web.Http;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using Newtonsoft.Json.Linq;
using System;
using Microsoft.Owin.Security.OAuth;

namespace BlaBlaBusMVC.Controllers
{
    [Authorize]
    [Route("api/Account")]
    public class AccountController : ApiController
    {
        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;

        public AccountController()
        {
        }

        public AccountController(ApplicationUserManager userManager, ApplicationSignInManager signInManager )
        {
            UserManager = userManager;
            SignInManager = signInManager;
        }

        public ApplicationSignInManager SignInManager
        {
            get
            {
                return _signInManager ?? Request.GetOwinContext().Get<ApplicationSignInManager>();
            }
            private set 
            { 
                _signInManager = value; 
            }
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        //
        // POST: /Account/Login
        [HttpPost]
        [AllowAnonymous]
        public IHttpActionResult Login(LoginViewModel model, string returnUrl)
        {
            // This doesn't count login failures towards account lockout
            // To enable password failures to trigger account lockout, change to shouldLockout: true
            var result = SignInManager.PasswordSignIn(model.Email, model.Password, model.RememberMe, shouldLockout: false);

            switch (result)
            {
                case SignInStatus.Success:
                    return StatusCode(HttpStatusCode.OK);
                case SignInStatus.LockedOut:
                    return StatusCode(HttpStatusCode.Conflict);
                case SignInStatus.Failure:

                default:
                    return StatusCode(HttpStatusCode.Unauthorized);
            }
        }

        //
        // POST: /Account/Register
        [AllowAnonymous]
        [Route("Register")]
        [HttpPost]
        public IHttpActionResult Register(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
                var result = UserManager.Create(user, model.Password);

                if (!result.Succeeded)
                {
                    return GetErrorResult(result);
                }

                if (result.Succeeded)
                {
                    SignInManager.SignIn(user, isPersistent:false, rememberBrowser:false);

                    return StatusCode(HttpStatusCode.OK);
                }
            }

            // If we got this far, something failed, redisplay form
            return StatusCode(HttpStatusCode.Unauthorized);
        }

        //
        // POST: /Account/LogOff
        [HttpPost]
        public IHttpActionResult LogOff()
        {
            AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);

            return StatusCode(HttpStatusCode.OK);
        }

        private IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                }

                if (ModelState.IsValid)
                {
                    // No ModelState errors are available to send, so just return an empty BadRequest.
                    return BadRequest();
                }

                return BadRequest(ModelState);
            }

            return null;
        }

        private JObject GenerateLocalAccessTokenResponse(string userName)
        {
            var tokenExpiration = TimeSpan.FromDays(1);
            ClaimsIdentity identity = new ClaimsIdentity(OAuthDefaults.AuthenticationType);

            identity.AddClaim(new Claim(ClaimTypes.Name, userName));
            identity.AddClaim(new Claim("role", "user"));

            var props = new AuthenticationProperties()
            {
                IssuedUtc = DateTime.Now,
                ExpiresUtc = DateTime.Now.Add(tokenExpiration),
            };

            var ticket = new AuthenticationTicket(identity, props);
            var accessToken = Startup.OAuthBearerOptions.AccessTokenFormat.Protect(ticket);

            JObject tokenResponse = new JObject(
                                        new JProperty("userName", userName),
                                        new JProperty("access_token", accessToken),
                                        new JProperty("token_type", "bearer"),
                                        new JProperty("expires_in", tokenExpiration.TotalSeconds.ToString()),
                                        new JProperty(".issued", ticket.Properties.IssuedUtc.ToString()),
                                        new JProperty(".expires", ticket.Properties.ExpiresUtc.ToString()));

            return tokenResponse;
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (_userManager != null)
                {
                    _userManager.Dispose();
                    _userManager = null;
                }

                if (_signInManager != null)
                {
                    _signInManager.Dispose();
                    _signInManager = null;
                }
            }

            base.Dispose(disposing);
        }

        #region Helpers
        // Used for XSRF protection when adding external logins
        private const string XsrfKey = "XsrfId";

        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                return Request.GetOwinContext().Authentication;
            }
        }

        #endregion
    }
}