import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Usuario.css";
import DatePicker, { registerLocale } from "react-datepicker";
import pt from "date-fns/locale/pt";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("pt", pt);

const Usuario = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    documento: "",
    nascimento: "",
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
    // Aqui você pode enviar os dados para o backend
    console.log("Dados salvos:", formData);
  };

  return (
    <div className="usuario-container">
      <h1 className="usuario-title">Perfil do Usuário</h1>

      <div className="usuario-card">
        <h2 className="usuario-text">Informações Pessoais</h2>
        <p className="usuario-text">
          Gerencie suas informações de conta abaixo.
        </p>

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
          <div className="form-row">
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
                name="nascimento"
                placeholder="Data de Nascimento"
                value={formData.nascimento}
                onChange={handleChange}
                required
                className="usuario-input-date"
                dateFormat="dd/MM/yyyy"
                placeholderText="dd/mm/aaaa"
                locale="pt"
              />
            </div>
          </div>

          <div className="usuario-button-group">
            <button type="submit" className="usuario-submit-button">
              Salvar
            </button>
            <Link to="/alterar-senha" className="usuario-link-button">
              Alterar Senha
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Usuario;
