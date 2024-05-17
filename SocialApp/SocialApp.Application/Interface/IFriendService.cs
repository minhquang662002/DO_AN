using SocialApp.Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialApp.Application.Interface
{
    public interface IFriendService : IBaseService<FriendRequest>
    {
        Task<Result> GetRequests(Guid userID, int page = 0);
        Task<Result> GetSuggestions(Guid userID);
        Task<Result> ExistRequest(Guid userID, Guid targetID);
        Task<Result> SendRequest(Guid userID, Guid receiverID);
        Task<Result> AcceptRequest(Guid requestID, Guid userID, Guid sender);
        Task<Result> Unfriend(Guid userID, Guid curPer);
        Task<Result> CancelRequest(Guid requestID, Guid userID);
    }
}
