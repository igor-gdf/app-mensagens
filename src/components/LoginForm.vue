<template>
  <form @submit.prevent="login">
    <input v-model="email" placeholder="Email" required />
    <input v-model="senha" type="password" placeholder="Senha" required />
    <button type="submit">Entrar</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import api from '../services/api';
import { useRouter } from 'vue-router';

const email = ref('');
const senha = ref('');
const router = useRouter();

async function login() {
  try {
    const { data } = await api.post('/auth/login', { email: email.value, senha: senha.value });
    localStorage.setItem('token', data.token);
    router.push('/');
  } catch (error) {
    alert('Erro ao fazer login.');
  }
}
</script>
