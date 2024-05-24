using SocialApp.Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialApp.Domain.Interface
{
    public interface IConversationRepository : IBaseRepository<Conversation>
    {
    }
}
