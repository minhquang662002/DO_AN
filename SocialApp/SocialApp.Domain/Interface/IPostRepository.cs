using SocialApp.Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialApp.Domain.Interface
{
    public interface IPostRepository : IBaseRepository<Post>
    {
        Task<object> GetPublicPost(Guid userID, int page);
        Task<object> GetUserPost(Guid userID, int pageIndex);
        Task<object> LikePost(Guid postID, Guid userID);
        Task<object> UnlikePost(Guid postId, Guid userID);
    }
}
