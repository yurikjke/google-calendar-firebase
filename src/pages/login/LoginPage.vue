<template>
  <div class="login">
    <GoogleAuthBtn/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import GoogleAuthBtn from '@/components/GoogleAuthBtn.vue';

@Component({
  components: {
    GoogleAuthBtn,
  },
})
export default class LoginPage extends Vue {

}
</script>
