import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { NumericFormat } from "react-number-format";
import pt from "date-fns/locale/pt";
import "react-datepicker/dist/react-datepicker.css";
import "./Lancamento.css";

registerLocale("pt", pt);

const Lancamento = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    tipo: "recebimento",
    data: null,
    valor: "",
    descricao: "",
    categoria: "",
    conta: "",
    pago: false,
  });
  const [lancamentos, setLancamentos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const novoLancamento = {
      ...formData,
      valor: parseFloat(formData.valor) || 0,
      pago: formData.pago || false,
    };
    if (editIndex !== null) {
      const novos = [...lancamentos];
      novos[editIndex] = novoLancamento;
      setLancamentos(novos);
    } else {
      setLancamentos([...lancamentos, novoLancamento]);
    }
    limparForm();
  };

  const limparForm = () => {
    setFormData({
      tipo: "recebimento",
      data: null,
      valor: "",
      descricao: "",
      categoria: "",
      conta: "",
      pago: false,
    });
    setFormVisible(false);
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    setFormData(lancamentos[index]);
    setEditIndex(index);
    setFormVisible(true);
  };

  const handleDelete = (index) => {
    const novos = lancamentos.filter((_, i) => i !== index);
    setLancamentos(novos);
  };

  const togglePagoStatus = (index) => {
    const novos = [...lancamentos];
    novos[index] = {
      ...novos[index],
      pago: !novos[index].pago,
    };
    setLancamentos(novos);
  };

  return (
    <div className="lancamento-container">
      <div className="lancamento-header">
        <h1>Lançamentos</h1>
        <button
          className="btn-novo"
          onClick={() => {
            limparForm();
            setFormVisible(true);
          }}
        >
          Novo
        </button>
      </div>

      {formVisible && (
        <form className="lancamento-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tipo</label>
            <select
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
              <label>Data</label>
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
              <label>Valor</label>
              <NumericFormat
                name="valor"
                value={formData.valor}
                onValueChange={(values) =>
                  setFormData({ ...formData, valor: values.value })
                }
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
            <label>Descrição</label>
            <input
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label>Categoria</label>
            <select
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">Selecione</option>
              <option value="salario">Salário</option>
              <option value="alimentacao">Alimentação</option>
              <option value="transporte">Transporte</option>
              <option value="moradia">Moradia</option>
              <option value="lazer">Lazer</option>
            </select>
          </div>

          <div className="form-group">
            <label>Conta</label>
            <select
              name="conta"
              value={formData.conta}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">Selecione</option>
              <option value="conta1">Conta Corrente</option>
              <option value="conta2">Conta Poupança</option>
              <option value="conta3">Carteira</option>
            </select>
          </div>

          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <button type="submit" className="submit-button">
              Salvar Lançamento
            </button>
            <button type="button" className="btn-novo" onClick={limparForm}>
              Cancelar
            </button>
          </div>
        </form>
      )}
      <table className="lancamento-tabela">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tipo</th>
            <th>Conta</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Status</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {lancamentos.map((l, index) => (
            <tr
              key={index}
              className={l.pago ? "linha-verde" : "linha-vermelha"}
            >
              <td>{l.descricao}</td>
              <td>{l.tipo}</td>
              <td>{l.conta}</td>
              <td>R$ {parseFloat(l.valor).toFixed(2).replace(".", ",")}</td>
              <td>{l.categoria}</td>
              <td>{l.pago ? "Pago" : "Não Pago"}</td>
              <td>
                {l.data ? new Date(l.data).toLocaleDateString("pt-BR") : ""}
              </td>
              <td>
                <button
                  onClick={() => handleEdit(index)}
                  className="btn-acao"
                  title="Editar"
                >
                  🖉
                </button>
                <button
                  onClick={() => togglePagoStatus(index)}
                  className="btn-acao"
                  title={l.pago ? "Marcar como Não Pago" : "Marcar como Pago"}
                >
                  {l.pago ? "❌" : "✔️"}
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="btn-acao"
                  title="Excluir"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Lancamento;
