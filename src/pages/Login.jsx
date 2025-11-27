import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';


export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', { email, senha });
            // compatibilidade com diferentes formatos de resposta da API
            // pode retornar { token: '...', ... } ou { access_token: '...' } ou a string do próprio token
            const token = res?.data?.token || res?.data?.access_token || (typeof res?.data === 'string' ? res.data : null);
            if (token) {
                localStorage.setItem('token', token);
                navigate('/');
            } else {
                // fallback: salva o objeto inteiro como string (apenas em último caso)
                localStorage.setItem('token', JSON.stringify(res.data));
                navigate('/');
            }
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
            <p>Não tem uma conta? Acesse <Link to="/register">Cadastro</Link></p>
        </form>
    );
}
