using SocialApp.Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialApp.Application.Interface
{
    public interface INotificationService : IBaseService<Notification>
    {
        Task<Result> CreateNotification(Notification noti);
        Task<Result> GetNotifications(int limit, string? type, Guid userID);
        Task<Result> GetUnread(Guid userID);
        Task<Result> ReadAllNotifications(Guid userID);
        Task<Result> ReadNotification(Guid notiID, Guid userID);
        Task<Result> DeleteAllNotifications(Guid userID);
    }
}
