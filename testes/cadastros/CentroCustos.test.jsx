import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CentroCustos from '../../src/pages/cadastros/centro-custos/CentroCustos';

describe('CentroCustos', () => {
  beforeEach(() => {
    global.fetch = jest.fn((url) => {
      if (url.includes('/api/centros-de-custo')) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ data: [
          { id: 1, nome: 'Aluguel' },
          { id: 2, nome: 'Energia' },
          { id: 3, nome: 'Internet' }
        ] }) });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
    });
  });
  afterEach(() => { global.fetch.mockRestore(); });

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

  it('deve cadastrar novo centro de custo', async () => {
    render(
      <MemoryRouter initialEntries={["/cadastros/centro-custos"]}>
        <CentroCustos />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: /novo centro de custo/i }));
    fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: 'Transporte' } });
    fireEvent.click(screen.getByRole('button', { name: /salvar/i }));
    await waitFor(() => {
      expect(screen.getByText(/centro de custo cadastrado com sucesso/i)).toBeInTheDocument();
    });
  });

  it('deve editar um centro de custo', async () => {
    render(
      <MemoryRouter initialEntries={["/cadastros/centro-custos"]}>
        <CentroCustos />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByTestId('edit-centro-2'));
    fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: 'Energia Elétrica' } });
    fireEvent.click(screen.getByRole('button', { name: /salvar/i }));
    await waitFor(() => {
      expect(screen.getByText(/centro de custo atualizado com sucesso/i)).toBeInTheDocument();
    });
  });

  it('deve excluir um centro de custo', async () => {
    render(
      <MemoryRouter initialEntries={["/cadastros/centro-custos"]}>
        <CentroCustos />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByTestId('delete-centro-3'));
    fireEvent.click(screen.getByRole('button', { name: /confirmar/i }));
    await waitFor(() => {
      expect(screen.getByText(/centro de custo excluído com sucesso/i)).toBeInTheDocument();
    });
  });
}); 