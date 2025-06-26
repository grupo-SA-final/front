import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TermosServico from '../../src/pages/termos-servico/TermosServico';

describe('TermosServico', () => {
  it('deve exibir título dos termos de serviço', () => {
    render(
      <MemoryRouter>
        <TermosServico />
      </MemoryRouter>
    );
    expect(screen.getByText(/termos de serviço/i)).toBeInTheDocument();
  });

  it('deve exibir conteúdo dos termos', () => {
    render(
      <MemoryRouter>
        <TermosServico />
      </MemoryRouter>
    );
    expect(screen.getByText(/aceitação dos termos/i)).toBeInTheDocument();
    expect(screen.getByText(/uso do serviço/i)).toBeInTheDocument();
  });
}); 