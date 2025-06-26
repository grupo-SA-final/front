import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ContasBancarias from '../../src/pages/cadastros/contas-bancarias/ContasBancarias';

describe('ContasBancarias', () => {
  it('deve exibir lista de contas bancárias', async () => {
    render(
      <MemoryRouter initialEntries={["/cadastros/contas-bancarias"]}>
        <ContasBancarias />
      </MemoryRouter>
    );
    expect(await screen.findByText('Banco XPTO')).toBeInTheDocument();
    expect(screen.getByText('Banco Teste')).toBeInTheDocument();
    expect(screen.getByText('Banco Remover')).toBeInTheDocument();
  });

  it('deve exibir botão de nova conta bancária', () => {
    render(
      <MemoryRouter initialEntries={["/cadastros/contas-bancarias"]}>
        <ContasBancarias />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /nova conta/i })).toBeInTheDocument();
  });

  it('deve exibir botões de ação na tabela', async () => {
    render(
      <MemoryRouter initialEntries={["/cadastros/contas-bancarias"]}>
        <ContasBancarias />
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
      <MemoryRouter initialEntries={["/cadastros/contas-bancarias"]}>
        <ContasBancarias />
      </MemoryRouter>
    );
    expect(screen.getByText('Banco')).toBeInTheDocument();
    expect(screen.getByText('Tipo')).toBeInTheDocument();
    expect(screen.getByText('Agência')).toBeInTheDocument();
    expect(screen.getByText('Número Conta')).toBeInTheDocument();
    expect(screen.getByText('Descrição')).toBeInTheDocument();
    expect(screen.getByText('Ações')).toBeInTheDocument();
  });
}); 