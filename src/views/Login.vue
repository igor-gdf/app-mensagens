<template>
  <h2>Login</h2>
  <form @submit.prevent="login">
    <input v-model="email" placeholder="Email" />
    <input v-model="senha" type="password" placeholder="Senha" />
    <button type="submit">Entrar</button>
  </form>
  <p v-if="erro">{{ erro }}</p>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return { email: '', senha: '', erro: '' };
  },
  methods: {
    async login() {
      try {
        const res = await api.post('/auth/login', { email: this.email, senha: this.senha });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('refreshToken', res.data.refreshToken);
        this.$router.push('/');
      } catch (e) {
        this.erro = 'Credenciais inválidas';
      }
    }
  }
};
</script>
