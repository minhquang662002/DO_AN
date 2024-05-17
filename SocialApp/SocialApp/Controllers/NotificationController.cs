using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SocialApp.Application.Interface;
using SocialApp.Application.Service;
using SocialApp.Domain.Entity;
using System.Net;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SocialApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly INotificationService _notificationService;
        public NotificationController(INotificationService notificationService)
        {
            _notificationService = notificationService;
        }
        [HttpGet]
        public async Task<object> GetNotifications([FromQuery] string? fetch, string? type)
        {
            try
            {
                var limit = fetch == "all" ? 0 : 15;
                var userID = HttpContext.Items["UserID"]?.ToString();
                var result = new Result();
                result = await _notificationService.GetNotifications(limit, type, new Guid(userID));

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

        // GET api/<NotificationController>/5
        [HttpGet("unread")]
        public async Task<object> GetUnread([FromQuery] string? fetch, string? type)
        {
            try
            {
                var limit = fetch == "all" ? 0 : 15;
                var userID = HttpContext.Items["UserID"]?.ToString();
                var result = new Result();
                result = await _notificationService.GetNotifications(limit, type, new Guid(userID));

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
        public async Task<IActionResult> CreateNotification([FromBody] Notification notification)
        {
            try
            {
                var userID = HttpContext.Items["UserID"]?.ToString();
                notification.UserID = new Guid(userID);
                var result = new Result();
                result = await _notificationService.CreateNotification(notification);
 
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

        // PUT api/<NotificationController>/5
        [HttpPut]
        public async Task<IActionResult> ReadAllNotifications([FromBody] Notification notification)
        {
            try
            {
                var userID = HttpContext.Items["UserID"]?.ToString();
                notification.UserID = new Guid(userID);
                var result = new Result();
                result = await _notificationService.CreateNotification(notification);

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

        // DELETE api/<NotificationController>/5
        [HttpPut]
        public async Task<IActionResult> ReadNotification([FromBody] Notification notification)
        {
            try
            {
                var userID = HttpContext.Items["UserID"]?.ToString();
                notification.UserID = new Guid(userID);
                var result = new Result();
                result = await _notificationService.CreateNotification(notification);

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

        [HttpDelete]
        public async Task<IActionResult> deleteAllNotifications([FromBody] Notification notification)
        {
            try
            {
                var userID = HttpContext.Items["UserID"]?.ToString();
                notification.UserID = new Guid(userID);
                var result = new Result();
                result = await _notificationService.CreateNotification(notification);

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
