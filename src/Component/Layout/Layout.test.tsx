import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Layout from './Layout';

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

test('renders Layout component with children and logout link', () => {
  renderWithRouter(
    <Layout>
      <div>Test Child</div>
    </Layout>
  );

  expect(screen.getByText('Test Child')).toBeInTheDocument();

});
