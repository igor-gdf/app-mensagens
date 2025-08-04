<template>
  <div v-for="msg in mensagens" :key="msg.id" class="mensagem">
    <p><strong>{{ msg.autor?.nome || 'Usuário não disponível' }}</strong>: {{ msg.conteudo }}</p>
    <Comentarios :mensagem-id="msg.id" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import api from '../services/api';
import Comentarios from './Comentarios.vue';

const mensagens = ref([]);

onMounted(async () => {
  const { data } = await api.get('/mensagens');
  mensagens.value = data;
});
</script>
