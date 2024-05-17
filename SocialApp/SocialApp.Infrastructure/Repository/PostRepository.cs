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
    public class PostRepository : BaseRepository<Post>, IPostRepository
    {
        private readonly IUserRepository _userRepository;
        public PostRepository(IUnitOfWork unitOfWork, IUserRepository userRepository) : base(unitOfWork)
        {
            _userRepository = userRepository;
        }

        public async Task<object> GetPublicPost(Guid userID, int page)
        {
            var offset = page * 10;
            var limit = 10;
            var user = await _userRepository.GetByIDAsync(userID);
            var totalPost = await _uow.Connection.QueryAsync<Post>($"SELECT dp.*, COUNT(dc.CommentID) AS Comments FROM post dp JOIN user du ON dp.UserID = du.UserID LEFT JOIN comment dc ON dp.UserID = dc.UserID WHERE dp.UserID = '{userID}' OR FIND_IN_SET(dp.UserID, '{user.Friends}') > 0 GROUP BY dp.PostID ORDER BY dp.CreatedAt DESC;");
            var posts = totalPost.Skip(offset).Take(limit).ToList();
            posts.ForEach(x =>
            {
                var currentUser = _userRepository.GetByIDAsync(x.UserID).Result;
                x.Owner = currentUser;
                x.Likes = !string.IsNullOrEmpty(x.Likes?.ToString()) ? x.Likes.ToString().Split(",") : new List<string>();
                x.Videos = !string.IsNullOrEmpty(x.Videos?.ToString()) ? x.Videos.ToString().Split(",") : new List<string>();
                x.Images = !string.IsNullOrEmpty(x.Images?.ToString()) ? x.Images.ToString().Split(",") : new List<string>();
            });
            var totalCount = totalPost.Count();
            return new { totalCount = totalCount, posts = posts };
        }

        public async Task<object> GetUserPost(Guid userID, int pageIndex)
        {
            var offset = pageIndex * 10;
            var limit = 10;
            var totalPost = await _uow.Connection.QueryAsync<Post>($"SELECT dp.*, COUNT(dc.CommentID) AS Comments FROM post dp JOIN user du ON dp.UserID = du.UserID LEFT JOIN comment dc ON dp.UserID = dc.UserID WHERE dp.UserID = '{userID.ToString()}' GROUP BY dp.PostID ORDER BY dp.CreatedAt DESC;");
            var user = await _userRepository.GetByIDAsync(userID);
            totalPost.ToList().ForEach(post => {
                post.Owner = user;
                post.Likes = !string.IsNullOrEmpty(post.Likes?.ToString()) ? post.Likes.ToString().Split(",") : new List<string>();
                post.Videos = !string.IsNullOrEmpty(post.Videos?.ToString()) ? post.Videos.ToString().Split(",") : new List<string>();
                post.Images = !string.IsNullOrEmpty(post.Images?.ToString()) ? post.Images.ToString().Split(",") : new List<string>();
            });
            var totalCount = totalPost.Count();
            var posts = totalPost.Skip(offset).Take(limit).ToList();
            return new { totalCount = totalCount, posts = posts };
        }

        public async Task<object> LikePost(Guid postID, Guid userID)
        {
            var res = await _uow.Connection.ExecuteAsync($"UPDATE post SET Likes = CASE WHEN Likes IS NOT NULL THEN CONCAT(Likes, ',{userID}') ELSE '{userID}' END WHERE PostID = '{postID}'");
            return new { res = res };
        }

        public async Task<object> UnlikePost(Guid postID, Guid userID)
        {
            var res = await _uow.Connection.ExecuteAsync($"UPDATE post SET Likes = TRIM(BOTH ',' FROM REPLACE(CONCAT(',', Likes, ','), ',{userID},', ',')) WHERE PostID = '{postID}'");
            return new { res = res };
        }

    }
}
