import { createStore } from 'vuex';

const store = createStore({
  state: {
    appName: 'Swapp',
    openModal: null,
    modalPayload: null,
    reInitFlag: false,
    tableLength: null
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
    },
    tableLength(state) {
      return state.tableLength
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
    },
    setTableLength(state, payload) {
      state.tableLength = payload
    }
  }
})

export default store;