import { createApp } from "vue";
import App from "./App.vue";

import "./assets/main.css";

import PrimeVue from "primevue/config";
const app = createApp(App);
app.use(PrimeVue, { ripple: true });
app.mount("#app");
