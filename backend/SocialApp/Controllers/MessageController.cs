using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SocialApp.Application.Interface;
using SocialApp.Domain.Entity;
using System.Net;

namespace SocialApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private readonly IMessageService _messageService;
        public MessageController(IMessageService messageService)
        {
            _messageService = messageService;
        }

        [HttpGet("conversations")]
        public async Task<IActionResult> GetConversations()
        {
            try
            {
                var userID = HttpContext.Items["UserID"]?.ToString();
                var result = new Result();
                result = await _messageService.GetConversations(new Guid(userID));
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

        [HttpGet("conversations/group")]
        public async Task<IActionResult> GetGroupConversations()
        {
            try
            {
                var userID = HttpContext.Items["UserID"]?.ToString();
                var result = new Result();
                result = await _messageService.GetGroupConversations();
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

        [HttpGet("single/{targetID}")]
        public async Task<IActionResult> GetSingleMessages(Guid targetID, [FromQuery] int page)
        {
            try
            {
                var userID = HttpContext.Items["UserID"]?.ToString();
                var result = new Result();
                result = await _messageService.GetSingleMessages(new Guid(userID), targetID, page);
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

        [HttpGet("messages/group/{groupID}")]
        public async Task<IActionResult> GetGroupMessages()
        {
            try
            {
                var userID = HttpContext.Items["UserID"]?.ToString();
                var result = new Result();
                result = await _messageService.GetGroupMessages();
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

        [HttpPost("conversations/group")]
        public async Task<IActionResult> CreateGroupConversation()
        {
            try
            {
                var userID = HttpContext.Items["UserID"]?.ToString();
                var result = new Result();
                result = await _messageService.CreateGroupConversation();
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

        [HttpPost]
        public async Task<IActionResult> SendMessage([FromBody] Message messageData)
        {
            try
            {
                var userID = HttpContext.Items["UserID"]?.ToString();
                var result = new Result();
                result = await _messageService.SendMessage(new Guid(userID), messageData);
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

        [HttpPut("conversations/group/{groupID}")]
        public async Task<IActionResult> AddGroupMember()
        {
            try
            {
                var userID = HttpContext.Items["UserID"]?.ToString();
                var result = new Result();
                result = await _messageService.AddGroupMember();
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

        [HttpPut("conversations/group/{groupID}/leave")]
        public async Task<IActionResult> LeaveGroupConversation()
        {
            try
            {
                var userID = HttpContext.Items["UserID"]?.ToString();
                var result = new Result();
                result = await _messageService.LeaveGroupConversation();
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

        [HttpPut("conversations/group/{groupID}/kick")]
        public async Task<IActionResult> RemoveGroupChatMember()
        {
            try
            {
                var userID = HttpContext.Items["UserID"]?.ToString();
                var result = new Result();
                result = await _messageService.RemoveGroupChatMember();
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

        [HttpDelete("conversations/group/{groupID}")]
        public async Task<IActionResult> DeleteGroupConversation()
        {
            try
            {
                var userID = HttpContext.Items["UserID"]?.ToString();
                var result = new Result();
                result = await _messageService.DeleteGroupConversation();
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
