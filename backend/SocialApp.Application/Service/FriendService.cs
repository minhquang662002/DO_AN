using AutoMapper;
using Dapper;
using SocialApp.Application.Interface;
using SocialApp.Domain.Entity;
using SocialApp.Domain.Interface;
using SocialApp.Infrastructure.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SocialApp.Application.Service
{
    public class FriendService : BaseService<FriendRequest>, IFriendService
    {
        protected readonly IUnitOfWork _uow;
        private readonly IFriendRepository _friendRepository;
        private readonly IUserRepository _userRepository;
        public FriendService(IFriendRepository friendRepository, IMapper mapper, IUnitOfWork unitOfWork, IUserRepository userRepository) : base(friendRepository, mapper)
        {
            _uow = unitOfWork;
            _friendRepository = friendRepository;
            _userRepository = userRepository;
        }

        public async Task<Result> AcceptRequest(Guid requestID, Guid userID, Guid sender)
        {
            var curReq = await _uow.Connection.QueryFirstOrDefaultAsync<FriendRequest>($"SELECT * FROM friendrequest WHERE FriendRequestID = '{requestID}';");
            if(curReq == null)
            {
                return new Result(HttpStatusCode.BadRequest, false, "Email hoặc mật khẩu không đúng");
            }
            await _uow.Connection.ExecuteAsync($"UPDATE friendrequest SET Status = 'accepted' WHERE FriendRequestID = '{requestID}';");
            await _uow.Connection.ExecuteAsync($"UPDATE user SET Friends = CASE WHEN Friends IS NOT NULL THEN CONCAT(Friends, ',{userID}') ELSE '{userID}' END WHERE UserID = '{sender}';");
            await _uow.Connection.ExecuteAsync($"UPDATE user SET Friends = CASE WHEN Friends IS NOT NULL THEN CONCAT(Friends, ',{sender}') ELSE '{sender}' END WHERE UserID = '{userID}';");

            return new Result(HttpStatusCode.OK, true, null, null, "accepted");
        }

        public async Task<Result> CancelRequest(Guid requestID, Guid userID)
        {
            await _friendRepository.DeleteAsync(requestID);
            return new Result(HttpStatusCode.OK, true, null, null, "deleted");
        }

        public async Task<Result> ExistRequest(Guid userID, Guid targetID)
        {
            var isExist = await _uow.Connection.QueryFirstOrDefaultAsync<FriendRequest>($"SELECT * FROM friendrequest WHERE ((Sender = '{userID}' AND Receiver = '{targetID}') OR (Sender = '{targetID}' AND Receiver = '{userID}')) AND Status = 'pending'");

            if(isExist != null)
            {
                var sender = await _userRepository.GetByIDAsync(userID);
                var receiver = await _userRepository.GetByIDAsync(targetID);
                isExist.SenderInfo = sender;
                isExist.ReceiverInfo = receiver;
            }
            return new Result(HttpStatusCode.OK, true, null, new { requests = isExist }, null);
        }

        public async Task<Result> GetRequests(Guid userID, int page = 0)
        {
            var requests = await _uow.Connection.QueryAsync<FriendRequest>($"SELECT * FROM friendrequest WHERE Receiver = '{userID}' AND Status = 'pending' LIMIT 10 OFFSET {0 * 10}");
            requests.ToList().ForEach(x =>
            {
                var sender =  _userRepository.GetByIDAsync(x.Sender).Result;
                var receiver =  _userRepository.GetByIDAsync(x.Receiver).Result;
                x.SenderInfo = sender;
                x.ReceiverInfo = receiver;
            });
            return new Result(HttpStatusCode.OK, true, null, new { requests = requests});
        }

        public async Task<Result> GetSuggestions(Guid userID)
        {
            //var requests = await _uow.Connection.QueryAsync<FriendRequest>($"SELECT * FROM friendrequest WHERE Receiver = '{userID}' OR Sender = '{userID}' AND (Status = 'pending' OR Status = 'accepted')");

            //var listEx = new List<Guid>();
            //requests.ToList().ForEach(x =>
            //{
            //    if (x.Sender != userID)
            //    {
            //        listEx.Add(x.Sender);
            //    }

            //    if (x.Receiver != userID)
            //    {
            //        listEx.Add(x.Receiver);
            //    }

            //});
            //var listExString = string.Join(",", listEx);
            var users = await _uow.Connection.QueryAsync<User>($"SELECT * FROM user WHERE UserID <> '{userID}' AND FIND_IN_SET('{userID}', Friends) = 0");

            return new Result(HttpStatusCode.OK, true, null, new { suggestions = users });
        }

        public async Task<Result> SendRequest(Guid userID, Guid receiverID)
        {
            var isExist = await _uow.Connection.QueryFirstOrDefaultAsync<FriendRequest>($"SELECT * FROM friendrequest WHERE ((Sender = '${userID}' AND Receiver = '${receiverID}') OR (Sender = '${receiverID}' AND Receiver = '${userID}')) AND (Status = 'pending' OR Status = 'accepted')");
            if(isExist != null)
            {
                return new Result(HttpStatusCode.BadRequest, false, "Tài khoản này không tồn tại");
            }

            var newRequest = new FriendRequest();
            newRequest.Sender = userID;
            newRequest.Receiver = receiverID;
            newRequest.Status = "pending";
            var id = await _friendRepository.InsertAsync(newRequest);
            newRequest.FriendRequestID = id;
            var sender = await _userRepository.GetByIDAsync(userID);
            var receiver = await _userRepository.GetByIDAsync(receiverID);
            newRequest.SenderInfo = sender;
            newRequest.ReceiverInfo = receiver;
            return new Result(HttpStatusCode.OK, true, null, newRequest);
        }

        public async Task<Result> Unfriend(Guid userID, Guid curPer)
        {
            await _uow.Connection.ExecuteAsync($"DELETE FROM friendrequest WHERE (Sender = '{userID}' AND Receiver = '{curPer}') OR (Sender = '{curPer}' AND Receiver = '{userID}');");
            await _uow.Connection.ExecuteAsync($"UPDATE user SET Friends = TRIM(BOTH ',' FROM REPLACE(CONCAT(',', Friends, ','), ',{userID},', ',')) WHERE UserID = '{curPer}'");
            await _uow.Connection.ExecuteAsync($"UPDATE user SET Friends = TRIM(BOTH ',' FROM REPLACE(CONCAT(',', Friends, ','), ',{curPer},', ',')) WHERE UserID = '{userID}'");
            return new Result(HttpStatusCode.OK, true, null, null, "unfriend");
        }

    }
}
