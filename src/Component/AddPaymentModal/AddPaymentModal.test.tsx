import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddPaymentModal from './AddPaymentModal';

describe('AddPaymentModal', () => {
  test('renders modal content when isOpen is true', () => {
    render(<AddPaymentModal isOpen={true} onClose={() => {}} />);

    expect(screen.getByText('Add a New Payment')).toBeInTheDocument();
    expect(screen.getByLabelText('Payment date')).toBeInTheDocument();
    expect(screen.getByLabelText('Paid amount')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Payment date') as HTMLInputElement, { target: { value: '2024-08-19' } });
    fireEvent.change(screen.getByLabelText('Paid amount') as HTMLInputElement, { target: { value: '100' } });
    fireEvent.click(screen.getByLabelText('Another reason') as HTMLInputElement);
    fireEvent.change(screen.getByPlaceholderText('Type the reason here') as HTMLTextAreaElement, { target: { value: 'Special reason' } });

    expect((screen.getByLabelText('Payment date') as HTMLInputElement).value).toBe('2024-08-19');
    expect((screen.getByLabelText('Paid amount') as HTMLInputElement).value).toBe('100');
    expect((screen.getByPlaceholderText('Type the reason here') as HTMLTextAreaElement).value).toBe('Special reason');

    expect(screen.getByRole('button', { name: /Save/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
  });
  
});
