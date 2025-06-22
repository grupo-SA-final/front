import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaChartBar, FaSmile } from 'react-icons/fa';
import NavbarDeslogada from '../../components/navbar/NavbarDeslogada';
import './Home.css';

const HomeDeslogada = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [logged, setLogged] = useState(false);

  // Chama ao fazer login
  const handleLoginSuccess = () => {
    setLogged(true);
    if (onLoginSuccess) onLoginSuccess();
  };

  useEffect(() => {
    if (localStorage.getItem('token') || logged) {
      navigate('/');
    }
  }, [navigate, logged]);

  return (
    <div className="home-deslogada-container">
      <NavbarDeslogada onLoginSuccess={handleLoginSuccess} />
      
      <main className="home-deslogada-main">
        <section className="home-deslogada-hero">
          <div className="hero-content">
            <h1>Sua vida financeira, organizada e clara.</h1>
            <p>Com o CashFlow, você assume o controle do seu dinheiro com relatórios inteligentes, segurança e uma interface fácil de usar. Cadastre-se e comece a transformar suas finanças hoje mesmo.</p>
          </div>
          <div className="hero-image">
            <img src="/logo.png" alt="Fluxo de Caixa" />
          </div>
        </section>

        <section className="home-deslogada-features">
          <h2 className="features-title">Tudo que você precisa em um só lugar</h2>
          <div className="features-grid">
            <div className="feature-item">
              <FaChartBar size={40} className="feature-icon" />
              <h3>Relatórios Completos</h3>
              <p>Visualize suas receitas e despesas com gráficos fáceis de entender.</p>
            </div>
            <div className="feature-item">
              <FaLock size={40} className="feature-icon" />
              <h3>Segurança Total</h3>
              <p>Seus dados são criptografados e protegidos com tecnologia de ponta.</p>
            </div>
            <div className="feature-item">
              <FaSmile size={40} className="feature-icon" />
              <h3>Fácil de Usar</h3>
              <p>Uma plataforma intuitiva, pensada para ser simples e direta.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomeDeslogada; 