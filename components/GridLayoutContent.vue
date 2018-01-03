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
      <p>{{area}} {{areaCount[area]}}</p>
      <button v-if="isMultiple(area)">break</button>
    </div>
  </section>
</template>

<script lang="ts">
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['areas', 'columns', 'rows']),
    flatAreas() {
      return this.areas.reduce((prev, curr) => [...prev, ...curr])
    },
    areaCount() {
      return this.areas.reduce((prev, curr) => [...prev, ...curr]).reduce((map, area) => {
        map[area] = map[area] ? map[area] + 1 : 1
        return map
      }, {})
    },
    areaNames() {
      return Object.keys(this.areaCount)
    },
    gridStyle() {
      return {
        'grid-template-areas': this.areas.map(area => `'${area.join(' ')}'`).join(' '),
        'grid-template-columns': this.columns.join(' '),
        'grid-template-rows': this.rows.join(' ')
      }
    }
  },
  methods: {
    isMultiple(area: string) {
      return this.areaCount[area] > 1
    },
    onBreak(area: string) {}
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
