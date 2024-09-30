import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';
import '@testing-library/jest-dom';

jest.mock('../../assests/dashborad.png', () => 'mock-dashboard-image');
jest.mock('../../assests/expand-arrows 1.png', () => 'mock-arrow-image');
jest.mock('../../assests/3 User.png', () => 'mock-three-users-image');
jest.mock('../../assests/cloud-storage-svgrepo-com 1.png', () => 'mock-cloud-image');
jest.mock('../../assests/3Users.png', () => 'mock-three-color-image');

describe('Dashboard Component', () => {
  test('should render the search input', () => {
    render(<Dashboard />);
    
    const searchInput = screen.getByPlaceholderText(/search/i);
    expect(searchInput).toBeInTheDocument();
  });

  test('should render the overview section when data is present', () => {
    render(<Dashboard />);
    const overviewHeading = screen.getByText(/overview/i);
    expect(overviewHeading).toBeInTheDocument();
  });

  test('should display timeline data when available', () => {
    render(<Dashboard />);
    const timelineItems = screen.getAllByText(/you signed in/i);
    expect(timelineItems.length).toBeGreaterThan(0); 
  });

  test('should display the quick actions buttons', () => {
    render(<Dashboard />);
    const addUserButton = screen.getByText(/add user/i);
    const addGroupButton = screen.getByText(/add group/i);
    const addCourseButton = screen.getByText(/add course/i);

    expect(addUserButton).toBeInTheDocument();
    expect(addGroupButton).toBeInTheDocument();
    expect(addCourseButton).toBeInTheDocument();
  });

  it('should render the correct icons in the overview section', () => {
    const { container } = render(<Dashboard />);
    
    const totalStudentsIcon = container.querySelector('img[alt="Total Students"]');
    expect(totalStudentsIcon).toBeInTheDocument();
  
    const totalInstructorsIcon = container.querySelector('svg[aria-label="total instructors"]');
    expect(totalInstructorsIcon).toBeInTheDocument();
  
    const totalCoursesIcon = container.querySelector('svg[aria-label="total Courses"]');
    expect(totalCoursesIcon).toBeInTheDocument();
  
    const invitationsIcon = container.querySelector('svg[aria-label="Invitations left"]');
    expect(invitationsIcon).toBeInTheDocument();
  
    const liveMinutesIcon = container.querySelector('svg[aria-label="total instructors"]');
    expect(liveMinutesIcon).toBeInTheDocument();
  });
  
  
  
  
});
