<template>
  <NavBar v-if="mostrarNavBar" />
  <router-view />
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import NavBar from './components/NavBar.vue';

const route = useRoute();
const mostrarNavBar = computed(() => !['/login', '/register'].includes(route.path));
</script>
