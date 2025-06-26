import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import './Relatorio.css';
// import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'; // Descomente após instalar recharts

// Função de headers de autenticação (padrão do projeto)
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const tipos = [
  { value: '', label: 'Todos' },
  { value: 'recebimento', label: 'Receitas' },
  { value: 'pagamento', label: 'Despesas' },
];

const Relatorio = () => {
  // Filtros
  const [periodoDe, setPeriodoDe] = useState('');
  const [periodoAte, setPeriodoAte] = useState('');
  const [tipo, setTipo] = useState('');
  const [conta, setConta] = useState('');
  const [centro, setCentro] = useState('');
  const [receita, setReceita] = useState('');
  const [busca, setBusca] = useState('');

  // Dados auxiliares
  const [contas, setContas] = useState([]);
  const [centros, setCentros] = useState([]);
  const [receitas, setReceitas] = useState([]);

  // Dados do relatório
  const [lancamentos, setLancamentos] = useState([]);
  const [loading, setLoading] = useState(false);

  // Buscar dados auxiliares (contas, centros, receitas)
  useEffect(() => {
    const fetchAuxiliares = async () => {
      try {
        const [contasRes, receitasRes, centrosRes] = await Promise.all([
          axios.get('/api/contas-bancarias', { headers: getAuthHeaders() }),
          axios.get('/api/receitas', { headers: getAuthHeaders() }),
          axios.get('/api/centros-de-custo', { headers: getAuthHeaders() })
        ]);
        setContas(contasRes.data.data || contasRes.data);
        setReceitas(receitasRes.data.data || receitasRes.data);
        setCentros(centrosRes.data.data || centrosRes.data);
      } catch (e) {
        setContas([]); setReceitas([]); setCentros([]);
      }
    };
    fetchAuxiliares();
  }, []);

  // Buscar todos os lançamentos apenas uma vez
  useEffect(() => {
    const fetchLancamentos = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/api/lancamentos', { headers: getAuthHeaders() });
        const data = res.data.data || res.data;
        setLancamentos(Array.isArray(data) ? data : []);
      } catch (e) {
        setLancamentos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLancamentos();
  }, []);

  // Filtro 100% front-end OTIMIZADO com useMemo
  const lancamentosFiltrados = useMemo(() => {
    return lancamentos.filter(l => {
      let passa = true;
      if (periodoDe) {
        const dataLanc = l.data ? l.data.split('T')[0] : '';
        passa = passa && dataLanc >= periodoDe;
      }
      if (periodoAte) {
        const dataLanc = l.data ? l.data.split('T')[0] : '';
        passa = passa && dataLanc <= periodoAte;
      }
      if (tipo) passa = passa && l.tipo === tipo;
      if (conta) passa = passa && String(l.contaBancariaId) === String(conta);
      if (centro) passa = passa && String(l.centroDeCustoId) === String(centro);
      if (receita) passa = passa && String(l.receitaId) === String(receita);
      if (busca) passa = passa && l.descricao && l.descricao.toLowerCase().includes(busca.toLowerCase());
      return passa;
    });
  }, [lancamentos, periodoDe, periodoAte, tipo, conta, centro, receita, busca]);

  // Calcular resumo diretamente (sem useEffect para evitar loops)
  const resumo = useMemo(() => {
    let receitas = 0, despesas = 0;
    lancamentosFiltrados.forEach(l => {
      if (l.tipo === 'recebimento') receitas += Number(l.valor);
      if (l.tipo === 'pagamento') despesas += Number(l.valor);
    });
    return { receitas, despesas, saldo: receitas - despesas };
  }, [lancamentosFiltrados]);

  // Exportar CSV
  const exportarCSV = () => {
    const header = 'Data,Descrição,Tipo,Valor,Conta,Centro de Custo\n';
    const rows = lancamentosFiltrados.map(l => [
      l.data ? new Date(l.data).toLocaleDateString('pt-BR') : '',
      l.descricao,
      l.tipo === 'recebimento' ? 'Receita' : 'Despesa',
      `R$ ${parseFloat(l.valor).toFixed(2).replace('.', ',')}`,
      l.contaBancariaNome || '',
      l.centroDeCustoNome || ''
    ].join(','));
    const csv = header + rows.join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'relatorio.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relatorio-container">
      <h1 className="relatorio-title">Relatórios</h1>
      {/* Filtros */}
      <div className="relatorio-filtros">
        <div className="relatorio-filtro-item">
          <label>De</label>
          <input type="date" value={periodoDe} onChange={e => setPeriodoDe(e.target.value)} />
        </div>
        <div className="relatorio-filtro-item">
          <label>Até</label>
          <input type="date" value={periodoAte} onChange={e => setPeriodoAte(e.target.value)} />
        </div>
        <div className="relatorio-filtro-item">
          <label>Tipo</label>
          <select value={tipo} onChange={e => setTipo(e.target.value)}>
            {tipos.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>
        <div className="relatorio-filtro-item">
          <label>Conta</label>
          <select value={conta} onChange={e => setConta(e.target.value)}>
            <option value="">Todas as Contas</option>
            {contas.map(c => <option key={c.id} value={c.id}>{c.nomeBanco}</option>)}
          </select>
        </div>
        <div className="relatorio-filtro-item">
          <label>Centro de Custo</label>
          <select value={centro} onChange={e => setCentro(e.target.value)}>
            <option value="">Todos os Centros</option>
            {centros.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
          </select>
        </div>
        <div className="relatorio-filtro-item">
          <label>Receita</label>
          <select value={receita} onChange={e => setReceita(e.target.value)}>
            <option value="">Todas as Receitas</option>
            {receitas.map(r => <option key={r.id} value={r.id}>{r.nome}</option>)}
          </select>
        </div>
        <div className="relatorio-filtro-item">
          <label>Buscar descrição</label>
          <input type="text" value={busca} onChange={e => setBusca(e.target.value)} placeholder="Buscar descrição..." />
        </div>
        <button className="relatorio-btn-exportar" onClick={exportarCSV} type="button">Exportar CSV</button>
      </div>

      {/* Cards de resumo */}
      <div className="relatorio-resumo-cards">
        <div className="relatorio-card resumo receita">
          <span>Receitas</span>
          <strong>R$ {resumo.receitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
        </div>
        <div className="relatorio-card resumo despesa">
          <span>Despesas</span>
          <strong>R$ {resumo.despesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
        </div>
        <div className="relatorio-card resumo saldo">
          <span>Saldo</span>
          <strong>R$ {resumo.saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
        </div>
      </div>

      {/* Gráficos (implementar depois de instalar recharts) */}
      {/* <div className="relatorio-graficos">
        <div className="grafico-pizza">
          <PieChart width={300} height={300}>...</PieChart>
        </div>
        <div className="grafico-barra">
          <BarChart width={400} height={300}>...</BarChart>
        </div>
      </div> */}

      {/* Tabela detalhada */}
      <div className="relatorio-tabela-wrapper">
        <table className="relatorio-tabela">
          <thead>
            <tr>
              <th>Data</th>
              <th>Descrição</th>
              <th>Tipo</th>
              <th>Valor</th>
              <th>Conta</th>
              <th>Centro de Custo / Receita</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6}>Carregando...</td></tr>
            ) : lancamentosFiltrados.length === 0 ? (
              <tr><td colSpan={6}>Nenhum lançamento encontrado.</td></tr>
            ) : (
              lancamentosFiltrados.map(l => {
                // Buscar nome da conta
                let contaNome = l.contaBancariaNome || l.nomeBanco;
                if (!contaNome && l.contaBancariaId && contas.length > 0) {
                  const contaObj = contas.find(c => c.id === l.contaBancariaId);
                  contaNome = contaObj ? contaObj.nomeBanco : '';
                }
                // Buscar nome da receita ou centro de custo
                let centroOuReceita = '';
                if (l.tipo === 'recebimento') {
                  centroOuReceita = l.receitaNome || l.nomeReceita;
                  if (!centroOuReceita && l.receitaId && receitas.length > 0) {
                    const receitaObj = receitas.find(r => r.id === l.receitaId);
                    centroOuReceita = receitaObj ? receitaObj.nome : '';
                  }
                } else {
                  centroOuReceita = l.centroDeCustoNome || l.nomeCentroDeCusto;
                  if (!centroOuReceita && l.centroDeCustoId && centros.length > 0) {
                    const centroObj = centros.find(c => c.id === l.centroDeCustoId);
                    centroOuReceita = centroObj ? centroObj.nome : '';
                  }
                }
                return (
                  <tr key={l.id}>
                    <td>{l.data ? new Date(l.data).toLocaleDateString('pt-BR') : ''}</td>
                    <td>{l.descricao}</td>
                    <td>{l.tipo === 'recebimento' ? 'Receita' : 'Despesa'}</td>
                    <td>R$ {parseFloat(l.valor).toFixed(2).replace('.', ',')}</td>
                    <td>{contaNome || '-'}</td>
                    <td>{centroOuReceita || '-'}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Relatorio;
