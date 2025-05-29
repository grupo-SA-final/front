import React, { useState } from 'react';
import './Receita.css';

const Receita = () => {
  const [formData, setFormData] = useState({
    descricao: '',
    valor: '',
    data: '',
    categoria: '',
    observacoes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode enviar para uma API ou salvar localmente
    console.log('Receita cadastrada:', formData);

    // Resetar o formulário após envio
    setFormData({
      descricao: '',
      valor: '',
      data: '',
      categoria: '',
      observacoes: '',
    });
  };

  return (
    <div className="receita-container">
      <h1 className="receita-title">Cadastro de Receita</h1>

      <div className="receita-card">
        <h2 className="receita-subtitle">Nova Receita</h2>

        <form className="receita-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              name="descricao"
              placeholder="Descrição"
              className="receita-input"
              value={formData.descricao}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <input
              type="number"
              name="valor"
              placeholder="Valor"
              className="receita-input"
              value={formData.valor}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <input
              type="date"
              name="data"
              className="receita-input"
              value={formData.data}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <select
              name="categoria"
              className="receita-input"
              value={formData.categoria}
              onChange={handleChange}
              required
            >
              <option value="">Categoria</option>
              <option value="salario">Salário</option>
              <option value="investimentos">Investimentos</option>
              <option value="outros">Outros</option>
            </select>
          </div>

          <div className="form-row">
            <textarea
              name="observacoes"
              placeholder="Observações"
              rows="4"
              className="receita-input"
              value={formData.observacoes}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-row">
            <button type="submit" className="receita-button">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Receita;
