<template>
  <div class="container">
    <h1>Mensagens</h1>
    <NovaMensagem />
    <MensagemList />
  </div>
  <button @click="logout">Sair</button>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

function logout() {
  localStorage.removeItem('token');
  router.push('/login');
};
import MensagemList from '../components/MensagemList.vue';
import NovaMensagem from '../components/NovaMensagem.vue';
</script>
