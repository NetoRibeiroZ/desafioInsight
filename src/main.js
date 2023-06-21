import Vue from "vue";
import App from "./App.vue";
import vueRouter from "vue-router";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";

Vue.use(vueRouter);
Vue.config.productionTip = false;
//axios
axios.defaults.baseURL = "https://collectionapi.metmuseum.org/public/";
axios.defaults.headers.common["Accept"] = "application/json; version=1.0";

new Vue({
  render: (h) => h(App),
}).$mount("#app");
