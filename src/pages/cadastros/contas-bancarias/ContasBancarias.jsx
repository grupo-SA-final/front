import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ReactDOM from "react-dom/client";
import "./ContasBancarias.css";

const MySwal = withReactContent(Swal);

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
      <label>Observações</label>
      <textarea
        rows="2.5"
        value={formData.observacoes}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, observacoes: e.target.value }))
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
  const [editIndex, setEditIndex] = useState(null);

  const abrirFormularioModal = (editarData = null, index = null) => {
    const container = document.createElement("div");

    MySwal.fire({
      title: index !== null ? "Editar Conta Bancária" : "Nova Conta Bancária",
      html: container,
      showConfirmButton: false,
      showCloseButton: true,
      willClose: () => setEditIndex(null),
      didOpen: () => {
        function FormModal() {
          const [localFormData, setLocalFormData] = React.useState(
            editarData || {
              nomeBanco: "",
              tipoConta: "",
              agencia: "",
              numeroConta: "",
              observacoes: "",
            }
          );

          const handleSubmitLocal = () => {
            if (index !== null) {
              // editar existente
              setContas((prev) => {
                const novos = [...prev];
                novos[index] = localFormData;
                return novos;
              });
            } else {
              // adicionar novo
              setContas((prev) => [...prev, localFormData]);
            }
            Swal.close();
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

  const handleEdit = (index) => {
    setEditIndex(index);
    abrirFormularioModal(contas[index], index);
  };

  const handleDelete = (index) => {
    Swal.fire({
      title: "Confirma exclusão?",
      text: "Esta ação não pode ser desfeita.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setContas((prev) => prev.filter((_, i) => i !== index));
        Swal.fire("Excluído!", "Conta bancária removida.", "success");
      }
    });
  };

  const abrirNovo = () => {
    setEditIndex(null);
    abrirFormularioModal();
  };

  return (
    <div className="contas-bancarias-container">
      <div className="contas-bancarias-header">
        <h1>Contas Bancárias</h1>
        <button className="btn-novo" onClick={abrirNovo}>
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
            <th>Observações</th>
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
            contas.map((conta, i) => (
              <tr key={i}>
                <td>{conta.nomeBanco}</td>
                <td>{conta.tipoConta}</td>
                <td>{conta.agencia}</td>
                <td>{conta.numeroConta}</td>
                <td>{conta.observacoes}</td>
                <td>
                  <button
                    onClick={() => handleEdit(i)}
                    className="btn-acao edit"
                    title="Editar"
                  >
                    🖉
                  </button>
                  <button
                    onClick={() => handleDelete(i)}
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
