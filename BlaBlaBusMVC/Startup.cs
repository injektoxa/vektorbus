using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(BlaBlaBusMVC.Startup))]
namespace BlaBlaBusMVC
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
