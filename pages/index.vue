<template>
  <section
    class="container"
  >
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

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  background: #fffffc;
}
</style>
