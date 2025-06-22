import React, { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ReactDOM from 'react-dom/client';
import './Navbar.css';

const MySwal = withReactContent(Swal);

const CadastroForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    telefone: '',
    documento: '',
    dataNascimento: '',
  });
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.senha !== formData.confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }
    setErro('');
    setLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          senha: formData.senha,
          telefone: formData.telefone,
          documento: formData.documento,
          dataNascimento: formData.dataNascimento,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setErro(data.message || (data.errors && data.errors[0]?.msg) || 'Erro ao cadastrar.');
        setLoading(false);
        return;
      }
      Swal.fire('Cadastro realizado!', 'Usuário cadastrado com sucesso.', 'success');
      onClose();
    } catch (err) {
      setErro('Erro de conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="usuario-form" onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <h2 style={{ marginBottom: '1rem' }}>Cadastro</h2>
      <input type="text" name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} required className="usuario-input" style={{ marginBottom: '1rem' }} />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="usuario-input" style={{ marginBottom: '1rem' }} />
      <input type="password" name="senha" placeholder="Senha" value={formData.senha} onChange={handleChange} required className="usuario-input" style={{ marginBottom: '1rem' }} />
      <input type="password" name="confirmarSenha" placeholder="Confirmar Senha" value={formData.confirmarSenha} onChange={handleChange} required className="usuario-input" style={{ marginBottom: '1rem' }} />
      <input type="text" name="telefone" placeholder="Telefone" value={formData.telefone} onChange={handleChange} className="usuario-input" style={{ marginBottom: '1rem' }} />
      <input type="text" name="documento" placeholder="Documento" value={formData.documento} onChange={handleChange} className="usuario-input" style={{ marginBottom: '1rem' }} />
      <input type="date" name="dataNascimento" placeholder="Data de Nascimento" value={formData.dataNascimento} onChange={handleChange} className="usuario-input" style={{ marginBottom: '1rem' }} />
      {erro && <p style={{ color: 'red', marginBottom: '1rem' }}>{erro}</p>}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
        <button type="button" className="usuario-link-button" onClick={onClose} disabled={loading}>
          Cancelar
        </button>
        <button type="submit" className="usuario-submit-button" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </div>
    </form>
  );
};

const NavbarDeslogada = ({ onLoginSuccess }) => {
  const [loginData, setLoginData] = useState({ email: '', senha: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loginData.email,
          senha: loginData.senha,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        MySwal.fire({
          icon: 'error',
          title: 'Erro no Login',
          text: data.message || (data.errors && data.errors[0]?.msg) || 'Email ou senha inválidos.',
          confirmButtonColor: 'var(--primary-color)',
        });
        setLoading(false);
        return;
      }
      localStorage.setItem('token', data.token);
      if (data.data && data.data.id) {
        localStorage.setItem('userId', data.data.id);
      }
      if (data.data && data.data.nome) {
        localStorage.setItem('userName', data.data.nome);
      }
      onLoginSuccess();
    } catch (err) {
      MySwal.fire({
        icon: 'error',
        title: 'Erro de Conexão',
        text: 'Não foi possível conectar ao servidor. Tente novamente mais tarde.',
        confirmButtonColor: 'var(--primary-color)',
      });
    } finally {
      setLoading(false);
    }
  };

  const abrirModalCadastro = () => {
    const container = document.createElement('div');
    let root = null;
    MySwal.fire({
      html: container,
      showConfirmButton: false,
      showCloseButton: true,
      willClose: () => { if (root) root.unmount(); },
      didOpen: () => {
        root = ReactDOM.createRoot(container);
        root.render(<CadastroForm onClose={() => Swal.close()} />);
      },
      customClass: { popup: 'swal2-popup-custom' },
    });
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img className="navbar-logo" src={"../../../logo-sem-nome.png"} alt="Logo" />
        <span className="navbar-title">CashFlow</span>
      </div>
      <form className="navbar-actions" onSubmit={handleLogin} style={{ gap: 8 }}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={loginData.email}
          onChange={handleChange}
          className="usuario-input"
          style={{ width: 140, marginRight: 8 }}
          disabled={loading}
        />
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={loginData.senha}
          onChange={handleChange}
          className="usuario-input"
          style={{ width: 120, marginRight: 8 }}
          disabled={loading}
        />
        <button type="submit" className="usuario-submit-button" style={{ padding: '0.5rem 1rem' }} disabled={loading}>
          {loading ? 'Entrando...' : 'Login'}
        </button>
        <button type="button" className="usuario-link-button" style={{ padding: '0.5rem 1rem' }} onClick={abrirModalCadastro} disabled={loading}>
          Cadastro
        </button>
      </form>
    </nav>
  );
};

export default NavbarDeslogada; 