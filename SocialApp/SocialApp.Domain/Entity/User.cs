using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialApp.Domain.Entity
{
    public class User
    {
        public Guid UserID { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public DateTime? Birthday { get; set; }
        public int Gender { get; set; }
        public string? Avatar { get; set; } = "https://res.cloudinary.com/dd0w757jk/image/upload/v1654678362/unisocial/defaultAvatar_f08mtv.jpg";
        public string? Background { get; set; } = "https://res.cloudinary.com/dd0w757jk/image/upload/v1654678361/unisocial/defaultBg_p2fg2w.jpg";
        public string RefreshToken { get; set; } = string.Empty;
        public DateTime? TokenCreated { get; set; }
        public DateTime? TokenExpires { get; set;}
        public string? Address { get; set; }
        public object? Friends { get; set; }
        public string? ConnectionID { get; set; }
    }
}
