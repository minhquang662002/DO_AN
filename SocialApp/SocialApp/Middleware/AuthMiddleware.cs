using AutoMapper.Internal;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using SocialApp.Domain.Entity;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SocialApp.Middleware
{
    // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    public class AuthMiddleware
    {
        private readonly RequestDelegate _next;

        public AuthMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            var authHeader = httpContext.Request.Headers.Authorization.ToString();
            var token = !string.IsNullOrEmpty(authHeader) ? authHeader.ToString().Split(" ")[1] : null;
            if (string.IsNullOrEmpty(token))
            {
                httpContext.Response.StatusCode = 401;
                httpContext.Response.ContentType = "application/json";
                await httpContext.Response.WriteAsJsonAsync(new Result(HttpStatusCode.Unauthorized, false, "Không có token", null, null));
                return;
            }
            else
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.ReadJwtToken(token);
                var claim = securityToken.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier).FirstOrDefault();
                if(claim?.Value != null && new Guid(claim?.Value) != Guid.Empty)
                {
                    httpContext.Items["UserID"] =  claim.Value;
                }

                await _next(httpContext);
            }
        }
    }

    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class AuthMiddlewareExtensions
    {
        public static IApplicationBuilder UseAuthMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<AuthMiddleware>();
        }
    }
}
