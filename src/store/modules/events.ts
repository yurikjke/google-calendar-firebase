import Vue from 'vue';
import { GetterTree, MutationTree, ActionTree, Module } from 'vuex';
import { RootState } from '@/interfaces/root-state.interface';
import { IEvent } from '@/interfaces/event.interface';
import EventsService from '@/services/events.service';

interface IEventsState {
  items: IEvent[];
}

const state: IEventsState = {
  items: [],
};

export const eventsGetters = {
  GET_UPCOMING: 'GET_PCOMINGU',
};

export const eventsActions = {
  FETCH_EVENTS: 'FETCH_EVENTS',
  ADD_EVENT: 'ADD_EVENT',
};

export const eventsMutations = {
  UPDATE_EVENTS: 'UPDATE_EVENTS',
  ADD_EVENT: 'ADD_EVENT',
  UPDATE_EVENT: 'UPDATE_EVENT',
};

const getters: GetterTree<IEventsState, RootState> = {
  // TODO: get only 2 days events
  [eventsGetters.GET_UPCOMING]: state => state.items,
};

const actions: ActionTree<IEventsState, RootState> = {
  [eventsActions.FETCH_EVENTS]: ({ commit }) => EventsService.getCalendarEvents()
    .then((events: IEvent[]) => commit(eventsMutations.UPDATE_EVENTS, events)),
  [eventsActions.ADD_EVENT]: ({ commit }, event) => EventsService.createCalendarEvent(event)
    .then((event: IEvent) => {
      EventsService.createCalendarEvent(event)
        .then((data: any) => {
          commit(eventsMutations.ADD_EVENT, data);
        })
        .catch((err: any) => {
          // showErrorToast(err);
          console.error(err);
          return Promise.reject(err);
        });
    }),
};

const mutations: MutationTree<IEventsState> = {
  [eventsMutations.UPDATE_EVENTS]: (state, data) => {
    state.items = data;
  },
  [eventsMutations.ADD_EVENT]: (state, data) => {
    state.items = data;
  },
  [eventsMutations.UPDATE_EVENT]: ({ items }, data) => {
    const index = items.findIndex(({ id }) => id === data.id);
    if (index !== -1) {
      const updatedItem = Object.assign(items[index], data);
      // TODO: try items[index] = updatedItem
      // or items.splice(index, 1, updatedItem)
      Vue.set(items, index, updatedItem);
    }
  },

};

export const events: Module<IEventsState, RootState> = {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
};
