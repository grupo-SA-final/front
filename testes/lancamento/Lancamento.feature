Feature: Lançamento Financeiro
  Como usuário logado
  Quero cadastrar, editar e excluir lançamentos financeiros
  Para controlar receitas e despesas

  Scenario: Visualizar lista de lançamentos
    Given estou logado e na página "/lancamento"
    Then vejo a tabela de lançamentos cadastrados

  Scenario: Cadastrar novo lançamento de receita
    Given estou na página "/lancamento"
    When clico no botão "Novo Lançamento"
    And preencho o campo "Descrição" com "Venda"
    And seleciono o tipo "Recebimento"
    And preencho o campo "Valor" com "1000"
    And seleciono a conta bancária "Banco XPTO"
    And seleciono a receita "Salário"
    And preencho a data "2024-01-10"
    And clico no botão "Salvar Lançamento"
    Then vejo a mensagem "Lançamento cadastrado com sucesso"
    And vejo "Venda" na lista de lançamentos

  Scenario: Editar um lançamento existente
    Given estou na página "/lancamento"
    And existe um lançamento chamado "Compra"
    When clico no botão de editar do lançamento "Compra"
    And altero o campo "Descrição" para "Compra de Material"
    And clico no botão "Salvar Lançamento"
    Then vejo a mensagem "Lançamento atualizado com sucesso"
    And vejo "Compra de Material" na lista de lançamentos

  Scenario: Excluir um lançamento
    Given estou na página "/lancamento"
    And existe um lançamento chamado "Despesa Fixa"
    When clico no botão de excluir do lançamento "Despesa Fixa"
    And confirmo a exclusão
    Then vejo a mensagem "Lançamento excluído com sucesso"
    And não vejo "Despesa Fixa" na lista de lançamentos 