<template>
  <div class="container">
    <div class="css">
      <h3>CSS</h3>
      <textarea
        :value="cssGrid + cssAreas"
        class="code"
        readonly
        ></textarea>
    </div>
    <div class="html">
      <h3>HTML</h3>
      <textarea
        :value="html"
        class="code"
        readonly
        ></textarea>
    </div>
    <div class="menu">
      <h3>Layout</h3>
      <button @click="setLayout(holygrailLayout)">holyGrail</button>
      <button @click="setLayout(listLayout)">articleList</button>
    </div>
  </div>
</template>

<script lang="ts">
import { mapState, mapGetters, mapMutations } from 'vuex'
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
  data() {
    return {
      holygrailLayout: {
        areas: [
          ['header', 'header', 'header'],
          ['left', 'main', 'right'],
          ['footer', 'footer', 'footer']
        ],
        columns: ['120px', '4fr', '1fr'],
        rows: ['160px', '1fr', '80px']
      },
      listLayout: {
        areas: [
          ['header', 'header', 'header'],
          ['side', 'article-0', 'article-1'],
          ['side', 'article-2', 'article-3'],
          ['side', 'article-4', 'article-5'],
          ['side', 'article-6', 'article-7'],
          ['footer', 'footer', 'footer']
        ],
        columns: ['120px', '1fr', '1fr'],
        rows: ['2fr', '1fr', '1fr', '1fr', '1fr', '60px']
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
  },
  methods: {
    ...mapMutations(['setLayout'])
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-areas: 'css' 'html' 'menu';
  grid-template-rows: 2fr 1fr 150px;
}
.css {
  grid-area: css;
}
.html {
  grid-area: html;
}
.menu {
  grid-area: menu;
}

.code {
  width: 100%;
  height: 80%;
}
</style>
