<template>
  <transition-group
    name="area"
    tag="section"
    class="grid"
    :style="gridStyle"
    :class="{ 'is-combinable': isCombinable }"
  >
    <div
      v-for="(area, i) in uniqueAreaKeys"
      :key="area"
      :style="{'grid-area': area }"
      class="grid-cell"
      :class="{selected: selectedAreaMap[area]}"
      @click.self="toggleSlectArea({area})"
    >
      <FocusInput
        class="focus-input"
        :value="area"
        @input="renameArea({oldValue: area, newValue: $event.target.value})"
      />

      <button
        v-if="isMultiple(area)"
        @click="splitArea({area})"
      >Split</button>
      <button
        v-if="isCombinable && selectedAreaMap[area]"
        @click="combineArea({area})"
      >Combine</button>
    </div>
  </transition-group>
</template>

<script lang="ts">
import { mapState, mapGetters, mapMutations } from 'vuex'
import FocusInput from '~/components/FocusInput.vue'

export default {
  components: {
    FocusInput
  },
  computed: {
    ...mapState(['areas', 'columns', 'rows', 'selectedAreaMap']),
    ...mapGetters(['flattenAreas', 'isCombinable', 'uniqueAreaKeys', 'areaCount']),
    gridStyle() {
      return {
        'grid-template-areas': this.areas.map(area => `"${area.join(' ')}"`).join(' '),
        'grid-template-columns': this.columns.join(' '),
        'grid-template-rows': this.rows.join(' ')
      }
    }
  },
  methods: {
    ...mapMutations(['splitArea', 'renameArea', 'toggleSlectArea', 'combineArea']),
    isMultiple(area: string) {
      return this.areaCount[area] > 1
    }
  }
}
</script>

<style scoped>
.grid {
  height: 100%;
  display:grid;
  grid-gap: 0px;
}

.grid-cell{
  border: 1px dashed #888;
  background: #ccc;
  width: 100%;
  height: 100%;

  display:grid;
  justify-items: center;
  align-items: center;

  &.selected {
    .is-combinable & {
      background: #0f0;
    }
    background: #ff0;
  }
}

.focus-input {
  font-size: 20px;
}

.area-enter-active {
  transition: .2s ease-out;
}
.area-enter {
  opacity: 0.5;
  transform: scale(0.2);
}

</style>
