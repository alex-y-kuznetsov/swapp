<template>
  <div class="modal-container" >
    <Transition>
      <template v-if="this.$store.getters.openModal">

        <div class="modal-wrap">

          <div class="modal-overlay" @click="modalClose"></div>

          <div class="modal-content">
            <button class="modal-close" @click="modalClose">
              <IconCross />
            </button>
            <component :is="this.$store.getters.openModal"></component>
          </div>
        </div>

      </template>
    </Transition>
  </div>
</template>

<script>
import CreateEditModal from '@/components/modals/CreateEditModal.vue';
import ConfirmRemoveModal from '@/components/modals/ConfirmRemoveModal.vue';
import ShowCardModal from '@/components/modals/ShowCardModal.vue';
import HelpModal from '@/components/modals/HelpModal.vue';
import IconCross from '@/components/icons/IconCross.vue';

export default {
  name: 'ModalContainer',
  components: {
    CreateEditModal,
    ConfirmRemoveModal,
    ShowCardModal,
    HelpModal,
    IconCross
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
    padding: 40px 24px;
    margin: 14px 12px;
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
    background-color: transparent;
    cursor: pointer;
    border: 1px solid var(--color-main);
    border-radius: 4px;
    padding: 2px 5px 4px 5px;
    transition: all var(--main-transition);

    svg {
      fill: var(--color-white);
      vertical-align: middle;
    }

    &:hover {
      border: 1px solid var(--color-secondary);
      transition: all var(--main-transition);

      svg {
        fill: var(--color-secondary);
      }
    }
  }
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>