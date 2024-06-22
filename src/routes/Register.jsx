import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; // Importe a imagem do logo
import '../styles/Register.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/users/${id}`)
        .then(res => res.json())
        .then(data => {
          setName(data.name);
          setEmail(data.email);
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 

    try {
      const method = id ? 'PUT' : 'POST';
      const url = id ? `http://localhost:3000/users/${id}` : 'http://localhost:3000/users';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar usuário');
      }

      const data = await response.json();

      alert('Usuário criado com sucesso!');
      
      setName('');
      setEmail('');
      setPassword('');

      setTimeout(() => {
        navigate('/login');
      }, 1000);

    } catch (error) {
      setError('Erro ao fazer o cadastro. Verifique os dados e tente novamente.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <img src={logo} alt="Logo da aplicação" className="logo-register" /> 
        <h2>Cadastro WebApp</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label className='form-label' htmlFor="email">Nome completo:</label>
          <input type="text" className="form-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome" required />
          <label className='form-label' htmlFor="email">E-mail:</label>
          <input type="email" className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          <label className='form-label' htmlFor="senha">Senha:</label>
          <input type="password" className="form-input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" required />
          <button type="submit" className="form-submit">Salvar</button>
        </form>
        <span className="login-link"><Link to="/login">Já possui login? Faça o login</Link></span>
      </div>
    </div>
  );
}
