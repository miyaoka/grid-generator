<template>
  <div class="grid">
    <GridLayoutColRow class="colrow" />
    <GridLayoutState class="state" />

  </div>
</template>

<script lang="ts">
import GridLayoutColRow from '~/components/GridLayoutColRow.vue'
import GridLayoutState from '~/components/GridLayoutState.vue'

export default {
  components: {
    GridLayoutColRow,
    GridLayoutState
  }
}
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-areas: 'colrow state';
  grid-template-columns: 1fr minmax(300px, 300px);
  grid-template-rows: minmax(100%, 100%);

  max-width: 100%;
  height: 100%;
}

</style>
