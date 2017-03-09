using manageScedules.Common.Unity;

namespace manageSchedules.Di
{
    public class ContainerRegistrar : UnityRegistrarBase<ContainerRegistrar>
    {
        protected override void RegisterDependencies()
        {
            RegisterContexts();
            RegisterRepositories();
            RegisterServices();
        }

        private static void RegisterContexts()
        {
        }

        private static void RegisterRepositories()
        {
        }

        private static void RegisterServices()
        {
        }
    }
}
