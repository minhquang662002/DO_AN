﻿using SocialApp.Domain.Entity;
using SocialApp.Domain.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialApp.Application.Interface
{
    public interface INotificationRepository : IBaseRepository<Notification>
    {
    }
}