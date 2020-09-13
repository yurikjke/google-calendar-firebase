<template>
  <div class="events">
    <h1>Events Page</h1>
    <v-btn color="primary" dark @click="createNew">Create new</v-btn>

    <v-list subheader>
      <v-subheader inset>Upcoming events(2 days):</v-subheader>

      <v-list-item
        v-for="event in upcomingEvents"
        :key="event.id"
        :to="{ name: 'event', params: { id: event.id }}"
      >

        <v-list-item-content>
          <v-list-item-title
            v-text="event.summary"
          ></v-list-item-title>
          <v-list-item-subtitle
            v-text="event.start.dateTime || event.start.date"
          ></v-list-item-subtitle>
        </v-list-item-content>

      </v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { eventsActions, eventsGetters } from '../../store/modules/events';

const EventsModule = namespace('events');

// TODO: loading, show toast on error
@Component
export default class EventListPage extends Vue {
  @EventsModule.Action(eventsActions.FETCH_EVENTS) public loadEvents: any;
  @EventsModule.Getter(eventsGetters.GET_UPCOMING) public upcomingEvents: any;

  created() {
    // TODO: Loading
    this.loadEvents();
  }

  createNew() {
    console.log('SHOW CREATE NEW DIALOG');
  }
}
</script>
