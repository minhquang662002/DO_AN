using AutoMapper;
using Dapper;
using SocialApp.Application.Interface;
using SocialApp.Domain.Entity;
using SocialApp.Domain.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SocialApp.Application.Service
{
    public class NotificationService : BaseService<Notification>, INotificationService
    {
        protected readonly IUnitOfWork _uow;
        private readonly INotificationRepository _notificationRepository;
        private readonly IUserRepository _userRepository;
        public NotificationService(INotificationRepository notificationRepository, IMapper mapper, IUnitOfWork unitOfWork, IUserRepository userRepository) : base(notificationRepository, mapper)
        {
            _uow = unitOfWork;
            _notificationRepository = notificationRepository;
            _userRepository = userRepository;
        }

        public async Task<Result> CreateNotification(Notification noti)
        {
            var newID = await _notificationRepository.InsertAsync(noti);
            var newNotif = await _notificationRepository.GetByIDAsync(newID);
            newNotif.UserInfo = await _userRepository.GetByIDAsync(newNotif.UserID);
            return new Result(HttpStatusCode.OK, true, null, newNotif);
        }

        public Task<Result> DeleteAllNotifications(Guid userID)
        {
            throw new NotImplementedException();
        }

        public async Task<Result> GetNotifications(int limit, string type, Guid userID)
        {
            var list = new List<Notification>();
            if(type != "unread")
            {
                var foundList = await _uow.Connection.QueryAsync<Notification>($"SELECT * FROM notification WHERE FIND_IN_SET('{userID}', Receiver) > 0 ORDER BY CreatedAt DESC LIMIT {limit};");
                list = foundList.ToList();
                list.ForEach(noti =>
                {
                    noti.UserInfo = _userRepository.GetByIDAsync(noti.UserID).Result;
                });
            }
            else
            {
                var foundList = await _uow.Connection.QueryAsync<Notification>($"SELECT * FROM notification WHERE FIND_IN_SET('{userID}', Receiver) > 0 AND FIND_IN_SET('{userID}', ReadBy) = 0 ORDER BY CreatedAt DESC;");
                list = foundList.ToList();
                list.ForEach(noti =>
                {
                    noti.UserInfo = _userRepository.GetByIDAsync(noti.UserID).Result;
                });
            }
            return new Result(HttpStatusCode.OK, true, null, list);
        }

        public Task<Result> GetUnread(Guid userID)
        {
            throw new NotImplementedException();
        }

        public Task<Result> ReadAllNotifications(Guid userID)
        {
            throw new NotImplementedException();
        }

        public Task<Result> ReadNotification(Guid notiID, Guid userID)
        {
            throw new NotImplementedException();
        }
    }
}
