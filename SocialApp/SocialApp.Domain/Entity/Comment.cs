using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialApp.Domain.Entity
{
    public class Comment
    {
        public Guid CommentID { get; set; }
        public Guid PostID { get; set; }
        public Guid UserID { get; set; }
        public string Text { get; set; } = string.Empty;
        public object? Video { get; set; } = string.Empty;
        public object? Image { get; set; } = string.Empty;
        public object? Likes { get; set; } = string.Empty;
        public Guid? Reply { get; set; }
        public int? ReplyCount { get; set; }
        public User? Owner { get; set; }
        public DateTime? CreatedAt { get; set; }
    }
}
