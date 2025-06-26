import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Lancamento from '../../src/pages/lancamento/Lancamento';

describe('Lancamento', () => {
  beforeEach(() => {
    global.fetch = jest.fn((url) => {
      if (url.includes('/api/lancamentos')) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ data: [
          { id: 1, descricao: 'Venda', tipo: 'recebimento', valor: 1000, contaBancariaNome: 'Banco XPTO', receitaNome: 'Salário', data: '2024-01-10' },
          { id: 2, descricao: 'Compra', tipo: 'pagamento', valor: 500, contaBancariaNome: 'Banco XPTO', centroDeCustoNome: 'Material', data: '2024-01-11' },
          { id: 3, descricao: 'Despesa Fixa', tipo: 'pagamento', valor: 200, contaBancariaNome: 'Banco XPTO', centroDeCustoNome: 'Fixa', data: '2024-01-12' }
        ] }) });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
    });
  });
  afterEach(() => { global.fetch.mockRestore(); });

  it('deve exibir lista de lançamentos', async () => {
    render(
      <MemoryRouter initialEntries={["/lancamento"]}>
        <Lancamento />
      </MemoryRouter>
    );
    expect(await screen.findByText('Receita 1')).toBeInTheDocument();
    expect(screen.getByText('Despesa 1')).toBeInTheDocument();
  });

  it('deve exibir botão de novo lançamento', () => {
    render(
      <MemoryRouter initialEntries={["/lancamento"]}>
        <Lancamento />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /novo lançamento/i })).toBeInTheDocument();
  });

  it('deve exibir botões de ação na tabela', async () => {
    render(
      <MemoryRouter initialEntries={["/lancamento"]}>
        <Lancamento />
      </MemoryRouter>
    );
    await waitFor(() => {
      const editButtons = screen.getAllByTitle('Editar');
      const deleteButtons = screen.getAllByTitle('Excluir');
      const markAsPaidButtons = screen.getAllByTitle('Marcar como Pago');
      expect(editButtons.length).toBeGreaterThan(0);
      expect(deleteButtons.length).toBeGreaterThan(0);
      expect(markAsPaidButtons.length).toBeGreaterThan(0);
    });
  });

  it('deve exibir cabeçalho da tabela', async () => {
    render(
      <MemoryRouter initialEntries={["/lancamento"]}>
        <Lancamento />
      </MemoryRouter>
    );
    expect(screen.getByText('Descrição')).toBeInTheDocument();
    expect(screen.getByText('Tipo')).toBeInTheDocument();
    expect(screen.getByText('Conta')).toBeInTheDocument();
    expect(screen.getByText('Valor')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Data')).toBeInTheDocument();
    expect(screen.getByText('Ações')).toBeInTheDocument();
  });
}); 