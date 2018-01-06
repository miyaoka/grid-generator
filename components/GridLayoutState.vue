<template>
  <div class="container">
    <header class="header">
      <h1>CSS Grid Layout generator</h1>
    </header>
    <section class="css">
      <h3>CSS</h3>
      <textarea
        :value="cssGrid + cssAreas"
        class="code"
        readonly
      ></textarea>
    </section>
    <section class="html">
      <h3>HTML</h3>
      <textarea
        :value="html"
        class="code"
        readonly
      ></textarea>
    </section>
    <section class="menu">
      <h3>Layout</h3>

      grid size
      <div>
        w:
        <input
          :value="gridWidth"
          @input="setGridWidth($event.target.value)"
        >
      </div>
      <div>
        h:
        <input
          :value="gridHeight"
          @input="setGridHeight($event.target.value)"
        >
      </div>


      <div>
        Presets:
        <button @click="setLayout(holygrailLayout)">holyGrail</button>
        <button @click="setLayout(listLayout)">articleList</button>
      </div>
      <div>
        <button @click="openModal">Import / Export</button>
      </div>

    </section>


    <transition name="modal">
      <div
        class="modal"
        ref="modal"
        v-if="showModal"
        @click.self="closeModal"
      >
        <div class="import-export">
          <h3>Import / Export</h3>
          <h4>Current layout data</h4>
          <textarea
            :value="layoutText"
            rows="5"
            ref="layoutText"
            class="layout-text"
          ></textarea>
          <h4>
            To export data
          </h4>
          <p>
            Copy current layout data above, and keep it by yourself.
          </p>

          <h4>
            To import data
          </h4>
          <p>
            Override current layout data. then click <button @click="loadLayout">Import</button>
          </p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { mapState, mapGetters, mapMutations } from 'vuex'
import { holygrailLayout, listLayout } from '~/components/Layouts'

export default {
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
      holygrailLayout: holygrailLayout,
      listLayout: listLayout
    }
  },
  computed: {
    ...mapState(['areas', 'columns', 'rows', 'selectedAreaMap', 'gridWidth', 'gridHeight']),
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
  width: ${this.gridWidth};
  height: ${this.gridHeight};
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
    ...mapMutations(['setLayout', 'setGridWidth', 'setGridHeight']),
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
  grid-template-areas: 'header' 'menu' 'css' 'html';
  grid-template-rows: 20px 150px 2fr 1fr;
  grid-gap: 10px;
}
.header {
  grid-area: header;
  h1 {
    font-size: 16px;
    font-weight: normal;
  }
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

  .import-export {
    background: #fff;
    position: absolute;
    top: 25%;
    right: 25%;
    left: 25%;
    bottom: 25%;
    padding: 20px;
    border-radius: 10px;

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
