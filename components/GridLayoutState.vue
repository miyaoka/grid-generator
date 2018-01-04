<template>
  <div class="container">
    <pre class="code"><code>// css
{{cssGrid}}
{{cssAreas}}

// html
{{html}}</code></pre>
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
      ${this.uniqueAreaKeys.map(area => `<div class="${area}">${area}</div>`).join('\n\t')}
</div>`
    },
    cssGrid() {
      return `.container {
  display: grid;
  grid-template-areas: ${this.areas.map(area => `"${area.join(' ')}"`).join('\n\t\t')};
  grid-template-columns: ${this.columns.join(' ')};
  grid-template-rows: ${this.rows.join(' ')};
}`
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

<style lang="scss" scoped>
.container {
}
.code {
  font-size: 12px;
  overflow: scroll;
  padding: 10px;
  height: 100%;
}
</style>
