import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueFormulate from "@braid/vue-formulate";
import VueApexCharts from "vue-apexcharts";
import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.config.productionTip = false;

Vue.use(VueFormulate);

Vue.component("apexchart", VueApexCharts);

Vue.use(vuetify, {
  theme: {
    dark: true
  }
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
