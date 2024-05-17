using AutoMapper;
using Dapper;
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
    public class CommentService : BaseService<Comment>, ICommentService
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IUserRepository _userRepository;
        private readonly IUnitOfWork _uow;
        public CommentService(ICommentRepository commentRepository, IMapper mapper, IUserRepository userRepository, IUnitOfWork unitOfWork) : base(commentRepository, mapper)
        {
            _commentRepository = commentRepository;
            _uow = unitOfWork;
            _userRepository = userRepository;
        }

        public async Task<Result> CreateComment(Comment commentData)
        {
            if(commentData.Reply != null)
            {
                var commentID = await _commentRepository.InsertAsync(commentData);
                await _uow.Connection.ExecuteAsync($"UPDATE comment SET ReplyCount = ReplyCount + 1 WHERE CommentID = {commentData.Reply}");
                var user = await _userRepository.GetByIDAsync(commentData.UserID);
                commentData.Owner = user;
                commentData.CommentID = commentID;
            }
            else
            {
                var commentID = await _commentRepository.InsertAsync(commentData);
                var user = await _userRepository.GetByIDAsync(commentData.UserID);
                commentData.Owner = user;
                commentData.CommentID = commentID;
            }
            commentData.Likes = !string.IsNullOrEmpty(commentData.Likes?.ToString()) ? commentData.Likes.ToString().Split(",") : new List<string>();
            commentData.Video = !string.IsNullOrEmpty(commentData.Video?.ToString()) ? commentData.Video.ToString() : null;
            commentData.Image = !string.IsNullOrEmpty(commentData.Image?.ToString()) ? commentData.Image.ToString() : null;
            return new Result(HttpStatusCode.OK, true, null, new { comments = commentData });
        }

        public async Task<Result> DeleteComment(Guid commentID)
        {
            await _commentRepository.DeleteAsync(commentID);
            return new Result(HttpStatusCode.OK, true, "Xóa thành công");
        }

        public async Task<Result> GetComments(Guid postID, int page)
        {
            var res = await _commentRepository.GetComments(postID, page);
            return new Result(HttpStatusCode.OK, true, null, res);
        }

        public async Task<Result> LikeComment(Guid commentID, Guid userID)
        {
            await _commentRepository.LikeComment(commentID, userID);
            return new Result(HttpStatusCode.OK, true, null);
        }

        public async Task<Result> UnlikeComment(Guid commentID, Guid userID)
        {
            await _commentRepository.UnlikeComment(commentID, userID);
            return new Result(HttpStatusCode.OK, true, null);
        }

        public async Task<Result> UpdateComment(Guid commentID, Comment commentData)
        {
            await _commentRepository.UpdateAsync(commentData, commentID);
            var user = await _userRepository.GetByIDAsync(commentData.UserID);
            commentData.Owner = user;
            return new Result(HttpStatusCode.OK, true, null, new { comments = commentData });
        }
    }
}
