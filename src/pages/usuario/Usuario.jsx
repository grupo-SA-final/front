import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import pt from "date-fns/locale/pt";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ReactDOM from "react-dom/client";
import "./Usuario.css";

registerLocale("pt", pt);

const MySwal = withReactContent(Swal);

const FormAlterarSenha = ({ onClose }) => {
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (novaSenha !== confirmarSenha) {
      setErro("A nova senha e a confirmação não coincidem.");
      return;
    }
    setErro("");
    // Aqui você pode chamar API para trocar senha
    console.log("Senha alterada:", { senhaAtual, novaSenha });
    Swal.close();
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
      />
      <input
        type="password"
        placeholder="Nova Senha"
        value={novaSenha}
        onChange={(e) => setNovaSenha(e.target.value)}
        required
        className="usuario-input"
        style={{ marginBottom: "1rem" }}
      />
      <input
        type="password"
        placeholder="Confirmar Nova Senha"
        value={confirmarSenha}
        onChange={(e) => setConfirmarSenha(e.target.value)}
        required
        className="usuario-input"
        style={{ marginBottom: "1rem" }}
      />
      {erro && <p style={{ color: "red", marginBottom: "1rem" }}>{erro}</p>}

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
        <button
          type="button"
          className="usuario-link-button"
          onClick={() => {
            Swal.close();
          }}
        >
          Cancelar
        </button>
        <button type="submit" className="usuario-submit-button">
          Salvar
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
    nascimento: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados salvos:", formData);
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
        root.render(<FormAlterarSenha />);
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

        <form className="usuario-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={formData.nome}
            onChange={handleChange}
            required
            className="usuario-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="usuario-input"
          />
          <input
            type="tel"
            name="telefone"
            placeholder="Telefone"
            value={formData.telefone}
            onChange={handleChange}
            required
            className="usuario-input"
          />
          <div className="form-usuario-row">
            <div className="form-group">
              <input
                type="text"
                name="documento"
                placeholder="Documento"
                value={formData.documento}
                onChange={handleChange}
                required
                className="usuario-input"
              />
            </div>
            <div className="form-group">
              <DatePicker
                selected={formData.nascimento}
                onChange={(date) =>
                  setFormData((prev) => ({ ...prev, nascimento: date }))
                }
                className="usuario-input-doc"
                dateFormat="dd/MM/yyyy"
                placeholderText="Data de Nascimento"
                locale="pt"
              />
            </div>
          </div>

          <div className="usuario-button-group">
            <button type="submit" className="usuario-submit-button">
              Salvar
            </button>
            <button
              type="button"
              onClick={abrirModalAlterarSenha}
              className="usuario-link-button"
              style={{ cursor: "pointer" }}
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
