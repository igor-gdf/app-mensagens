import { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [mensagens, setMensagens] = useState([]);
  const [nova, setNova] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [buscaId, setBuscaId] = useState('');
  const [mensagemEncontrada, setMensagemEncontrada] = useState(null);
  const navigate = useNavigate();

  const carregar = async () => {
    const res = await api.get('/mensagens');
    setMensagens(res.data);
  };

  const enviar = async (e) => {
    e.preventDefault();
    if (!nova.trim()) return;

    if (editandoId) {
      await api.put(`/mensagens/${editandoId}`, { conteudo: nova });
      setEditandoId(null);
    } else {
      await api.post('/mensagens', { conteudo: nova });
    }

    setNova('');
    carregar();
  };

  const excluir = async (id) => {
    await api.delete(`/mensagens/${id}`);
    carregar();
  };

  const editar = (msg) => {
    setEditandoId(msg.id);
    setNova(msg.conteudo);
  };

  const buscarPorId = async () => {
    if (!buscaId.trim()) return;
    try {
      const res = await api.get(`/mensagens/${buscaId}`);
      setMensagemEncontrada(res.data);
    } catch (err) {
      alert('Mensagem não encontrada.');
      setMensagemEncontrada(null);
    }
  };

  const logout = () => {
  localStorage.removeItem('token'); // remove o JWT
  navigate('/login'); // redireciona para a tela de login
};

  useEffect(() => {
    carregar();
  }, []);

  return (
    <div className="container">
      <h2>Mensagens</h2>

      <form onSubmit={enviar}>
        <input
          value={nova}
          onChange={e => setNova(e.target.value)}
          placeholder={editandoId ? 'Editando mensagem...' : 'Nova mensagem'}
        />
        <button type="submit">{editandoId ? 'Salvar edição' : 'Enviar'}</button>
        {editandoId && (
          <button type="button" onClick={() => { setEditandoId(null); setNova(''); }}>
            Cancelar
          </button>
        )}
      </form>

      <h3>Buscar mensagem por ID</h3>
      <input
        value={buscaId}
        onChange={e => setBuscaId(e.target.value)}
        placeholder="ID da mensagem"
      />
      <button onClick={buscarPorId}>Buscar</button>

      {mensagemEncontrada && (
        <p>
          <strong>ID:</strong> {mensagemEncontrada.id}<br />
          <strong>Conteúdo:</strong> {mensagemEncontrada.conteudo}<br />
          <strong>Autor:</strong> {mensagemEncontrada.autor?.nome}
        </p>
      )}

      <ul>
        {mensagens.map(m => (
          <li key={m.id}>
            {m.conteudo} — por {m.autor.nome}
            <button onClick={() => editar(m)}>Editar</button>
            <button onClick={() => excluir(m.id)}>Excluir</button>
          </li>
        ))}
      </ul>
      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}
