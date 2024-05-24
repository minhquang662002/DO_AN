using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialApp.Domain.Entity
{
    public class Post
    {
        public Guid PostID { get; set; }
        public Guid UserID { get; set; }
        public string Text { get; set; } = string.Empty;
        public object? Images { get; set; }
        public object? Videos { get; set; }
        public object? Likes { get; set; }
        public User? Owner { get; set; }
        public User[]? Tags { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.Now;
        public int Comments { get; set; }
    }
}
