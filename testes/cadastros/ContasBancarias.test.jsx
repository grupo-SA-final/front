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
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ContasBancarias from '../../src/pages/cadastros/contas-bancarias/ContasBancarias';

describe('ContasBancarias', () => {
  beforeEach(() => {
    global.fetch = jest.fn((url) => {
      if (url.includes('/api/contas-bancarias')) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ data: [
          { id: 1, nomeBanco: 'Banco XPTO', agencia: '1234', conta: '56789-0' },
          { id: 2, nomeBanco: 'Banco Teste', agencia: '1111', conta: '22222-2' },
          { id: 3, nomeBanco: 'Banco Remover', agencia: '3333', conta: '44444-4' }
        ] }) });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
    });
  });
  afterEach(() => { global.fetch.mockRestore(); });

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

  it('deve cadastrar nova conta bancária', async () => {
    render(
      <MemoryRouter initialEntries={["/cadastros/contas-bancarias"]}>
        <ContasBancarias />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: /nova conta bancária/i }));
    fireEvent.change(screen.getByLabelText(/banco/i), { target: { value: 'Banco Novo' } });
    fireEvent.change(screen.getByLabelText(/agência/i), { target: { value: '9999' } });
    fireEvent.change(screen.getByLabelText(/conta/i), { target: { value: '88888-8' } });
    fireEvent.click(screen.getByRole('button', { name: /salvar/i }));
    await waitFor(() => {
      expect(screen.getByText(/conta bancária cadastrada com sucesso/i)).toBeInTheDocument();
    });
  });

  it('deve editar uma conta bancária', async () => {
    render(
      <MemoryRouter initialEntries={["/cadastros/contas-bancarias"]}>
        <ContasBancarias />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByTestId('edit-conta-2'));
    fireEvent.change(screen.getByLabelText(/banco/i), { target: { value: 'Banco Teste 2' } });
    fireEvent.click(screen.getByRole('button', { name: /salvar/i }));
    await waitFor(() => {
      expect(screen.getByText(/conta bancária atualizada com sucesso/i)).toBeInTheDocument();
    });
  });

  it('deve excluir uma conta bancária', async () => {
    render(
      <MemoryRouter initialEntries={["/cadastros/contas-bancarias"]}>
        <ContasBancarias />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByTestId('delete-conta-3'));
    fireEvent.click(screen.getByRole('button', { name: /confirmar/i }));
    await waitFor(() => {
      expect(screen.getByText(/conta bancária excluída com sucesso/i)).toBeInTheDocument();
    });
  });
}); 