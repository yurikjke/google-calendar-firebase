import Vue from 'vue';
import VueGoogleApi from 'vue-google-api';
import { auth } from '@/firebase';
import App from '@/App.vue';
import '@/registerServiceWorker';
import router from '@/router';
import store from '@/store';
import { initAppInstance } from '@/services/common';
import vuetify from '@/plugins/vuetify';

Vue.config.productionTip = false;

let app!: Vue;

// TODO: move to json
const {
  VUE_APP_GOOGLE_API_KEY,
  VUE_APP_GOOGLE_CLIENT_ID,
} = process.env;

const apiConfig = {
  apiKey: VUE_APP_GOOGLE_API_KEY,
  clientId: VUE_APP_GOOGLE_CLIENT_ID,
  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
  // see all available scopes here: https://developers.google.com/identity/protocols/googlescopes'
  scope: 'https://www.googleapis.com/auth/calendar.events',

  // works only with `ux_mode: "prompt"`
  refreshToken: true,
};

Vue.use(VueGoogleApi, apiConfig);

auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App),
      created() {
        initAppInstance(this);
      },
    }).$mount('#app');
  }
});
