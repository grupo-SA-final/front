# Sistema Financeiro - Frontend

Frontend moderno para o sistema financeiro, desenvolvido em React + Vite, com interface intuitiva para gestão de usuários, centros de custo, receitas, contas bancárias e lançamentos.

## 🚀 Tecnologias

- **React** - Biblioteca para interfaces de usuário
- **Vite** - Bundler e dev server rápido
- **Material UI (MUI)** - Componentes visuais
- **Axios** - Requisições HTTP
- **React Router DOM** - Rotas SPA
- **SweetAlert2** - Alertas e diálogos
- **date-fns** - Manipulação de datas

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## 🛠️ Instalação

1. **Clone o repositório**
```bash
cd front
```

2. **Instale as dependências**
```bash
npm install
```

3. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

Acesse: [http://localhost:5173](http://localhost:5173)

## 🏛️ Arquitetura

- **src/pages/**: Páginas principais (Home, Usuário, Lançamento, Relatório, Contato, Termos de Serviço, Política de Privacidade, Cadastros)
- **src/components/**: Componentes reutilizáveis (Navbar, Footer)
- **src/layouts/**: Layouts de página
- **src/App.jsx**: Componente principal e rotas

## ✨ Funcionalidades

- **Autenticação de Usuário**: Cadastro, login, alteração de senha, atualização e exclusão de conta
- **Gestão de Centros de Custo**: Cadastro, edição, exclusão e listagem
- **Gestão de Receitas**: Cadastro, edição, exclusão e listagem
- **Gestão de Contas Bancárias**: Cadastro, edição, exclusão e listagem
- **Lançamentos Financeiros**: Cadastro, edição, exclusão e listagem de receitas e pagamentos
- **Relatórios**: Visualização de lançamentos e saldos
- **Contato**: Formulário para contato com suporte
- **Política de Privacidade e Termos de Serviço**: Páginas informativas

## 🖥️ Exemplos de Uso

- **Cadastro de Usuário**: Acesse a página de cadastro e preencha os dados obrigatórios
- **Login**: Informe e-mail e senha para acessar funcionalidades protegidas
- **Cadastro de Centro de Custo/Receita/Conta Bancária**: Navegue até a área de cadastros e preencha o formulário
- **Lançamento de Receita/Pagamento**: Acesse a página de lançamentos, selecione o tipo e preencha os dados
- **Relatórios**: Visualize lançamentos filtrando por período, tipo, conta, etc.

## 📦 Build para Produção

```bash
npm run build
```
Os arquivos finais estarão em `/dist`.

## 📚 Observações

- O frontend consome a API REST do backend (ver README do back para endpoints)
- Para funcionamento completo, o backend deve estar rodando

## 🏗️ Estrutura do Projeto

```
src/
├── App.jsx              # Componente principal e rotas
├── main.jsx             # Ponto de entrada da aplicação
├── index.css            # Estilos globais
├── App.css              # Estilos do App
├── layouts/
│   └── MainLayout.jsx   # Layout principal
├── components/
│   ├── navbar/
│   │   ├── Navbar.jsx
│   │   ├── NavbarDeslogada.jsx
│   │   └── Navbar.css
│   └── footer/
│       ├── Footer.jsx
│       └── Footer.css
├── pages/
│   ├── home/
│   │   ├── Home.jsx
│   │   └── HomeDeslogada.jsx
│   ├── usuario/
│   │   └── Usuario.jsx
│   ├── lancamento/
│   │   └── Lancamento.jsx
│   ├── relatorio/
│   │   └── Relatorio.jsx
│   ├── contato/
│   │   └── Contato.jsx
│   ├── termos-servico/
│   │   └── TermosServico.jsx
│   ├── politica-privacidade/
│   │   └── PoliticaPrivacidade.jsx
│   └── cadastros/
│       ├── receita/
│       │   └── Receita.jsx
│       ├── contas-bancarias/
│       │   └── ContasBancarias.jsx
│       └── centro-custos/
│           └── CentroCustos.jsx
```

---

Modern frontend for the financial system, built with React + Vite, providing an intuitive interface for managing users, cost centers, revenues, bank accounts, and transactions.
