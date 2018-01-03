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
          @input="updateColumn({index: i, value: $event.target.value})"
        >
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
          @input="updateRow({index: i, value: $event.target.value})"
        >
      </div>
    </div>
    <GridLayoutContent
      class="content"
    />
    <div class="column-change">
      <button
        @click="pushColumn"
      >+</button>
      <button
        @click="popColumn"
      >-</button>
    </div>
    <div class="row-change">
      <button
        @click="pushRow"
      >+</button>
      <button
        @click="popRow"
      >-</button>
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
    ...mapMutations(['updateColumn', 'updateRow', 'pushColumn', 'popColumn', 'pushRow', 'popRow'])
  }
}
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-areas: '. columns columnChange' 'rows content .' 'rowChange . .';
  grid-template-columns: 100px 1fr 40px;
  grid-template-rows: 50px 1fr 40px;

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

.column-change {
  grid-area: columnChange;
}
.row-change {
  grid-area: rowChange;
}

.content {
  grid-area: content;
}

.grid-cell{
  border: 1px dotted #999;

  display:grid;
  justify-items: center;
  align-items: center;

  & > input {
    width: 100%;
    font-size: 16px;
  }
}
</style>
