<template>
  <nav class="navbar">
    <div class="nav-left">
      <RouterLink to="/">Início</RouterLink>
    </div>
    <div class="nav-right">
      <template v-if="isLoggedIn">
        <button @click="logout">Sair</button>
      </template>
      <template v-else>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/register">Cadastro</RouterLink>
      </template>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter, RouterLink } from 'vue-router';

const router = useRouter();
const isLoggedIn = computed(() => !!localStorage.getItem('token'));

function logout() {
  localStorage.removeItem('token');
  router.push('/login');
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  background-color: #2c3e50;
  color: white;
  padding: 1rem;
}
.nav-left a,
.nav-right a {
  color: white;
  text-decoration: none;
  margin-left: 1rem;
}
button {
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
}
</style>
