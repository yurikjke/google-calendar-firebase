<template>
  <v-btn color="primary" dark large @click="signIn">Sign in with Google</v-btn>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { firebase } from '@/firebase';

import { getCalendarEvents } from '@/services/events.service';

@Component
export default class GoogleAuthBtn extends Vue {
  signIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/admin.directory.resource.calendar');

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => {
        getCalendarEvents()
          .then(() => {
            this.$router.push('events');
          });
      })
      .catch(console.error);
  }
}
</script>

<style>

</style>
