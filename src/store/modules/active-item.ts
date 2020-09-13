import { GetterTree, MutationTree, Module, ActionTree } from 'vuex';
import { RootState, IActiveItemState } from '@/interfaces/root-state.interface';
import EventsService from '@/services/events.service';

export const activeItemGetters = {
  ITEM: 'ITEM',
  LOADING: 'LOADING',
  FETCH_ERROR: 'FETCH_ERROR',
};

export const activeItemActions = {
  GET_ITEM: 'GET_ITEM',
  SET_ITEM: 'SET_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
};

export const activeItemMutations = {
  SET_ITEM: 'SET_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  SET_LOADING: 'SET_LOADING',
  SET_FETCH_ERROR: 'SET_FETCH_ERROR',
};

const state: IActiveItemState = {
  activeItem: null,
  loading: false,
  fetchError: null,
};

const getters: GetterTree<IActiveItemState, RootState> = {
  [activeItemGetters.ITEM]: state => state.activeItem,
  [activeItemGetters.LOADING]: state => state.loading,
  [activeItemGetters.FETCH_ERROR]: state => state.fetchError,
};

const mutations: MutationTree<IActiveItemState> = {
  [activeItemMutations.SET_ITEM]: (state, data) => {
    state.activeItem = data;
  },
  [activeItemMutations.SET_LOADING]: (state, value) => {
    state.loading = value;
  },
  [activeItemMutations.SET_FETCH_ERROR]: (state, err) => {
    state.fetchError = err;
  },
  [activeItemMutations.REMOVE_ITEM]: state => {
    state.activeItem = null;
  },
};

const actions: ActionTree<IActiveItemState, RootState> = {
  [activeItemActions.GET_ITEM]: ({ commit }, { calendarId, eventId }) => {
    commit(activeItemMutations.SET_LOADING, true);
    return EventsService.getCalendarEventById(eventId, calendarId)
      .then((data: any) => {
        commit(activeItemMutations.SET_FETCH_ERROR, null);
        commit(activeItemMutations.SET_ITEM, data);
      })
      .catch((err: any) => {
        commit(activeItemMutations.SET_FETCH_ERROR, err);
        return Promise.reject(err);
      })
      .finally(() => {
        commit(activeItemMutations.SET_LOADING, false);
      });
  },
  [activeItemActions.SET_ITEM]: ({ commit }, item) => commit(activeItemMutations.SET_ITEM, item),
  [activeItemActions.REMOVE_ITEM]: ({ commit }, { calendarId, eventId }) => {
    commit(activeItemMutations.SET_LOADING, true);
    return EventsService.removeCalendarEventById(eventId, calendarId)
      .then(() => {
        commit(activeItemMutations.SET_FETCH_ERROR, null);
        commit(activeItemMutations.SET_ITEM, null);
      })
      .catch((err: any) => {
        commit(activeItemMutations.SET_FETCH_ERROR, err);
        return Promise.reject(err);
      })
      .finally(() => {
        commit(activeItemMutations.SET_LOADING, false);
      });
  },
};

export const activeItem: Module<IActiveItemState, RootState> = {
  state,
  actions,
  getters,
  mutations,
  namespaced: true,
};
