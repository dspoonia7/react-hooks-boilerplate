import React from 'react';
import { render } from '@testing-library/react';
import App from '../js/App';

test('renders Search', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Search/i);
  expect(linkElement).toBeInTheDocument();
});
