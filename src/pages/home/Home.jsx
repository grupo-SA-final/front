import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Home.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

const Home = () => {
  const [lancamentos, setLancamentos] = useState([]);
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const fetchLancamentos = async () => {
      try {
        const response = await axios.get('/api/lancamentos', { headers: getAuthHeaders() });
        const data = response.data.data || response.data;
        setLancamentos(Array.isArray(data) ? data : []);
      } catch (error) {
        setLancamentos([]);
      }
    };
    fetchLancamentos();
  }, []);

  // Mapear lançamentos por data
  const lancamentosPorData = lancamentos.reduce((acc, l) => {
    if (l.data) {
      const key = l.data.split('T')[0];
      if (!acc[key]) acc[key] = [];
      acc[key].push(l);
    }
    return acc;
  }, {});

  // Lançamentos mais próximos de vencer (data >= hoje)
  const hoje = new Date();
  const proximos = lancamentos
    .filter(l => l.data && new Date(l.data) >= hoje)
    .sort((a, b) => new Date(a.data) - new Date(b.data))
    .slice(0, 4);

  // Modal ao clicar no dia
  const handleDayClick = (date) => {
    const key = formatDate(date);
    const lancs = lancamentosPorData[key] || [];
    if (lancs.length > 0) {
      MySwal.fire({
        title: `Lançamentos em ${date.toLocaleDateString('pt-BR')}`,
        html: `
          <div style='border-bottom:1px solid #222;width:100%;margin-bottom:14px;'></div>
          <ul style='padding-left:0;list-style:none;'>${lancs.map((l, idx) => `
            <li style='margin-bottom:10px;${idx < lancs.length - 1 ? 'border-bottom:1.6px solid var(--primary-color);padding-bottom:12px;' : ''}'>
              <strong>${l.descricao.slice(0, 30)}</strong><br/>
              <span>R$ ${parseFloat(l.valor).toFixed(2).replace('.', ',')}</span>
            </li>`).join('')}</ul>`,
        showCloseButton: true,
        confirmButtonText: 'Fechar',
        width: 420,
      });
    }
  };

  return (
    <div className="home-dashboard-container">
      <div className="home-calendar-section">
        <h2 className="home-section-title">Calendário de Lançamentos</h2>
        <Calendar
          value={value}
          onChange={setValue}
          onClickDay={handleDayClick}
          tileContent={({ date, view }) => {
            if (view === 'month') {
              const key = formatDate(date);
              const lancs = lancamentosPorData[key] || [];
              return lancs.length > 0 ? (
                <div className="calendar-lancamentos">
                  {lancs.slice(0, 2).map((l, i) => (
                    <div key={i} className="calendar-lancamento-item" title={l.descricao}>
                      {l.descricao.slice(0, 10)}
                    </div>
                  ))}
                  {lancs.length > 2 && <div className="calendar-lancamento-item">+{lancs.length - 2}</div>}
                </div>
              ) : null;
            }
            return null;
          }}
        />
      </div>
      <div className="home-list-section">
        <h2 className="home-section-title">Próximos Lançamentos</h2>
        <ul className="home-proximos-lista">
          {proximos.length === 0 ? (
            <li className="home-proximos-vazio">Nenhum lançamento próximo</li>
          ) : (
            proximos.map((l) => (
              <li key={l.id} className="home-proximos-item">
                <div className="home-proximos-desc">{l.descricao.slice(0, 30)}</div>
                <div className="home-proximos-info">
                  <span>{new Date(l.data).toLocaleDateString('pt-BR')}</span>
                  <span>R$ {parseFloat(l.valor).toFixed(2).replace('.', ',')}</span>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Home; 