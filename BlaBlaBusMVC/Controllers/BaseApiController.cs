using System.Net.Http;
using System.Web;
using System.Web.Http;
using BlaBlaBusMVC.Helpers;
using Microsoft.AspNet.Identity.Owin;

namespace BlaBlaBusMVC.Controllers
{
    public abstract class BaseApiController : ApiController
    {
        //Need to encapsulate role manager to have a possibility authorize child controllers using particular roles 
        //Note that [Authorize] attribute cannot be overriden
        private ApplicationRoleManager roleManager;

        public ApplicationRoleManager RoleManager
        {
            get
            {
                return roleManager ?? HttpContext.Current.GetOwinContext().GetUserManager<ApplicationRoleManager>();
            }
            protected set
            {
                roleManager = value;
            }
        }
    }
}
