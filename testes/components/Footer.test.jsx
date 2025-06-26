import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../../src/components/footer/Footer';

describe('Footer', () => {
  it('deve exibir informações do footer', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText(/CashFlow/i)).toBeInTheDocument();
    expect(screen.getByText(/todos os direitos reservados/i)).toBeInTheDocument();
  });

  it('deve exibir links de navegação', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByRole('link', { name: /política de privacidade/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /termos de serviço/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contato/i })).toBeInTheDocument();
  });
}); 
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