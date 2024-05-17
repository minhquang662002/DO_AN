using SocialApp.Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialApp.Application.Interface
{
    public interface IMessageService : IBaseService<Message>
    {
        public Task<Result> CreateGroupConversation();
        public Task<Result> AddGroupMember();
        public Task<Result> GetGroupConversations();
        public Task<Result> GetConversations(Guid userID);
        public Task<Result> GetGroupMessages();
        public Task<Result> GetMessages();
        public Task<Result> RemoveGroupChatMember();
        public Task<Result> DeleteGroupConversation();
        public Task<Result> LeaveGroupConversation();
        public Task<Result> SendMessage(Guid userID, Message messageData);
        public Task<Result> GetSingleMessages(Guid userID, Guid targetID, int page);
    }
}
