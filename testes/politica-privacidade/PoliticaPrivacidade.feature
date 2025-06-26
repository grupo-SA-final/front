Feature: Política de Privacidade
  Como visitante
  Quero visualizar a política de privacidade
  Para entender como meus dados são tratados

  Scenario: Visualizar política de privacidade
    Given estou na página "/politica-privacidade"
    Then vejo o título "Política de Privacidade"
    And vejo o texto "Esta Política de Privacidade descreve como suas informações pessoais são coletadas" 