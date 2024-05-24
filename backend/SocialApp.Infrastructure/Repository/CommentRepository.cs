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
    public class CommentRepository : BaseRepository<Comment>, ICommentRepository
    {
        private readonly IUserRepository _userRepository;
        public CommentRepository(IUnitOfWork unitOfWork, IUserRepository userRepository) : base(unitOfWork)
        {
            _userRepository = userRepository;
        }

        public async Task<object> GetComments(Guid postID, int page)
        {
            var comments = await _uow.Connection.QueryAsync<Comment>($"SELECT * FROM comment WHERE PostID = '{postID}' ORDER BY CreatedAt DESC LIMIT 10 OFFSET {page * 10};");
            comments.ToList().ForEach(async comment => {
                comment.Owner = _userRepository.GetByIDAsync(comment.UserID).Result;
                comment.Likes = !string.IsNullOrEmpty(comment.Likes?.ToString()) ? comment.Likes.ToString().Split(",") : new List<string>();
            });
            var totalCount = (await _uow.Connection.QueryAsync<int>($"SELECT COUNT(*) FROM comment WHERE PostID = '{postID}'")).FirstOrDefault();
            return new { comments = comments, totalCount = totalCount };
        }

        public async Task<object> LikeComment(Guid commentID, Guid userID)
        {
            var res = await _uow.Connection.ExecuteAsync($"UPDATE comment SET Likes = CASE WHEN Likes IS NOT NULL THEN CONCAT(Likes, ',{userID}') ELSE '{userID}' END WHERE CommentID = '{commentID}'");
            return new { res = res };
        }

        public async Task<object> UnlikeComment(Guid commentID, Guid userID)
        {
            var res = await _uow.Connection.ExecuteAsync($"UPDATE comment SET Likes = TRIM(BOTH ',' FROM REPLACE(CONCAT(',', Likes, ','), ',{userID},', ',')) WHERE CommentID = '{commentID}'");
            return new { res = res };
        }
    }
}
