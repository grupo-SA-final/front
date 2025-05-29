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
    setFormData(prev => ({
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
          <div className="form-row">
            <input
              type="text"
              name="nome"
              placeholder="Nome do Centro de Custo"
              className="centro-custos-input"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <input
              type="text"
              name="codigo"
              placeholder="Código"
              className="centro-custos-input"
              value={formData.codigo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <textarea
              name="descricao"
              placeholder="Descrição"
              rows="4"
              className="centro-custos-input"
              value={formData.descricao}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-row">
            <button type="submit" className="centro-custos-button">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CentroCustos;
