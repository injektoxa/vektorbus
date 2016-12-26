using System;
using System.Security.Claims;
using System.Security.Principal;
using Microsoft.AspNet.Identity;

namespace BlaBlaBusMVC.Extensions
{
    public static class IdentityExtensions
    {
        public static string GetNameIdentifier(this IIdentity identity)
        {
            var claimsIdentity = identity as ClaimsIdentity;

            return claimsIdentity.FindFirstValue(ClaimTypes.NameIdentifier);
        }
    }
}