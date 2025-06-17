import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 Importa o hook
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
      alert('Erro ao cadastrar');
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
      <button type="submit">Registrar</button>
      <p>Já tem uma conta? Acesse <a href="/login">Login</a></p>
    </form>
  );
}
