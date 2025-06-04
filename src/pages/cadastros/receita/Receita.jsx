import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ReactDOM from "react-dom/client";
import "./Receita.css";

const MySwal = withReactContent(Swal);

const FormularioReceita = ({ formData, setFormData, onSubmit, onCancel }) => (
  <form
    className="receita-form"
    onSubmit={(e) => {
      e.preventDefault();
      onSubmit();
    }}
  >
    <div className="form-group">
      <label>Nome</label>
      <input
        type="text"
        name="descricao"
        value={formData.descricao}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, descricao: e.target.value }))
        }
        required
        className="form-control"
      />
    </div>

    <div className="form-group">
      <label>Descrição</label>
      <textarea
        name="observacoes"
        value={formData.observacoes}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, observacoes: e.target.value }))
        }
        rows={4}
        className="form-control"
      />
    </div>

    <div className="form-buttons">
      <button type="submit" className="submit-button">
        Salvar
      </button>
      <button type="button" className="btn-cancel" onClick={onCancel}>
        Cancelar
      </button>
    </div>
  </form>
);

const Receita = () => {
  const [receitas, setReceitas] = useState([]);

  const abrirFormularioModal = (editarData = null, index = null) => {
    const container = document.createElement("div");
    MySwal.fire({
      title: index !== null ? "Editar Receita" : "Nova Receita",
      html: container,
      showConfirmButton: false,
      showCloseButton: true,
      didOpen: () => {
        function FormModal() {
          const [localFormData, setLocalFormData] = useState(
            editarData || {
              descricao: "",
              observacoes: "",
            }
          );

          const handleSubmitLocal = () => {
            if (index !== null) {
              setReceitas((prev) => {
                const novas = [...prev];
                novas[index] = localFormData;
                return novas;
              });
            } else {
              setReceitas((prev) => [...prev, localFormData]);
            }
            Swal.close();
          };

          return (
            <FormularioReceita
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
    abrirFormularioModal(receitas[index], index);
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
        setReceitas((prev) => prev.filter((_, i) => i !== index));
        Swal.fire("Excluído!", "Receita removida.", "success");
      }
    });
  };

  return (
    <div className="receita-container">
      <div className="receita-header">
        <h1>Receitas</h1>
        <button className="btn-novo" onClick={() => abrirFormularioModal()}>
          Nova Receita
        </button>
      </div>

      <table className="receita-tabela">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {receitas.length === 0 ? (
            <tr>
              <td colSpan={3} style={{ textAlign: "center", color: "#777" }}>
                Nenhuma receita cadastrada
              </td>
            </tr>
          ) : (
            receitas.map((r, i) => (
              <tr key={i}>
                <td>{r.descricao}</td>
                <td>{r.observacoes}</td>
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

export default Receita;
