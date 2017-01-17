using System.Net.Http.Headers;
using System.Web.Http;
using Newtonsoft.Json;

namespace BlaBlaBusMVC
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Use camel case for JSON data.
            config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));

            config.Formatters.JsonFormatter.SerializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Utc;

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
