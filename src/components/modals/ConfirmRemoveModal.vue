<template>
  <h1 class="modal-title">Clear all swaps?</h1>
  <div>
    This will remove all swaps from the list
  </div>
  <div class="modal-controls">
    <button class="form-button" @click="clearAllSwapps">Clear</button>
    <button class="form-button" @click="cancelAndClose">Cancel</button>
  </div>
</template>

<script>
import localStorageHelper from '@/helpers/localStorageHelper.js';

export default {
  name: 'ConfirmRemoveModal',
  methods: {
    clearAllSwapps() {
      for (let key in localStorage) {
        if (key.startsWith('swapp-')) {
          localStorageHelper.removeFromStorage(key); 
        }
      }
      this.cancelAndClose();
      this.$store.commit('triggerReInitFlag');
      this.$store.commit('triggerActionsMessage', 'All swaps removed')
    },
    cancelAndClose() {
      this.$store.commit('closeModal');
    }
  }
}
</script>

<style src="@/assets/styles/common.less" lang="less"></style>
