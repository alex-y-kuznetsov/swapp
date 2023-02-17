<template>
  <div class="not-found-cover">
    <div class="not-found-content">
      <h1 class="not-found-title">Page Not Found</h1>
      <span>You probably want to go 
        <router-link class="swapp-link" to="/">here</router-link>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFoundPage'
}
</script>

<style lang="less" scoped>
.not-found-title {
  margin: 0 0 30px 0;
}
  .not-found-cover {
    background-color: var(--color-bg);
    margin: auto;
    padding: 40px;
    border-radius: 6px;
    text-align: center;
  }

  .not-found-content {
    color: var(--color-main);
  }

  .swapp-link {
    color: var(--color-secondary);
    transition: color var(--main-transition);

    &:hover {
      color: var(--color-focus);
      transition: color var(--main-transition);
    }
  }
</style>