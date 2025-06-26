import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavbarDeslogada from '../../src/components/navbar/NavbarDeslogada';

describe('NavbarDeslogada', () => {
  it('deve exibir logo e links de navegação', () => {
    render(
      <MemoryRouter>
        <NavbarDeslogada />
      </MemoryRouter>
    );
    expect(screen.getByText(/CashFlow/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /início/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /sobre/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contato/i })).toBeInTheDocument();
  });

  it('deve exibir botões de login e cadastro', () => {
    render(
      <MemoryRouter>
        <NavbarDeslogada />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cadastrar/i })).toBeInTheDocument();
  });

  it('deve abrir formulário de cadastro ao clicar em Cadastrar', () => {
    render(<NavbarDeslogada onLoginSuccess={jest.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }));
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^senha$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirmar senha/i)).toBeInTheDocument();
  });

  it('deve mostrar erro ao tentar cadastrar com senhas diferentes', async () => {
    render(<NavbarDeslogada onLoginSuccess={jest.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }));
    fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: 'Novo Usuário' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'novo@teste.com' } });
    fireEvent.change(screen.getByLabelText(/^senha$/i), { target: { value: '123456' } });
    fireEvent.change(screen.getByLabelText(/confirmar senha/i), { target: { value: 'diferente' } });
    fireEvent.click(screen.getByRole('button', { name: /^cadastrar$/i }));
    await waitFor(() => {
      expect(screen.getByText(/as senhas não coincidem/i)).toBeInTheDocument();
    });
  });

  it('deve mostrar mensagem de sucesso ao cadastrar corretamente', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({})
      })
    );
    render(<NavbarDeslogada onLoginSuccess={jest.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }));
    fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: 'Novo Usuário' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'novo@teste.com' } });
    fireEvent.change(screen.getByLabelText(/^senha$/i), { target: { value: '123456' } });
    fireEvent.change(screen.getByLabelText(/confirmar senha/i), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: /^cadastrar$/i }));
    await waitFor(() => {
      expect(screen.getByText(/usuário cadastrado com sucesso/i)).toBeInTheDocument();
    });
    global.fetch.mockRestore();
  });
}); 