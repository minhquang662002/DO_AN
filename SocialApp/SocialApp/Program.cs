using Microsoft.AspNetCore.Hosting;
using MySqlConnector;
using SocialApp.Application;
using SocialApp.Application.Interface;
using SocialApp.Application.Service;
using SocialApp.Domain.Interface;
using SocialApp.Infrastructure;
using SocialApp.Infrastructure.Repository;
using SocialApp.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddSignalR();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddMySqlDataSource(builder.Configuration.GetConnectionString("Default")!);
var connectionString = builder.Configuration.GetConnectionString("Default")!;
builder.Services.AddScoped<IUnitOfWork>(option => new UnitOfWork(connectionString));
builder.Services.AddTransient<IAuthService, AuthService>();
builder.Services.AddTransient<IUserService, UserService>();
builder.Services.AddTransient<IPostService, PostService>();
builder.Services.AddTransient<ICommentService, CommentService>();
builder.Services.AddTransient<IFriendService, FriendService>();
builder.Services.AddTransient<IFriendRepository, FriendRepository>();
builder.Services.AddTransient<IMessageService, MessageService>();
builder.Services.AddTransient<IMessageRepository, MessageRepository>();
builder.Services.AddTransient<INotificationRepository, NotificationRepository>();
builder.Services.AddTransient<INotificationService, NotificationService>();
builder.Services.AddTransient<IConversationRepository, ConversationRepository>();
builder.Services.AddTransient<IAuthRepository, AuthRepository>();
builder.Services.AddTransient<IPostRepository, PostRepository>();
builder.Services.AddTransient<IUserRepository, UserRepository>();
builder.Services.AddTransient<ICommentRepository, CommentRepository>();
builder.Services.AddTransient<IHttpContextAccessor, HttpContextAccessor>();


var app = builder.Build();
app.UseCors(x => x
              .AllowAnyMethod()
              .AllowAnyHeader()
              .SetIsOriginAllowed(origin => true) // allow any origin
              .AllowCredentials()); // allow credentials




// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseWhen(context => !context.Request.Path.StartsWithSegments("/api/Auth") && !context.Request.Path.ToString().Contains("negotiate") && !context.Request.Path.ToString().Contains("Online") || context.Request.Path.ToString().Contains("user-info"), appBuilder => { appBuilder.UseMiddleware<AuthMiddleware>(); });

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapHub<ChatHub>("/Message");
app.MapHub<AuthHub>("/Online");

app.Run();
