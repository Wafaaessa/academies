import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashoard from './Dashboard'; 
import "@testing-library/jest-dom";

test('renders Dashoard component with expected elements', () => {
    render(<Dashoard />);

    const searchInput = screen.getByPlaceholderText('Search');
    expect(searchInput).toBeInTheDocument();

    const image = screen.getByAltText('Files');
    expect(image).toBeInTheDocument();

    const noResultsText = screen.getByText('No results found');
    expect(noResultsText).toBeInTheDocument();
});
