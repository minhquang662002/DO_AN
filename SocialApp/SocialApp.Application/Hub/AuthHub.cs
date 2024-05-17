using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using SocialApp.Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace SocialApp.Application
{
    public class AuthHub : Hub
    {
        public static List<User> _users = new List<User>();


        public void Logged(User user)
        {
            var addUser = _users.Find(x => x.UserID == user.UserID);
            if (addUser == null)
            {
                user.ConnectionID = Context.ConnectionId;
                _users.Add(user);
            }
            else
            {
                addUser.ConnectionID = Context.ConnectionId;
            }
        }

        public void Disconnect(User user)
        {
            var offline = _users.Find(x => x.ConnectionID == Context.ConnectionId);
            if (offline != null)
            {
                var clients = _users.Where(x => offline.Friends.ToString().Contains(x.UserID.ToString())).ToList();
                if (clients.Count() > 0)
                {
                    clients.ForEach(client =>
                    {
                        Clients.Client(client.ConnectionID).SendAsync("offlineToClient", offline.UserID);
                    });
                }
            }
        }

        public async void Active(User user)
        {
            var onlines = _users.Where(x => user.Friends.ToString().Contains(x.UserID.ToString())).ToList();
            await Clients.All.SendAsync("checkActivesToClient", onlines.Select(x => x.UserID).ToList());
            if (onlines.Count() > 0)
            {
                onlines.ForEach(online =>
                {
                    var listStr = new List<string>();
                    listStr.Add(user.UserID.ToString());
                    Clients.Client(online.ConnectionID).SendAsync("checkActivesToClient", listStr).Wait();
                });

            }
        }

        public async void CreatePost(Post post)
        {
            var clients = _users.Where((user) =>
              user.Friends.ToString().Contains(post.UserID.ToString()));

            if (clients.Count() > 0)
            {
                clients.ToList().ForEach((client) =>
                {
                    Clients.Client(client.ConnectionID).SendAsync("createPostToClient", post);
                });
            }
        }
        public async void SendMessage(Message message)
        {
            var clients = _users.Where((user) => message.Conversation.Receiver.Contains(user.UserID.ToString()));
            message.CreatedAt = DateTime.Now;
            if (clients.Count() > 0)
            {
                clients.ToList().ForEach((client) =>
                {
                    Clients.Client(client.ConnectionID).SendAsync("sendMessageToClient", message);
                });
            }
        }


        public async void LikePost(object data, Guid id, User owner)
        {
            var listUser = new List<string>();
            listUser.Add(owner.UserID.ToString());
            listUser.AddRange(owner.Friends.ToString().Split(","));
            var clients = _users.Where((user) => listUser.Contains(user.UserID.ToString()));
            if (clients.Count() > 0)
            {
                clients.ToList().ForEach(x =>
                {
                    Clients.Client(x.ConnectionID).SendAsync("likePostToClient", data, id).Wait();
                });
            }
        }

        public async void UnlikePost(object data, Guid id, User owner)
        {
            var listUser = new List<string>();
            listUser.Add(owner.UserID.ToString());
            listUser.AddRange(owner.Friends.ToString().Split(","));
            var clients = _users.Where((user) => listUser.Contains(user.UserID.ToString()));
            if (clients.Count() > 0)
            {
                clients.ToList().ForEach(x =>
                {
                    Clients.Client(x.ConnectionID).SendAsync("unlikePostToClient", data, id);
                });
            }
        }

        public async void SendRequest(FriendRequest request)
        {
            var receiver = _users.Where((user) => user.UserID == request.Receiver).First();
            if (receiver != null)
            {
                await Clients.Client(receiver.ConnectionID).SendAsync("acceptRequestToClient", request);
            }
        }

        public async void AcceptRequest(User sender, object user)
        {
            var receiver = _users.Where((user) => user.UserID == sender.UserID).First();
            if (receiver != null)
            {
                await Clients.Client(receiver.ConnectionID).SendAsync("acceptRequestToClient", user);
            }
        }

        public async void CallUser(object data)
        {
            dynamic dataList = JsonConvert.DeserializeObject<dynamic>(data.ToString());
            var userToCall = dataList.userToCall;
            var clients = _users.Where(user => user.UserID.ToString() == userToCall.ToString()).ToList();
            clients.ForEach(client =>
            {
                Clients.Client(client.ConnectionID).SendAsync("callUserToClient", data);
            });
        }

        public async void CreateComment(object data)
        {
            await Clients.All.SendAsync("createCommentToClient", data);
        }

        public async void AnswerCall(object data)
        {
            dynamic dataList = JsonConvert.DeserializeObject<dynamic>(data.ToString());
            var to = dataList.to;
            var clients = _users.Where(user => user.UserID.ToString() == to.ToString()).ToList();
            clients.ForEach(client =>
            {
                Clients.Client(client.ConnectionID).SendAsync("callAccepted", data);
            });
        }

        public async void HideCam(object id)
        {
            await Clients.All.SendAsync("hideCamToClient", id);
        }

        public async void HideMic(object id)
        {
            await Clients.All.SendAsync("hideMicToClient", id);
        }

        public async void LeaveCall(object data)
        {
            await Clients.All.SendAsync("leaveCallToClient", data);
        }

    }
}
