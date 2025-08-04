<template>
  <h2>Mensagens</h2>
  <ul>
    <li v-for="msg in mensagens" :key="msg.id">
      {{ msg.conteudo }} — por {{ msg.autor?.nome }}
    </li>
  </ul>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return { mensagens: [] };
  },
  async mounted() {
    const res = await api.get('/mensagens');
    this.mensagens = res.data;
  }
};
</script>
