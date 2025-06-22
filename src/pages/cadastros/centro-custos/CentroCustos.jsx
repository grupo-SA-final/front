import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ReactDOM from "react-dom/client";
import "./CentroCustos.css";
import axios from "axios";

const MySwal = withReactContent(Swal);

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

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
        disabled={!formData.nome}
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
  const API_URL = "/api/centros-de-custo";

  const fetchCentros = async () => {
    try {
      const response = await axios.get(API_URL, { headers: getAuthHeaders() });
      let centrosArr = [];
      if (Array.isArray(response.data)) {
        centrosArr = response.data;
      } else if (response.data && Array.isArray(response.data.data)) {
        centrosArr = response.data.data;
      } else {
        throw new Error('Resposta inesperada do servidor');
      }
      setCentros(centrosArr);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else {
        console.error("Erro ao buscar centros de custo:", error);
        MySwal.fire(
          "Erro!",
          "Não foi possível carregar os centros de custo.",
          "error"
        );
      }
    }
  };

  useEffect(() => {
    fetchCentros();
  }, []);

  const abrirFormularioModal = (editarData = null) => {
    const container = document.createElement("div");
    MySwal.fire({
      title: editarData ? "Editar Centro de Custos" : "Novo Centro de Custos",
      html: container,
      showConfirmButton: false,
      showCloseButton: true,
      didOpen: () => {
        function FormModal() {
          const [localFormData, setLocalFormData] = useState(
            editarData || {
              nome: "",
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
                  "Centro de custo atualizado com sucesso.",
                  "success"
                );
              } else {
                await axios.post(API_URL, localFormData, { headers: getAuthHeaders() });
                MySwal.fire(
                  "Salvo!",
                  "Centro de custo salvo com sucesso.",
                  "success"
                );
              }
              Swal.close();
              fetchCentros();
            } catch (error) {
              console.error("Erro ao salvar centro de custo:", error);
              MySwal.fire(
                "Erro!",
                "Não foi possível salvar o centro de custo.",
                "error"
              );
            }
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

  const handleEdit = (centro) => {
    abrirFormularioModal(centro);
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
          MySwal.fire("Excluído!", "Centro de custo removido.", "success");
          fetchCentros();
        } catch (error) {
          console.error("Erro ao excluir centro de custo:", error);
          MySwal.fire(
            "Erro!",
            "Não foi possível excluir o centro de custo.",
            "error"
          );
        }
      }
    });
  };

  return (
    <div className="centro-custos-container">
      <div className="centro-custos-header">
        <h1>Centro de Custos</h1>
        <button className="btn-novo" onClick={() => abrirFormularioModal()}>
          Novo Centro
        </button>
      </div>

      <table className="centro-custos-tabela">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {centros.length === 0 ? (
            <tr>
              <td colSpan={3} style={{ textAlign: "center", color: "#777" }}>
                Nenhum centro cadastrado
              </td>
            </tr>
          ) : (
            centros.map((c) => (
              <tr key={c.id}>
                <td>{c.nome}</td>
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

export default CentroCustos;
