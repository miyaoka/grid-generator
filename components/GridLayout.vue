<template>
  <div class="grid">
    <GridLayoutColRow class="colrow" />
    <GridLayoutState class="state" />
    <a
      href="https://github.com/miyaoka/grid-generator"
      target="_blank"
      rel="noopener"
      >
      <img
        class="github"
        src="https://camo.githubusercontent.com/652c5b9acfaddf3a9c326fa6bde407b87f7be0f4/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6f72616e67655f6666373630302e706e67"
        alt="Fork me on GitHub"
        data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_orange_ff7600.png"
        >
    </a>
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

<style scoped>
.grid {
  display: grid;
  grid-template-areas: 'colrow state';
  grid-template-columns: 1fr minmax(300px, 300px);
  grid-template-rows: minmax(100%, 100%);

  max-width: 100%;
  height: 100%;
}

.github {
  position: absolute;
  top: 0;
  right: 0;
  border: 0;
  transform:scale(0.8);
  transform-origin: right top;
}

</style>
