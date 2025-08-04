import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router'; // importa o roteador

createApp(App).use(router).mount('#app'); // aplica o roteador