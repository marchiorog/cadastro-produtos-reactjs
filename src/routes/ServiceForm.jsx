import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ServiceForm.css';

export default function ServiceForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/services/${id}`)
        .then(res => res.json())
        .then(data => {
          setName(data.name);
          setDescription(data.description);
          setPrice(data.price);
          setDuration(data.duration);
          setCategory(data.category);
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = id ? 'PUT' : 'POST';
    const url = id ? `http://localhost:3000/services/${id}` : 'http://localhost:3000/services';
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, price, duration, category })
    });
    navigate('/services');
  };

  return (
    <div className="service-container">
      <div className="service-form">
        <h2>Formulário de Serviço</h2>
        <form onSubmit={handleSubmit}>
          <label className="form-label" htmlFor="name">Nome:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome" required />
          
          <label className="form-label" htmlFor="description">Descrição:</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descrição" required />
          
          <label className="form-label" htmlFor="price">Preço:</label>
          <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Preço" required />
          
          <label className="form-label" htmlFor="duration">Duração (minutos):</label>
          <input type="number" id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Duração" required />
          
          <label className="form-label" htmlFor="category">Categoria:</label>
          <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Categoria" required />
          
          <button type="submit">Salvar</button>
        </form>
      </div>
    </div>
  );
}
