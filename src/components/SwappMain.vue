<template>

  <div class="swapp-item swapp-item-head">
    <div>Deck in</div>
    <div class="swapp-item-mid">The swap</div>
    <div>Deck out</div>
    <div class=" swapp-item-controls"></div>
  </div>

  <template v-if="isInit">
    <div class="swapp-item swapp-item-general">
      <div>
        <div class="swapp-input">Deck 1</div>
      </div>
      <div class="swapp-item-mid">
        <div class="swapp-item-mid-cover">
          <div class="swapp-item-image swapp-item-image-left">
            <img src="https://cdn1.mtggoldfish.com/images/gf/Island%2B%253C371%253E%2B%255B10E%255D.jpg">
          </div>
          <div class="swapp-item-image swapp-item-image-right">
            <img src="https://cdn1.mtggoldfish.com/images/gf/Mountain%2B%253C376%253E%2B%255B10E%255D.jpg">
          </div>
        </div>
      </div>
      <div>
        <div class="swapp-input">Deck 2</div>
      </div>
      <div class=" swapp-item-controls">
        <button class="swapp-item-button" @click="openEditModal('123')">Edit</button>
        <button class="swapp-item-button">Del</button>
        <button class="swapp-item-button">Top</button>
      </div>
    </div> 
  </template>

</template>

<script>
import cloneObject from '@/helpers/cloneObject.js';

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
    }
  },
  mounted() {
    this.init();
  }
}
</script>

<stype lang="less" scoped>
  .swapp-item {
    border-radius: 6px;
    padding: 10px;
    display: grid;
    grid-template-columns: 20% auto 20% 10%;
    gap: 10px;
    background-color: var(--color-bg);
  }

  .swapp-item-head {
    margin-bottom: 10px;
    text-align: center;
  }

  .swapp-item-general {
    height: 120px;

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
    margin: 0;
    height: 36px;
    width: 36px;
    cursor: pointer;
    border: 1px solid var(--color-main);
    border-radius: 4px;
    transition: all var(--main-transition);

    &:hover {
      color: var(--color-secondary);
      border: 1px solid var(--color-secondary);
      transition: all var(--main-transition);
    }
  }
</stype>