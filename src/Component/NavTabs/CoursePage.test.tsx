import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CoursesPage from './CoursesPage';
import { BrowserRouter } from 'react-router-dom';

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

test('renders filtered courses based on date range', () => {
  renderWithRouter(<CoursesPage fromDate="2024-01-01" toDate="2024-02-01" />);

  expect(screen.getByText('Accounting')).toBeInTheDocument();
  expect(screen.getByText('Marketing')).toBeInTheDocument();
  expect(screen.queryByText('Human Resources')).not.toBeInTheDocument();
});

  test('opens and closes the delete modal', () => {
    renderWithRouter(<CoursesPage fromDate="" toDate="" />);
  
    const removeButton = screen.getAllByTestId('remove-course-btn')[0];
    fireEvent.click(removeButton);
  
    expect(screen.getByText(/Are you sure you want to remove this user?/)).toBeInTheDocument();
  
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(screen.queryByText(/Are you sure you want to remove this user?/)).not.toBeInTheDocument();
  });
  
test('removes a course when the remove button is clicked and confirmed', () => {
    renderWithRouter(<CoursesPage fromDate="" toDate="" />);
  
    const removeButton = screen.getAllByTestId('remove-course-btn')[0];
    fireEvent.click(removeButton);
  
    fireEvent.click(screen.getByRole('button', { name: /remove/i }));
  
    expect(screen.queryByText('Accounting')).not.toBeInTheDocument();
  });


  
  
  
  
  
  
  
  
