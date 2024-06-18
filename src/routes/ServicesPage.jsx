import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ServicesPage.css';

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minDuration, setMinDuration] = useState('');
  const [maxDuration, setMaxDuration] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:3000/services');
        if (!response.ok) {
          throw new Error('Erro ao buscar serviços');
        }
        const data = await response.json();
        setServices(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleDeleteService = async (serviceId) => {
    try {
      const confirmed = window.confirm('Tem certeza que deseja excluir este serviço?');
      if (confirmed) {
        await fetch(`http://localhost:3000/services/${serviceId}`, {
          method: 'DELETE',
        });
        setServices(services.filter(service => service.id !== serviceId));
      }
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const handleMinDurationChange = (event) => {
    setMinDuration(event.target.value);
  };

  const handleMaxDurationChange = (event) => {
    setMaxDuration(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortKey(event.target.value);
  };

  const filteredServices = services.filter(service => 
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(service => 
    (!minPrice || service.price >= minPrice) && 
    (!maxPrice || service.price <= maxPrice) &&
    (!minDuration || service.duration >= minDuration) && 
    (!maxDuration || service.duration <= maxDuration) &&
    (!categoryFilter || service.category.toLowerCase().includes(categoryFilter.toLowerCase()))
  ).sort((a, b) => {
    if (sortKey === 'name') return a.name.localeCompare(b.name);
    if (sortKey === 'price') return a.price - b.price;
    if (sortKey === 'duration') return a.duration - b.duration;
    return 0;
  });

  return (
    <div className="services-page">
      <h2>Serviços Disponíveis</h2>
      
      <div className="search-filters">
        <input 
          type="text" 
          placeholder="Pesquisar serviços..." 
          value={searchTerm} 
          onChange={handleSearchChange} 
          className="search-bar"
        />
        <input 
          type="number" 
          placeholder="Preço mínimo" 
          value={minPrice} 
          onChange={handleMinPriceChange} 
          className="filter-input"
        />
        <input 
          type="number" 
          placeholder="Preço máximo" 
          value={maxPrice} 
          onChange={handleMaxPriceChange} 
          className="filter-input"
        />
        <input 
          type="number" 
          placeholder="Duração mínima" 
          value={minDuration} 
          onChange={handleMinDurationChange} 
          className="filter-input"
        />
        <input 
          type="number" 
          placeholder="Duração máxima" 
          value={maxDuration} 
          onChange={handleMaxDurationChange} 
          className="filter-input"
        />
        <input 
          type="text" 
          placeholder="Categoria" 
          value={categoryFilter} 
          onChange={handleCategoryChange} 
          className="filter-input"
        />
        <select onChange={handleSortChange} className="sort-select">
          <option value="">Ordenar por</option>
          <option value="name">Nome</option>
          <option value="price">Preço</option>
          <option value="duration">Duração</option>
        </select>
      </div>

      {loading && <p>Carregando serviços...</p>}
      {error && <p className="error">{error}</p>}
      
      <ul className="services-list">
        {filteredServices.map(service => (
          <li key={service.id}>
            <div className="service-info">
              <h3>{service.name}</h3>
              <div className="service-actions">
                <Link to={`/services/${service.id}`} className="edit-button">Editar</Link>
                <button onClick={() => handleDeleteService(service.id)} className="delete-button">Excluir</button>
              </div>
            </div>
            <p>{service.description}</p>
            <p>Preço: R${service.price.toFixed(2)}</p>
            <p>Duração: {service.duration} minutos</p>
            <p>Categoria: {service.category}</p>
          </li>
        ))}
      </ul>

      <Link to="/services/new" className="add-button">Adicionar Serviço</Link>
    </div>
  );
}
