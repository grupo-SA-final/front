import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ReactDOM from "react-dom/client";
import "./ContasBancarias.css";
import axios from "axios";

const MySwal = withReactContent(Swal);

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const FormularioConta = ({ formData, setFormData, onSubmit, onCancel }) => (
  <form
    className="contas-bancarias-form"
    onSubmit={(e) => {
      e.preventDefault();
      onSubmit();
    }}
  >
    <div className="form-row">
      <label>Nome do Banco</label>
      <input
        type="text"
        value={formData.nomeBanco}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, nomeBanco: e.target.value }))
        }
        required
        className="contas-bancarias-input"
      />
    </div>

    <div className="form-row">
      <label>Tipo de Conta</label>
      <select
        value={formData.tipoConta}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, tipoConta: e.target.value }))
        }
        required
        className="contas-bancarias-input"
      >
        <option value="">Selecione o tipo</option>
        <option value="corrente">Conta Corrente</option>
        <option value="poupanca">Conta Poupança</option>
        <option value="investimento">Conta Investimento</option>
      </select>
    </div>

    <div className="form-row-dupla">
      <div className="form-row">
        <label>Agência</label>
        <input
          type="text"
          value={formData.agencia}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, agencia: e.target.value }))
          }
          className="contas-bancarias-input"
        />
      </div>

      <div className="form-row">
        <label>Número da Conta</label>
        <input
          type="text"
          value={formData.numeroConta}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, numeroConta: e.target.value }))
          }
          className="contas-bancarias-input"
        />
      </div>
    </div>

    <div className="form-row">
      <label>Descrição</label>
      <textarea
        rows="2.5"
        value={formData.descricao}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, descricao: e.target.value }))
        }
        className="contas-bancarias-desc"
      ></textarea>
    </div>

    <div className="form-row form-buttons">
      <button
        type="submit"
        className="contas-bancarias-button"
        disabled={!formData.nomeBanco || !formData.tipoConta}
      >
        Salvar Conta
      </button>
      <button type="button" className="btn-cancel" onClick={onCancel}>
        Cancelar
      </button>
    </div>
  </form>
);

const ContasBancarias = () => {
  const [contas, setContas] = useState([]);
  const API_URL = "/api/contas-bancarias";

  const fetchContas = async () => {
    try {
      const response = await axios.get(API_URL, { headers: getAuthHeaders() });
      let contasArr = [];
      if (Array.isArray(response.data)) {
        contasArr = response.data;
      } else if (response.data && Array.isArray(response.data.data)) {
        contasArr = response.data.data;
      } else {
        throw new Error('Resposta inesperada do servidor');
      }
      setContas(contasArr);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else {
        console.error("Erro ao buscar contas bancárias:", error);
        MySwal.fire(
          "Erro!",
          "Não foi possível carregar as contas bancárias.",
          "error"
        );
      }
    }
  };

  useEffect(() => {
    fetchContas();
  }, []);

  const abrirFormularioModal = (editarData = null) => {
    const container = document.createElement("div");
    MySwal.fire({
      title: editarData ? "Editar Conta Bancária" : "Nova Conta Bancária",
      html: container,
      showConfirmButton: false,
      showCloseButton: true,
      didOpen: () => {
        function FormModal() {
          const [localFormData, setLocalFormData] = useState(
            editarData || {
              nomeBanco: "",
              tipoConta: "",
              agencia: "",
              numeroConta: "",
              descricao: "",
            }
          );

          const handleSubmitLocal = async () => {
            try {
              if (editarData) {
                await axios.put(
                  `${API_URL}/${editarData.id}`,
                  localFormData,
                  { headers: getAuthHeaders() }
                );
                MySwal.fire(
                  "Atualizado!",
                  "Conta bancária atualizada com sucesso.",
                  "success"
                );
              } else {
                await axios.post(API_URL, localFormData, { headers: getAuthHeaders() });
                MySwal.fire(
                  "Salvo!",
                  "Conta bancária salva com sucesso.",
                  "success"
                );
              }
              Swal.close();
              fetchContas();
            } catch (error) {
              console.error("Erro ao salvar conta bancária:", error);
              MySwal.fire(
                "Erro!",
                "Não foi possível salvar a conta bancária.",
                "error"
              );
            }
          };

          return (
            <FormularioConta
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

  const handleEdit = (conta) => {
    abrirFormularioModal(conta);
  };

  const handleDelete = (id) => {
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
          await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeaders() });
          MySwal.fire("Excluído!", "Conta bancária removida.", "success");
          fetchContas();
        } catch (error) {
          console.error("Erro ao excluir conta bancária:", error);
          MySwal.fire(
            "Erro!",
            "Não foi possível excluir a conta bancária.",
            "error"
          );
        }
      }
    });
  };

  return (
    <div className="contas-bancarias-container">
      <div className="contas-bancarias-header">
        <h1>Contas Bancárias</h1>
        <button className="btn-novo" onClick={() => abrirFormularioModal()}>
          Nova Conta
        </button>
      </div>

      <table className="contas-bancarias-tabela">
        <thead>
          <tr>
            <th>Banco</th>
            <th>Tipo</th>
            <th>Agência</th>
            <th>Número Conta</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {contas.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ textAlign: "center", color: "#777" }}>
                Nenhuma conta cadastrada
              </td>
            </tr>
          ) : (
            contas.map((c) => (
              <tr key={c.id}>
                <td>{c.nomeBanco}</td>
                <td>{c.tipoConta}</td>
                <td>{c.agencia}</td>
                <td>{c.numeroConta}</td>
                <td>{c.descricao}</td>
                <td>
                  <button
                    onClick={() => handleEdit(c)}
                    className="btn-acao edit"
                    title="Editar"
                  >
                    🖉
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="btn-acao delete"
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

export default ContasBancarias;
