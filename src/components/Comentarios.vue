<template>
  <div>
    <div v-for="comentario in comentarios" :key="comentario.id">
      💬 {{ comentario.autor?.nome || 'Usuário desconhecido' }}: {{ comentario.conteudo }}
    </div>
    <form @submit.prevent="comentar">
      <input v-model="novoComentario" placeholder="Comentar..." />
      <button type="submit" :disabled="!novoComentario.trim()">Enviar</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../services/api';
const props = defineProps({ mensagemId: Number });

const comentarios = ref([]);
const novoComentario = ref('');

onMounted(carregarComentarios);

async function carregarComentarios() {
  try {
    const { data } = await api.get(`/mensagens/${props.mensagemId}/comentarios`);
    comentarios.value = data;
  } catch (error) {
    console.error('Erro ao carregar comentários:', error);
  }
}

async function comentar() {
  if (!novoComentario.value.trim()) return;
  
  try {
    await api.post(`/mensagens/${props.mensagemId}/comentarios`, {
      conteudo: novoComentario.value.trim()
    });
    novoComentario.value = '';
    carregarComentarios();
  } catch (error) {
    console.error('Erro ao enviar comentário:', error);
  }
}
</script>
