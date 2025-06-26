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
    expect(await screen.findByText('Venda')).toBeInTheDocument();
    expect(screen.getByText('Compra')).toBeInTheDocument();
    expect(screen.getByText('Despesa Fixa')).toBeInTheDocument();
  });

  it('deve cadastrar novo lançamento', async () => {
    render(
      <MemoryRouter initialEntries={["/lancamento"]}>
        <Lancamento />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: /novo lançamento/i }));
    fireEvent.change(screen.getByLabelText(/descrição/i), { target: { value: 'Recebimento Extra' } });
    fireEvent.change(screen.getByLabelText(/valor/i), { target: { value: '1500' } });
    fireEvent.change(screen.getByLabelText(/tipo/i), { target: { value: 'recebimento' } });
    fireEvent.change(screen.getByLabelText(/conta bancária/i), { target: { value: 'Banco XPTO' } });
    fireEvent.change(screen.getByLabelText(/receita/i), { target: { value: 'Salário' } });
    fireEvent.change(screen.getByLabelText(/data/i), { target: { value: '2024-01-15' } });
    fireEvent.click(screen.getByRole('button', { name: /salvar lançamento/i }));
    await waitFor(() => {
      expect(screen.getByText(/lançamento cadastrado com sucesso/i)).toBeInTheDocument();
    });
  });

  it('deve editar um lançamento', async () => {
    render(
      <MemoryRouter initialEntries={["/lancamento"]}>
        <Lancamento />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByTestId('edit-lancamento-2'));
    fireEvent.change(screen.getByLabelText(/descrição/i), { target: { value: 'Compra de Material' } });
    fireEvent.click(screen.getByRole('button', { name: /salvar lançamento/i }));
    await waitFor(() => {
      expect(screen.getByText(/lançamento atualizado com sucesso/i)).toBeInTheDocument();
    });
  });

  it('deve excluir um lançamento', async () => {
    render(
      <MemoryRouter initialEntries={["/lancamento"]}>
        <Lancamento />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByTestId('delete-lancamento-3'));
    fireEvent.click(screen.getByRole('button', { name: /confirmar/i }));
    await waitFor(() => {
      expect(screen.getByText(/lançamento excluído com sucesso/i)).toBeInTheDocument();
    });
  });
}); 