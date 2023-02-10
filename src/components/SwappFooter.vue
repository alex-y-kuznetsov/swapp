<template>
  <div class="footer-cover">
    <div class="footer-controls">
      <button class="footer-button">Clear all</button>
    </div>
    <div class="footer-copyright">{{  getYear() }}</div>
  </div>
</template>
  
<script>
export default {
  name: 'SwappFooter',
  methods: {
    getYear() {
      const today = new Date();
      return today.getFullYear();
    }
  }
}
</script>

<style lang="less" scoped>

.footer-cover {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
  .footer-button {
    border: 2px solid var(--color-bg);
    color: var(--color-bg);
    border-radius: 6px;
    width: fit-content;
    padding: 9px 10px 8px 10px;
    font-weight: 600;
    background-color: transparent;
    cursor: pointer;
    transition: all var(--main-transition);

    &:hover {
      color: var(--color-white);
      background-color: var(--color-bg);
      transition: all var(--main-transition);
    }
  }

  .footer-copyright {
    color: var(--color-bg);
    font-weight: 600;
  }
</style>