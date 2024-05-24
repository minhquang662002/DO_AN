using AutoMapper;
using SocialApp.Application.Interface;
using SocialApp.Domain.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Dapper.SqlMapper;

namespace SocialApp.Application.Service
{
    public class BaseService<T> : IBaseService<T>
    {
        protected readonly IBaseRepository<T> _baseRepository;
        protected readonly IMapper _mapper;
        protected BaseService(IBaseRepository<T> baseRepository, IMapper mapper)
        {
            _baseRepository = baseRepository;
            _mapper = mapper;
        }

        /// <summary>
        /// Tạo bản ghi mới
        /// </summary>
        /// <param name="entityCreateDTO"></param>
        /// <returns></returns>
        /// CreatedBy: lmquang (17/07/2023)
        public virtual async Task<Guid> InsertAsync(T entityCreateDTO)
        {
            // Insert db
            return await _baseRepository.InsertAsync(entityCreateDTO);

        }

        /// <summary>
        /// Cập nhật bản ghi
        /// </summary>
        /// <param name="id">ID bản ghi</param>
        /// <param name="entityUpdateDTO">Thông tin bản ghi</param>
        /// <returns></returns>
        /// CreatedBy: lmquang (17/07/2023)
        public async Task UpdateAsync(Guid id, T entityUpdateDTO)
        {

            // Insert db
            await _baseRepository.UpdateAsync(entityUpdateDTO, id);
        }

        /// <summary>
        /// Xóa bản ghi
        /// </summary>
        /// <param name="id">ID bản ghi</param>
        /// <returns></returns>
        /// CreatedBy: lmquang (17/07/2023)
        public async Task DeleteAsync(Guid id)
        {

            var rowsAffected = await _baseRepository.DeleteAsync(id);
        }

        /// <summary>
        /// Xóa nhiều bản ghi
        /// </summary>
        /// <param name="ids">Danh sách id</param>
        /// <returns></returns>
        /// CreatedBy: lmquang (17/07/2023)
        public async Task<int> DeleteManyAsync(List<Guid> ids)
        {
            var result = await _baseRepository.DeleteManyAsync(ids);
            return result;
        }

        public async Task<int> UpdateManyAsync(List<T> entities)
        {
            var mappedEntities = _mapper.Map<List<T>>(entities);
            var result = await _baseRepository.UpdateManyAsync(mappedEntities);
            return result;
        }

    }
}
