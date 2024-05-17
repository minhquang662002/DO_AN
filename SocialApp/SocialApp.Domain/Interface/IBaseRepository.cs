using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialApp.Domain.Interface
{
    public interface IBaseRepository<T>
    {
        Task<IEnumerable<T>> GetAllAsync();

        Task<T> GetByIDAsync(Guid id);
        Task<Guid> InsertAsync(T entity);
        Task<int> InsertManyAsync(List<T> entities);
        Task<int> UpdateAsync(T entity, Guid id);
        Task<int> UpdateManyAsync(List<T> entities);
        Task<int> DeleteAsync(Guid id);
        Task<int> DeleteManyAsync(List<Guid> entities);
    }
}
