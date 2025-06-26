Feature: Perfil do Usuário
  Como usuário logado
  Quero visualizar e editar meus dados de perfil
  Para manter minhas informações atualizadas

  Scenario: Visualizar dados do usuário
    Given estou logado e na página "/usuario"
    Then vejo meus dados de perfil

  Scenario: Editar nome do usuário
    Given estou na página "/usuario"
    When clico no botão "Editar"
    And altero o campo "Nome" para "Novo Nome"
    And clico no botão "Salvar"
    Then vejo a mensagem "Perfil atualizado com sucesso"
    And vejo "Novo Nome" nos dados de perfil

  Scenario: Alterar senha do usuário
    Given estou na página "/usuario"
    When clico no botão "Alterar Senha"
    And preencho o campo "Senha Atual" com "123456"
    And preencho o campo "Nova Senha" com "novaSenha123"
    And preencho o campo "Confirmar Nova Senha" com "novaSenha123"
    And clico no botão "Salvar Senha"
    Then vejo a mensagem "Senha alterada com sucesso" 