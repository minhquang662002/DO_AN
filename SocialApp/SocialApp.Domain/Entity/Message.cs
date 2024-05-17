using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialApp.Domain.Entity
{
    public class Message
    {
        public Guid? ConversationID { get; set; }
        public Guid MessageID { get; set; }
        public Guid Sender { get; set; }
        public Guid Receiver { get; set; }
        public string? Text { get; set; }
        public object? Images { get; set; }
        public object? Videos { get; set; }
        public object? Call { get; set; }
        public DateTime? CreatedAt { get; set; }
        public User? SenderInfo { get; set; }
        public Conversation? Conversation { get; set; }
    }
}
