<template>
  <div class="show-card-cover">
    <div class="show-card-content">
      <img :src="modalPayload" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ShowCardModal',
  data() {
    return {
      isInit: false
    }
  },
  computed: {
    ...mapGetters([
      'modalPayload'
    ])
  }
}
</script>

<style lang="less" scoped>
  .show-card-content {
    img {
      max-height: 500px;
      margin: 0 auto;
      display: block;
      border-radius: 16px;
    }
  }
</style>