﻿using BlaBlaBusMVC.Helpers;
using BlaBlaBusMVC.Models;
using BlaBlaBusMVC.ViewModels;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System.Net;
using System.Web;
using System.Web.Http;

namespace BlaBlaBusMVC.Controllers
{
    public class AccountController : ApiController
    {
        private ApplicationDbContext db;
        private ApplicationUserManager userManager;
        private ApplicationRoleManager roleManager;

        public AccountController()
        {
            db = new ApplicationDbContext();
        }

        public AccountController(ApplicationUserManager userManager, ApplicationRoleManager roleManager)
        {
            db = new ApplicationDbContext();
            UserManager = userManager;
            RoleManager = roleManager;
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

        public ApplicationRoleManager RoleManager
        {
            get
            {
                return roleManager ?? HttpContext.Current.GetOwinContext().GetUserManager<ApplicationRoleManager>();
            }
            private set
            {
                roleManager = value;
            }
        }

        // POST: api/Account/Register
        [HttpPost]
        public IHttpActionResult Register(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
                var result = this.UserManager.Create(user, model.Password);

                if (!result.Succeeded)
                {
                    var errorResult = this.GetErrorResult(result);
                    return errorResult;
                }

                //add default role to registered user
                this.UserManager.AddToRole(user.Id, "User");

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