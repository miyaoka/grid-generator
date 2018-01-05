<template>
  <transition-group
    name="area"
    tag="section"
    class="grid"
    :style="gridStyle"
    :class="{ 'is-combinable': isCombinable }"
  >
    <div
      v-for="area in uniqueAreaKeys"
      :key="area"
      :style="{'grid-area': area }"
      class="grid-cell"
      :class="{selected: selectedAreaMap[area]}"
      @click="toggleSlectArea({area})"
    >
      <div class="grid-cell-bg"></div>
      <div class="grid-cell-inner">

        <FocusInput
          class="focus-input"
          :value="area"
          @input="renameArea({oldValue: area, newValue: $event.target.value})"
        />

        <button
          v-if="isMultiple(area)"
          @click.stop="splitArea({area})"
          class="split"
        >
          <icon name="chain-broken" scale="0.8"></icon>
          Split
        </button>
        <button
          v-if="isCombinable && selectedAreaMap[area]"
          @click.stop="combineArea({area})"
          class="combine"
        >
          <icon name="chain" scale="0.8"></icon>
          Combine
        </button>

      </div>

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

<style lang="scss" scoped>
.grid {
  height: 100%;
  display: grid;
}

.grid-cell {
  border: 1px dashed #ddd;
  width: 100%;
  height: 100%;
  padding: 4px;

  position: relative;

  &-bg,
  &-inner {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  &-bg {
    margin: 4px;

    background: #eeeef3;
    border-radius: 10px;
    transition: 0.1s ease-out;

    .selected & {
      background: #dedd70;

      .is-combinable & {
        background: #6ec387;
      }
    }
  }

  &-inner {
    .focus-input,
    .split,
    .combine {
      position: absolute;
      transform: translateX(-50%) translateY(-50%);
    }
    .focus-input {
      left: 50%;
      top: 50%;
    }
    .split {
      top: 0%;
      right: 0%;
      transform: translateX(-12px) translateY(12px);
      background: #000;
      color: #fff;
    }
    .combine {
      left: 50%;
      bottom: 0%;
      transform: translateX(-50%) translateY(-8px);
      background: #fff;
      color: #000;
    }

    .split,
    .combine {
      font-size: 12px;
      display: inline-block;
      padding: 2px 4px;
      text-decoration: none;
      border: solid 1px #000;
      border-radius: 8px;
      white-space: nowrap;
    }
  }
}

.focus-input {
  font-size: 16px;
}

.area-enter-active {
  transition: 0.2s ease-out;
}
.area-enter {
  opacity: 0.5;
  transform: scale(0.2);
}
</style>
