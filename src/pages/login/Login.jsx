import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Info, CheckCircle, Mail, Phone, MapPin } from 'lucide-react';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = () => {
    if (cpf === '123' && senha === '123') {
      navigate('/home');
    } else {
      setErro('CPF ou senha incorretos.');
    }
  };

  const sectionAnim = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="login-page">
      <motion.div className="login-card" {...sectionAnim}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        {erro && <p className="erro">{erro}</p>}
        <button onClick={handleLogin}>Entrar</button>
      </motion.div>

      <motion.section className="card" {...sectionAnim}>
  <h2><Info size={20} /> O que o site faz</h2>
  <p>
    Nossa plataforma foi criada para simplificar o controle financeiro de pessoas físicas e empresas.
    Com ela, você pode registrar e acompanhar todas as movimentações financeiras em um só lugar.
    O sistema permite:
  </p>
  <ul>
    <li>Gerenciar receitas e despesas por categoria</li>
    <li>Criar múltiplas contas bancárias ou carteiras</li>
    <li>Acompanhar saldo total e individual por conta</li>
    <li>Emitir relatórios de fluxo de caixa e balancetes</li>
    <li>Visualizar gráficos financeiros com filtros por período, conta ou categoria</li>
    <li>Exportar dados em Excel e PDF</li>
    <li>Configurar metas e acompanhar seu progresso</li>
    <li>Receber alertas por vencimento de contas e limites de gasto</li>
    <li>Usar o sistema em qualquer dispositivo (PC, tablet ou celular)</li>
  </ul>
  <p>
    Tudo isso com uma interface intuitiva, suporte em português e atualizações constantes para garantir que você tenha sempre o melhor controle das suas finanças.
  </p>
</motion.section>


      <motion.section className="card" {...sectionAnim}>
        <h2>Contato</h2>
        <p><Mail size={18} /> <a href="mailto:suporte@seudominio.com">suporte@seudominio.com</a></p>
        <p><Phone size={18} /> <a href="tel:+5511999999999">(11) 99999-9999</a></p>
        <p><MapPin size={18} /> <a href="https://www.google.com/maps?q=Rua+Exemplo,+123" target="_blank" rel="noopener noreferrer">Rua Exemplo, 123 - SP</a></p>
      </motion.section>
    </div>
  );
};

export default Login;
