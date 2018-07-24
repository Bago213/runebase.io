import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import Vuetify from 'vuetify'
import App from './wallet.vue'


Vue.component("wallet", require("./wallet.vue"));
Vue.use(Vuetify);
Vue.use(VueClipboard);

new Vue({el: "#app", render: h => h(App)}).$mount('#app');