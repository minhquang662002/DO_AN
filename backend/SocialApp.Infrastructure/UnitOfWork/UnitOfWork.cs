﻿using MySqlConnector;
using SocialApp.Domain.Interface;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialApp.Infrastructure
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DbConnection _connection;
        private DbTransaction? _transaction = null;
        public UnitOfWork(string connectionString)
        {
            _connection = new MySqlConnection(connectionString);
        }
        public DbConnection Connection => _connection;

        public DbTransaction? Transaction => _transaction;

        public void BeginTransaction()
        {
            if (_connection.State == System.Data.ConnectionState.Open)
            {
                _transaction = _connection.BeginTransaction();
            }
            else
            {
                _connection.Open();
                _transaction = _connection.BeginTransaction();
            }

            _transaction = _connection.BeginTransaction();
        }

        public async Task BeginTransactionAsync()
        {
            if (_connection.State == System.Data.ConnectionState.Open)
            {
                _transaction = await _connection.BeginTransactionAsync();
            }
            else
            {
                await _connection.OpenAsync();
                _transaction = await _connection.BeginTransactionAsync();
            }
        }

        public void Commit()
        {
            _transaction?.Commit();
            Dispose();
        }

        public async Task CommitAsync()
        {
            if (_transaction != null)
            {
                await _transaction.CommitAsync();
            }
            await DisposeAsync();
        }

        public void Dispose()
        {
            _transaction?.Dispose();
            _transaction = null;
            _connection.Close();
        }

        public async ValueTask DisposeAsync()
        {
            if (_transaction != null)
            {
                await _transaction.DisposeAsync();
            }
            _transaction = null;
            await _connection.CloseAsync();
        }

        public void Rollback()
        {
            _transaction?.Rollback();
            Dispose();
        }

        public async Task RollbackAsync()
        {
            if (_transaction != null)
            {
                await _transaction.RollbackAsync();
            }
            await DisposeAsync();
        }
    }
}
