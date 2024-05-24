using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialApp.Domain.Entity
{
    public class Notification
    {
        public Guid NotificationID { get; set; }
        public Guid UserID { get; set; }
        public string Receiver { get; set; } = string.Empty;
        public string Url { get; set; } = string.Empty;
        public string Text { get; set; } = string.Empty;
        public string ReadBy { get; set; } = string.Empty;
        public DateTime? CreatedAt { get; set; }
        public User? UserInfo { get; set; }
    }
}
