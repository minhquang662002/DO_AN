using AutoMapper;
using SocialApp.Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialApp.Application
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<AuthDTO, User>();

        }
    }
}
