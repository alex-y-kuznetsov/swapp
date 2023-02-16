<template>
  <header class="page-header">
    <SwappHeader />
  </header>
  <main class="page-main">
    <SwappMain />
  </main>
  <footer class="page-footer">
    <SwappFooter />
  </footer>
</template>

<script>
import SwappHeader from '@/components/SwappHeader.vue';
import SwappMain from '@/components/SwappMain.vue';
import SwappFooter from '@/components/SwappFooter.vue';

export default {
  name: 'HomePage',
  components: {
    SwappHeader,
    SwappMain,
    SwappFooter
  }
}
</script>

<style lang="less" scoped>
  .page-header {
    padding: 20px 0;
  }

  .page-main {
    padding: 20px 0;
    overflow: auto;
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
  }

  .page-footer {
    padding: 20px 0;
    margin-top: auto;
  }
</style>
