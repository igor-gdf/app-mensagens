import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', { email, senha });
            localStorage.setItem('token', res.data.token);
            navigate('/home');
        } catch (err) {
            alert('Login falhou!');
        }
    };

    return (
        <form className="container" onSubmit={login}>
            <h2>Login</h2>
            <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input placeholder="Senha" type="password" value={senha} onChange={e => setSenha(e.target.value)} />
            <button type="submit">Entrar</button>
            <p>Não tem uma conta? Acesse <a href="/register">Cadastro</a></p>
        </form>
    );
}
