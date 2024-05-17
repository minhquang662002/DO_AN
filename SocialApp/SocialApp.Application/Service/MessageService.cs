using AutoMapper;
using Dapper;
using SocialApp.Application.Interface;
using SocialApp.Domain.Entity;
using SocialApp.Domain.Interface;
using SocialApp.Infrastructure;
using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Linq;
using System.Net;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace SocialApp.Application.Service
{
    public class MessageService : BaseService<Message>, IMessageService
    {
        protected readonly IUnitOfWork _uow;
        private readonly IMessageRepository _messageRepository;
        private readonly IUserRepository _userRepository;
        private readonly IConversationRepository _conversationRepository;
        public MessageService(IMessageRepository messageRepository, IMapper mapper, IUnitOfWork unitOfWork, IConversationRepository conversationRepository, IUserRepository userRepository) : base(messageRepository, mapper)
        {
            _uow = unitOfWork;
            _messageRepository = messageRepository;
            _conversationRepository = conversationRepository;
            _userRepository = userRepository;
        }

        public Task<Result> AddGroupMember()
        {
            throw new NotImplementedException();
        }

        public Task<Result> CreateGroupConversation()
        {
            throw new NotImplementedException();
        }

        public Task<Result> DeleteGroupConversation()
        {
            throw new NotImplementedException();
        }

        public async Task<Result> GetConversations(Guid userID)
        {
            var conversations = await _uow.Connection.QueryAsync<Conversation>($"SELECT * FROM conversation WHERE FIND_IN_SET('{userID}', Receiver) > 0");
            conversations.ToList().ForEach(x =>
            {
                var receivers = new List<User>();
                var receiverList = x.Receiver.ToString().Split(",").ToList();
                if(receiverList.Count() > 0)
                {
                    receiverList.ForEach(y =>
                    {
                        var user = _userRepository.GetByIDAsync(new Guid(y)).Result;
                        receivers.Add(user);
                    });
                    x.ReceiverInfos = receivers;
                }
            });
            return new Result(HttpStatusCode.OK, true, null, conversations);
        }

        public Task<Result> GetGroupConversations()
        {
            throw new NotImplementedException();
        }

        public Task<Result> GetGroupMessages()
        {
            throw new NotImplementedException();
        }

        public Task<Result> GetMessages()
        {
            throw new NotImplementedException();
        }

        public async Task<Result> GetSingleMessages(Guid userID, Guid targetID, int page)
        {
            var conversation = await _uow.Connection.QueryFirstOrDefaultAsync<Conversation>($"SELECT * FROM conversation WHERE (FIND_IN_SET('{targetID}', Receiver) > 0 AND FIND_IN_SET('{userID}', Receiver) > 0)");
            if (conversation == null)
            {
                return new Result(HttpStatusCode.OK, true, null, new List<string>());
            }
            else
            {
                var messages = await _uow.Connection.QueryAsync<Message>($"SELECT * FROM message WHERE ConversationID = '{conversation.ConversationID}' ORDER BY CreatedAt DESC LIMIT 15 OFFSET {page * 15}");
                messages.ToList().ForEach(msg =>
                {
                    var user = _userRepository.GetByIDAsync(msg.Sender).Result;
                    msg.SenderInfo = user;
                });
                return new Result(HttpStatusCode.OK, true, null, messages);
            }
        }

        public Task<Result> LeaveGroupConversation()
        {
            throw new NotImplementedException();
        }

        public Task<Result> RemoveGroupChatMember()
        {
            throw new NotImplementedException();
        }

        public async Task<Result> SendMessage(Guid userID, Message messageData)
        {
            if (messageData.ConversationID == null)
            {
                var conversation = new Conversation();
                if (messageData.Call != null)
                {

                }
                else
                {
                    var curConve = await _uow.Connection.QueryFirstOrDefaultAsync<Conversation>($"SELECT * FROM conversation WHERE (FIND_IN_SET('{messageData.Receiver}', Receiver) > 0 AND FIND_IN_SET('{userID}', Receiver) > 0)");
                    if(curConve != null)
                    {
                       await _uow.Connection.ExecuteAsync($"UPDATE Conversation SET Sender = '{userID}' WHERE ConversationID = '{curConve.ConversationID}';");
                       messageData.ConversationID = curConve.ConversationID;
                        messageData.Conversation = curConve;
                    }
                    else
                    {
                        conversation.Text = messageData.Text;
                        conversation.Type = "single";
                        conversation.Sender = userID;
                        conversation.Receiver = $"{userID},{messageData.Receiver}";
                        var conveID = await _conversationRepository.InsertAsync(conversation);
                        conversation.ConversationID = conveID;
                        messageData.ConversationID = conveID;
                        messageData.Conversation = conversation;
                    }
                    messageData.Sender = userID;
                    var msgID = await _messageRepository.InsertAsync(messageData);
                    messageData.MessageID = msgID;
                    var senderInfo = await _userRepository.GetByIDAsync(userID);
                    messageData.SenderInfo = senderInfo;
                }
            }
            else
            {

                //var msgID = await _messageRepository.InsertAsync(messageData);
                //messageData.MessageID = msgID;
                //var senderInfo = await _userRepository.GetByIDAsync(userID);
                //messageData.SenderInfo = senderInfo;
            }
            return new Result(HttpStatusCode.OK, true, null, new { messages = messageData });
        }
    }
}
