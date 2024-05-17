using Dapper;
using SocialApp.Domain.Entity;
using SocialApp.Domain.Interface;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialApp.Infrastructure.Repository
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        public UserRepository(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
        }

        public async Task<User?> FindUserByEmail(string email)
        {
            var param = new DynamicParameters();
            param.Add("email", email);
            var matchedEmailUser = await _uow.Connection.QueryFirstOrDefaultAsync<User>("SELECT * FROM User WHERE Email = @email", param);
            return matchedEmailUser;
        }

        public async Task<object> SearchUser(string searchString)
        {
            var users = await _uow.Connection.QueryAsync<User>($"SELECT * FROM User WHERE LOWER(FirstName) LIKE LOWER('%{searchString}%') OR LOWER(LastName) LIKE LOWER('%{searchString}%') LIMIT 10");
            return users;
        }
    }
}
