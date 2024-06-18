import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; // Importe a imagem do logo

import '../styles/Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/users');
      if (!response.ok) {
        throw new Error('Erro ao buscar usuários');
      }

      const users = await response.json();
      const user = users.find(user => user.email === email && user.password === password);

      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/');
      } else {
        throw new Error('Usuário ou senha inválidos');
      }
    } catch (error) {
      setError('Erro ao fazer login. Verifique suas credenciais e tente novamente.');
    }
  };

  return (
    <div className='login-container'>
      <div className="login-form">
        <img src={logo} alt="Logo da aplicação" className="logo-login" /> {/* Logo */}
        <h2>Login WebApp</h2>
        <form onSubmit={handleSubmit}>
          <label className='form-label' htmlFor="email">E-mail:</label>
          <input
            className='form-input'
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className='form-label' htmlFor="senha">Senha:</label>
          <input
            className='form-input'
            type="password"
            name="senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}
          <button className="form-submit" type="submit">Entrar</button>
        </form>
        <span className="register-link"><Link to="/register">Não tem cadastro? Faça o cadastro</Link></span>
      </div>
    </div>
  );
}
