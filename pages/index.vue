<template>
  <section
    class="container"
  >
    <h1>GridLayout</h1>
    <GridLayout />
  </section>
</template>

<script lang="ts">
import GridLayout from '~/components/GridLayout.vue'

export default {
  components: {
    GridLayout
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
  background: #fffffc;
}
</style>
