<template>
  <h1 class="modal-title">Is this an emergency?</h1>
  <div class="modal-controls">
    <button class="form-button" @click="clearAllSwapps">Yes</button>
    <button class="form-button" @click="cancelAndClose">No</button>
  </div>
</template>

<script>
import localStorageHelper from '@/helpers/localStorageHelper.js';

export default {
  name: 'EmergencyModal',
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