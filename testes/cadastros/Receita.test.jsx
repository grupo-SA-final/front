import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Receita from '../../src/pages/cadastros/receita/Receita';

describe('Receita', () => {
  beforeEach(() => {
    global.fetch = jest.fn((url) => {
      if (url.includes('/api/receitas')) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ data: [
          { id: 1, nome: 'Salário' },
          { id: 2, nome: 'Freelance' },
          { id: 3, nome: 'Investimento' }
        ] }) });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
    });
  });
  afterEach(() => { global.fetch.mockRestore(); });

  it('deve exibir lista de receitas', async () => {
    render(
      <MemoryRouter initialEntries={["/cadastros/receita"]}>
        <Receita />
      </MemoryRouter>
    );
    expect(await screen.findByText('Salário')).toBeInTheDocument();
    expect(screen.getByText('Freelance')).toBeInTheDocument();
    expect(screen.getByText('Investimento')).toBeInTheDocument();
  });

  it('deve cadastrar nova receita', async () => {
    render(
      <MemoryRouter initialEntries={["/cadastros/receita"]}>
        <Receita />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: /nova receita/i }));
    fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: 'Bônus' } });
    fireEvent.click(screen.getByRole('button', { name: /salvar/i }));
    await waitFor(() => {
      expect(screen.getByText(/receita cadastrada com sucesso/i)).toBeInTheDocument();
    });
  });

  it('deve editar uma receita', async () => {
    render(
      <MemoryRouter initialEntries={["/cadastros/receita"]}>
        <Receita />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByTestId('edit-receita-2'));
    fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: 'Freelancer' } });
    fireEvent.click(screen.getByRole('button', { name: /salvar/i }));
    await waitFor(() => {
      expect(screen.getByText(/receita atualizada com sucesso/i)).toBeInTheDocument();
    });
  });

  it('deve excluir uma receita', async () => {
    render(
      <MemoryRouter initialEntries={["/cadastros/receita"]}>
        <Receita />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByTestId('delete-receita-3'));
    fireEvent.click(screen.getByRole('button', { name: /confirmar/i }));
    await waitFor(() => {
      expect(screen.getByText(/receita excluída com sucesso/i)).toBeInTheDocument();
    });
  });
}); 