<template>
  <div class="swapp-item swapp-item-head">
    <div>Deck in</div>
    <div class="swapp-item-mid">The swap</div>
    <div>Deck out</div>
  </div>
  <div class="swapp-item">
    <div></div>
    <div class="swapp-item-mid"></div>
    <div></div>
  </div> 
</template>

<script>
export default {
  name: 'SwappMain',
}
</script>

<stype lang="less" scoped>
  .swapp-item {
    display: flex;
    gap: 10px;
  }

  .swapp-item-mid {
    flex-grow: 1;
    text-align: center;
  }
</stype>