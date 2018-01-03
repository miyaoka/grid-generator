import Vue from 'vue'

const getCoords = (col, i) => {
  return [Math.floor(i % col), Math.floor(i / col)]
}
export const state = () => ({
  areas: [
    ['header', 'header', 'header'],
    ['left', 'main', 'right'],
    ['footer', 'footer', 'footer']
  ],
  columns: ['120px', '4fr', '1fr'],
  rows: ['160px', '1fr', '80px'],
  selectedAreaMap: {}
})
export const getters = {
  selectedAreaKeys: (state) => {
    return Object.keys(state.selectedAreaMap)
  },
  flattenAreas: (state) => {
    return state.areas.reduce((prev, curr) => [...prev, ...curr])
  },
  isCombinable: (state, getters) => {
    if (getters.selectedAreaKeys.length < 2) return false

    const c = state.columns.length
    const minCoords = getters.selectedAreaKeys.map((selectedArea) =>
      getCoords(c, getters.flattenAreas.indexOf(selectedArea))
    )
    const maxCoords = getters.selectedAreaKeys.map((selectedArea) =>
      getCoords(c, getters.flattenAreas.lastIndexOf(selectedArea))
    )
    const min = minCoords.reduce((prev, curr) => [
      Math.min(prev[0], curr[0]),
      Math.min(prev[1], curr[1])
    ])
    const max = maxCoords.reduce((prev, curr) => [
      Math.max(prev[0], curr[0]),
      Math.max(prev[1], curr[1])
    ])

    for (let row = min[1]; row <= max[1]; row++) {
      for (let col = min[0]; col <= max[0]; col++) {
        if (!state.selectedAreaMap[state.areas[row][col]]) return false
      }
    }
    return true
  }
}
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
    state.areas = state.areas.map((row) => row.map((col) => (col === area ? `${col}-${i++}` : col)))
    Vue.delete(state.selectedAreaMap, [area])
  },
  toggleArea(state, { area }) {
    if (state.selectedAreaMap[area]) {
      Vue.delete(state.selectedAreaMap, [area])
    } else {
      state.selectedAreaMap = {
        ...state.selectedAreaMap,
        [area]: true
      }
    }
  },
  combineArea(state, { area }) {
    state.areas = state.areas.map((row) =>
      row.map((col) => (state.selectedAreaMap[col] ? area : col))
    )
    state.selectedAreaMap = { [area]: true }
  }
}
