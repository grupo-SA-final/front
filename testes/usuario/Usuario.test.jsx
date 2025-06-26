import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Usuario from '../../src/pages/usuario/Usuario';

describe('Usuario', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ data: { nome: 'Usuário', email: 'usuario@teste.com' } }) }));
  });
  afterEach(() => { global.fetch.mockRestore(); });

  it('deve exibir dados do usuário', async () => {
    render(
      <MemoryRouter initialEntries={["/usuario"]}>
        <Usuario />
      </MemoryRouter>
    );
    expect(await screen.findByText('Usuário')).toBeInTheDocument();
    expect(screen.getByText('usuario@teste.com')).toBeInTheDocument();
  });

  it('deve editar nome do usuário', async () => {
    render(
      <MemoryRouter initialEntries={["/usuario"]}>
        <Usuario />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: /editar/i }));
    fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: 'Novo Nome' } });
    fireEvent.click(screen.getByRole('button', { name: /salvar/i }));
    await waitFor(() => {
      expect(screen.getByText(/perfil atualizado com sucesso/i)).toBeInTheDocument();
      expect(screen.getByText('Novo Nome')).toBeInTheDocument();
    });
  });

  it('deve exibir formulário de perfil do usuário', async () => {
    render(
      <MemoryRouter initialEntries={["/usuario"]}>
        <Usuario />
      </MemoryRouter>
    );
    expect(await screen.findByText(/perfil do usuário/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  it('deve exibir botão de alterar senha', async () => {
    render(
      <MemoryRouter initialEntries={["/usuario"]}>
        <Usuario />
      </MemoryRouter>
    );
    expect(await screen.findByRole('button', { name: /alterar senha/i })).toBeInTheDocument();
  });

  it('deve exibir botão de salvar', async () => {
    render(
      <MemoryRouter initialEntries={["/usuario"]}>
        <Usuario />
      </MemoryRouter>
    );
    expect(await screen.findByRole('button', { name: /salvar/i })).toBeInTheDocument();
  });
}); 