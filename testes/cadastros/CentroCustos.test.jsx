import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CentroCustos from '../../src/pages/cadastros/centro-custos/CentroCustos';

describe('CentroCustos', () => {
  it('deve exibir lista de centros de custos', async () => {
    render(
      <MemoryRouter initialEntries={["/cadastros/centro-custos"]}>
        <CentroCustos />
      </MemoryRouter>
    );
    expect(await screen.findByText('Aluguel')).toBeInTheDocument();
    expect(screen.getByText('Energia')).toBeInTheDocument();
    expect(screen.getByText('Internet')).toBeInTheDocument();
  });

  it('deve exibir botão de novo centro', () => {
    render(
      <MemoryRouter initialEntries={["/cadastros/centro-custos"]}>
        <CentroCustos />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /novo centro/i })).toBeInTheDocument();
  });

  it('deve exibir botões de ação na tabela', async () => {
    render(
      <MemoryRouter initialEntries={["/cadastros/centro-custos"]}>
        <CentroCustos />
      </MemoryRouter>
    );
    await waitFor(() => {
      const editButtons = screen.getAllByTitle('Editar');
      const deleteButtons = screen.getAllByTitle('Excluir');
      expect(editButtons.length).toBeGreaterThan(0);
      expect(deleteButtons.length).toBeGreaterThan(0);
    });
  });

  it('deve exibir cabeçalho da tabela', async () => {
    render(
      <MemoryRouter initialEntries={["/cadastros/centro-custos"]}>
        <CentroCustos />
      </MemoryRouter>
    );
    expect(screen.getByText('Nome')).toBeInTheDocument();
    expect(screen.getByText('Descrição')).toBeInTheDocument();
    expect(screen.getByText('Ações')).toBeInTheDocument();
  });
}); 