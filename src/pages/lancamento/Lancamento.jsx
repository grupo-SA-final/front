import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { NumericFormat } from "react-number-format";
import pt from "date-fns/locale/pt";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ReactDOM from "react-dom/client";
import "react-datepicker/dist/react-datepicker.css";
import "./Lancamento.css";

registerLocale("pt", pt);

const MySwal = withReactContent(Swal);

const Formulario = ({ formData, setFormData, onSubmit, onCancel }) => (
  <form
    className="lancamento-form"
    onSubmit={(e) => {
      e.preventDefault();
      onSubmit();
    }}
  >
    <div className="form-group">
      <label>Tipo</label>
      <select
        name="tipo"
        value={formData.tipo}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, tipo: e.target.value }))
        }
        className="form-control"
      >
        <option value="pagamento">Pagamento</option>
        <option value="recebimento">Recebimento</option>
      </select>
    </div>

    <div className="form-lanc">
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
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, descricao: e.target.value }))
        }
        className="form-control"
        required
      />
    </div>

    <div className="form-group">
      <label>Categoria</label>
      <select
        name="categoria"
        value={formData.categoria}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, categoria: e.target.value }))
        }
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
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, conta: e.target.value }))
        }
        className="form-control"
        required
      >
        <option value="">Selecione</option>
        <option value="conta1">Conta Corrente</option>
        <option value="conta2">Conta Poupança</option>
        <option value="conta3">Carteira</option>
      </select>
    </div>

    <div style={{ display: "flex", gap: "1rem", marginTop: "1rem", justifyContent: "end" }}>
      <button
        type="submit"
        className="submit-button" 
        disabled={
          !formData.descricao ||
          !formData.categoria ||
          !formData.conta ||
          !formData.data ||
          !formData.valor
        }
      >
        Salvar Lançamento
      </button>
      <button type="button" className="btn-novo" onClick={onCancel}>
        Cancelar
      </button>
    </div>
  </form>
);

const Lancamento = () => {
  const [lancamentos, setLancamentos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const abrirFormularioModal = (editarData = null, index = null) => {
    const container = document.createElement("div");
    MySwal.fire({
      title: "Lançamento",
      html: container,
      showConfirmButton: false,
      showCloseButton: true,
      willClose: () => {
        setEditIndex(null);
      },
      didOpen: () => {
        function FormModal() {
          const [localFormData, setLocalFormData] = React.useState(
            editarData || {
              tipo: "recebimento",
              data: null,
              valor: "",
              descricao: "",
              categoria: "",
              conta: "",
              pago: false,
            }
          );

          const handleSubmitLocal = () => {
            const novoLancamento = {
              ...localFormData,
              valor: parseFloat(localFormData.valor) || 0,
              pago: localFormData.pago || false,
            };
            if (index !== null) {
              // Editando um lançamento existente
              setLancamentos((prev) => {
                const novos = [...prev];
                novos[index] = novoLancamento;
                return novos;
              });
            } else {
              // Criando novo lançamento
              setLancamentos((prev) => [...prev, novoLancamento]);
            }
            Swal.close();
          };

          return (
            <Formulario
              formData={localFormData}
              setFormData={setLocalFormData}
              onSubmit={handleSubmitLocal}
              onCancel={() => Swal.close()}
            />
          );
        }

        ReactDOM.createRoot(container).render(<FormModal />);
      },
    });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    abrirFormularioModal(lancamentos[index], index);
  };

  const handleDelete = (index) => {
    setLancamentos((prev) => prev.filter((_, i) => i !== index));
  };

  const togglePagoStatus = (index) => {
    setLancamentos((prev) => {
      const novos = [...prev];
      novos[index] = {
        ...novos[index],
        pago: !novos[index].pago,
      };
      return novos;
    });
  };

  const abrirNovo = () => {
    setEditIndex(null);
    abrirFormularioModal();
  };

  return (
    <div className="lancamento-container">
      <div className="lancamento-header">
        <h1>Lançamentos</h1>
        <button className="btn-novo" onClick={abrirNovo}>
          Novo Lançamento
        </button>
      </div>
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
          {lancamentos.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ textAlign: "center", color: "#777" }}>
                Nenhuma conta cadastrada
              </td>
            </tr>
          ) : (
            lancamentos.map((l, index) => (
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
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Lancamento;
