import { TextEncoder, TextDecoder } from 'util';

if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}
if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder;
}

// Mock window.matchMedia
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = function () {
    return {
      matches: false,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    };
  };
}

// Mock global fetch para evitar erros de rede em testes sem mock explícito
if (typeof global.fetch === 'undefined') {
  global.fetch = jest.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({}) }));
}

// Mock global axios para evitar erros de rede
jest.mock('axios', () => ({
  get: jest.fn((url) => {
    if (url.includes('/api/centros-de-custo')) {
      return Promise.resolve({ 
        data: { 
          success: true, 
          data: [
            { id: 1, nome: 'Aluguel', descricao: 'Aluguel mensal' },
            { id: 2, nome: 'Energia', descricao: 'Conta de energia' },
            { id: 3, nome: 'Internet', descricao: 'Internet banda larga' }
          ] 
        } 
      });
    }
    if (url.includes('/api/receitas')) {
      return Promise.resolve({ 
        data: { 
          success: true, 
          data: [
            { id: 1, nome: 'Salário', descricao: 'Salário mensal' },
            { id: 2, nome: 'Freelance', descricao: 'Trabalho freelancer' },
            { id: 3, nome: 'Investimento', descricao: 'Rendimentos de investimentos' }
          ] 
        } 
      });
    }
    if (url.includes('/api/contas-bancarias')) {
      return Promise.resolve({ 
        data: { 
          success: true, 
          data: [
            { id: 1, nomeBanco: 'Banco XPTO', agencia: '1234', conta: '56789-0' },
            { id: 2, nomeBanco: 'Banco Teste', agencia: '1111', conta: '22222-2' },
            { id: 3, nomeBanco: 'Banco Remover', agencia: '3333', conta: '44444-4' }
          ] 
        } 
      });
    }
    if (url.includes('/api/lancamentos')) {
      return Promise.resolve({ 
        data: { 
          success: true, 
          data: [
            { id: 1, data: '2024-01-15', descricao: 'Receita 1', tipo: 'recebimento', valor: 1000, conta: 'Banco XPTO', centroCusto: 'Aluguel' },
            { id: 2, data: '2024-01-16', descricao: 'Despesa 1', tipo: 'pagamento', valor: 500, conta: 'Banco Teste', centroCusto: 'Energia' }
          ] 
        } 
      });
    }
    return Promise.resolve({ data: { success: true, data: [] } });
  }),
  post: jest.fn(() => Promise.resolve({ data: { success: true, data: {} } })),
  put: jest.fn(() => Promise.resolve({ data: { success: true, data: {} } })),
  delete: jest.fn(() => Promise.resolve({ data: { success: true } })),
  create: jest.fn(() => ({
    get: jest.fn((url) => {
      if (url.includes('/api/centros-de-custo')) {
        return Promise.resolve({ 
          data: { 
            success: true, 
            data: [
              { id: 1, nome: 'Aluguel', descricao: 'Aluguel mensal' },
              { id: 2, nome: 'Energia', descricao: 'Conta de energia' },
              { id: 3, nome: 'Internet', descricao: 'Internet banda larga' }
            ] 
          } 
        });
      }
      if (url.includes('/api/receitas')) {
        return Promise.resolve({ 
          data: { 
            success: true, 
            data: [
              { id: 1, nome: 'Salário', descricao: 'Salário mensal' },
              { id: 2, nome: 'Freelance', descricao: 'Trabalho freelancer' },
              { id: 3, nome: 'Investimento', descricao: 'Rendimentos de investimentos' }
            ] 
          } 
        });
      }
      if (url.includes('/api/contas-bancarias')) {
        return Promise.resolve({ 
          data: { 
            success: true, 
            data: [
              { id: 1, nomeBanco: 'Banco XPTO', agencia: '1234', conta: '56789-0' },
              { id: 2, nomeBanco: 'Banco Teste', agencia: '1111', conta: '22222-2' },
              { id: 3, nomeBanco: 'Banco Remover', agencia: '3333', conta: '44444-4' }
            ] 
          } 
        });
      }
      if (url.includes('/api/lancamentos')) {
        return Promise.resolve({ 
          data: { 
            success: true, 
            data: [
              { id: 1, data: '2024-01-15', descricao: 'Receita 1', tipo: 'recebimento', valor: 1000, conta: 'Banco XPTO', centroCusto: 'Aluguel' },
              { id: 2, data: '2024-01-16', descricao: 'Despesa 1', tipo: 'pagamento', valor: 500, conta: 'Banco Teste', centroCusto: 'Energia' }
            ] 
          } 
        });
      }
      return Promise.resolve({ data: { success: true, data: [] } });
    }),
    post: jest.fn(() => Promise.resolve({ data: { success: true, data: {} } })),
    put: jest.fn(() => Promise.resolve({ data: { success: true, data: {} } })),
    delete: jest.fn(() => Promise.resolve({ data: { success: true } })),
  })),
}));

// Mock SweetAlert2 para evitar erros de DOM
jest.mock('sweetalert2', () => ({
  fire: jest.fn(() => Promise.resolve({ isConfirmed: true })),
  close: jest.fn(),
}));

// Mock SweetAlert2 React Content
jest.mock('sweetalert2-react-content', () => {
  return jest.fn(() => ({
    fire: jest.fn(() => Promise.resolve({ isConfirmed: true })),
    close: jest.fn(),
  }));
}); 