import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';  
import UsersPage from './UsersPage';

describe('UsersPage Component', () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
  };

  it('should render the UsersPage without crashing', () => {
    renderWithRouter(<UsersPage />);
    const searchInputs = screen.getAllByPlaceholderText('Search');
    expect(searchInputs.length).toBeGreaterThan(0);
    expect(screen.getByText('Filters')).toBeInTheDocument();
    expect(screen.getByText('Add User')).toBeInTheDocument();
  });
  

  it('should toggle the filter section', () => {
    renderWithRouter(<UsersPage />);
    const filterButton = screen.getByText('Filters');
    fireEvent.click(filterButton);
    expect(screen.getByText('Filter by Role')).toBeInTheDocument();
    fireEvent.click(filterButton);
    expect(screen.queryByText('Filter by Role')).not.toBeInTheDocument();
  });

  it('should filter users by role', () => {
    renderWithRouter(<UsersPage />);
    const filterButton = screen.getByText('Filters');
    fireEvent.click(filterButton);

    const adminCheckbox = screen.getByLabelText('Admin');
    fireEvent.click(adminCheckbox);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
  });

  it('should select and deselect all users', () => {
    renderWithRouter(<UsersPage />);
  
    const selectAllCheckbox = screen.getAllByRole('checkbox')[0];
    
    expect(selectAllCheckbox).toBeInTheDocument();
  
    fireEvent.click(selectAllCheckbox);
    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach((checkbox) => expect(checkbox).toBeChecked());
  
    fireEvent.click(selectAllCheckbox);
    checkboxes.forEach((checkbox) => expect(checkbox).not.toBeChecked());
  });
  
  
  
  
  
});
