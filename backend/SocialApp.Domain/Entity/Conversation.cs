using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialApp.Domain.Entity
{
    public class Conversation
    {
        public Guid ConversationID { get; set; }
        public string? Name { get; set; }
        public string? Avatar { get; set; }
        public Guid? Sender { get; set; }
        public string? Receiver { get; set; }
        public string? Text { get; set; }
        public object? Call { get; set; }
        public string? IsRead { get; set; }
        public string? Type { get; set; }
        public Guid? Admin { get; set; }
        public DateTime? CreatedAt { get; set; }
        public List<User>? ReceiverInfos { get; set; }
    }
}
