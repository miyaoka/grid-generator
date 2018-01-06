<template>
  <div class="grid" v-show="loaded">
    <GridLayoutColRow class="colrow" />
    <GridLayoutState class="state" />
    <a
      href="https://github.com/miyaoka/grid-generator"
      target="_blank"
      rel="noopener"
      class="github"
    >
      <icon name="github" scale="3"></icon>
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
  },
  data() {
    return {
      loaded: false
    }
  },
  mounted() {
    const layout = localStorage.getItem('layout')
    if (layout !== null) {
      try {
        this.$store.commit('setLayout', JSON.parse(layout))
      } catch (err) {
        console.error(err)
      }
    }
    this.loaded = true

    this.$store.watch(
      (state, getters) => getters.currentLayout,
      layout => {
        localStorage.setItem('layout', JSON.stringify(layout))
      }
    )
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

.colrow {
  overflow: scroll;
  grid-area: colrow;
}
.state {
  grid-area: state;
}
.github {
  position: absolute;
  top: 0;
  right: 0;
  border: 0;
  transform-origin: right top;
  color: #000;
}
</style>
