import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import GroupsPage from './GroupsPage';

test('renders GroupsPage component', () => {
  render(<GroupsPage />);
  
  expect(screen.getByText(/Accounting/i)).toBeInTheDocument();
  expect(screen.getByText(/Marketing/i)).toBeInTheDocument();
  expect(screen.getByText(/Humman Resources/i)).toBeInTheDocument(); 
});
test('modal behavior works correctly', () => {
    render(<GroupsPage />);
  
    const removeButtons = screen.getAllByRole('button', { name: '' });
    
    expect(removeButtons).toHaveLength(3); 
    
    fireEvent.click(removeButtons[1]);
  
    expect(screen.getByText(/Are you sure you want to remove this user\?/i)).toBeInTheDocument();
    
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    
    expect(screen.queryByText(/Are you sure you want to remove this user\?/i)).not.toBeInTheDocument();
    
    fireEvent.click(removeButtons[1]);
  
    fireEvent.click(screen.getByRole('button', { name: /remove/i }));
  
    expect(screen.queryByText(/Marketing/i)).not.toBeInTheDocument();
  });