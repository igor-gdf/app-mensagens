import { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [mensagens, setMensagens] = useState([]);
  const [nova, setNova] = useState('');
  const [novoTitulo, setNovoTitulo] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [buscaId, setBuscaId] = useState('');
  const [mensagemEncontrada, setMensagemEncontrada] = useState(null);
  const navigate = useNavigate();

  const carregar = async () => {
    try {
      const res = await api.get('/mensagens');
      setMensagens(res.data);
    } catch (err) {
      if (err?.response?.status === 401) return;
      console.error('Erro ao carregar mensagens:', err);
      alert('Erro ao carregar mensagens.');
    }
  };

  const enviar = async (e) => {
    e.preventDefault();
    if (!novoTitulo.trim() && !nova.trim()) return;
    try {
      if (editandoId) {
        await api.put(`/mensagens/${editandoId}`, { titulo: novoTitulo, conteudo: nova });
        setEditandoId(null);
      } else {
        await api.post('/mensagens', { titulo: novoTitulo, conteudo: nova });
      }

      setNovoTitulo('');
      setNova('');
      carregar();
    } catch (err) {
      if (err?.response?.status === 401) return;
      console.error('Erro ao enviar mensagem:', err);
      alert(err?.response?.data || 'Erro ao enviar mensagem.');
    }
  };

  const excluir = async (id) => {
    try {
      await api.delete(`/mensagens/${id}`);
      carregar();
    } catch (err) {
      if (err?.response?.status === 401) return;
      console.error('Erro ao excluir mensagem:', err);
      alert('Erro ao excluir mensagem.');
    }
  };

  const editar = (msg) => {
    setEditandoId(msg.id);
    setNova(msg.conteudo || '');
    setNovoTitulo(msg.titulo || '');
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
          value={novoTitulo}
          onChange={e => setNovoTitulo(e.target.value)}
          placeholder={editandoId ? 'Editando título...' : 'Título'}
        />
        <input
          value={nova}
          onChange={e => setNova(e.target.value)}
          placeholder={editandoId ? 'Editando mensagem...' : 'Nova mensagem'}
        />
        <button type="submit">{editandoId ? 'Salvar edição' : 'Enviar'}</button>
        {editandoId && (
          <button type="button" onClick={() => { setEditandoId(null); setNova(''); setNovoTitulo(''); }}>
            Cancelar
          </button>
        )}
      </form>

      <h3>Buscar mensagem por ID</h3>

      <div className="space">
        <input
          value={buscaId}
          onChange={e => setBuscaId(e.target.value)}
          placeholder="ID da mensagem"
        />
        <button onClick={buscarPorId}>Buscar</button>
      </div>

      {mensagemEncontrada && (
        <p>
          <strong>ID:</strong> {mensagemEncontrada.id}<br />
          <strong>Título:</strong> {mensagemEncontrada.titulo}<br />
          <strong>Conteúdo:</strong> {mensagemEncontrada.conteudo}<br />
          <strong>Autor:</strong> {mensagemEncontrada.autor?.nome}<br />
          <strong>Editado:</strong> {mensagemEncontrada.editado ? 'Sim' : 'Não'}
        </p>
      )}

      <ul>
        {mensagens.map(m => (
          <li key={m.id}>
            <strong>{m.titulo}</strong>: {m.conteudo} — por {m.autor?.nome}
            <div>
              <button onClick={() => editar(m)}>Editar</button>
              <button onClick={() => excluir(m.id)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}
