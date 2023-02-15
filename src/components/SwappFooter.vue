<template>
  <div class="footer-cover">
    <div class="footer-controls">
      <button class="footer-button" @click="openEditModal">Create</button>
      <button class="footer-button">Help</button>
      <button class="footer-button" @click="showConfirmRemoveModal">Clear</button>
    </div>
    <div class="footer-copyright">{{  getYear() }}</div>
  </div>
</template>
  
<script>
export default {
  name: 'SwappFooter',
  methods: {
    openEditModal() {
      this.$store.commit('updateOpenModal', { modalName: 'CreateEditModal' });
    },
    showConfirmRemoveModal() {
      this.$store.commit('updateOpenModal', { modalName: 'ConfirmRemoveModal' });
    },
    getYear() {
      const today = new Date();
      return today.getFullYear();
    }
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

    & + & {
      margin-left: 8px;
    }

    &:hover {
      color: var(--color-white);
      background-color: var(--color-bg);
      transition: all var(--main-transition);
    }
  }

  .footer-copyright {
    color: var(--color-bg);
    font-weight: 600;
  }
</style>