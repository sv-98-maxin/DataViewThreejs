import { createApp } from 'vue'
import './style.less'
import App from './App.vue'
import { createPinia } from 'pinia'


createApp(App).use(createPinia()).mount('#app')
