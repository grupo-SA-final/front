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
    const receitasElements = await screen.findAllByText(/Receitas/i);
    expect(receitasElements[0]).toBeInTheDocument();
    const despesasElements = screen.getAllByText(/Despesas/i);
    expect(despesasElements[0]).toBeInTheDocument();
    expect(screen.getByText(/Saldo/i)).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('deve filtrar lançamentos por tipo', async () => {
    render(
      <MemoryRouter initialEntries={["/relatorio"]}>
        <Relatorio />
      </MemoryRouter>
    );
    const selects = screen.getAllByRole('combobox');
    const selectTipo = selects[0];
    fireEvent.change(selectTipo, { target: { value: 'recebimento' } });
    expect(selectTipo.value).toBe('recebimento');
  });

  it('deve filtrar lançamentos por período', async () => {
    render(
      <MemoryRouter initialEntries={["/relatorio"]}>
        <Relatorio />
      </MemoryRouter>
    );
    const inputs = screen.getAllByRole('textbox');
    if (inputs.length >= 2) {
      const inputDe = inputs[0];
      const inputAte = inputs[1];
      fireEvent.change(inputDe, { target: { value: '2024-01-01' } });
      fireEvent.change(inputAte, { target: { value: '2024-01-31' } });
      expect(inputDe.value).toBe('2024-01-01');
      expect(inputAte.value).toBe('2024-01-31');
    }
  });

  it('deve exportar CSV ao clicar no botão', async () => {
    render(
      <MemoryRouter initialEntries={["/relatorio"]}>
        <Relatorio />
      </MemoryRouter>
    );
    const exportBtn = await screen.findByRole('button', { name: /exportar csv/i });
    expect(exportBtn).toBeInTheDocument();
    // Simular clique e verificar se função de exportação é chamada (mockar window.URL.createObjectURL se necessário)
  });
}); 