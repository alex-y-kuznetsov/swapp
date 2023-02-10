<template>
  <div class="modal-container">
    <template v-if="this.$store.getters.openModal">

      <div class="modal-wrap">

        <div class="modal-overlay" @click="modalClose"></div>

        <div class="modal-content">
          <button class="modal-close" @click="modalClose">X</button>
          <component :is="this.$store.getters.openModal"></component>
        </div>
      </div>

    </template>
  </div>
</template>

<script>
import CreateEditModal from '@/components/modals/CreateEditModal.vue';

export default {
  name: 'ModalContainer',
  components: {
    CreateEditModal
  },
  methods: {
    modalClose() {
      this.$store.commit('closeModal');
    }
  }
}
</script>

<style lang="less" scoped>
  .modal-wrap {
    position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      overflow: hidden;
      display: grid;
      align-items: center;
      box-sizing: border-box;
      overflow-y: auto;
  }

  .modal-overlay {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 3;
    background: var(--color-overlay);
    pointer-events: auto;
  }

  .modal-content {
    background-color: var(--color-bg);
    box-shadow: var(--main-shadow);
    border-radius: 4px;
    padding: 32px 24px;
    margin: 24px 12px;
    width: calc(100% - 24px);
    box-sizing: border-box;
    position: relative;
    z-index: 4;
    max-width: 520px;
    pointer-events: auto;
    justify-self: center;
  }

  .modal-close {
    position: absolute;
    right: 10px;
    top: 10px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    font-weight: 600;
    border: 1px solid var(--color-main);
    border-radius: 4px;
    padding: 2px 4px 0px 4px;
    transition: all var(--main-transition);

    &:hover {
      color: var(--color-secondary);
      border: 1px solid var(--color-secondary);
      transition: all var(--main-transition);
    }
  }
</style>