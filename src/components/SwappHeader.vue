<template>
  <div class="logo">sw <div class="logo-rotate">A</div> pp
  </div>
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
    text-transform: uppercase;
    font-size: 18px;
  }

  .logo-rotate {
    display: inline-block;
    transform: rotate(90deg);
    font-size: 19px;
  }
</style>