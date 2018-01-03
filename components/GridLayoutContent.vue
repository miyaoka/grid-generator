<template>
  <section
    class="grid"
    :style="gridStyle"
  >
    <div
      v-for="(area, i) in flatAreas"
      :key="i"
      :style="{'grid-area': area }"
      class="grid-cell"
    >
      {{area}}
    </div>
  </section>
</template>

<script lang="ts">
export default {
  props: {
    areas: { type: Array, required: true },
    columns: { type: Array, required: true },
    rows: { type: Array, required: true }
  },
  computed: {
    flatAreas() {
      return this.areas.reduce((prev, curr) => [...prev, ...curr])
    },
    areaNames() {
      return Object.keys(
        this.areas.reduce((prev, curr) => [...prev, ...curr]).reduce((map, area) => {
          map[area] = 1
          return map
        }, {})
      )
    },
    gridStyle() {
      return {
        'grid-template-areas': this.areas.map(area => `'${area.join(' ')}'`).join(' '),
        'grid-template-columns': this.columns.join(' '),
        'grid-template-rows': this.rows.join(' ')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.grid {
  height: 100%;
  display:grid;
  grid-gap: 0px;
}

.grid-cell{
  border: 1px dotted #000;
  background: #ccc;
  width: 100%;
  height: 100%;

  display:grid;
  justify-items: center;
  align-items: center;
}
</style>
