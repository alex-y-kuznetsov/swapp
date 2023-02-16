<template>
  <Transition>
    <div class="actions-cover" v-if="actionsMessage">
      <div class="actions-content">{{ actionsMessage }}</div>
    </div>
  </Transition>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SwappActions',
  computed: {
    ...mapGetters([
      'actionsMessage'
    ])
  }
}
</script>

<style lang=less scoped>
  .actions-cover {
    position: absolute;
    right: 20px;
    bottom: 20px;
    background-color: var(--color-bg);
    box-shadow: var(--main-shadow);
    border-radius: 6px;
  }

  .actions-content {
    color: var(--color-main);
    padding: 20px;
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