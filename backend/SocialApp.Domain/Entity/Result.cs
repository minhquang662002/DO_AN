using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SocialApp.Domain.Entity
{
    public class Result
    {
        public Result() { }
        public Result(string message) { }
        public Result(HttpStatusCode statusCode, bool isSuccess, string? errorMessage, object? data = null, string? devMessage = "") { 
            StatusCode = statusCode;
            IsSuccess = isSuccess;
            Message = errorMessage;
            Data = data;
            DevMessage = devMessage;
        }

        public HttpStatusCode StatusCode { get; set; }
        public bool IsSuccess { get; set; }
        public string? Message { get; set; }
        public object? Data { get; set; }
        public string? DevMessage { get; set; }
    }
}
