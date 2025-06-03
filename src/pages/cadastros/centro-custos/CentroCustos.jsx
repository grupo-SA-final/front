import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ReactDOM from "react-dom/client";
import "./CentroCustos.css";

const MySwal = withReactContent(Swal);

const FormularioCentroCustos = ({ formData, setFormData, onSubmit, onCancel }) => (
  <form
    className="centro-custos-form"
    onSubmit={(e) => {
      e.preventDefault();
      onSubmit();
    }}
  >
    <div className="form-group">
      <label>Nome</label>
      <input
        type="text"
        name="nome"
        value={formData.nome}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, nome: e.target.value }))
        }
        required
        className="form-control"
      />
    </div>

    <div className="form-group">
      <label>Código</label>
      <input
        type="text"
        name="codigo"
        value={formData.codigo}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, codigo: e.target.value }))
        }
        required
        className="form-control"
      />
    </div>

    <div className="form-group">
      <label>Descrição</label>
      <textarea
        name="descricao"
        value={formData.descricao}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, descricao: e.target.value }))
        }
        rows={4}
        className="form-control"
      />
    </div>

    <div className="form-buttons">
      <button
        type="submit"
        className="submit-button"
        disabled={!formData.nome || !formData.codigo}
      >
        Salvar Centro
      </button>
      <button type="button" className="btn-cancel" onClick={onCancel}>
        Cancelar
      </button>
    </div>
  </form>
);

const CentroCustos = () => {
  const [centros, setCentros] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const abrirFormularioModal = (editarData = null, index = null) => {
    const container = document.createElement("div");
    MySwal.fire({
      title: index !== null ? "Editar Centro de Custos" : "Novo Centro de Custos",
      html: container,
      showConfirmButton: false,
      showCloseButton: true,
      willClose: () => setEditIndex(null),
      didOpen: () => {
        function FormModal() {
          const [localFormData, setLocalFormData] = React.useState(
            editarData || {
              nome: "",
              codigo: "",
              descricao: "",
            }
          );

          const handleSubmitLocal = () => {
            if (index !== null) {
              // editar existente
              setCentros((prev) => {
                const novos = [...prev];
                novos[index] = localFormData;
                return novos;
              });
            } else {
              // adicionar novo
              setCentros((prev) => [...prev, localFormData]);
            }
            Swal.close();
          };

          return (
            <FormularioCentroCustos
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
    abrirFormularioModal(centros[index], index);
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
        setCentros((prev) => prev.filter((_, i) => i !== index));
        Swal.fire("Excluído!", "Centro de custos removido.", "success");
      }
    });
  };

  const abrirNovo = () => {
    setEditIndex(null);
    abrirFormularioModal();
  };

  return (
    <div className="centro-custos-container">
      <div className="centro-custos-header">
        <h1>Centro de Custos</h1>
        <button className="btn-novo" onClick={abrirNovo}>
          Novo Centro
        </button>
      </div>

      <table className="centro-custos-tabela">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Código</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {centros.length === 0 ? (
            <tr>
              <td colSpan={4} style={{ textAlign: "center", color: "#777" }}>
                Nenhum centro cadastrado
              </td>
            </tr>
          ) : (
            centros.map((c, i) => (
              <tr key={i}>
                <td>{c.nome}</td>
                <td>{c.codigo}</td>
                <td>{c.descricao}</td>
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

export default CentroCustos;
