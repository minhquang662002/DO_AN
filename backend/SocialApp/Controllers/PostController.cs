using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using SocialApp.Application.Interface;
using SocialApp.Domain.Entity;
using System.Net;

namespace SocialApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostService _postService;
        public PostController(IPostService postService)
        {
            _postService = postService;
        }
        [HttpGet]
        public async Task<IActionResult> GetPublicPost([FromQuery] int page)
        {
            try
            {
                var userID = HttpContext.Items["UserID"]?.ToString();
                var result = new Result();
                result = await _postService.GetPublicPost(new Guid(userID), page);
                if (result.StatusCode == HttpStatusCode.BadRequest)
                {
                    return BadRequest(result);
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new Result(HttpStatusCode.InternalServerError, false, "Lỗi hệ thống", null, ex.Message));
            }
        }

        [HttpGet("user_posts")]
        public async Task<ActionResult> GetUserPost([FromQuery] Guid id, int page)
        {
            try
            {
                var result = new Result();
                result = await _postService.GetUserPost(id, page);
                if (result.StatusCode == HttpStatusCode.BadRequest)
                {
                    return BadRequest(result);
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new Result(HttpStatusCode.InternalServerError, false, "Lỗi hệ thống", null, ex.Message));
            }
        }

        //[HttpGet]
        //public Task<ActionResult> GetSpecificPost()
        //{

        //}

        [HttpPost]
        public async Task<ActionResult> CreatePost([FromBody] Post postData)
        {
            try
            {
                var userID = HttpContext.Items["UserID"]?.ToString();
                var result = new Result();
                result = await _postService.CreatePost(new Guid(userID), postData);
                if (result.StatusCode == HttpStatusCode.BadRequest)
                {
                    return BadRequest(result);
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new Result(HttpStatusCode.InternalServerError, false, "Lỗi hệ thống", null, ex.Message));
            }
        }

        [HttpPut("{postID}")]
        public async Task<ActionResult> UpdatePost(Guid postID, [FromBody] Post postData) {
            try
            {
                var userID = HttpContext.Items["UserID"]?.ToString();
                var result = new Result();
                result = await _postService.UpdatePost(postID, postData);
                if (result.StatusCode == HttpStatusCode.BadRequest)
                {
                    return BadRequest(result);
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new Result(HttpStatusCode.InternalServerError, false, "Lỗi hệ thống", null, ex.Message));
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePost(Guid id) {
            try
            {
                var result = new Result();
                result = await _postService.DeletePost(id);
                if (result.StatusCode == HttpStatusCode.BadRequest)
                {
                    return BadRequest(result);
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new Result(HttpStatusCode.InternalServerError, false, "Lỗi hệ thống", null, ex.Message));
            }
        }

        [HttpPut("like/{postID}")]
        public async Task<ActionResult> LikePost(Guid postID) {
            try
            {
                var userID = HttpContext.Items["UserID"]?.ToString();
                var result = new Result();
                result = await _postService.LikePost(postID, new Guid(userID));
                if (result.StatusCode == HttpStatusCode.BadRequest)
                {
                    return BadRequest(result);
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new Result(HttpStatusCode.InternalServerError, false, "Lỗi hệ thống", null, ex.Message));
            }
        }

        [HttpPut("unlike/{postID}")]
        public async Task<ActionResult> UnlikePost(Guid postID)
        {
            try
            {
                var userID = HttpContext.Items["UserID"]?.ToString();
                var result = new Result();
                result = await _postService.UnlikePost(postID, new Guid(userID));
                if (result.StatusCode == HttpStatusCode.BadRequest)
                {
                    return BadRequest(result);
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new Result(HttpStatusCode.InternalServerError, false, "Lỗi hệ thống", null, ex.Message));
            }
        }

        //[HttpPut]
        //public Task<ActionResult> savePost() { }

        //[HttpPut]
        //public Task<ActionResult> unsavePost() { }

        //[HttpPut]
        //public Task<ActionResult> getSavedPosts() { }
    }
}
