<template>
  <h2>Nova Mensagem</h2>
  <form @submit.prevent="enviar">
    <textarea v-model="conteudo" placeholder="Sua mensagem"></textarea>
    <button type="submit">Enviar</button>
  </form>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return { conteudo: '' };
  },
  methods: {
    async enviar() {
      await api.post('/mensagens', { conteudo: this.conteudo });
      this.$router.push('/');
    }
  }
};
</script>
