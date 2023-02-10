<template>
  <div class="logo">{{  this.$store.getters.appName }}</div>
</template>

<script>
export default {
  name: 'SwappHeader'
}
</script>

<style lang="less" scoped>
  .logo {
    background-color: var(--color-bg);
    border-radius: 6px;
    width: fit-content;
    padding: 8px 10px 9px 10px;
    font-weight: 600;
  }
</style>