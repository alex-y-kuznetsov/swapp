<template>

  <div class="swapp-item swapp-item-head">
    <div>
      <IconIn />
    </div>
    <div class="swapp-item-mid">
      <IconShuffle />
    </div>
    <div>
      <IconOut />
    </div>
    <div class="swapp-item-controls">
      <IconWrench />
    </div>
  </div>

  <SwappNoData v-if="!swappList.length && isInit"/>

  <SwappLoader v-if="!isInit" />

  <div class="swapp-items" v-if="isInit">

    <div class="swapp-item-cover" v-for="(item, itemKey) in swappList" :key="itemKey">
      <div class="swapp-item swapp-item-general">
        <div class="swapp-segment">
          <div class="swapp-segment-bg swapp-segment-bg-left" 
            v-if="item.deckIn" 
            :style="{ backgroundImage: `url('${getUris(item.deckIn).image_uris?.art_crop})` }"
          ></div>
          <button 
            class="swapp-input"
            @click="openShowCardModal(getUrisForModal(item.deckIn))"
          >{{ item.deckIn.name }}</button>
        </div>
        <div class="swapp-segment swapp-item-mid">
          <div class="swapp-item-mid-cover">
            <button 
              class="swapp-item-image swapp-item-image-left"
              @click="openShowCardModal(getUrisForModal(item.cardIn))"
            >
              <img :src="item.cardIn ? getUris(item.cardIn).image_uris?.normal : require('@/assets/images/card_back.jpg')">
            </button>
            <button 
              class="swapp-item-image swapp-item-image-right"
              :class="{ disabled : !item.cardOut }"
              @click="openShowCardModal(getUrisForModal(item.cardOut))"
              :disabled="!item.cardOut"
            >
              <img :src="item.cardOut ? getUris(item.cardOut).image_uris?.normal : require('@/assets/images/card_back.jpg')">
            </button>
          </div>
        </div>
        <div class="swapp-segment">
          <div class="swapp-segment-bg swapp-segment-bg-right"  
            :style="{ backgroundImage: item.deckOut ? 
                      `url(${getUris(item.deckOut).image_uris?.art_crop})` : 
                      `url(${require('@/assets/images/warehouse.jpg')})` }"
          ></div>
          <button 
            class="swapp-input" 
            v-if="item.deckOut"
            @click="openShowCardModal(getUrisForModal(item.deckOut))"
          >{{ item.deckOut.name }}</button>
        </div>
      </div> 
      <div class="swapp-item-controls">
        <button 
          class="swapp-item-button" 
          @click="openEditModal(item.id)"
          title="Edit"
        >
          <IconEdit />
        </button>
        <button 
          class="swapp-item-button" 
          @click="deleteSwappItem(item.id)"
          title="Delete"
        >
          <IconDelete />
        </button>
      </div>
    </div>

  </div>

</template>

<script>
import { mapGetters } from 'vuex';
import cloneObject from '@/helpers/cloneObject.js';
import localStorageHelper from '@/helpers/localStorageHelper.js';
import IconEdit from '@/components/icons/IconEdit.vue';
import IconDelete from '@/components/icons/IconDelete.vue';
import IconIn from '@/components/icons/IconIn.vue';
import IconOut from '@/components/icons/IconOut.vue';
import IconShuffle from '@/components/icons/IconShuffle.vue';
import IconWrench from '@/components/icons/IconWrench.vue';
import SwappNoData from '@/components/SwappNoData.vue';
import SwappLoader from '@/components/SwappLoader.vue';

export default {
  name: 'SwappMain',
  components: {
    IconEdit,
    IconDelete,
    IconIn,
    IconOut,
    IconShuffle,
    IconWrench,
    SwappNoData,
    SwappLoader
  },
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

      for (const item in tempList) {
        if (item.startsWith('swapp-')) {
          this.swappList.push({
            id: item,
            ...JSON.parse(tempList[item]).value
          })
        }
      }
      
      this.swappList.sort((a, b) => a.created - b.created).reverse();
      this.$store.commit('setTableLength', this.swappList.length);
      this.isInit = true;
    },
    getUris(path) {
      return (path.card_faces && !path.image_uris) ? path.card_faces[0] : path;
    },
    getUrisForModal(path) {
      if (path.image_uris) {
        return path.image_uris.normal
      }
      let uris = [];
      path.card_faces.forEach(item => {
        uris.push(item.image_uris.normal)
      })
      return uris
    },
    openEditModal(id) {
      this.$store.commit('updateOpenModal', { modalName: 'CreateEditModal', swappId: id });
    },
    openShowCardModal(url) {
      this.$store.commit('updateOpenModal', { modalName: 'ShowCardModal', url });
    },
    deleteSwappItem(id) {
      localStorageHelper.removeFromStorage(id);
      const itemToRemove = this.swappList.findIndex(item => item.id === id);
      this.swappList.splice(itemToRemove, 1);
      this.$store.commit('setTableLength', this.swappList.length);
      this.$store.commit('triggerActionsMessage', 'Swap removed')
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
  .swapp-items {
    overflow: auto;
    flex: 1 1 0;
    display: flex;
    flex-direction: column;

    &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
        background-color: transparent;
        margin-left: 2px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: var(--color-scrollbar);
        border-radius: 6px;
        -webkit-transition: background-color 2s;
        transition: background-color 2s;
    }
  }

  .swapp-item-cover {
    display: grid;
    grid-template-columns: auto 40px;

    & + & {
      margin-top: 10px;
    }
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
    min-height: 30px;
    box-sizing: border-box;

    div {
      &:not(:first-child) {
        border-left: 2px solid var(--color-main);
      }
    }

    .swapp-item-controls {
      align-items: center;
      justify-content: center;
    }

    svg {
      fill: var(--color-main);
      vertical-align: middle;
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
    text-align: left;
    cursor: pointer;
    transition: all var(--main-transition);
    text-shadow: 1px 1px #000000;

    &:hover {
      color: var(--color-focus);
      border-bottom: 1px solid var(--color-focus);
      transition: all var(--main-transition);
    }

    &:focus {
      outline: none;
      border-bottom: 1px solid var(--color-focus);
      transition: all var(--main-transition);
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
    padding: 0;
    border: none;
    cursor: pointer;

    &.disabled {
      pointer-events: none;
    }

    &:hover {
      box-shadow: var(--main-shadow);
      transition: all var(--main-transition);
    }

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
    justify-content: flex-start;
    align-items: flex-end;
    gap: 4px;
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
    display: flex;

    svg {
      fill: var(--color-bg);
      margin: auto;
      transition: all var(--main-transition);
    }

    &:hover {
      color: var(--color-white);
      background-color: var(--color-bg);
      transition: all var(--main-transition);

      svg {
        fill: var(--color-white);
        transition: all var(--main-transition);
      }
    }
  }

  @media (max-width: 576px) {
    .swapp-item-head {
      grid-template-columns: 30% auto 30% ;

      .swapp-item-controls {
        display: none;
      }
    }

    .swapp-item {
      gap: 0 4px;
    }

    .swapp-item-cover {
      grid-template-columns: auto;
    }

    .swapp-item-mid-cover {
      height: 80px;
    }

    .swapp-input {
      font-size: 16px;
    }

    .swapp-item-controls {
      flex-direction: row;
      justify-content: flex-end;
      margin-top: 4px;
    }
  }
</stype>