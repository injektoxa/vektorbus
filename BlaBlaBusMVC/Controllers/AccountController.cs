using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using BlaBlaBusMVC.Models;
using BlaBlaBusMVC.ViewModels;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System.Net;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;

namespace BlaBlaBusMVC.Controllers
{
    public class AccountController : ApiController
    {
        private ApplicationDbContext db;
        private ApplicationUserManager userManager;

        public AccountController()
        {
            db = new ApplicationDbContext();
        }

        public AccountController(ApplicationUserManager userManager)
        {
            db = new ApplicationDbContext();
            UserManager = userManager;
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return userManager ?? HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                userManager = value;
            }
        }

        // POST: api/Account/Register
        [HttpPost]
        public IHttpActionResult Register(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
                var result = UserManager.Create(user, model.Password);

                if (!result.Succeeded)
                {
                    var errorResult = GetErrorResult(result);
                    return errorResult;
                }

                return StatusCode(HttpStatusCode.OK);
            }

            // If we got this far, something failed, redisplay form
            return BadRequest(ModelState);
        }

        [HttpPut]
        public IHttpActionResult ManageAccount(ApplicationUserViewModel model)
        {
            var id = this.User.Identity.GetUserId();
            var currentUser = UserManager.FindByName(this.User.Identity.GetUserName());

            currentUser.Email = model.Email;
            currentUser.UserName = model.Name;

            var result = this.UserManager.Update(currentUser);

            if (!result.Succeeded)
            {
                var errorResult = GetErrorResult(result);
                return errorResult;
            }

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
                    foreach (var error in result.Errors)
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

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (userManager != null)
                {
                    userManager.Dispose();
                    userManager = null;
                }
            }

            base.Dispose(disposing);
        }
    }
}