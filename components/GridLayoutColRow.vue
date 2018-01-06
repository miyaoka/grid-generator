<template>
  <div class="grid">
    <div
      class="columns"
      :style="columnStyle"
    >
      <GridLayoutColumn
        v-for="(column, i) in columns"
        :key="i"
        :style="'c', i | gridArea"
        :value="column"
        :index="i"
      />
    </div>
    <div
      class="rows"
      :style="rowStyle"
    >
      <GridLayoutRow
        v-for="(row, i) in rows"
        :key="i"
        :style="'r', i | gridArea"
        :value="row"
        :index="i"
      />
    </div>
    <GridLayoutContent
      class="content"
      :style="areaStyle"
    />
    <div class="grid-corner">
      <button
        @click="insertColumn({index: -1})"
        class="grid-corner-col grid-button"
      >+</button>
      <button
        @click="insertRow({index: -1})"
        class="grid-corner-row grid-button"
      >+</button>
    </div>

  </div>
</template>

<script lang="ts">
import { mapState, mapMutations } from 'vuex'
import GridLayoutContent from '~/components/GridLayoutContent.vue'
import GridLayoutColumn from '~/components/GridLayoutColumn.vue'
import GridLayoutRow from '~/components/GridLayoutRow.vue'

export default {
  components: {
    GridLayoutContent,
    GridLayoutColumn,
    GridLayoutRow
  },
  filters: {
    gridArea(prefix: string, index: string) {
      return {
        'grid-area': `${prefix}${index}`
      }
    }
  },
  computed: {
    ...mapState(['columns', 'rows', 'gridWidth', 'gridHeight']),
    areaStyle() {
      return {
        width: this.gridWidth,
        height: this.gridHeight
      }
    },
    columnStyle() {
      return {
        width: this.gridWidth,
        'grid-template-columns': this.columns.join(' '),
        'grid-template-areas': `"${Array.from(Array(this.columns.length).keys())
          .map(a => `c${a}`)
          .join(' ')}"`
      }
    },
    rowStyle() {
      return {
        height: this.gridHeight,
        'grid-template-rows': this.rows.join(' '),
        'grid-template-areas': Array.from(Array(this.rows.length).keys())
          .map(a => `"r${a}"`)
          .join(' ')
      }
    }
  },
  methods: {
    ...mapMutations(['insertColumn', 'insertRow'])
  }
}
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-areas: 'corner columns' 'rows content';
  grid-template-columns: 60px 1fr;
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

.grid-button {
  text-decoration: none;
  background: #fff;
  width: 30px;
  height: 16px;
  border: solid 1px #999;
  border-radius: 3px;
  font-size: 12px;
}

.grid-corner {
  grid-area: 'corner';
  position: relative;

  &-row,
  &-col {
    position: absolute;
  }
  &-row {
    bottom: 0;
    left: 50%;
    transform: translateX(-70%);
  }
  &-col {
    right: 0;
    top: 50%;
    transform: translateY(-70%);
    width: 16px;
    height: 30px;
  }
}
</style>
