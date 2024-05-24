using Microsoft.AspNetCore.SignalR;
using SocialApp.Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialApp.Application
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(Message messageData)
        {
            await Clients.Others.SendAsync("sendMessageToClient");
        }
    }
}
