import React, { useState } from 'react';
import Results from './Results';
import { Button, Alert } from 'react-bootstrap';
import '../styles/SearchForm.css'; 

const SearchForm = () => {
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setResults(null);
      setError(null);

      const response = await fetch(`http://localhost:8080/api/starwars/${type}/${name}`);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('No results found. Please try a different search.');
        } else {
          throw new Error('Something went wrong. Please try again later.');
        }
      }

      const data = await response.json();
      setResults(data);
      setType('');
      setName('');
    } catch (error) {
      setError(error.message);
      setType('');
      setName(''); 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="search-container">
      <h2 className="search-title">Star Wars Encyclopedia</h2>
      <form onSubmit={handleSubmit} className="search-form" data-testid="search-form">
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="form-control"
            required
          >
            <option value="">Select Type</option>
            <option value="planets">Planets</option>
            <option value="spaceships">Spaceships</option>
            <option value="vehicles">Vehicles</option>
            <option value="people">People</option>
            <option value="films">Films</option>
            <option value="species">Species</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            className="form-control"
            required
          />
        </div>

        <Button type="submit" className="search-btn">
          <i className="fas fa-search"></i> Search
        </Button>
      </form>

      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      {results && !error && <Results results={results} />}
    </div>
  );
};

export default SearchForm;
