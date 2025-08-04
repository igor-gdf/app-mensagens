<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link v-if="!token" to="/login">Login</router-link>
    <span v-else>
      <router-link to="/nova">Nova Mensagem</router-link> |
      <a href="#" @click="logout">Logout</a>
    </span>
  </nav>
</template>

<script>
export default {
  computed: {
    token() {
      return localStorage.getItem('token');
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      this.$router.push('/login');
    }
  }
};
</script>
