import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">WebApp</Link>
      <ul className="navbar-links">
        <li><Link to="/services">Serviços</Link></li>
        <li><Link to="/users">Usuários</Link></li>
        <li><Link to="/login">Sair</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
