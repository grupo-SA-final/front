import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PoliticaPrivacidade from '../../src/pages/politica-privacidade/PoliticaPrivacidade';

describe('PoliticaPrivacidade', () => {
  it('deve exibir título da política de privacidade', () => {
    render(
      <MemoryRouter>
        <PoliticaPrivacidade />
      </MemoryRouter>
    );
    expect(screen.getByText(/política de privacidade/i)).toBeInTheDocument();
  });

  it('deve exibir conteúdo da política', () => {
    render(
      <MemoryRouter>
        <PoliticaPrivacidade />
      </MemoryRouter>
    );
    expect(screen.getByText(/informações pessoais/i)).toBeInTheDocument();
    expect(screen.getByText(/uso das informações/i)).toBeInTheDocument();
  });
}); 