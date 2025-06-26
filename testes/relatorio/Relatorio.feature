Feature: Relatório Financeiro
  Como usuário logado
  Quero visualizar e filtrar relatórios financeiros
  Para analisar receitas, despesas e saldo

  Scenario: Visualizar relatório padrão
    Given estou logado e na página "/relatorio"
    Then vejo o título "Relatório"
    And vejo os cards de resumo "Receitas", "Despesas" e "Saldo"
    And vejo a tabela de lançamentos

  Scenario: Filtrar relatório por período
    Given estou na página "/relatorio"
    When seleciono a data inicial "2024-01-01"
    And seleciono a data final "2024-01-31"
    And clico em "Filtrar"
    Then vejo apenas lançamentos do período selecionado

  Scenario: Filtrar por tipo de lançamento
    Given estou na página "/relatorio"
    When seleciono o tipo "Receitas"
    Then vejo apenas lançamentos do tipo "Receitas"

  Scenario: Exportar relatório em CSV
    Given estou na página "/relatorio"
    When clico no botão "Exportar CSV"
    Then um arquivo CSV é baixado com os dados do relatório 