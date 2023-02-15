import { createStore } from 'vuex';

const store = createStore({
  state: {
    appName: 'swApp',
    openModal: null,
    modalPayload: null,
    reInitFlag: false
  },
  getters: {
    appName(state) {
      return state.appName
    },
    openModal(state) {
      return state.openModal
    },
    modalPayload(state) {
      return state.modalPayload
    },
    reInitFlag(state) {
      return state.reInitFlag
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
    },
    triggerReInitFlag(state) {
      state.reInitFlag = true;
      setTimeout (() => {
        state.reInitFlag = false;
      }, 1);
    }
  }
})

export default store;