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
    public class FriendController : ControllerBase
    {
        private readonly IFriendService _friendService;
        public FriendController(IFriendService friendService)
        {
            _friendService = friendService;
        }

        [HttpGet]
        public async Task<IActionResult> GetRequests()
        {
            try
            {
                var userID = HttpContext.Items["UserID"]?.ToString();
                var result = new Result();
                result = await _friendService.GetRequests(new Guid(userID));
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

        [HttpGet("suggestion")]
        public async Task<IActionResult> GetSuggestions()
        {
            try
            {
                var userID = HttpContext.Items["UserID"]?.ToString();
                var result = new Result();
                result = await _friendService.GetSuggestions(new Guid(userID));
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

        [HttpGet("{targetID}")]
        public async Task<IActionResult> ExistRequest(Guid targetID)
        {
            try
            {
                var userID = HttpContext.Items["UserID"]?.ToString();
                var result = new Result();
                result = await _friendService.ExistRequest(new Guid(userID), targetID);
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

        [HttpPost("{receiver}")]
        public async Task<IActionResult> SendRequest(Guid receiver)
        {
            try
            {
                var userID = HttpContext.Items["UserID"]?.ToString();
                var result = new Result();
                result = await _friendService.SendRequest(new Guid(userID), receiver);
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

        [HttpPut("accept/{requestID}")]
        public async Task<IActionResult> AcceptRequest(Guid requestID, [FromBody] User sender)
        {
            try
            {
                var userID = HttpContext.Items["UserID"]?.ToString();
                var result = new Result();
                result = await _friendService.AcceptRequest(requestID, new Guid(userID), sender.UserID);
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

        [HttpDelete("{requestID}")]
        public async Task<IActionResult> CancelRequest(Guid requestID)
        {
            try
            {
                var userID = HttpContext.Items["UserID"]?.ToString();
                var result = new Result();
                result = await _friendService.CancelRequest(requestID, new Guid(userID));
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

        [HttpPut("unfriend/{targetID}")]
        public async Task<IActionResult> Unfriend(Guid targetID)
        {
            try
            {
                var userID = HttpContext.Items["UserID"]?.ToString();
                var result = new Result();
                result = await _friendService.Unfriend(targetID, new Guid(userID));
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
