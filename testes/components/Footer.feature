Feature: Footer
  Como visitante
  Quero visualizar o rodapé do sistema
  Para acessar informações e links úteis

  Scenario: Visualizar links do footer
    Given estou em qualquer página
    Then vejo o link "Política de Privacidade"
    And vejo o link "Termos de Serviço"
    And vejo o link "Contato" 