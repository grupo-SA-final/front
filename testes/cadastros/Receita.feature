Feature: Cadastro de Receita
  Como usuário logado
  Quero cadastrar, editar e excluir receitas
  Para gerenciar as fontes de receita do sistema

  Scenario: Visualizar lista de receitas
    Given estou logado e na página "/cadastros/receita"
    Then vejo a tabela de receitas cadastradas

  Scenario: Cadastrar nova receita
    Given estou na página "/cadastros/receita"
    When clico no botão "Nova Receita"
    And preencho o campo "Nome" com "Salário"
    And clico no botão "Salvar"
    Then vejo a mensagem "Receita cadastrada com sucesso"
    And vejo "Salário" na lista de receitas

  Scenario: Editar uma receita existente
    Given estou na página "/cadastros/receita"
    And existe uma receita chamada "Freelance"
    When clico no botão de editar da receita "Freelance"
    And altero o campo "Nome" para "Freelancer"
    And clico no botão "Salvar"
    Then vejo a mensagem "Receita atualizada com sucesso"
    And vejo "Freelancer" na lista de receitas

  Scenario: Excluir uma receita
    Given estou na página "/cadastros/receita"
    And existe uma receita chamada "Investimento"
    When clico no botão de excluir da receita "Investimento"
    And confirmo a exclusão
    Then vejo a mensagem "Receita excluída com sucesso"
    And não vejo "Investimento" na lista de receitas 