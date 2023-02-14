import { createStore } from 'vuex';

const store = createStore({
  state: {
    appName: 'swApp',
    openModal: null,
    modalPayload: null
  },
  getters: {
    appName(state) {
      return state.appName
    },
    openModal(state) {
      return state.openModal
    }
  },
  mutations: {
    updateOpenModal(state, payload) {
      state.openModal = payload.modalName;
      if (payload.swappId) { 
        state.modalPayload = payload.swappId;
      }
    },
    closeModal(state) {
      state.openModal = null;
      state.modalPayload = null;
    }
  }
})

export default store;