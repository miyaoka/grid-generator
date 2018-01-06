<template>
  <div class="container" ref="container">
    <input
      type="text"
      :value="value"
      class="grid-input"
      @input="updateRow({index, value: $event.target.value})"
    >
    <div class="grid-buttons">
      <button
        @click="removeRow({index})"
        class="grid-button"
      >-</button>
      <button
        @click="insertRow({index})"
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
      clientHeight: 0,
      startY: 0
    }
  },
  props: {
    value: { type: String },
    index: { type: Number }
  },
  methods: {
    ...mapMutations(['updateRow', 'insertRow', 'removeRow']),
    onDragStart(e) {
      this.clientHeight = this.$refs.container.clientHeight
      this.startY = e.clientY
    },
    onDrag(e) {
      if (e.x === 0 && e.y === 0) return
      this.updateRow({
        index: this.index,
        value: `${Math.max(0, this.clientHeight - this.startY + e.clientY)}px`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  border-bottom: 1px dashed #999;

  display: grid;
  justify-items: center;
  align-items: center;
  position: relative;

  .grid-input {
    width: 100%;
    font-size: 16px;
  }

  .grid-buttons {
    position: absolute;
    bottom: 10px;
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
  cursor: ns-resize;
  position: absolute;
  z-index: 10;
  right: 0;
  bottom: 0;
  left: 0;
  height: 16px;
  transform: translateY(50%);
}
</style>
