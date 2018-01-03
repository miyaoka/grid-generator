import Vue from 'vue'

export const state = () => ({
  areas: [
    ['header', 'header', 'header'],
    ['left', 'main', 'right'],
    ['footer', 'footer', 'footer']
  ],
  columns: ['120px', '4fr', '1fr'],
  rows: ['160px', '1fr', '80px'],
  selectedAreas: {}
})
export const getters = {}
export const mutations = {
  areas(state, payload) {
    state.areas = payload
  },
  columns(state, payload) {
    state.columns = payload
  },
  rows(state, payload) {
    state.rows = payload
  },
  pushColumn(state) {
    state.columns.push('1fr')
    const c = state.columns.length - 1
    state.areas = state.areas.map((area, r) => [...area, `a-${r}-${c}`])
  },
  popColumn(state) {
    state.columns.pop()
    state.areas = state.areas.map((area) => area.slice(0, -1))
  },
  pushRow(state) {
    state.rows.push('1fr')
    const r = state.rows.length - 1
    state.areas.push(Array.from(new Array(state.columns.length).keys()).map((c) => `a-${r}-${c}`))
  },
  popRow(state) {
    state.rows.pop()
    state.areas = state.areas.slice(0, -1)
  },
  renameArea(state, { oldValue, newValue }) {
    state.areas = state.areas.map((area) => area.map((a) => (a === oldValue ? newValue : a)))
  },
  updateColumn(state, { index, value }) {
    state.columns.splice(index, 1, value)
  },
  updateRow(state, { index, value }) {
    state.rows.splice(index, 1, value)
  },
  breakArea(state, { area }) {
    let i = 0
    console.log('break', area)
    state.areas = state.areas.map((row) => row.map((col) => (col === area ? `${col}-${i++}` : col)))
  },
  toggleArea(state, { area }) {
    console.log(area)
    if (state.selectedAreas[area]) {
      Vue.delete(state.selectedAreas, [area])
    } else {
      state.selectedAreas = {
        ...state.selectedAreas,
        [area]: true
      }
    }
  }
}
