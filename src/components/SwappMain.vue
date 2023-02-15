<template>

  <div class="swapp-item swapp-item-head">
    <div>Deck in</div>
    <div class="swapp-item-mid">The swap</div>
    <div>Deck out</div>
    <div class="swapp-item-controls"></div>
  </div>

  <template v-if="isInit">
    <div class="swapp-item-cover" v-for="(item, itemKey) in swappList" :key="itemKey">
      <div class="swapp-item swapp-item-general">
        <div class="swapp-segment">
          <div class="swapp-segment-bg swapp-segment-bg-left" 
            v-if="item.deckIn" 
            :style="{ backgroundImage: `url('${item.deckIn.image_uris.art_crop})` }"
          ></div>
          <div class="swapp-input">{{ item.deckIn ? item.deckIn.name : '-' }}</div>
        </div>
        <div class="swapp-segment swapp-item-mid">
          <div class="swapp-item-mid-cover">
            <div class="swapp-item-image swapp-item-image-left">
              <img :src="item.cardIn ? item.cardIn.image_uris.normal : require('@/assets/images/card_back.jpg')">
            </div>
            <div class="swapp-item-image swapp-item-image-right">
              <img :src="item.cardOut ? item.cardOut.image_uris.normal : require('@/assets/images/card_back.jpg')">
            </div>
          </div>
        </div>
        <div class="swapp-segment">
          <div class="swapp-segment-bg swapp-segment-bg-right" 
            v-if="item.deckOut" 
            :style="{ backgroundImage: `url('${item.deckOut.image_uris.art_crop})` }"
          ></div>
          <div class="swapp-input">{{ item.deckOut ? item.deckOut.name : '-' }}</div>
        </div>
      </div> 
      <div class="swapp-item-controls">
        <button class="swapp-item-button" @click="openEditModal(item.id)">Edit</button>
        <button class="swapp-item-button" @click="deleteSwappItem(item.id)">Del</button>
        <button class="swapp-item-button">Top</button>
      </div>
    </div>
  </template>

</template>

<script>
import { mapGetters } from 'vuex';
import cloneObject from '@/helpers/cloneObject.js';
import localStorageHelper from '@/helpers/localStorageHelper.js';

export default {
  name: 'SwappMain',
  data() {
    return {
      isInit: false,
      swappList: []
    }
  },
  methods: {
    init() {
      this.swappList = [];
      let tempList = cloneObject(localStorage);
      delete tempList.cardNames;

      for (const item in tempList) {
        this.swappList.push({
          id: item,
          ...JSON.parse(tempList[item]).value
        })
      }

      this.isInit = true;
    },
    openEditModal(id) {
      this.$store.commit('updateOpenModal', { modalName: 'CreateEditModal', swappId: id });
    },
    deleteSwappItem(id) {
      localStorageHelper.removeFromStorage(id);
      const itemToRemove = this.swappList.find(item => item.id === id);
      this.swappList.splice(itemToRemove, 1);
    }
  },
  computed: {
    ...mapGetters([
      'reInitFlag'
    ]),
  },
  watch: {
    reInitFlag() {
      if (this.reInitFlag) {
        this.init();
      }
    }
  },
  mounted() {
    this.init();
  }
}
</script>

<stype lang="less" scoped>
  .swapp-item-cover {
    display: grid;
    grid-template-columns: auto 40px;
  }

  .swapp-item {
    border-radius: 6px;
    overflow: hidden;
    display: grid;
    grid-template-columns: 30% auto 30%;
    gap: 0 10px;
    background-color: var(--color-bg);
  }

  .swapp-segment {
    padding: 10px 0;
    background-repeat: no-repeat;
    position: relative;

    &:first-child {
      padding-left: 10px;
    }

    &:last-child {
      padding-right: 10px;
    }
  }

  .swapp-segment-bg {
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    position: absolute;
    z-index: 0;
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0.5;
    background-position: 50% 50%;

    &.swapp-segment-bg-left {
      &::after {
        position: absolute;
        content: '';
        height: 100%;
        width: 50%;
        right: 0;
        top: 0;
        background: linear-gradient(to right, transparent, var(--color-bg));
      }
    }

    &.swapp-segment-bg-right {
      &::before {
        position: absolute;
        content: '';
        height: 100%;
        width: 50%;
        left: 0;
        top: 0;
        background: linear-gradient(to left, transparent, var(--color-bg));
      }
    }
  }

  .swapp-item-head {
    margin-bottom: 10px;
    text-align: center;
    padding: 4px 0;
    grid-template-columns: 30% auto 30% 40px;
  }

  .swapp-item-general {
    & + & {
      margin-top: 10px;
    }
  }

  .swapp-input {
    width: 100%;
    box-sizing: border-box;
    margin: 0;
    padding: 4px 0;
    font-size: 22px;
    border: none;
    border-bottom: 1px solid var(--color-main);
    position: relative;

    &:focus {
      outline: none;
      border-bottom: 1px solid var(--color-focus);
    }
  }

  .swapp-item-mid-cover {
    width: fit-content;
    margin: 0 auto;
    height: 120px;
    display: flex;
    gap: 10px;
    justify-content: center;

    &:hover {
      .swapp-item-image {
        transform: rotate(0deg);
        transition: all var(--main-transition);
      }

      .swapp-item-image-left {
        left: 0;
      }

      .swapp-item-image-right {
        right: 0;
      }
    }
  }

  .swapp-item-image {
    height: 100%;
    position: relative;
    transition: all var(--main-transition);

    img {
      height: 100%;
      border-radius: 4px;
    }
  }

  .swapp-item-image-left {
    left: 14px;
    transform: rotate(-10deg);
    z-index: 1;
  }

  .swapp-item-image-right {
    right: 14px;
    transform: rotate(10deg);
  }

  .swapp-item-controls {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
  }

  .swapp-item-button {
    border: 2px solid var(--color-bg);
    color: var(--color-bg);
    margin: 0;
    padding: 0;
    height: 36px;
    width: 36px;
    cursor: pointer;
    border-radius: 6px;
    font-weight: 600;
    transition: all var(--main-transition);

    &:hover {
      color: var(--color-white);
      background-color: var(--color-bg);
      transition: all var(--main-transition);
    }
  }
</stype>