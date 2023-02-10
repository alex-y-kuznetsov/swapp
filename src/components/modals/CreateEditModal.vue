<template>
  <h1 class="modal-title">Create/edit a swap</h1>

  <div class="form-container">
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
export default {
  name: 'CreateEditModal',
  data() {
    return {

    }
  },
  methods: {
    submitForm() {
      console.log('submitted')
    }
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
    grid-template-columns: 46% 46%;
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
    border-bottom: 1px solid var(--color-main);

    &:focus {
      outline: none;
      border-bottom: 1px solid var(--color-focus);
    }
  }

  .form-input-legend {
    font-size: 14px;
    color: var(--color-secondary);
  }

  .modal-controls {
    display: flex;
    gap: 6px;

  }

  .form-button {
    border: none;
    background-color: transparent;
    font-size: 16px;
    padding: 4px 6px;
    border: 1px solid var(--color-main);
    border-radius: 6px;
    cursor: pointer;
  }
</style>