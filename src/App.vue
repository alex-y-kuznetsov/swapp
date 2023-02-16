<template>
  <div class="container">
    <HomePage />
  </div>
<ModalContainer />
<SwappActions />
</template>

<script>
import HomePage from '@/pages/HomePage.vue';
import ModalContainer from '@/components/modals/ModalContainer.vue'
import SwappActions from '@/components/SwappActions.vue'

export default {
  name: 'App',
  components: {
    HomePage,
    ModalContainer,
    SwappActions
  }
}
</script>

<style lang="less">
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,400;0,700;1,400&display=swap');

:root {
  --color-white: #e0e0e0;
  --color-main: #FFFFFF;
  --color-secondary: #FBEEC1;
  --color-focus: #DAAD86;
  --color-overlay: rgba(15,40,68,.4);
  --color-bg: #659dbd;
  --color-bg-secondary: #8D8741;
  --color-scrollbar: rgba(0, 0, 0, 0.07);
  --color-error: #ff3333;
  --main-transition: 0.2s;
  --main-shadow: 0 0 4px rgb(0 0 0 / 10%), 0 4px 12px rgb(0 0 0 / 10%);
}

html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

#app {
  font-family: 'Roboto Condensed', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  color: var(--color-main);
  background-color: var(--color-white);
}

input {
  font-family: 'Roboto Condensed', Helvetica, Arial, sans-serif;
  background-color: var(--color-bg);
  color: var(--color-main);
}

button {
  color: var(--color-main);
  background-color: transparent;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    height: 100%;
}
</style>
