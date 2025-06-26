import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Contato from '../../src/pages/contato/Contato';

describe('Contato', () => {
  it('deve exibir informações de contato', () => {
    render(
      <MemoryRouter initialEntries={["/contato"]}>
        <Contato />
      </MemoryRouter>
    );
    expect(screen.getByText(/contato@cashflow.com/i)).toBeInTheDocument();
    expect(screen.getByText(/SC-401/i)).toBeInTheDocument();
    expect(screen.getByText(/whatsapp/i)).toBeInTheDocument();
  });

  it('deve enviar mensagem pelo formulário', async () => {
    render(
      <MemoryRouter initialEntries={["/contato"]}>
        <Contato />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: 'Maria' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'maria@teste.com' } });
    fireEvent.change(screen.getByLabelText(/assunto/i), { target: { value: 'Dúvida' } });
    fireEvent.change(screen.getByLabelText(/mensagem/i), { target: { value: 'Como acesso o relatório?' } });
    fireEvent.click(screen.getByRole('button', { name: /enviar/i }));
    await waitFor(() => {
      expect(screen.getByText(/mensagem enviada com sucesso/i)).toBeInTheDocument();
    });
  });
}); 