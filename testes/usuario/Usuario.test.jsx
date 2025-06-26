import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Usuario from '../../src/pages/usuario/Usuario';

describe('Usuario', () => {
  it('deve exibir dados do usuário', async () => {
    render(
      <MemoryRouter initialEntries={["/usuario"]}>
        <Usuario />
      </MemoryRouter>
    );
    expect(await screen.findByText('Perfil do Usuário')).toBeInTheDocument();
    expect(screen.getByText('Informações Pessoais')).toBeInTheDocument();
  });

  it('deve exibir campos do formulário', () => {
    render(
      <MemoryRouter initialEntries={["/usuario"]}>
        <Usuario />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText(/nome/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/telefone/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/documento/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/data de nascimento/i)).toBeInTheDocument();
  });

  it('deve exibir botões de ação', () => {
    render(
      <MemoryRouter initialEntries={["/usuario"]}>
        <Usuario />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /salvar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /alterar senha/i })).toBeInTheDocument();
  });

  it('deve permitir editar nome do usuário', () => {
    render(
      <MemoryRouter initialEntries={["/usuario"]}>
        <Usuario />
      </MemoryRouter>
    );
    const nomeInput = screen.getByPlaceholderText(/nome/i);
    fireEvent.change(nomeInput, { target: { value: 'Novo Nome' } });
    expect(nomeInput.value).toBe('Novo Nome');
  });
}); 