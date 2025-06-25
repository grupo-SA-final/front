import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PoliticaPrivacidade from '../../src/pages/politica-privacidade/PoliticaPrivacidade';

describe('PoliticaPrivacidade', () => {
  it('deve exibir título e texto da política', () => {
    render(
      <MemoryRouter initialEntries={["/politica-privacidade"]}>
        <PoliticaPrivacidade />
      </MemoryRouter>
    );
    expect(screen.getByText(/política de privacidade/i)).toBeInTheDocument();
    expect(screen.getByText(/esta política de privacidade descreve como suas informações pessoais são coletadas/i)).toBeInTheDocument();
  });
}); 