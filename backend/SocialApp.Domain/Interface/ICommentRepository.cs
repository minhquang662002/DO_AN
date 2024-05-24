using SocialApp.Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialApp.Domain.Interface
{
    public interface ICommentRepository : IBaseRepository<Comment>
    {
        Task<object> GetComments(Guid postID, int page);
        Task<object> LikeComment(Guid commentID, Guid userID);
        Task<object> UnlikeComment(Guid commentID, Guid userID);
    }
}
