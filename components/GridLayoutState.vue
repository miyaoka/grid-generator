<template>
  <div class="container">
    <div>
      <h3>CSS</h3>
      <textarea
        :value="cssGrid + cssAreas"
        class="code"
        readonly
        ></textarea>
    </div>
    <div>
      <h3>HTML</h3>
      <textarea
        :value="html"
        class="code"
        readonly
        ></textarea>
    </div>
  </div>
</template>

<script lang="ts">
import { mapState, mapGetters } from 'vuex'
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
    ...mapState(['areas', 'columns', 'rows', 'selectedAreaMap']),
    ...mapGetters(['flattenAreas', 'isCombinable', 'uniqueAreaKeys']),
    html() {
      return `<div class="container">
  ${this.uniqueAreaKeys.map(area => `<div class="${area}">${area}</div>`).join('\n  ')}
</div>`
    },
    cssGrid() {
      return `.container {
  display: grid;
  grid-template-areas: ${this.areas.map(area => `"${area.join(' ')}"`).join('\n  ')};
  grid-template-columns: ${this.columns.join(' ')};
  grid-template-rows: ${this.rows.join(' ')};
}
.container > div {
  border: 1px dashed #888;
}

`
    },
    cssAreas() {
      return this.uniqueAreaKeys
        .map(
          area => `.${area} {
  grid-area: ${area};
}`
        )
        .join('\n')
    }
  }
}
</script>

<style scoped>
.container {
  display: grid;
  grid-template-rows: 70% 30%;
}

.code {
  width: 100%;
  height: 80%;
}

</style>
