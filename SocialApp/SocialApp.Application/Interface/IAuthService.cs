using SocialApp.Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialApp.Application.Interface
{
    public interface IAuthService
    {
        Task<Result> Login(AuthDTO user);
        Task<Result> Logout();
        Task<Result> Register(AuthDTO user);
        Task<Result> RefreshToken();
        Task<Result> GetLoggedUser(Guid id);
    }
}
