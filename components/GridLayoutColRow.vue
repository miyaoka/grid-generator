<template>
  <div class="grid">
    <div
      class="columns"
      :style="columnStyle"
    >
      <div
        v-for="(column, i) in columns"
        :key="i"
        :style="'c', i | gridArea"
        class="grid-cell"
      >
        <input
          type="text"
          :value="column"
          class="grid-input"
          @input="updateColumn({index: i, value: $event.target.value})"
        >
        <div class="grid-buttons">
          <button
            @click="removeColumn({index: i})"
          >-</button>
          <button
            @click="insertColumn({index: i + 1})"
          >+</button>
        </div>
      </div>
    </div>
    <div
      class="rows"
      :style="rowStyle"
    >
      <div
        v-for="(row, i) in rows"
        :key="i"
        :style="'r', i | gridArea"
        class="grid-cell"
      >
        <input
          type="text"
          :value="row"
          class="grid-input"
          @input="updateRow({index: i, value: $event.target.value})"
        >
        <div>
          <button
            @click="removeRow({index: i})"
          >-</button>
          <button
            @click="insertRow({index: i + 1})"
          >+</button>
        </div>
      </div>
    </div>
    <GridLayoutContent
      class="content"
    />
    <div class="grid-corner">
      <button
        @click="insertColumn({index: 0})"
        class="grid-corner-col"
      >+</button>
      <button
        @click="insertRow({index: 0})"
        class="grid-corner-row"
      >+</button>
    </div>

  </div>
</template>

<script lang="ts">
import { mapState, mapMutations } from 'vuex'
import GridLayoutContent from '~/components/GridLayoutContent.vue'

export default {
  components: {
    GridLayoutContent
  },
  filters: {
    gridArea(prefix: string, index: string) {
      return {
        'grid-area': `${prefix}${index}`
      }
    }
  },
  computed: {
    ...mapState(['columns', 'rows']),
    columnStyle() {
      return {
        'grid-template-columns': this.columns.join(' '),
        'grid-template-areas': `"${Array.from(Array(this.columns.length).keys())
          .map(a => `c${a}`)
          .join(' ')}"`
      }
    },
    rowStyle() {
      return {
        'grid-template-rows': this.rows.join(' '),
        'grid-template-areas': Array.from(Array(this.rows.length).keys())
          .map(a => `"r${a}"`)
          .join(' ')
      }
    }
  },
  methods: {
    ...mapMutations([
      'updateColumn',
      'updateRow',
      'insertColumn',
      'removeColumn',
      'insertRow',
      'removeRow'
    ])
  }
}
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-areas: 'corner columns' 'rows content';
  grid-template-columns: 100px 1fr;
  grid-template-rows: 50px 1fr;

  height: 100%;
}

.columns,
.rows {
  display: grid;
}
.columns {
  grid-area: columns;
  background: #eef;
}
.rows {
  grid-area: rows;
  background: #efe;
}

.content {
  grid-area: content;
}

.grid-cell{
  border: 1px dotted #999;

  display:grid;
  justify-items: center;
  align-items: center;

  .grid-input {
    width: 100%;
    font-size: 16px;
  }
}

.grid-corner {
  grid-area: 'corner';
  display:grid;

  &-row {
    justify-self: center;
  }
  &-col {
    justify-self: end;
  }
}
</style>
