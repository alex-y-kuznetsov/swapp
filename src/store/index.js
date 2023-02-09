import { createStore } from 'vuex';

const store = createStore({
  state: {
    appName: 'swApp',
    openModal: null
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
    updateOpenModal(state, modalName) {
      state.openModal = modalName
    },
    closeModal(state) {
      state.openModal = null
    }
  }
})

export default store;