import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomeDeslogada from '../../src/pages/home/HomeDeslogada';

describe('HomeDeslogada', () => {
  it('deve exibir informações da aplicação', () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <HomeDeslogada />
      </MemoryRouter>
    );
    expect(screen.getByText(/CashFlow/i)).toBeInTheDocument();
    expect(screen.getByText(/gerenciamento financeiro/i)).toBeInTheDocument();
  });

  it('deve exibir botões de ação', () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <HomeDeslogada />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /começar agora/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /saiba mais/i })).toBeInTheDocument();
  });
}); 