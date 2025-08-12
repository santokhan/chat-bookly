import { createApp } from 'vue'
import App from '@/App.vue'
import { registerPlugins } from '@core/utils/plugins'

// Styles
import '@core/scss/template/index.scss'
import '@styles/styles.scss'

// import VueTelInput from 'vue-tel-input';
// import 'vue-tel-input/vue-tel-input.css';

// Create vue app
const app = createApp(App)

// Register plugins
registerPlugins(app)

// app.use(VueTelInput);

// Mount vue app
app.mount('#app')
