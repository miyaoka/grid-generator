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
      <div>
        Presets:
        <button @click="setLayout(holygrailLayout)">holyGrail</button>
        <button @click="setLayout(listLayout)">articleList</button>
      </div>
      <div>
        <button @click="openModal">Manually save/load</button>
        <transition name="modal">
          <div
            class="modal"
            ref="modal"
            v-if="showModal"
            @click.self="closeModal"
          >
            <div class="save-load">
              <h3>Current Layout Data</h3>
              <textarea
                :value="layoutText"
                rows="10"
                ref="layoutText"
                class="layout-text"
              ></textarea>
              <button @click="loadLayout">Load</button>
            </div>
          </div>
        </transition>
      </div>
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
      showModal: false,
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
    ...mapGetters(['flattenAreas', 'isCombinable', 'uniqueAreaKeys', 'currentLayout']),
    layoutText() {
      return JSON.stringify(this.currentLayout)
    },
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
    ...mapMutations(['setLayout']),
    openModal() {
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
    },
    loadLayout() {
      this.setLayout(JSON.parse(this.$refs.layoutText.value))
      this.closeModal()
    }
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

.modal {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 100;
  transition: 0.2s ease-out;

  .save-load {
    background: #fff;
    position: absolute;
    top: 25%;
    right: 25%;
    left: 25%;
    bottom: 25%;
    padding: 10px;

    .layout-text {
      width: 100%;
      display: block;
    }
  }
}
.modal-enter-active,
.modal-leave-active {
  transition: 0.3s ease-out;
}
.modal-enter,
.modal-leave-to {
  opacity: 0;
}
</style>
