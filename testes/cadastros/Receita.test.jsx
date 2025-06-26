import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Receita from '../../src/pages/cadastros/receita/Receita';

describe('Receita', () => {
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

  it('deve exibir botão de nova receita', () => {
    render(
      <MemoryRouter initialEntries={["/cadastros/receita"]}>
        <Receita />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /nova receita/i })).toBeInTheDocument();
  });

  it('deve exibir botões de ação na tabela', async () => {
    render(
      <MemoryRouter initialEntries={["/cadastros/receita"]}>
        <Receita />
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
      <MemoryRouter initialEntries={["/cadastros/receita"]}>
        <Receita />
      </MemoryRouter>
    );
    expect(screen.getByText('Nome')).toBeInTheDocument();
    expect(screen.getByText('Descrição')).toBeInTheDocument();
    expect(screen.getByText('Ações')).toBeInTheDocument();
  });
}); 