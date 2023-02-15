<template>
  <h1 class="modal-title">Clear all swaps?</h1>
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
        if (key !== 'cardNames') {
          localStorageHelper.removeFromStorage(key); 
        }
      }
      this.cancelAndClose();
    },
    cancelAndClose() {
      this.$store.commit('closeModal');
      this.$store.commit('triggerReInitFlag');
    }
  }
}
</script>

<style src="@/assets/styles/common.less" lang="less"></style>
