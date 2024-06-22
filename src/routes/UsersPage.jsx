import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/UsersPage.css';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [ageFilter, setAgeFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/users');
        if (!response.ok) {
          throw new Error('Erro ao buscar usuários');
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      const confirmed = window.confirm('Tem certeza que deseja excluir este usuário?');
      if (confirmed) {
        await fetch(`http://localhost:3000/users/${userId}`, {
          method: 'DELETE',
        });
        setUsers(users.filter(user => user.id !== userId));
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRoleFilterChange = (event) => {
    setRoleFilter(event.target.value);
  };

  const handleAgeFilterChange = (event) => {
    setAgeFilter(event.target.value);
  };

  const handleCityFilterChange = (event) => {
    setCityFilter(event.target.value);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.role && user.role.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.age && user.age.toString().includes(ageFilter)) ||
    (user.city && user.city.toLowerCase().includes(cityFilter.toLowerCase())) ||
    (user.status && user.status.toLowerCase().includes(statusFilter.toLowerCase()))
  ).filter(user =>
    !roleFilter || (user.role && user.role.toLowerCase().includes(roleFilter.toLowerCase()))
  );

  return (
    <div className="users-page">
      <h2>Usuários</h2>

      <div className="search-filters">
        <input type="text" placeholder="Pesquisar usuários..." value={searchTerm} onChange={handleSearchChange} className="search-bar" />
        <input type="text" placeholder="Filtrar por função..." value={roleFilter} onChange={handleRoleFilterChange} className="filter-input" />
        <input type="number" placeholder="Filtrar por idade..." value={ageFilter} onChange={handleAgeFilterChange} className="filter-input" />
        <input type="text" placeholder="Filtrar por cidade..." value={cityFilter} onChange={handleCityFilterChange} className="filter-input" />
        <input type="text" placeholder="Filtrar por status..." value={statusFilter} onChange={handleStatusFilterChange} className="filter-input" />
      </div>

      {loading && <p>Carregando usuários...</p>}
      {error && <p className="error">{error}</p>}

      <ul className="users-list">
        {filteredUsers.map(user => (
          <li key={user.id}>
            <div className="user-info">
              <span className="user-detail">Nome:</span> {user.name} <br />
              <span className="user-detail">E-mail:</span> {user.email} <br />
              <span className="user-detail">Função:</span> {user.role} <br />
              <span className="user-detail">Idade:</span> {user.age} <br />
              <span className="user-detail">Cidade:</span> {user.city} <br />
              <span className="user-detail">Status:</span> {user.status} <br />
            </div>
            <div className="btn-container">
              <Link to={`/users/${user.id}`} className="edit-link">
                <button className="edit">Editar</button>
              </Link>
              <button className="delete" onClick={() => handleDeleteUser(user.id)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
      <Link to="/users/new" className="add-button">Adicionar Usuário</Link>
    </div>
  );
}

export default UsersPage;
