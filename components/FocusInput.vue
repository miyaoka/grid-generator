<template>
  <span
    @click="onInputStart"
  >
    <input
      type="text"
      :value="value"
      v-if="focused"
      ref="input"
      @blur="onInputComplete"
      @keydown.enter="onInputComplete"
      @keydown.esc="onInputCancel"
    >
    <span v-else>{{value || '(noname)'}}</span>
  </span>
</template>

<script lang="ts">
export default {
  data() {
    return {
      focused: false
    }
  },
  props: {
    value: { type: String }
  },
  methods: {
    onInputStart() {
      this.focused = true
      this.$nextTick(() => this.$refs.input.select())
    },
    onInputComplete(e) {
      if (!this.focused) return
      this.focused = false
      if (e.target.value === '') return
      this.$emit('input', e)
    },
    onInputCancel() {
      this.focused = false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
