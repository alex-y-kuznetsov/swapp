<template>
  <div class="footer-cover">
    <div class="footer-controls">
      <button 
        class="footer-button" 
        @click="showCreateEditModal"
      >Create</button>
      <button 
        class="footer-button" 
        @click="showHelpModal"
      >Help</button>
      <button 
        class="footer-button"  
        :class="{ disabled: !this.tableLength }"
        @click="showConfirmRemoveModal"
        :disabled="!this.tableLength"
      >Clear</button>
    </div>
    <div class="footer-copyright">
      <button 
        class="emergency"
        tabindex="-1"
        @click="showEmergencyModal"
      >.</button>
      {{  getYear() }}
    </div>
  </div>
</template>
  
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SwappFooter',
  methods: {
    showCreateEditModal() {
      this.$store.commit('updateOpenModal', { modalName: 'CreateEditModal' });
    },
    showHelpModal() {
      this.$store.commit('updateOpenModal', { modalName: 'HelpModal' });
    },
    showConfirmRemoveModal() {
      this.$store.commit('updateOpenModal', { modalName: 'ConfirmRemoveModal' });
    },
    showEmergencyModal() {
      this.$store.commit('updateOpenModal', { modalName: 'EmergencyModal' });
    },
    getYear() {
      const today = new Date();
      return today.getFullYear();
    }
  },
  computed: {
    ...mapGetters([
      'tableLength'
    ])
  }
}
</script>

<style lang="less" scoped>

.footer-cover {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
  .footer-button {
    width: 66px;
    border: 2px solid var(--color-bg);
    color: var(--color-bg);
    border-radius: 6px;
    padding: 9px 10px 8px 10px;
    font-weight: 600;
    background-color: transparent;
    cursor: pointer;
    transition: all var(--main-transition);

    &.disabled {
      pointer-events: none;
      opacity: 0.5;
    }

    & + & {
      margin-left: 8px;
    }

    &:hover {
      color: var(--color-white);
      background-color: var(--color-bg);
      transition: all var(--main-transition);
    }
  }

  .emergency {
    border: none;
    background-color: transparent;
    padding: 0;
    margin: 0;
    color: var(--color-secondary);
  }

  .footer-copyright {
    color: var(--color-bg);
    font-weight: 600;
  }
</style>