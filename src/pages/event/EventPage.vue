<template>
  <div class="event">
    <h1>Event Page</h1>
        <v-btn color="error" dark @click="removeItem">Remove item</v-btn>
    <template v-if="activeItem">
      <p>Summary: {{ activeItem.summary }}</p>
    </template>
  </div>
</template>

<script lang="ts">
import { IEvent } from '@/interfaces/event.interface';
import { activeItemActions, activeItemGetters } from '@/store/modules/active-item';
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const ActiveItemModule = namespace('activeItem');

// TODO: loading, show toast on error
@Component
export default class EventPage extends Vue {
  @ActiveItemModule.Getter(activeItemGetters.ITEM) public activeItem!: IEvent;
  @ActiveItemModule.Action(activeItemActions.GET_ITEM) public getActiveItem: any;
  @ActiveItemModule.Action(activeItemActions.REMOVE_ITEM) public removeActiveItem: any;

  created() {
    this.getActiveItem({ eventId: this.$route.params.id });
  }

  removeItem() {
    this.removeActiveItem({ eventId: this.$route.params.id })
      .then(() => {
        this.$router.push({ name: 'events' });
      });
  }
}
</script>
