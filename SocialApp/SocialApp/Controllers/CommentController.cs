using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SocialApp.Application.Interface;
using SocialApp.Application.Service;
using SocialApp.Domain.Entity;
using System.Net;

namespace SocialApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentService _commentService;
        public CommentController(ICommentService commentService)
        {
            _commentService = commentService;
        }
        [HttpPost("{postID}")]
        public async Task<ActionResult> CreateComment(Guid postID, [FromBody] Comment commentData, [FromQuery] Guid? commentID)
        {
            try
            {
                var userID = HttpContext.Items["UserID"]?.ToString();
                commentData.UserID = new Guid(userID);
                commentData.PostID = postID;
                commentData.Reply = commentID;
                var result = new Result();
                result = await _commentService.CreateComment(commentData);
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

        [HttpGet]
        public async Task<ActionResult> GetComment([FromQuery] Guid postID, int page)
        {
            try
            {
                var result = new Result();
                result = await _commentService.GetComments(postID, page);
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

        [HttpGet("{commentID}")]
        public async Task<ActionResult> GetReplies(Guid commentID)
        {
            try
            {
                //var userID = HttpContext.Items["UserID"]?.ToString();
                //commentData.UserID = new Guid(userID);
                //commentData.PostID = postID;
                //commentData.Reply = commentID;
                var result = new Result();
                //result = await _commentService.CreateComment(commentData);
                //if (result.StatusCode == HttpStatusCode.BadRequest)
                //{
                //    return BadRequest(result);
                //}
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new Result(HttpStatusCode.InternalServerError, false, "Lỗi hệ thống", null, ex.Message));
            }
        }

        [HttpPut("{commentID}")]
        public async Task<ActionResult> EditComment(Guid commentID, [FromBody] Comment commentData)
        {
            try
            {
                var userID = HttpContext.Items["UserID"]?.ToString();
                commentData.UserID = new Guid(userID);
                commentData.CommentID = commentID;
                var result = new Result();
                result = await _commentService.UpdateComment(commentID, commentData);
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

        [HttpPut("like/{commentID}")]
        public async Task<ActionResult> LikeComment(Guid commentID)
        {
            try
            {
                var userID = HttpContext.Items["UserID"]?.ToString();
                var result = new Result();
                result = await _commentService.LikeComment(commentID, new Guid(userID));
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

        [HttpPut("unlike/{commentID}")]
        public async Task<ActionResult> UnlikeComment(Guid commentID)
        {
            try
            {
                var userID = HttpContext.Items["UserID"]?.ToString();
                var result = new Result();
                result = await _commentService.UnlikeComment(commentID, new Guid(userID));
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

        [HttpDelete("{commentID}")]
        public async Task<ActionResult> DeleteComment(Guid commentID)
        {
            try
            {
                var result = new Result();
                result = await _commentService.DeleteComment(commentID);
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
    }
}
