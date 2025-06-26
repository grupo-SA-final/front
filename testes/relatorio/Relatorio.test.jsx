import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Relatorio from '../../src/pages/relatorio/Relatorio';

describe('Relatorio', () => {
  beforeEach(() => {
    // Mockar fetch de dados auxiliares e lançamentos
    global.fetch = jest.fn((url) => {
      if (url.includes('/api/contas-bancarias')) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ data: [{ id: 1, nomeBanco: 'Banco Teste' }] }) });
      }
      if (url.includes('/api/receitas')) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ data: [{ id: 1, nome: 'Receita Teste' }] }) });
      }
      if (url.includes('/api/centros-de-custo')) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ data: [{ id: 1, nome: 'Centro Teste' }] }) });
      }
      if (url.includes('/api/lancamentos')) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ data: [
          { id: 1, data: '2024-01-10', descricao: 'Receita 1', tipo: 'recebimento', valor: 100, contaBancariaNome: 'Banco Teste', receitaNome: 'Receita Teste' },
          { id: 2, data: '2024-01-15', descricao: 'Despesa 1', tipo: 'pagamento', valor: 50, contaBancariaNome: 'Banco Teste', centroDeCustoNome: 'Centro Teste' }
        ] }) });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
    });
  });
  afterEach(() => { global.fetch.mockRestore(); });

  it('deve exibir cards de resumo e tabela', async () => {
    render(
      <MemoryRouter initialEntries={["/relatorio"]}>
        <Relatorio />
      </MemoryRouter>
    );
    expect(await screen.findByText('Relatórios')).toBeInTheDocument();
    expect(screen.getByText(/Despesas/i)).toBeInTheDocument();
    expect(screen.getByText(/Saldo/i)).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('deve filtrar lançamentos por tipo', async () => {
    render(
      <MemoryRouter initialEntries={["/relatorio"]}>
        <Relatorio />
      </MemoryRouter>
    );
    const selectTipo = await screen.findByDisplayValue('Todos');
    fireEvent.change(selectTipo, { target: { value: 'recebimento' } });
    expect(screen.getByText('Receita 1')).toBeInTheDocument();
    expect(screen.queryByText('Despesa 1')).not.toBeInTheDocument();
  });

  it('deve filtrar lançamentos por período', async () => {
    render(
      <MemoryRouter initialEntries={["/relatorio"]}>
        <Relatorio />
      </MemoryRouter>
    );
    const inputs = screen.getAllByDisplayValue('');
    const inputDe = inputs[0];
    const inputAte = inputs[1];
    fireEvent.change(inputDe, { target: { value: '2024-01-01' } });
    fireEvent.change(inputAte, { target: { value: '2024-01-31' } });
    expect(screen.getByText('Receita 1')).toBeInTheDocument();
    expect(screen.getByText('Despesa 1')).toBeInTheDocument();
  });

  it('deve exibir botão de exportar', async () => {
    render(
      <MemoryRouter initialEntries={["/relatorio"]}>
        <Relatorio />
      </MemoryRouter>
    );
    expect(await screen.findByRole('button', { name: /exportar csv/i })).toBeInTheDocument();
  });
}); 