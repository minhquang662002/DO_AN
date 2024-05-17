using SocialApp.Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialApp.Domain.Interface
{
    public interface IUserRepository : IBaseRepository<User>
    {
        Task<User?> FindUserByEmail(string email);
        Task<object> SearchUser(string searchString);
    }
}
