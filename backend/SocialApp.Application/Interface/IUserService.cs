using SocialApp.Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialApp.Application.Interface
{
    public interface IUserService : IBaseService<User>
    {
        Task<Result> GetUserInfo(Guid id);
        Task<Result> SearchUser(string searchString);
        Task<Result> UpdateUserInfo(User data, Guid id);


    }
}
