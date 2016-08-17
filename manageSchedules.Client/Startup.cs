using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Microsoft.Owin.FileSystems;
using Microsoft.Owin.StaticFiles;
using Microsoft.Owin.StaticFiles.ContentTypes;
using Owin;

[assembly: OwinStartup(typeof(manageSchedules.Client.Startup))]

namespace manageSchedules.Client
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            //Sets file system for server
            var fileSystem = new PhysicalFileSystem(@".\wwwroot");

            //Setup file server options
            var options = new FileServerOptions()
            {
                FileSystem = fileSystem,
                EnableDefaultFiles = true,
                EnableDirectoryBrowsing = true
            };

            var contentTypeProvider = new FileExtensionContentTypeProvider();
            contentTypeProvider.Mappings.Add(".json", "application/json");
            options.StaticFileOptions.ContentTypeProvider = contentTypeProvider;

            app.UseFileServer(options);
            //app.UseAuthentication(API.Configuration.GetDependencyResolver());

            //app.Map("/api", x => x.UseApi());
        }
    }
}
