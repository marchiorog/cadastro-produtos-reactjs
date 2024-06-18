import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/UserForm.css';

export default function UserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [age, setAge] = useState(''); 
  const [city, setCity] = useState(''); 
  const [status, setStatus] = useState(''); 
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/users/${id}`)
        .then(res => res.json())
        .then(data => {
          setName(data.name);
          setEmail(data.email);
          setPassword(data.password);
          setRole(data.role);
          setAge(data.age || ''); 
          setCity(data.city || ''); 
          setStatus(data.status || ''); 
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = id ? 'PUT' : 'POST';
    const url = id ? `http://localhost:3000/users/${id}` : 'http://localhost:3000/users';
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role, age, city, status }) 
    });
    navigate('/users');
  };

  return (
    <div className="user-container">
      <div className="user-form">
        <h2>Formulário de Usuário</h2>
        <form onSubmit={handleSubmit}>
          <label className="form-label" htmlFor="name">Nome:</label>
          <input 
            type="text" 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Nome" 
            required 
          />
          
          <label className="form-label" htmlFor="email">E-mail:</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email" 
            required 
          />
          
          <label className="form-label" htmlFor="password">Senha:</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Senha" 
            required 
          />
          
          <label className="form-label" htmlFor="role">Função:</label>
          <input 
            type="text" 
            id="role" 
            value={role} 
            onChange={(e) => setRole(e.target.value)} 
            placeholder="Função" 
            required 
          />
          
          <label className="form-label" htmlFor="age">Idade:</label>
          <input 
            type="text" 
            id="age" 
            value={age} 
            onChange={(e) => setAge(e.target.value)} 
            placeholder="Idade" 
          />
          
          <label className="form-label" htmlFor="city">Cidade:</label>
          <input 
            type="text" 
            id="city" 
            value={city} 
            onChange={(e) => setCity(e.target.value)} 
            placeholder="Cidade" 
          />
          
          <label className="form-label" htmlFor="status">Status:</label>
          <input 
            type="text" 
            id="status" 
            value={status} 
            onChange={(e) => setStatus(e.target.value)} 
            placeholder="Status" 
          />
          
          <button type="submit">Salvar</button>
        </form>
      </div>
    </div>
  );
}
