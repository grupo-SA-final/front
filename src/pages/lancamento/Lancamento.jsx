import React, { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { NumericFormat } from "react-number-format";
import pt from "date-fns/locale/pt";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ReactDOM from "react-dom/client";
import "react-datepicker/dist/react-datepicker.css";
import "./Lancamento.css";
import axios from "axios";

registerLocale("pt", pt);

const MySwal = withReactContent(Swal);

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const Formulario = ({ formData, setFormData, onSubmit, onCancel, contas, receitas, centros }) => (
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
      <label>Conta Bancária</label>
      <select
        name="contaBancariaId"
        value={formData.contaBancariaId || ""}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, contaBancariaId: e.target.value }))
        }
        className="form-control"
        required
      >
        <option value="">Selecione</option>
        {contas.map((conta) => (
          <option key={conta.id} value={conta.id}>
            {conta.nomeBanco} - {conta.tipoConta} ({conta.agencia}/{conta.numeroConta})
          </option>
        ))}
      </select>
    </div>
    {formData.tipo === "recebimento" && (
      <div className="form-group">
        <label>Receita</label>
        <select
          name="receitaId"
          value={formData.receitaId || ""}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, receitaId: e.target.value }))
          }
          className="form-control"
          required
        >
          <option value="">Selecione</option>
          {receitas.map((r) => (
            <option key={r.id} value={r.id}>{r.nome}</option>
          ))}
        </select>
      </div>
    )}
    {formData.tipo === "pagamento" && (
      <div className="form-group">
        <label>Centro de Custo</label>
        <select
          name="centroDeCustoId"
          value={formData.centroDeCustoId || ""}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, centroDeCustoId: e.target.value }))
          }
          className="form-control"
          required
        >
          <option value="">Selecione</option>
          {centros.map((c) => (
            <option key={c.id} value={c.id}>{c.nome}</option>
          ))}
        </select>
      </div>
    )}
    <div style={{ display: "flex", gap: "1rem", marginTop: "1rem", justifyContent: "end" }}>
      <button
        type="submit"
        className="submit-button"
        disabled={
          !formData.descricao ||
          !formData.contaBancariaId ||
          !formData.data ||
          !formData.valor ||
          (formData.tipo === "recebimento" && !formData.receitaId) ||
          (formData.tipo === "pagamento" && !formData.centroDeCustoId)
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
  const [contas, setContas] = useState([]);
  const [receitas, setReceitas] = useState([]);
  const [centros, setCentros] = useState([]);
  const API_URL = "/api/lancamentos";

  // Buscar dados auxiliares
  useEffect(() => {
    const fetchAuxiliares = async () => {
      try {
        const [contasRes, receitasRes, centrosRes] = await Promise.all([
          axios.get("/api/contas-bancarias", { headers: getAuthHeaders() }),
          axios.get("/api/receitas", { headers: getAuthHeaders() }),
          axios.get("/api/centros-de-custo", { headers: getAuthHeaders() })
        ]);
        setContas(Array.isArray(contasRes.data) ? contasRes.data : contasRes.data.data || []);
        setReceitas(Array.isArray(receitasRes.data) ? receitasRes.data : receitasRes.data.data || []);
        setCentros(Array.isArray(centrosRes.data) ? centrosRes.data : centrosRes.data.data || []);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        } else {
          MySwal.fire("Erro!", "Não foi possível carregar dados auxiliares.", "error");
        }
      }
    };
    fetchAuxiliares();
    fetchLancamentos();
  }, []);

  // Buscar lançamentos
  const fetchLancamentos = async () => {
    try {
      const response = await axios.get(API_URL, { headers: getAuthHeaders() });
      const data = response.data.data || response.data;
      setLancamentos(Array.isArray(data) ? data : []);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else {
        MySwal.fire("Erro!", "Não foi possível carregar os lançamentos.", "error");
      }
    }
  };

  const [editIndex, setEditIndex] = useState(null);

  const abrirFormularioModal = (editarData = null, index = null) => {
    const container = document.createElement("div");
    MySwal.fire({
      title: editarData ? "Editar Lançamento" : "Novo Lançamento",
      html: container,
      showConfirmButton: false,
      showCloseButton: true,
      willClose: () => {
        setEditIndex(null);
      },
      didOpen: () => {
        function FormModal() {
          const [localFormData, setLocalFormData] = React.useState(
            editarData
              ? {
                  ...editarData,
                  data: editarData.data ? new Date(editarData.data) : null,
                }
              : {
                  tipo: "recebimento",
                  data: null,
                  valor: "",
                  descricao: "",
                  contaBancariaId: "",
                  receitaId: "",
                  centroDeCustoId: "",
                }
          );

          const handleSubmitLocal = async () => {
            try {
              const payload = {
                ...localFormData,
                valor: parseFloat(localFormData.valor) || 0,
                data: localFormData.data ? localFormData.data.toISOString().split("T")[0] : null,
                contaBancariaId: localFormData.contaBancariaId ? Number(localFormData.contaBancariaId) : null,
                receitaId: localFormData.tipo === 'recebimento' ? (localFormData.receitaId ? Number(localFormData.receitaId) : null) : null,
                centroDeCustoId: localFormData.tipo === 'pagamento' ? (localFormData.centroDeCustoId ? Number(localFormData.centroDeCustoId) : null) : null,
              };
              if (editarData && editarData.id) {
                await axios.put(
                  `${API_URL}/${editarData.id}`,
                  payload,
                  { headers: getAuthHeaders() }
                );
                MySwal.fire("Atualizado!", "Lançamento atualizado com sucesso.", "success");
              } else {
                await axios.post(API_URL, payload, { headers: getAuthHeaders() });
                MySwal.fire("Salvo!", "Lançamento salvo com sucesso.", "success");
              }
              Swal.close();
              fetchLancamentos();
            } catch (error) {
              console.error("Erro ao salvar lançamento:", error);
              MySwal.fire(
                "Erro!",
                error.response?.data?.message || "Não foi possível salvar o lançamento.",
                "error"
              );
            }
          };

          return (
            <Formulario
              formData={localFormData}
              setFormData={setLocalFormData}
              onSubmit={handleSubmitLocal}
              onCancel={() => Swal.close()}
              contas={contas}
              receitas={receitas}
              centros={centros}
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
    const lancamento = lancamentos[index];
    Swal.fire({
      title: "Confirma exclusão?",
      text: "Esta ação não pode ser desfeita.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${API_URL}/${lancamento.id}`, { headers: getAuthHeaders() });
          MySwal.fire("Excluído!", "Lançamento removido.", "success");
          fetchLancamentos();
        } catch (error) {
          console.error("Erro ao excluir lançamento:", error);
          MySwal.fire(
            "Erro!",
            error.response?.data?.message || "Não foi possível excluir o lançamento.",
            "error"
          );
        }
      }
    });
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
                <td>{
                  contas.find(c => c.id === l.contaBancariaId)?.nomeBanco || ''
                }</td>
                <td>R$ {parseFloat(l.valor).toFixed(2).replace(".", ",")}</td>
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
