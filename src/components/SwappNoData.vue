<template>
  <div class="no-data-cover">
    <div class="no-data-content">
      No swaps to display. Please add a swap via the Create button.
    </div>
  </div>
</template>

<script>
export default {
  name: 'SwappNoData'
}
</script>

<style lang="less" scoped>
  .no-data-cover {
    display: flex;
    height: 100%;
  }

  .no-data-content {
    margin: auto;
    color: var(--color-bg);
  }
</style>