<template>
  <h1 class="modal-title">Swapp features</h1>
  <ul class="swapp-list">
    <li>This app is designed to store your card swap ideas for your Commander/EDH decks</li>
    <li>You can choose a deck to put the card in, a card to take out and a new deck for the taken out card</li>
    <li>Create now and edit at a later time</li>
    <li>Swapps are stored in local storage so they won't persist through different browsers</li>
    <li>MTG cards API courtesy of Scryfall</li>
  </ul>
  <div class="modal-controls">
    <button class="form-button" @click="closeModal()">Close</button>
  </div>
</template>

<script>
export default {
  name: 'HelpModal',
  methods: {
    closeModal() {
      this.$store.commit('closeModal');
    },
  }
}
</script>

<style lang="less" scoped>
  .swapp-list {
    li {
      padding: 8px 0;
    }
  }
</style>