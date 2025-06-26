Feature: Contato
  Como visitante
  Quero enviar uma mensagem pelo formulário de contato
  Para tirar dúvidas ou solicitar suporte

  Scenario: Visualizar informações de contato
    Given estou na página "/contato"
    Then vejo o email de contato
    And vejo o endereço
    And vejo o WhatsApp

  Scenario: Enviar mensagem pelo formulário
    Given estou na página "/contato"
    When preencho o campo "Nome" com "Maria"
    And preencho o campo "Email" com "maria@teste.com"
    And preencho o campo "Assunto" com "Dúvida"
    And preencho o campo "Mensagem" com "Como acesso o relatório?"
    And clico no botão "Enviar"
    Then vejo a mensagem "Mensagem enviada com sucesso" 