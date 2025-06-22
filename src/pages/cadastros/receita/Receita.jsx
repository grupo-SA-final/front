import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ReactDOM from "react-dom/client";
import "./Receita.css";
import axios from "axios";

const MySwal = withReactContent(Swal);

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Componente FormularioReceita (mantém-se o mesmo, pois ele só lida com o estado local do formulário)
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
  const API_URL = "/api/receitas";

  // Função para buscar as receitas do backend
  const fetchReceitas = async () => {
    try {
      const response = await axios.get(API_URL, { headers: getAuthHeaders() });
      console.log('RESPONSE DATA:', response.data);
      let receitasArr = [];
      if (Array.isArray(response.data)) {
        receitasArr = response.data;
      } else if (response.data && Array.isArray(response.data.data)) {
        receitasArr = response.data.data;
      } else {
        throw new Error('Resposta inesperada do servidor');
      }
      setReceitas(receitasArr);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else {
        console.error("Erro ao buscar receitas:", error);
        MySwal.fire(
          "Erro!",
          "Não foi possível carregar as receitas.",
          "error"
        );
      }
    }
  };

  // Carrega as receitas ao montar o componente
  useEffect(() => {
    fetchReceitas();
  }, []);

  const abrirFormularioModal = (editarData = null) => {
    const container = document.createElement("div");
    MySwal.fire({
      title: editarData ? "Editar Receita" : "Nova Receita",
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
                // Atualizar receita existente
                await axios.put(
                  `${API_URL}/${editarData.id}`,
                  localFormData,
                  { headers: getAuthHeaders() }
                );
                MySwal.fire(
                  "Atualizado!",
                  "Receita atualizada com sucesso.",
                  "success"
                );
              } else {
                // Criar nova receita
                await axios.post(API_URL, localFormData, { headers: getAuthHeaders() });
                MySwal.fire(
                  "Salvo!",
                  "Receita salva com sucesso.",
                  "success"
                );
              }
              Swal.close();
              fetchReceitas(); // Atualiza a lista após salvar/atualizar
            } catch (error) {
              console.error("Erro ao salvar receita:", error);
              MySwal.fire(
                "Erro!",
                "Não foi possível salvar a receita.",
                "error"
              );
            }
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

  const handleEdit = (receita) => {
    abrirFormularioModal(receita);
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
          MySwal.fire("Excluído!", "Receita removida.", "success");
          fetchReceitas(); // Atualiza a lista após excluir
        } catch (error) {
          console.error("Erro ao excluir receita:", error);
          MySwal.fire(
            "Erro!",
            "Não foi possível excluir a receita.",
            "error"
          );
        }
      }
    });
  };

  console.log('RECEITAS STATE:', receitas);

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
            receitas.map((r) => (
              <tr key={r.id}>
                <td>{r.nome}</td>
                <td>{r.descricao}</td>
                <td>
                  <button
                    onClick={() => handleEdit(r)}
                    className="btn-acao edit"
                    title="Editar"
                  >
                    🖉
                  </button>
                  <button
                    onClick={() => handleDelete(r.id)}
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