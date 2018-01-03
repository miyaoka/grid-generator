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
          v-model="columns[i]"
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
          v-model="rows[i]"
        >
      </div>
    </div>
    <GridLayoutContent
      :areas="areas"
      :columns="columns"
      :rows="rows"
      class="content"
    />

  </div>
</template>

<script lang="ts">
import GridLayoutContent from '~/components/GridLayoutContent.vue'

export default {
  components: {
    GridLayoutContent
  },
  props: {
    areas: { type: Array, required: true },
    columns: { type: Array, required: true },
    rows: { type: Array, required: true }
  },
  computed: {
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
  filters: {
    gridArea(prefix: string, index: string) {
      return {
        'grid-area': `${prefix}${index}`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-areas: '. columns' 'rows content';
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

  & > input {
    width: 100%;
    font-size: 16px;
  }
}
</style>
