import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TermosServico from '../../src/pages/termos-servico/TermosServico';

describe('TermosServico', () => {
  it('deve exibir título e texto dos termos de serviço', () => {
    render(
      <MemoryRouter initialEntries={["/termos-servico"]}>
        <TermosServico />
      </MemoryRouter>
    );
    expect(screen.getByText(/termos de serviço/i)).toBeInTheDocument();
  });
}); 