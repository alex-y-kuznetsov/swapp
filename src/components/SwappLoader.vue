<template>
  <div class="loader-cover">
    <div class="loader-logo">
      <div class=loader-letter>A</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SwappLoader'
}
</script>

<style lang="less" scoped>
  .loader-cover {
    height: 100%;
    display: flex;
    flex: 1 1 0;
  }

  .loader-logo {
    margin: auto;
    width: 100px;
    height: 100px;
    box-sizing: border-box;
    padding: 20px;
    border-radius: 6px;
    background-color: var(--color-bg);
  }

  .loader-letter {
    font-size: 60px;
    line-height: 60px;
    transform: rotate(90deg);
    font-weight: 600;
    text-align: center;
    vertical-align: middle;
    animation-name: spin;
    animation-duration: 1200ms;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
  }

  @keyframes spin {
    from {transform:rotate(90deg);}
    to {transform:rotate(450deg);}
}
</style>