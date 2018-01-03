<template>
  <section
    class="container"
  >
    <GridLayout
      :areas="areas"
      :columns="columns"
      :rows="rows"
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
      rows: ['60px', '1fr', '40px']
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
