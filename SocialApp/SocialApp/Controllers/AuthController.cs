using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SocialApp.Application.Interface;
using SocialApp.Domain.Entity;
using System.Net;

namespace SocialApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService) {
            _authService = authService;
        }

        /// <summary>
        /// Đăng ký
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        [HttpPost("register")]
        public async Task<IActionResult> Register(AuthDTO user)
        {
            try
            {
                var result = new Result();
                result = await _authService.Register(user);
                if(result.StatusCode == HttpStatusCode.BadRequest)
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

        /// <summary>
        /// Đăng nhập
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        [HttpPost("login")]
        public async Task<IActionResult> Login(AuthDTO user)
        {
            try
            {
                var result = new Result();
                result = await _authService.Login(user);
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

        /// <summary>
        /// Đăng xuất
        /// </summary>
        /// <returns></returns>
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {

            try
            {
                var result = new Result();
                result = await _authService.Logout();
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

        /// <summary>
        /// Lấy refresh token mới
        /// </summary>
        /// <returns></returns>
        [HttpPost("refreshToken")]
        public async Task<IActionResult> RefreshToken()
        {
            try
            {
                var result = new Result();
                result = await _authService.RefreshToken();
                if (result.StatusCode == HttpStatusCode.BadRequest)
                {
                    return BadRequest(result);
                }
                if (result.StatusCode == HttpStatusCode.Unauthorized)
                {
                    return Unauthorized(result);
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new Result(HttpStatusCode.InternalServerError, false, "Lỗi hệ thống", null, ex.Message));
            }
        }

        [HttpGet("user-info")]
        public async Task<IActionResult> GetLoggedUser()
        {
            try
            {
                var result = new Result();
                var userID = HttpContext.Items["UserID"]?.ToString();
                if(string.IsNullOrEmpty(userID))
                {
                    return StatusCode((int)HttpStatusCode.Unauthorized, new Result(HttpStatusCode.InternalServerError, false, "Unauthorized", null));
                }
                result = await _authService.GetLoggedUser(new Guid(userID));
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
