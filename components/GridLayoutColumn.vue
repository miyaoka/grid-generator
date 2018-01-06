<template>
  <div class="container" ref="container">
    <input
      type="text"
      :value="value"
      class="grid-input"
      @input="updateColumn({index, value: $event.target.value})"
    >
    <div class="grid-buttons">
      <button
        @click="removeColumn({index})"
        class="grid-button"
      >-</button>
      <button
        @click="insertColumn({index})"
        class="grid-button"
      >+</button>
    </div>

    <div
      class="thumb"
      ref="thumb"
      draggable="true"
      @dragstart="onDragStart"
      @drag="onDrag"
    ></div>
  </div>
</template>

<script lang="ts">
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      clientWidth: 0,
      startX: 0
    }
  },
  props: {
    value: { type: String },
    index: { type: Number }
  },
  methods: {
    ...mapMutations(['updateColumn', 'insertColumn', 'removeColumn']),
    onDragStart(e) {
      this.clientWidth = this.$refs.container.clientWidth
      this.startX = e.clientX

      // https://stackoverflow.com/questions/13920345/html-drag-event-does-not-fire-in-firefox
      // Firefox does not fires dragEvent when no dataTransfer, also not fires clientX during dragEvent.
    },
    onDrag(e) {
      // https://stackoverflow.com/questions/36308460/why-is-clientx-reset-to-0-on-last-drag-event
      // Ignore clientX on last drag event
      if (e.x === 0 && e.y === 0) return

      this.updateColumn({
        index: this.index,
        value: `${Math.max(0, this.clientWidth - this.startX + e.clientX)}px`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  border-right: 1px dashed #999;

  display: grid;
  justify-items: center;
  align-items: center;
  position: relative;
  align-items: self-start;

  .grid-input {
    width: 100%;
    font-size: 16px;
  }

  .grid-buttons {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
  }
}

.grid-button {
  text-decoration: none;
  background: #fff;
  width: 30px;
  height: 16px;
  border: solid 1px #999;
  border-radius: 3px;
  font-size: 12px;
}

.thumb {
  cursor: ew-resize !important;
  position: absolute;
  z-index: 10;
  right: 0;
  bottom: 0;
  top: 0;
  width: 16px;
  transform: translateX(50%);
}
</style>
