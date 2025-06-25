Feature: Termos de Serviço
  Como visitante
  Quero visualizar os termos de serviço
  Para entender as regras de uso do sistema

  Scenario: Visualizar termos de serviço
    Given estou na página "/termos-servico"
    Then vejo o título "Termos de Serviço"
    And vejo o texto "Termos de Serviço" 