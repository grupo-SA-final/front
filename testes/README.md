# Testes do Sistema CashFlow

Esta pasta contém os cenários de testes (Gherkin) e os testes unitários de front-end para o sistema CashFlow.

## Estrutura

- Subpastas para cada módulo/página (ex: `home`, `navbar`, `relatorio`, `cadastros`, etc.)
- Arquivos `.feature` com cenários Gherkin (BDD)
- Arquivos `.test.jsx` com testes unitários (React Testing Library)

## Tipos de Teste

- **Testes Unitários:**
  - Arquivos `*.test.jsx`.
  - Utilizam React Testing Library e Jest.
  - Cobrem fluxos principais de cada página/componente.

- **Cenários Gherkin (BDD):**
  - Arquivos `*.feature`.
  - Descrevem cenários de uso real do sistema.
  - Podem ser usados com Cypress + Cucumber ou jest-cucumber.

## Como rodar os testes unitários

1. Instale as dependências na raiz do projeto:
   ```
   npm install
   # ou
   yarn install
   ```
2. Execute os testes:
   ```
   npm test
   # ou
   yarn test
   ```

## Como rodar os cenários Gherkin (opcional)

1. Instale Cypress e o preprocessor:
   ```
   npm install cypress @badeball/cypress-cucumber-preprocessor --save-dev
   ```
2. Configure o Cypress para ler os arquivos `.feature` da pasta `testes`.
3. Implemente os steps definitions conforme os cenários.

> Os testes unitários já cobrem os principais fluxos descritos nos cenários Gherkin. 