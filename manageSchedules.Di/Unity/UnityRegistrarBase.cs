using System;
using System.Linq;
using Microsoft.Practices.Unity;

namespace manageScedules.Common.Unity
{
    public abstract class UnityRegistrarBase<T> where T: UnityRegistrarBase<T>, new()
    {
        private static Lazy<T> _default;
        protected static IUnityContainer _container;

        public static T Default
        {
            get
            {
                return UnityRegistrarBase<T>._default != null ? UnityRegistrarBase<T>._default.Value : (UnityRegistrarBase<T>._default = new Lazy<T>()).Value;
            }
        }

        public virtual IUnityContainer Container
        {
            get
            {
                UnityRegistrarBase<T>._container = UnityRegistrarBase<T>._container ?? (IUnityContainer)new UnityContainer();
                if (!UnityRegistrarBase<T>._container.Registrations.Any<ContainerRegistration>((Func<ContainerRegistration, bool>)(x => x.RegisteredType != typeof(IUnityContainer))))
                    this.RegisterDependencies();
                return UnityRegistrarBase<T>._container;
            }
        }

        protected abstract void RegisterDependencies();
    }
}
