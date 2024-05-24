using AutoMapper;
using BCrypt.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SocialApp.Application.Interface;
using SocialApp.Domain.Entity;
using SocialApp.Domain.Interface;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace SocialApp.Application.Service
{
    public class AuthService : IAuthService
    {
        private readonly User user = new User();
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        public AuthService(IUserRepository userRepository, IConfiguration configuration, IHttpContextAccessor httpContextAccessor, IMapper mapper)
        {
            _userRepository = userRepository;
            _configuration = configuration;
            _httpContextAccessor = httpContextAccessor;
            _mapper = mapper;
        }

        public async Task<Result> GetLoggedUser(Guid id)
        {
            var user = await _userRepository.GetByIDAsync(id);
            var friendList = new List<User>();
            if(user.Friends != null)
            {
                user.Friends.ToString().Split(",").ToList().ForEach(friend =>
                {
                    var res = _userRepository.GetByIDAsync(new Guid(friend)).Result;
                    friendList.Add(res);

                });
            }
            user.Friends = friendList;
            if (user != null)
            {
                return new Result(HttpStatusCode.OK, true, null, new { user = user});
            }
            else
            {
                return new Result(HttpStatusCode.BadRequest, false, null, new { user = user});
            }

        }

        public async Task<Result> Login(AuthDTO user)
        {
            var email = user.Email;

            // Tìm tài khoản trong DB
            var matchedEmailUser = await _userRepository.FindUserByEmail(email);
            if (matchedEmailUser == null)
            {
                return new Result(HttpStatusCode.BadRequest, false, "Tài khoản này không tồn tại");
            }


            // Compare pass với hash pass trong DB
            var isPassMatched = BCrypt.Net.BCrypt.EnhancedVerify(user.Password, matchedEmailUser.Password);
            if (!isPassMatched)
            {
                return new Result(HttpStatusCode.BadRequest, false, "Email hoặc mật khẩu không đúng");
            }

            // Sinh token
            var accessToken = GenerateJwtToken(matchedEmailUser.UserID);

            var refreshToken = GenerateRefreshToken(matchedEmailUser.UserID);

            SetRefreshToken(refreshToken);

            return new Result(HttpStatusCode.OK, true, "Đăng nhập thành công", new {accessToken = accessToken!});


        }

        public async Task<Result> Logout()
        {
            if (_httpContextAccessor.HttpContext.Request.Cookies["RefreshToken"] != null)
            {
                _httpContextAccessor.HttpContext.Response.Cookies.Delete("RefreshToken");
            }
            return new Result(HttpStatusCode.OK, true, "Đănt xuất thành công");
        }

        public async Task<Result> RefreshToken()
        {
            var refreshToken = _httpContextAccessor.HttpContext.Request.Cookies["RefreshToken"];
            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(refreshToken);
            var test = jsonToken as JwtSecurityToken;

            var userID = test.Claims.First(claim => claim.Type == ClaimTypes.NameIdentifier).Value;
            //if(!user.RefreshToken.Equals(refreshToken))
            //{
            //    return new Result(HttpStatusCode.Unauthorized, true, "Unauthorized");
            //} 
            //else if(user.TokenExpires < DateTime.Now)
            //{
            //    return new Result(HttpStatusCode.Unauthorized, true, "Expired token");
            //}

            var accessToken = GenerateJwtToken(new Guid(userID));


            return new Result(HttpStatusCode.OK, true, "Refresh token", new { accessToken = accessToken! });

        }

        /// <summary>
        /// Đăng ký
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public async Task<Result> Register(AuthDTO user)
        {
            var password = user.Password;
            var email = user.Email;
            var firstName = user.FirstName;
            var lastName = user.LastName;
            var gender = user.Gender;
            var birthday = user.Birthday;

            // Kiểm tra có đủ trường
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(firstName) || string.IsNullOrEmpty(lastName) || gender == null || birthday == null)
            {
                return new Result(HttpStatusCode.BadRequest, false, "Thiếu trường");
            }
            // Tìm xem email tồn tại chưa
            var matchedEmailUser = await _userRepository.FindUserByEmail(email);
            if (matchedEmailUser != null)
            {
                return new Result(HttpStatusCode.BadRequest, false, "Email này đã tồn tại!");
            }
            // Hash password
            var hashedPassword = BCrypt.Net.BCrypt.EnhancedHashPassword(password, 13);
            user.Password = hashedPassword;
            // Thêm user vào DB
            var mappedUser = _mapper.Map<AuthDTO, User>(user);
            var userID = await _userRepository.InsertAsync(mappedUser);
            mappedUser.UserID = userID;

            // Sinh token
            var accessToken = GenerateJwtToken(mappedUser.UserID);

            var refreshToken = GenerateRefreshToken(mappedUser.UserID);

            SetRefreshToken(refreshToken);

            return new Result(HttpStatusCode.OK, true, "Đăng ký thành công", accessToken);
        }

        /// <summary>
        /// Sinh token
        /// </summary>
        /// <returns></returns>
        private string GenerateJwtToken(Guid userID)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, userID.ToString()),
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value!));

            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(claims: claims, expires: DateTime.Now.AddHours(1), signingCredentials: credentials);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;

        }

        private RefreshToken GenerateRefreshToken(Guid userID)
        {
            var refreshToken = new RefreshToken
            {
                Token = GenerateJwtToken(userID),
                Expires = DateTime.Now.AddDays(7),
                UserID = userID
            };
            return refreshToken;
        }

        private void SetRefreshToken(RefreshToken newRefreshToken)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = newRefreshToken.Expires,
                SameSite = SameSiteMode.None,
                Secure = true,
                Path = "/"
            };
            _httpContextAccessor.HttpContext.Response.Cookies.Append("RefreshToken", newRefreshToken.Token, cookieOptions);
            user.TokenExpires = newRefreshToken.Expires;
            user.TokenCreated = newRefreshToken.Created;
            user.RefreshToken = newRefreshToken.Token;
            user.UserID = newRefreshToken.UserID;
        }

    }
}
