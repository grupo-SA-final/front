Feature: Navbar Deslogada
  Como visitante
  Quero navegar e acessar opções de login e cadastro
  Para poder acessar o sistema ou criar uma conta

  Scenario: Visualizar opções de navegação
    Given estou na página "/login"
    Then vejo o botão "Entrar"
    And vejo o botão "Cadastrar"

  Scenario: Abrir formulário de cadastro
    Given estou na página "/login"
    When clico no botão "Cadastrar"
    Then vejo o formulário de cadastro

  Scenario: Realizar cadastro com sucesso
    Given estou na página "/login"
    When clico no botão "Cadastrar"
    And preencho o campo "Nome" com "Novo Usuário"
    And preencho o campo "Email" com "novo@teste.com"
    And preencho o campo "Senha" com "123456"
    And preencho o campo "Confirmar Senha" com "123456"
    And clico no botão "Cadastrar"
    Then vejo a mensagem "Usuário cadastrado com sucesso."

  Scenario: Tentar cadastro com senhas diferentes
    Given estou na página "/login"
    When clico no botão "Cadastrar"
    And preencho o campo "Nome" com "Novo Usuário"
    And preencho o campo "Email" com "novo@teste.com"
    And preencho o campo "Senha" com "123456"
    And preencho o campo "Confirmar Senha" com "diferente"
    And clico no botão "Cadastrar"
    Then vejo a mensagem de erro "As senhas não coincidem." 