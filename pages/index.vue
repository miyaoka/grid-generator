<template>
  <section
    class="container"
  >
    <GridLayout
      :areas="areas"
      :columns="columns"
      :rows="rows"
      class="content"
    />
  </section>
</template>

<script lang="ts">
import GridLayout from '~/components/GridLayout.vue'

export default {
  components: {
    GridLayout
  },
  data() {
    return {
      areas: [
        ['header', 'header', 'header'],
        ['left', 'main', 'right'],
        ['footer', 'footer', 'footer']
      ],
      columns: ['120px', '4fr', '1fr'],
      rows: ['160px', '1fr', '80px']
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 90vh;
  background: #ff0;
}
</style>
