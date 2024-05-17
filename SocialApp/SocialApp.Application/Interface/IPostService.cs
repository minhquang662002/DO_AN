using SocialApp.Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialApp.Application.Interface
{
    public interface IPostService : IBaseService<Post>
    {
        Task<Result> GetPublicPost(Guid userID, int page);

        Task<Result> GetUserPost(Guid userID, int page);

        Task<Result> GetSpecificPost(Guid postID);

        Task<Result> CreatePost(Guid userID, Post postData);

        Task<Result> UpdatePost(Guid postID, Post postData);

        Task<Result> DeletePost(Guid id);

        Task<Result> LikePost(Guid postId, Guid userID);

        Task<Result> UnlikePost(Guid postId, Guid userID);

        Task<Result> SavePost();

        Task<Result> UnsavePost();

        Task<Result> GetSavedPosts();
    }
}
