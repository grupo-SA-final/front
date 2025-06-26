Feature: Cadastro de Contas Bancárias
  Como usuário logado
  Quero cadastrar, editar e excluir contas bancárias
  Para gerenciar as contas do sistema

  Scenario: Visualizar lista de contas bancárias
    Given estou logado e na página "/cadastros/contas-bancarias"
    Then vejo a tabela de contas bancárias cadastradas

  Scenario: Cadastrar nova conta bancária
    Given estou na página "/cadastros/contas-bancarias"
    When clico no botão "Nova Conta Bancária"
    And preencho o campo "Banco" com "Banco XPTO"
    And preencho o campo "Agência" com "1234"
    And preencho o campo "Conta" com "56789-0"
    And clico no botão "Salvar"
    Then vejo a mensagem "Conta bancária cadastrada com sucesso"
    And vejo "Banco XPTO" na lista de contas bancárias

  Scenario: Editar uma conta bancária existente
    Given estou na página "/cadastros/contas-bancarias"
    And existe uma conta bancária chamada "Banco Teste"
    When clico no botão de editar da conta "Banco Teste"
    And altero o campo "Banco" para "Banco Teste 2"
    And clico no botão "Salvar"
    Then vejo a mensagem "Conta bancária atualizada com sucesso"
    And vejo "Banco Teste 2" na lista de contas bancárias

  Scenario: Excluir uma conta bancária
    Given estou na página "/cadastros/contas-bancarias"
    And existe uma conta bancária chamada "Banco Remover"
    When clico no botão de excluir da conta "Banco Remover"
    And confirmo a exclusão
    Then vejo a mensagem "Conta bancária excluída com sucesso"
    And não vejo "Banco Remover" na lista de contas bancárias 