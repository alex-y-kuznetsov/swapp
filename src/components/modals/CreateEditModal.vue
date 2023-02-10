<template>
  <h1 class="modal-title">Create/edit a swap</h1>

  <div class="form-container" v-if="isInit">
    <div class="create-form">
      <label class="form-input-cover">
        <div class="form-input-legend">Deck in</div>
        <input type="text" class="form-input">
      </label>
      <label class="form-input-cover">
        <div class="form-input-legend">Deck out</div>
        <input type="text" class="form-input">
      </label>
      <label class="form-input-cover">
        <div class="form-input-legend">Card in</div>
        <input type="text" class="form-input">
      </label>
      <label class="form-input-cover">
        <div class="form-input-legend">Card out</div>
        <input type="text" class="form-input">
      </label>
    </div>
  </div>

  <div class="modal-controls">
    <button class="form-button">Submit</button>
    <button class="form-button">Cancel</button>
  </div>

</template>

<script>
import constants from '@/static/constants.js';

export default {
  name: 'CreateEditModal',
  data() {
    return {
      isInit: false,
      cardNames: null
    }
  },
  methods: {
    submitForm() {
      console.log('submitted')
    },
    getCardNames() {
      fetch(`${constants.API_URL}/catalog/card-names`)
      .then(response => response.json())
      .then(data => this.cardNames = data)
      .then(() => this.isInit = true);
    }
  },
  mounted() {
    this.getCardNames();
  }
}
</script>

<style lang="less" scoped>
  .modal-title {
    font-size: 22px;
    font-weight: 400;
    margin: 0 0 40px 0;
  }

  .form-container {
    margin-bottom: 20px;
  }

  .create-form {
    display: grid;
    grid-template-columns: 48% 48%;
    gap: 20px 4%;
  }

  .form-input-cover {
    box-sizing: border-box;
  }

  .form-input {
    width: 100%;
    box-sizing: border-box;
    margin: 0;
    padding: 4px 0;
    font-size: 22px;
    border: none;
    border-bottom: 2px solid var(--color-main);

    &:focus {
      outline: none;
      border-bottom: 2px solid var(--color-secondary);
    }
  }

  .form-input-legend {
    font-size: 14px;
    color: var(--color-secondary);
  }

  .modal-controls {
    display: flex;
    justify-content: flex-end;
    gap: 6px;

  }

  .form-button {
    border: none;
    background-color: transparent;
    font-size: 16px;
    padding: 8px 10px;
    border: 1px solid var(--color-main);
    border-radius: 6px;
    cursor: pointer;

    &:hover {
      color: var(--color-secondary);
      border: 1px solid var(--color-secondary);
      transition: all var(--main-transition);
    }
  }
</style>