using AutoMapper;
using SocialApp.Application.Interface;
using SocialApp.Domain.Entity;
using SocialApp.Domain.Interface;
using SocialApp.Infrastructure.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SocialApp.Application.Service
{
    public class UserService : BaseService<User>, IUserService
    {
        private readonly IUserRepository _userRepository;
        public UserService(IUserRepository userRepository, IMapper mapper) : base(userRepository, mapper)
        {
            _userRepository = userRepository;
        }
        public async Task<Result> GetUserInfo(Guid userID)
        {
            // Lấy info
            var userInfo = await _userRepository.GetByIDAsync(userID);
            var friendList = new List<User>();
            if(userInfo.Friends != null)
            {
                userInfo.Friends.ToString().Split(",").ToList().ForEach(friend =>
                {
                    var res = _userRepository.GetByIDAsync(new Guid(friend)).Result;
                    friendList.Add(res);

                });
            }
            userInfo.Friends = friendList;
            return new Result(HttpStatusCode.OK, true, null, new { user = userInfo });
        }

        public async Task<Result> SearchUser(string searchString)
        {
            var users = await _userRepository.SearchUser(searchString);
            return new Result(HttpStatusCode.OK, true, null, new { users = users });
        }

        public async Task<Result> UpdateUserInfo(User data, Guid id)
        {
            var userInfo = await _userRepository.UpdateAsync(data, id);
            return new Result(HttpStatusCode.OK, true, null, userInfo);
        }

    }
}
