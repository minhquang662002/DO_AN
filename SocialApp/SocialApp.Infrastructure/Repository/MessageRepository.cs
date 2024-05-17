﻿using SocialApp.Domain.Entity;
using SocialApp.Domain.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialApp.Infrastructure.Repository
{
    public class MessageRepository : BaseRepository<Message>, IMessageRepository
    {
        public MessageRepository(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
        }
    }
}
