import React, { useState } from 'react';
import './Lancamento.css';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { NumericFormat } from 'react-number-format';
import pt from "date-fns/locale/pt";

registerLocale("pt", pt);


const Lancamento = () => {
  const [formData, setFormData] = useState({
    tipo: 'receita',
    data: '',
    valor: '',
    descricao: '',
    categoria: '',
    conta: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados do lançamento:', formData);
    // Aqui você implementaria a lógica para salvar o lançamento
  };

  return (
    <div className="lancamento-container">
      <h1 className="lancamento-title">Novo Lançamento</h1>
      
      <form className="lancamento-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="tipo">Tipo de Lançamento</label>
          <select
            id="tipo"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            className="form-control"
          >
            <option value="pagamento">Pagamento</option>
            <option value="recebimento">Recebimento</option>
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="data">Data</label>
            <DatePicker
              selected={formData.data}
              onChange={(date) => setFormData({ ...formData, data: date })}
              className="form-control"
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/mm/aaaa"
              locale="pt"
            />
          </div>

          <div className="form-group">
            <label htmlFor="valor">Valor</label>
            <NumericFormat
              id="valor"
              name="valor"
              value={formData.valor}
              onValueChange={(values) => {
                const { value } = values; 
                setFormData({ ...formData, valor: value });
              }}
              thousandSeparator="."
              decimalSeparator=","
              decimalScale={2}
              fixedDecimalScale
              allowNegative={false}
              className="form-control"
              placeholder="0,00"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="descricao">Descrição</label>
          <input
            type="text"
            id="descricao"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="categoria">Categoria</label>
          <select
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="">Selecione uma categoria</option>
            <option value="salario">Salário</option>
            <option value="alimentacao">Alimentação</option>
            <option value="transporte">Transporte</option>
            <option value="moradia">Moradia</option>
            <option value="lazer">Lazer</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="conta">Conta</label>
          <select
            id="conta"
            name="conta"
            value={formData.conta}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="">Selecione uma conta</option>
            <option value="conta1">Conta Corrente</option>
            <option value="conta2">Conta Poupança</option>
            <option value="conta3">Carteira</option>
          </select>
        </div>

        <button type="submit" className="submit-button">
          Salvar Lançamento
        </button>
      </form>
    </div>
  );
};

export default Lancamento; 