import React, { useState } from 'react';
import './Contato.css';

const Contato = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: '',
    mensagem: '',
  });
  const [mensagemEnviada, setMensagemEnviada] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensagemEnviada(true);
    setTimeout(() => setMensagemEnviada(false), 5000);

    setFormData({
      nome: '',
      email: '',
      assunto: '',
      mensagem: '',
    });
  };

  return (
    <div className="contato-container">
      <h1 className="contato-title">Fale Conosco</h1>

      <div className="contato-grid">
        <div className="contato-info-card">
          <h2 className="contato-text">Informações de Contato</h2>
          <p className="contato-text">
            Estamos aqui para ajudar! Entre em contato conosco pelos canais abaixo:
          </p>
          <div className="contato-info">
            <p className="contato-text"><strong>Email:</strong> contato@cashflow.com</p>
            <p className="contato-text"><strong>Endereço:</strong> SC-401. 3730, Saco Grande - Florianópolis/SC</p>
            <p className="contato-text"><strong>Atendimento:</strong> Segunda a Sexta, das 9h às 18h</p>
            <p className="contato-text"><strong>WhatsApp:</strong> (48) 98493-8235</p>
            <div className='qr-container'>
              <img src="../../../public/qr-code.png" className='qrcode' />
            </div>            
          </div>
        </div>

        <div className="contato-form-card">
          <h2 className="contato-text">Envie sua Mensagem</h2>
          <form className="contato-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="nome"
              placeholder="Nome"
              value={formData.nome}
              onChange={handleChange}
              required
              className="contato-input"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="contato-input"
            />
            <input
              type="text"
              name="assunto"
              placeholder="Assunto"
              value={formData.assunto}
              onChange={handleChange}
              required
              className="contato-input"
            />
            <textarea
              name="mensagem"
              placeholder="Mensagem"
              value={formData.mensagem}
              onChange={handleChange}
              rows="4"
              required
              className="contato-input"
            ></textarea>
            <button type="submit" className="contato-submit-button">Enviar Mensagem</button>
          </form>
          {mensagemEnviada && (
            <div className="contato-alert sucesso">
              Mensagem enviada com sucesso! Entraremos em contato em breve.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contato;
