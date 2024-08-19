import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import FilesPage from './FilesPage';
import files from '../../assests/files.png';

test('renders FilesPage component', () => {
  render(<FilesPage />);
  
  const image = screen.getByRole('img', { name: /files/i });
  expect(image).toBeInTheDocument();
  expect(image).toHaveAttribute('src', files);
  expect(image).toHaveAttribute('alt', 'Files');
  
  expect(screen.getByText(/There are no files for this user/i)).toBeInTheDocument();
});
