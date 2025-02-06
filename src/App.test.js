import { render, screen } from '@testing-library/react';
import App from './App';

test('renders SearchForm component', () => {
  render(<App />);
  expect(screen.getByTestId('search-form')).toBeInTheDocument();
});


