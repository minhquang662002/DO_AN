using Dapper;
using SocialApp.Domain.Entity;
using SocialApp.Domain.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialApp.Infrastructure.Repository
{
    public class AuthRepository : BaseRepository<AuthDTO>, IAuthRepository
    {
        public AuthRepository(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
        }
    }
}
