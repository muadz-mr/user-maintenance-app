import { createApp } from "vue";
import App from "./App.vue";
import vuetifyPlugin from "./plugins/vuetify";
import axiosPlugin from './plugins/axios';
import router from "./router";

const app = createApp(App);
app.use(router);
app.use(vuetifyPlugin);
app.use(axiosPlugin);
app.mount("#app");
