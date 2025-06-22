import React, { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import pt from "date-fns/locale/pt";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ReactDOM from "react-dom/client";
import "./Usuario.css";
import axios from "axios";

registerLocale("pt", pt);

const MySwal = withReactContent(Swal);

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const FormAlterarSenha = ({ onClose, userId }) => {
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (novaSenha !== confirmarSenha) {
      setErro("A nova senha e a confirmação não coincidem.");
      return;
    }
    setErro("");
    setLoading(true);
    try {
      await axios.post(`/api/usuarios/${userId}/alterar-senha`, {
        senhaAtual,
        novaSenha
      }, { headers: getAuthHeaders() });
      Swal.fire("Sucesso!", "Senha alterada com sucesso.", "success");
      onClose();
    } catch (error) {
      setErro(error.response?.data?.message || "Erro ao alterar senha.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="usuario-form"
      onSubmit={handleSubmit}
      style={{ maxWidth: "400px" }}
    >
      <h2 style={{ marginBottom: "1rem" }}>Alterar Senha</h2>
      <input
        type="password"
        placeholder="Senha Atual"
        value={senhaAtual}
        onChange={(e) => setSenhaAtual(e.target.value)}
        required
        className="usuario-input"
        style={{ marginBottom: "1rem" }}
        disabled={loading}
      />
      <input
        type="password"
        placeholder="Nova Senha"
        value={novaSenha}
        onChange={(e) => setNovaSenha(e.target.value)}
        required
        className="usuario-input"
        style={{ marginBottom: "1rem" }}
        disabled={loading}
      />
      <input
        type="password"
        placeholder="Confirmar Nova Senha"
        value={confirmarSenha}
        onChange={(e) => setConfirmarSenha(e.target.value)}
        required
        className="usuario-input"
        style={{ marginBottom: "1rem" }}
        disabled={loading}
      />
      {erro && <p style={{ color: "red", marginBottom: "1rem" }}>{erro}</p>}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
        <button
          type="button"
          className="usuario-link-button"
          onClick={onClose}
          disabled={loading}
        >
          Cancelar
        </button>
        <button type="submit" className="usuario-submit-button" disabled={loading}>
          {loading ? "Salvando..." : "Salvar"}
        </button>
      </div>
    </form>
  );
};

const Usuario = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    documento: "",
    dataNascimento: null,
  });
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUsuario = async () => {
      if (!userId) return;
      setLoading(true);
      try {
        const response = await axios.get(`/api/usuarios/${userId}`, { headers: getAuthHeaders() });
        const u = response.data.data || response.data;
        setFormData({
          nome: u.nome || "",
          email: u.email || "",
          telefone: u.telefone || "",
          documento: u.documento || "",
          dataNascimento: u.dataNascimento ? new Date(u.dataNascimento) : null,
        });
      } catch (error) {
        setErro("Erro ao carregar dados do usuário.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsuario();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setLoading(true);
    try {
      await axios.put(`/api/usuarios/${userId}`, {
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        dataNascimento: formData.dataNascimento ? formData.dataNascimento.toISOString().split("T")[0] : null,
      }, { headers: getAuthHeaders() });
      Swal.fire("Sucesso!", "Dados atualizados com sucesso.", "success");
    } catch (error) {
      setErro(error.response?.data?.message || "Erro ao atualizar dados.");
    } finally {
      setLoading(false);
    }
  };

  const abrirModalAlterarSenha = () => {
    const container = document.createElement("div");
    let root = null;
    MySwal.fire({
      html: container,
      showConfirmButton: false,
      showCloseButton: true,
      willClose: () => {
        if (root) {
          root.unmount();
        }
      },
      didOpen: () => {
        root = ReactDOM.createRoot(container);
        root.render(<FormAlterarSenha onClose={() => Swal.close()} userId={userId} />);
      },
      customClass: {
        popup: "swal2-popup-custom",
      },
    });
  };

  return (
    <div className="usuario-container">
      <h1 className="usuario-title">Perfil do Usuário</h1>
      <div className="usuario-card">
        <h2 className="usuario-text">Informações Pessoais</h2>
        {erro && <p style={{ color: "red", marginBottom: "1rem" }}>{erro}</p>}
        <form className="usuario-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={formData.nome}
            onChange={handleChange}
            required
            className="usuario-input"
            disabled={loading}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="usuario-input"
            disabled={loading}
          />
          <input
            type="tel"
            name="telefone"
            placeholder="Telefone"
            value={formData.telefone}
            onChange={handleChange}
            required
            className="usuario-input"
            disabled={loading}
          />
          <div className="form-usuario-row">
            <div className="form-group">
              <input
                type="text"
                name="documento"
                placeholder="Documento"
                value={formData.documento}
                className="usuario-input"
                disabled
              />
            </div>
            <div className="form-group">
              <DatePicker
                selected={formData.dataNascimento}
                onChange={(date) =>
                  setFormData((prev) => ({ ...prev, dataNascimento: date }))
                }
                className="usuario-input-doc"
                dateFormat="dd/MM/yyyy"
                placeholderText="Data de Nascimento"
                locale="pt"
                disabled={loading}
              />
            </div>
          </div>
          <div className="usuario-button-group">
            <button type="submit" className="usuario-submit-button" disabled={loading}>
              {loading ? "Salvando..." : "Salvar"}
            </button>
            <button
              type="button"
              onClick={abrirModalAlterarSenha}
              className="usuario-link-button"
              style={{ cursor: "pointer" }}
              disabled={loading}
            >
              Alterar Senha
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Usuario;
