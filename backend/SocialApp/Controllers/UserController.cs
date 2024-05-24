using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SocialApp.Application.Interface;
using SocialApp.Application.Service;
using SocialApp.Domain.Entity;
using System.Net;

namespace SocialApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserInfo(Guid id) {
            try
            {
                var result = new Result();
                result = await _userService.GetUserInfo(id);
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

        [HttpPut]
        public async Task<IActionResult> UpdateUserInfo([FromBody] object userInfo)
        {
            try
            {
                var result = new Result();
                var userID = HttpContext.Items["UserID"]?.ToString();
                var serializerSettings = new JsonSerializerSettings
                {
                    // Disable the inclusion of type information (including ValueKind)
                    TypeNameHandling = TypeNameHandling.None
                };
                result = await _userService.UpdateUserInfo(JsonConvert.DeserializeObject<User>(userInfo.ToString()), new Guid(userID));
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

        [HttpGet("search")]
        public async Task<IActionResult> SearchUser([FromQuery] string searchString)
        {
            try
            {
                var result = new Result();
                var userID = HttpContext.Items["UserID"]?.ToString();
                result = await _userService.SearchUser(searchString);
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
