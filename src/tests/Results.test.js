import React from 'react';
import { render, screen } from '@testing-library/react';
import Results from '../components/Results';

describe('Results Component', () => {
  it('renders a message when no results are passed', () => {
    render(<Results />);
    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });

  it('renders the correct table when results are provided', () => {
    const results = {
      type: 'Person',
      name: 'Luke Skywalker',
      count: 1,
      films: '["https://swapi.dev/api/films/1/"]',
    };

    render(<Results results={results} />);

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Film 1')).toBeInTheDocument();
  });

  it('handles no films in results gracefully', () => {
    const results = {
      type: 'Person',
      name: 'Leia Organa',
      count: 1,
      films: '',
    };

    render(<Results results={results} />);

    expect(screen.getByText('No films available')).toBeInTheDocument();
  });
});
