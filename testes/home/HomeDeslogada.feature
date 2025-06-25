Feature: Home Deslogada (Login e Cadastro)
  Como visitante
  Quero acessar a página inicial deslogada
  Para visualizar informações e realizar login ou cadastro

  Scenario: Visualizar informações da Home Deslogada
    Given estou na página "/login"
    Then vejo o título "Sua vida financeira, organizada e clara."
    And vejo o botão "Entrar"
    And vejo o botão "Cadastrar"

  Scenario: Realizar login com sucesso
    Given estou na página "/login"
    When preencho o campo "Email" com "usuario@teste.com"
    And preencho o campo "Senha" com "123456"
    And clico no botão "Entrar"
    Then devo ser redirecionado para a página "/"
    And vejo o texto "Home"

  Scenario: Tentar login com dados inválidos
    Given estou na página "/login"
    When preencho o campo "Email" com "usuario@teste.com"
    And preencho o campo "Senha" com "errada"
    And clico no botão "Entrar"
    Then vejo a mensagem de erro "Email ou senha inválidos."

  Scenario: Acessar formulário de cadastro
    Given estou na página "/login"
    When clico no botão "Cadastrar"
    Then vejo o formulário de cadastro
    And vejo o campo "Nome"
    And vejo o campo "Email"
    And vejo o campo "Senha"
    And vejo o campo "Confirmar Senha" 