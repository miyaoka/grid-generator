<template>
  <section
    class="grid"
    :style="gridStyle"
  >
    <div
      v-for="(area, i) in uniqueAreas"
      :key="i"
      :style="{'grid-area': area }"
      class="grid-cell"
      :class="{selected:$store.state.selectedAreas[area]}"
      @click.self="toggleArea({area})"
    >
      <FocusInput
        class="focus-input"
        :value="area"
        @input="renameArea({oldValue: area, newValue: $event.target.value})"
      />

      <button
        v-if="isMultiple(area)"
        @click="breakArea({area})"
      >break</button>
    </div>
  </section>
</template>

<script lang="ts">
import { mapState, mapMutations } from 'vuex'
import FocusInput from '~/components/FocusInput.vue'

export default {
  components: {
    FocusInput
  },
  computed: {
    ...mapState(['areas', 'columns', 'rows']),
    flatAreas() {
      return this.areas.reduce((prev, curr) => [...prev, ...curr])
    },
    uniqueAreas() {
      return Object.keys(this.areaCount)
    },
    areaCount() {
      return this.flatAreas.reduce((map, area) => {
        map[area] = map[area] ? map[area] + 1 : 1
        return map
      }, {})
    },
    areaNames() {
      return Object.keys(this.areaCount)
    },
    gridStyle() {
      return {
        'grid-template-areas': this.areas.map(area => `"${area.join(' ')}"`).join(' '),
        'grid-template-columns': this.columns.join(' '),
        'grid-template-rows': this.rows.join(' ')
      }
    }
  },
  methods: {
    ...mapMutations(['breakArea', 'renameArea', 'toggleArea']),
    isMultiple(area: string) {
      return this.areaCount[area] > 1
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

  &.selected {
    background: #ff0;
  }
}

.focus-input {
  font-size: 20px;
}
</style>
