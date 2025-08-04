<template>
  <form @submit.prevent="enviar">
    <input v-model="titulo" placeholder="Título da mensagem" required />
    <textarea v-model="conteudo" placeholder="Escreva sua mensagem..." required></textarea>
    <button type="submit">Postar</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import api from '../services/api';

const titulo = ref('');
const conteudo = ref('');

async function enviar() {
  try {
    await api.post('/mensagens', {
      titulo: titulo.value,
      conteudo: conteudo.value
    });
    titulo.value = '';
    conteudo.value = '';
    location.reload(); // ou emitir evento para atualizar a lista
  } catch (err) {
    alert('Erro ao enviar mensagem.');
  }
}
</script>
