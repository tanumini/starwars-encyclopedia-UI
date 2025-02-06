import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchForm from '../components/SearchForm';
import fetch from 'node-fetch'; 

jest.mock('node-fetch'); 

describe('SearchForm Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders the search form', () => {
    render(<SearchForm />);
    expect(screen.getByLabelText(/type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  });

  test('submits the form and displays results', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ type: 'planet', name: 'Tatooine', count: 1, films: [] }),
    });
  
    render(<SearchForm />);
  
    fireEvent.change(screen.getByLabelText(/type/i), { target: { value: 'planets' } });
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Tatooine' } });
    fireEvent.click(screen.getByText(/search/i));
  
    await waitFor(() => screen.getByText((content, element) => element.textContent.includes('Tatooine')));

    expect(screen.getByText(/Tatooine/i)).toBeInTheDocument();
  });
  

  test('displays error message on failed fetch', async () => {
    fetch.mockRejectedValueOnce(new Error('Something went wrong'));
  
    render(<SearchForm />);
  
    fireEvent.change(screen.getByLabelText(/type/i), { target: { value: 'planets' } });
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Tatooine' } });
    fireEvent.click(screen.getByText(/search/i));
  
    await waitFor(() => expect(screen.getByText(/Network request failed/i)).toBeInTheDocument());
  });
});
