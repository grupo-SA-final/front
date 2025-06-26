Feature: Cadastro de Centro de Custos
  Como usuário logado
  Quero cadastrar, editar e excluir centros de custos
  Para organizar as despesas do sistema

  Scenario: Visualizar lista de centros de custos
    Given estou logado e na página "/cadastros/centro-custos"
    Then vejo a tabela de centros de custos cadastrados

  Scenario: Cadastrar novo centro de custo
    Given estou na página "/cadastros/centro-custos"
    When clico no botão "Novo Centro de Custo"
    And preencho o campo "Nome" com "Aluguel"
    And clico no botão "Salvar"
    Then vejo a mensagem "Centro de custo cadastrado com sucesso"
    And vejo "Aluguel" na lista de centros de custos

  Scenario: Editar um centro de custo existente
    Given estou na página "/cadastros/centro-custos"
    And existe um centro de custo chamado "Energia"
    When clico no botão de editar do centro "Energia"
    And altero o campo "Nome" para "Energia Elétrica"
    And clico no botão "Salvar"
    Then vejo a mensagem "Centro de custo atualizado com sucesso"
    And vejo "Energia Elétrica" na lista de centros de custos

  Scenario: Excluir um centro de custo
    Given estou na página "/cadastros/centro-custos"
    And existe um centro de custo chamado "Internet"
    When clico no botão de excluir do centro "Internet"
    And confirmo a exclusão
    Then vejo a mensagem "Centro de custo excluído com sucesso"
    And não vejo "Internet" na lista de centros de custos 