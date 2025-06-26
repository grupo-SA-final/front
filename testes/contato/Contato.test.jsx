import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Contato from '../../src/pages/contato/Contato';

describe('Contato', () => {
  it('deve exibir formulário de contato', async () => {
    render(
      <MemoryRouter initialEntries={["/contato"]}>
        <Contato />
      </MemoryRouter>
    );
    expect(screen.getByText(/Envie sua Mensagem/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Nome/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Assunto/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Mensagem/i)).toBeInTheDocument();
  });

  it('deve preencher e enviar formulário', async () => {
    render(
      <MemoryRouter initialEntries={["/contato"]}>
        <Contato />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByPlaceholderText(/Nome/i), { target: { value: 'Maria' } });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'maria@teste.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Assunto/i), { target: { value: 'Dúvida' } });
    fireEvent.change(screen.getByPlaceholderText(/Mensagem/i), { target: { value: 'Como acesso o relatório?' } });
    fireEvent.click(screen.getByRole('button', { name: /enviar mensagem/i }));
    await waitFor(() => {
      expect(screen.getByText(/mensagem enviada com sucesso/i)).toBeInTheDocument();
    });
  });
}); 