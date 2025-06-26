import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomeDeslogada from '../../src/pages/home/HomeDeslogada';

describe('HomeDeslogada', () => {
  it('deve exibir informações da aplicação', () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <HomeDeslogada />
      </MemoryRouter>
    );
    expect(screen.getByText(/CashFlow/i)).toBeInTheDocument();
    expect(screen.getByText(/gerenciamento financeiro/i)).toBeInTheDocument();
  });

  it('deve exibir botões de ação', () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <HomeDeslogada />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /começar agora/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /saiba mais/i })).toBeInTheDocument();
  });
}); 
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomeDeslogada from '../../src/pages/home/HomeDeslogada';

describe('HomeDeslogada', () => {
  it('deve exibir informações da Home Deslogada', () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <HomeDeslogada />
      </MemoryRouter>
    );
    expect(screen.getByText('Sua vida financeira, organizada e clara.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cadastrar/i })).toBeInTheDocument();
  });

  it('deve exibir formulário de cadastro ao clicar em Cadastrar', () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <HomeDeslogada />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }));
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^senha$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirmar senha/i)).toBeInTheDocument();
  });

  it('deve mostrar erro ao tentar login inválido', async () => {
    // Mock fetch para simular erro
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Email ou senha inválidos.' })
      })
    );
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <HomeDeslogada onLoginSuccess={jest.fn()} />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'usuario@teste.com' } });
    fireEvent.change(screen.getByLabelText(/^senha$/i), { target: { value: 'errada' } });
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));
    await waitFor(() => {
      expect(screen.getByText(/email ou senha inválidos/i)).toBeInTheDocument();
    });
    global.fetch.mockRestore();
  });

  it('deve redirecionar para home ao login bem-sucedido', async () => {
    const mockLogin = jest.fn();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ token: 'fake-token', data: { id: 1, nome: 'Usuário' } })
      })
    );
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <HomeDeslogada onLoginSuccess={mockLogin} />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'usuario@teste.com' } });
    fireEvent.change(screen.getByLabelText(/^senha$/i), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalled();
    });
    global.fetch.mockRestore();
  });
}); 