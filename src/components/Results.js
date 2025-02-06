import React from 'react';
import { Table } from 'react-bootstrap';
import '../styles/Results.css';  

const Results = ({ results }) => {
  if (!results) return <div>No results found.</div>;

  let filmsArray = [];
  if (results.films) {
    filmsArray = results.films
      .replace(/[\[\]"]/g, '') 
      .split(',')
      .map(url => url.trim()); 
  }

  return (
    <div className="container">
      <h2>Search Results</h2>
      <Table responsive>
        <thead>
          <tr>
            <th>Type</th>
            <th>Name</th>
            <th>Count</th>
            <th>Films</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{results.type}</td>
            <td>{results.name}</td>
            <td>{results.count}</td>
            <td className="film-links">
              {filmsArray.length > 0 ? (
                filmsArray.map((film, index) => (
                  <a key={index} href={film} target="_blank" rel="noopener noreferrer">
                    Film {index + 1}
                  </a>
                ))
              ) : (
                "No films available"
              )}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Results;
