import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import InfoPage from './InfoPage';

const mockUserData = {
  phone: '123-456-7890',
  email: 'user@example.com',
  role: 'Administrator',
  registration: '2023-01-01',
  lastLogin: '2023-08-17',
};

test('renders InfoPage component with user data', () => {
  render(<InfoPage userData={mockUserData} />);
  
  expect(screen.getByText(/Phone/i)).toBeInTheDocument();
  expect(screen.getByText(/Email/i)).toBeInTheDocument();
  expect(screen.getByText(/Role/i)).toBeInTheDocument();
  expect(screen.getByText(/Registration Date/i)).toBeInTheDocument();
  expect(screen.getByText(/Last Login/i)).toBeInTheDocument();
  
  expect(screen.getByText(mockUserData.phone)).toBeInTheDocument();
  expect(screen.getByText(mockUserData.email)).toBeInTheDocument();
  expect(screen.getByText(mockUserData.role)).toBeInTheDocument();
  expect(screen.getByText(mockUserData.registration)).toBeInTheDocument();
  expect(screen.getByText(mockUserData.lastLogin)).toBeInTheDocument();
});
