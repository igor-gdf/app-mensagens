import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import api from '../services/api';

export default function Register() {
  const [form, setForm] = useState({ nome: '', email: '', senha: '' });
  const navigate = useNavigate();

  const registrar = async (e) => {
    e.preventDefault();
    try {
      await api.post('/usuarios', form);
      alert('Usuário criado com sucesso!');
      navigate('/login');
    } catch (err) {
      if (err.response && err.response.status === 400) {
        alert('Erro: Verifique os campos. A senha deve atender aos requisitos.');
      } else {
        alert('Erro ao cadastrar usuário.');
      }
    }



  };

  return (
    <form className="container" onSubmit={registrar}>
      <h2>Cadastrar</h2>
      <input
        placeholder="Nome"
        value={form.nome}
        onChange={e => setForm({ ...form, nome: e.target.value })}
      />
      <input
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Senha"
        type="password"
        value={form.senha}
        onChange={e => setForm({ ...form, senha: e.target.value })}
      />
      <small style={{ fontSize: '0.8rem', color: '#666' }}>
        A senha deve conter 8 caracteres, incluindo: número, letra maiúscula, letra minúscula e símbolo (@!%*?&).
      </small>
      <button type="submit">Registrar</button>
      <p>Já tem sua conta? Acesse <Link to="/login">Login</Link></p>
    </form>
  );
}
