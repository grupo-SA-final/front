import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Components
import MainLayout from './layouts/MainLayout';

// Main Pages
import Home from './pages/home/Home';
import Lancamento from './pages/lancamento/Lancamento';
import Relatorio from './pages/relatorio/Relatorio';

// Cadastro Pages
import CentroCustos from './pages/cadastros/centro-custos/CentroCustos';
import ContasBancarias from './pages/cadastros/contas-bancarias/ContasBancarias';
import Receita from './pages/cadastros/receita/Receita';

// Documentation Pages
import PoliticaPrivacidade from './pages/politica-privacidade/PoliticaPrivacidade';
import TermosServico from './pages/termos-servico/TermosServico';
import Contato from './pages/contato/Contato';

import Usuario from './pages/usuario/Usuario';
import HomeDeslogada from './pages/home/HomeDeslogada';

import Login from './pages/login/Login';

// Theme configuration
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0066cc',
    },
    secondary: {
      main: '#00cc99',
    },
  },
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    // Atualiza o estado se o token mudar (ex: logout em outra aba)
    const onStorage = () => setIsLoggedIn(!!localStorage.getItem('token'));
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<HomeDeslogada onLoginSuccess={() => setIsLoggedIn(true)} />} />
          <Route path="/" element={isLoggedIn ? <MainLayout /> : <Navigate to="/login" replace />}>
            <Route index element={<Home />} />
            <Route path="cadastros/centro-custos" element={<CentroCustos />} />
            <Route path="cadastros/contas-bancarias" element={<ContasBancarias />} />
            <Route path="cadastros/receita" element={<Receita />} />
            <Route path="lancamento" element={<Lancamento />} />
            <Route path="relatorio" element={<Relatorio />} />
            <Route path="politica-privacidade" element={<PoliticaPrivacidade />} />
            <Route path="termos-servico" element={<TermosServico />} />
            <Route path="contato" element={<Contato />} />
            <Route path="usuario" element={<Usuario />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 