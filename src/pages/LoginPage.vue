<template>
  <div class="container">
    <h1>Login</h1>
    <LoginForm />
  </div>
  <RouterLink to="/register">Cadastro</RouterLink>
</template>

<script setup>
import LoginForm from '../components/LoginForm.vue';
</script>
