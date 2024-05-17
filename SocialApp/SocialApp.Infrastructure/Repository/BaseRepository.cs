using Dapper;
using SocialApp.Domain.Interface;
using SocialApp.Infrastructure;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using static Dapper.SqlMapper;

namespace SocialApp.Infrastructure.Repository
{
    public class BaseRepository<T> : IBaseRepository<T>
    {
        protected readonly IUnitOfWork _uow;
        public virtual string TableName { get; protected set; } = typeof(T).Name;
        protected BaseRepository(IUnitOfWork unitOfWork)
        {
            _uow = unitOfWork;
        }
        public async Task<Guid> InsertAsync(T entity)
        {
            var procName = $"Proc_{TableName}_Insert";
            var parameters = new DynamicParameters();
            parameters.Add("data", JsonSerializer.Serialize(entity));
            parameters.Add("insertedID", dbType: DbType.Guid, direction: ParameterDirection.Output);
            await _uow.Connection.ExecuteAsync(procName, parameters, commandType: CommandType.StoredProcedure);
            Guid insertedID = parameters.Get<Guid>("insertedID");
            return insertedID;
        }

        public async Task<int> InsertManyAsync(List<T> entities)
        {
            var parameters = new DynamicParameters();
            var sb = new StringBuilder();
            sb.Append($"INSERT INTO {TableName} (");

            var properties = typeof(T).GetProperties();

            foreach (var property in properties)
            {
                var propertyName = $"{property.Name}";
                sb.Append($"{propertyName}, ");
            }
            sb.Remove(sb.Length - 2, 2);
            sb.Append(") VALUES");

            for (int i = 0; i < entities.Count; i++)
            {
                sb.Append(" (");

                foreach (var property in properties)
                {
                    var propertyName = $"m_{property.Name}{i}";
                    var propertyValue = property.GetValue(entities[i]);
                    parameters.Add(propertyName, propertyValue);
                    sb.Append($"@{propertyName}, ");
                }

                parameters.Add($"m_{TableName}ID{i}", Guid.NewGuid());
                parameters.Add($"m_CreatedDate{i}", DateTime.Now);
                parameters.Add($"m_CreatedBy{i}", null);
                parameters.Add($"m_ModifiedDate{i}", DateTime.Now);
                parameters.Add($"m_ModifiedBy{i}", null);
                sb.Remove(sb.Length - 2, 2);
                sb.Append("), ");
            }
            sb.Remove(sb.Length - 2, 2);

            var rowsAffect = await _uow.Connection.ExecuteAsync(sb.ToString(), parameters, commandType: CommandType.Text);
            return rowsAffect;
        }

        public async Task<int> UpdateAsync(T entity, Guid id)
        {
            var procName = $"Proc_{TableName}_Update";
            var parameters = new DynamicParameters();
            parameters.Add("data", JsonSerializer.Serialize(entity));
            parameters.Add($"v_{TableName}ID", id);
            var rowsAffected = await _uow.Connection.ExecuteAsync(procName, param: parameters, commandType: CommandType.StoredProcedure);
            return rowsAffected;
        }

        public async Task<int> UpdateManyAsync(List<T> entities)
        {
            var parameters = new DynamicParameters();
            var properties = typeof(T).GetProperties();
            var sb = new StringBuilder();
            for (int i = 0; i < entities.Count; i++)
            {
                sb.Append($"UPDATE {TableName} SET ");

                foreach (var property in properties)
                {
                    var propertyName = $"{property.Name}";
                    var propertyValue = property.GetValue(entities[i]);
                    parameters.Add($"{propertyName}{i}", propertyValue);
                    sb.Append($"{propertyName} = @{propertyName}{i}, ");

                }
                sb.Remove(sb.Length - 2, 2);
                sb.Append($" WHERE {TableName}ID = @{TableName}ID{i};");
            }

            var rowsAffect = await _uow.Connection.ExecuteAsync(sb.ToString(), parameters, commandType: CommandType.Text);
            return rowsAffect;
        }

        public async Task<int> DeleteAsync(Guid id)
        {
            var procName = $"Proc_{TableName}_Delete";
            var parameters = new DynamicParameters();
            parameters.Add($"id", id);
            var rowsAffected = await _uow.Connection.ExecuteAsync(procName, param: parameters, commandType: CommandType.StoredProcedure);
            return rowsAffected;
        }

        public async Task<int> DeleteManyAsync(List<Guid> ids)
        {
            var sql = $"DELETE FROM {TableName} WHERE {TableName}ID IN @ids;";

            var param = new DynamicParameters();
            param.Add("ids", ids);
            var result = await _uow.Connection.ExecuteAsync(sql, param, transaction: _uow.Transaction);
            return result;
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            var procName = $"Proc_{TableName}_GetAll";
            var result = await _uow.Connection.QueryAsync<T>(procName, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public async Task<T> GetByIDAsync(Guid id)
        {
            var procName = $"Proc_{TableName}_GetByID";
            var param = new DynamicParameters();
            param.Add("id", id);
            var result = await _uow.Connection.QueryFirstOrDefaultAsync<T>(procName, param, commandType: CommandType.StoredProcedure);
            return result;
        }
    }
}
