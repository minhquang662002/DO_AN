using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialApp.Domain.Entity
{
    public class PostDTO
    {
        public Guid PostID { get; set; }
        public Guid UserID { get; set; }
        public string Text { get; set; } = string.Empty;
        public string[]? Images { get; set; }
        public string[]? Videos { get; set; }
        public string[]? Likes { get; set; }
        public User? Owner { get; set; }
    }
}
