import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

test('renders Breadcrumbs component with items', () => {
  const items = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Details' }
  ];

  renderWithRouter(<Breadcrumbs items={items} />);

  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByText('Products')).toBeInTheDocument();
  expect(screen.getByText('Details')).toBeInTheDocument();

  expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/');
  expect(screen.getByText('Products').closest('a')).toHaveAttribute('href', '/products');

  expect(screen.getAllByText('•')).toHaveLength(2);
});
