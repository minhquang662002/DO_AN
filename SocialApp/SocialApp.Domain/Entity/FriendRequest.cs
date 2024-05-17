using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialApp.Domain.Entity
{
    public class FriendRequest
    {
        public Guid FriendRequestID { get; set; }
        public Guid Sender { get; set; }
        public Guid Receiver { get; set; }
        public string? Status { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.Now;
        public User? SenderInfo { get; set; }
        public User? ReceiverInfo { get; set; }
    }
}
