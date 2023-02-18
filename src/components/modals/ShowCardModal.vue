<template>
  <div class="show-card-cover">
    <div class="show-card-content">
      <Transition name="flip" :css="isInit">
        <img :key="cardImageUri" :src="cardImageUri" />
      </Transition>
    </div>
    <button 
      class="show-card-side" 
      @click="switchCardSide"
      v-if="!isSingleImage"
    >
      <IconTurn />
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import IconTurn from '@/components/icons/IconTurn.vue';

export default {
  name: 'ShowCardModal',
  components: {
    IconTurn
  },
  data() {
    return {
      isInit: false,
      cardImageUri: null,
    }
  },
  methods: {
    init() {
      this.cardImageUri = this.imageUri;
      this.$nextTick(() => {
        this.isInit = true;
      })
    },
    switchCardSide() {
      let number = this.modalPayload.indexOf(this.cardImageUri) === 0 ? 1 : 0;
      this.cardImageUri = this.modalPayload[number];
    }
  },
  computed: {
    ...mapGetters([
      'modalPayload'
    ]),
    isSingleImage() {
      return typeof this.modalPayload === 'string'
    },
    imageUri() {
      if (this.isSingleImage) {
        return this.modalPayload
      }
      return this.modalPayload[0];
    }
  },
  mounted() {
    this.init();
  }
}
</script>

<style lang="less" scoped>
  .show-card-content {
    min-height: 420px;
    text-align: center;

    img {
      max-height: 420px;
      margin: 0 auto;
      border-radius: 16px;
      will-change: transform;
      transform-style: preserve-3d;
    }
  }

  .show-card-side {
    border: 2px solid var(--color-main);
    color: var(--color-main);
    margin: 10px auto 0 auto;
    padding: 0;
    height: 36px;
    width: 36px;
    cursor: pointer;
    border-radius: 6px;
    font-weight: 600;
    transition: all var(--main-transition);
    display: flex;

    svg {
      fill: var(--color-main);
      margin: auto;
      transition: all var(--main-transition);
    }

    &:hover {
      color: var(--color-focus);
      border-color: var(--color-focus);
      transition: all var(--main-transition);

      svg {
        fill: var(--color-focus);
        transition: all var(--main-transition);
      }
    }
  }

  .flip-enter-active {
    transition: var(--mid-transition);
  }
  
  .flip-leave-active {
    display: none;
  }

  .flip-enter-from, .flip-leave-to {
    transform: rotateY(180deg);
    opacity: 0;
  }

</style>