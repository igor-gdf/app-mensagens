<template>
  <div class="container">
    <h1>Criar Conta</h1>
    <form @submit.prevent="register">
      <input v-model="nome" placeholder="Nome" required />
      <input v-model="email" placeholder="Email" required />
      <input v-model="senha" type="password" placeholder="Senha" required />
      <button type="submit">Registrar</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '../services/api';
import { useRouter } from 'vue-router';

const nome = ref('');
const email = ref('');
const senha = ref('');
const router = useRouter();

async function register() {
  try {
    await api.post('/usuarios', { nome: nome.value, email: email.value, senha: senha.value });
    alert('Conta criada com sucesso!');
    router.push('/login');
  } catch (err) {
    alert('Erro ao registrar.');
  }
}
</script>
