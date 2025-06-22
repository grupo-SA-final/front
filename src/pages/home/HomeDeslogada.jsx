import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <div>
      <NavbarDeslogada onLoginSuccess={handleLoginSuccess} />
      <div className="home-container" style={{ marginTop: 80 }}>
        <h1 className="home-title">Bem-vindo ao CashFlow</h1>
        <p className="home-description">
          Gerencie suas finanças de forma eficiente e segura.<br />
          Faça login ou cadastre-se para começar!
        </p>
      </div>
    </div>
  );
};

export default HomeDeslogada; 