import React, { useState } from 'react';
import './CentroCustos.css';

const CentroCustos = () => {
  const [formData, setFormData] = useState({
    nome: '',
    codigo: '',
    descricao: '',
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
    console.log('Centro de Custo cadastrado:', formData);

    setFormData({
      nome: '',
      codigo: '',
      descricao: '',
    });
  };

  return (
    <div className="centro-custos-container">
      <h1 className="centro-custos-title">Cadastro de Centro de Custos</h1>

      <div className="centro-custos-card">
        <h2 className="centro-custos-subtitle">Novo Centro de Custo</h2>

        <form className="centro-custos-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="nome"
            placeholder="Nome do Centro de Custo"
            value={formData.nome}
            onChange={handleChange}
            required
            className="centro-custos-input"
          />

          <input
            type="text"
            name="codigo"
            placeholder="Código"
            value={formData.codigo}
            onChange={handleChange}
            required
            className="centro-custos-input"
          />

          <textarea
            name="descricao"
            placeholder="Descrição"
            rows="4"
            value={formData.descricao}
            onChange={handleChange}
            className="centro-custos-input"
          ></textarea>

          <button type="submit" className="centro-custos-button">
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
};

export default CentroCustos;
