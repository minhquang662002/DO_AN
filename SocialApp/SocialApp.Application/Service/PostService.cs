using AutoMapper;
using Newtonsoft.Json;
using SocialApp.Application.Interface;
using SocialApp.Domain.Entity;
using SocialApp.Domain.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SocialApp.Application.Service
{
    public class PostService : BaseService<Post>, IPostService
    {
        private readonly IUserRepository _userRepository;
        private readonly IPostRepository _postRepository;
        private readonly IUnitOfWork _uow;
        public PostService(IPostRepository postRepository, IMapper mapper, IUserRepository userRepository, IUnitOfWork uow) : base(postRepository, mapper)
        {
            _userRepository = userRepository;
            _postRepository = postRepository;
            _uow = uow;
        }
        public async Task<Result> GetPublicPost(Guid userID, int page)
        {
            var currentUser = await _userRepository.GetByIDAsync(userID);
            var posts = await _postRepository.GetPublicPost(userID, page);
            return new Result(HttpStatusCode.OK, true, null, posts);
        }

        public async Task<Result> GetUserPost(Guid userID, int page)
        {
            var result = await _postRepository.GetUserPost(userID, page);
            return new Result(HttpStatusCode.OK, true, null, result);
        }

        public async Task<Result> GetSpecificPost(Guid postID)
        {
            var post = await _postRepository.GetByIDAsync(postID);
            return new Result(HttpStatusCode.OK, true, null, new { posts = post });
        }

        public async Task<Result> CreatePost(Guid userID, Post postData)
        {
            postData.UserID = userID;
            
            var postID = await _postRepository.InsertAsync(postData);
            var user = await _userRepository.GetByIDAsync(userID);
            postData.PostID = postID;
            postData.Owner = user;
            postData.Likes = !string.IsNullOrEmpty(postData.Likes?.ToString()) ? postData.Likes.ToString().Split(",") : new List<string>();
            postData.Videos = !string.IsNullOrEmpty(postData.Videos?.ToString()) ? postData.Videos.ToString().Split(",") : new List<string>();
            postData.Images = !string.IsNullOrEmpty(postData.Images?.ToString()) ? postData.Images.ToString().Split(",") : new List<string>();
            return new Result(HttpStatusCode.OK, true, null, new { posts = postData });
        }

        public async Task<Result> UpdatePost(Guid postID, Post postData)
        {
            await _postRepository.UpdateAsync(postData, postID);
            postData.PostID = postID;
            return new Result(HttpStatusCode.OK, true, null, new { posts = postData });
        }

        public async Task<Result> DeletePost(Guid id)
        {
            await _postRepository.DeleteAsync(id);
            return new Result(HttpStatusCode.OK, true, "Xóa thành công");
        }

        public async Task<Result> LikePost(Guid postID, Guid userID)
        {
            await _postRepository.LikePost(postID, userID);
            return new Result(HttpStatusCode.OK, true, null);
        }



        public async Task<Result> UnlikePost(Guid postID, Guid userID)
        {
            await _postRepository.UnlikePost(postID, userID);
            return new Result(HttpStatusCode.OK, true, null);
        }

        public Task<Result> GetSavedPosts()
        {
            throw new NotImplementedException();
        }







        public Task<Result> SavePost()
        {
            throw new NotImplementedException();
        }

        public Task<Result> UnsavePost()
        {
            throw new NotImplementedException();
        }
    }
}
