using SocialApp.Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialApp.Application.Interface
{
    public interface ICommentService
    {
        Task<Result> CreateComment(Comment commentData);
        Task<Result> GetComments(Guid commentID, int page);
        Task<Result> DeleteComment(Guid commentID);
        Task<Result> UpdateComment(Guid commentID, Comment commentData);
        Task<Result> LikeComment(Guid commentID, Guid userID);
        Task<Result> UnlikeComment(Guid commentID, Guid userID);
    }
}
