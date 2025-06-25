import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../../src/components/footer/Footer';

describe('Footer', () => {
  it('deve exibir links do footer', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText(/política de privacidade/i)).toBeInTheDocument();
    expect(screen.getByText(/termos de serviço/i)).toBeInTheDocument();
    expect(screen.getByText(/contato/i)).toBeInTheDocument();
  });
}); 