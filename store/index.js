import Vue from 'vue'
import Hashids from 'hashids'

const hashids = new Hashids()
const getId = () => {
  return 'a-' + hashids.encode(new Date().valueOf()).slice(0, 5)
}
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
  currentLayout: (state) => {
    return {
      areas: state.areas,
      columns: state.columns,
      rows: state.rows
    }
  },
  selectedAreaKeys: (state) => {
    return Object.keys(state.selectedAreaMap)
  },
  flattenAreas: (state) => {
    return state.areas.reduce((prev, curr) => [...prev, ...curr])
  },
  areaCount: (state, getters) => {
    return getters.flattenAreas.reduce((map, area) => {
      map[area] = map[area] ? map[area] + 1 : 1
      return map
    }, {})
  },
  uniqueAreaKeys: (state, getters) => {
    return Object.keys(getters.areaCount)
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
  setLayout(state, payload) {
    const p = JSON.parse(JSON.stringify(payload))
    state.areas = p.areas
    state.columns = p.columns
    state.rows = p.rows
    state.selectedAreaMap = {}
  },
  areas(state, payload) {
    state.areas = payload
  },
  columns(state, payload) {
    state.columns = payload
  },
  rows(state, payload) {
    state.rows = payload
  },
  insertColumn(state, { index }) {
    const targetIndex = index + 1
    const areaId = getId()

    state.columns.splice(targetIndex, 0, '1fr')
    state.areas = state.areas.map((area) => {
      const areaName = area[index]
      if (areaName === area[targetIndex]) {
        area = area.map((col, i) => (col === areaName ? `${col}-${i > index ? 1 : 0}` : col))
      }
      return area.splice(targetIndex, 0, areaId) && area
    })
    state.selectedAreaMap = {}
  },
  removeColumn(state, { index }) {
    state.columns.splice(index, 1)
    state.areas = state.areas.map((area) => area.splice(index, 1) && area)
    state.selectedAreaMap = {}
  },
  insertRow(state, { index }) {
    const targetIndex = index + 1
    const areaId = getId()
    const prevArea = state.areas[index]
    const nextArea = state.areas[targetIndex]

    state.rows.splice(targetIndex, 0, '1fr')

    if (prevArea && nextArea) {
      prevArea.forEach((areaName, c) => {
        if (nextArea[c] !== areaName) return

        state.areas.forEach((row, i) => {
          const col = row[c]
          row[c] = col === areaName ? `${col}-${i > index ? 1 : 0}` : col
        })
      })
    }
    state.areas.splice(
      targetIndex,
      0,
      Array.from(new Array(state.columns.length).keys()).map((c) => areaId)
    )

    state.selectedAreaMap = {}
  },
  removeRow(state, { index }) {
    state.rows.splice(index, 1)
    state.areas.splice(index, 1)
    state.selectedAreaMap = {}
  },
  renameArea(state, { oldValue, newValue }) {
    if (newValue.match(/^[\d|.]/)) return
    state.areas = state.areas.map((area) => area.map((a) => (a === oldValue ? newValue : a)))
    Vue.delete(state.selectedAreaMap, [oldValue])
  },
  updateColumn(state, { index, value }) {
    state.columns.splice(index, 1, value)
  },
  updateRow(state, { index, value }) {
    state.rows.splice(index, 1, value)
  },
  toggleSlectArea(state, { area }) {
    if (state.selectedAreaMap[area]) {
      Vue.delete(state.selectedAreaMap, [area])
    } else {
      state.selectedAreaMap = {
        ...state.selectedAreaMap,
        [area]: true
      }
    }
  },
  splitArea(state, { area }) {
    let i = 0
    state.areas = state.areas.map((row) => row.map((col) => (col === area ? `${col}-${i++}` : col)))
    state.selectedAreaMap = {}
  },
  combineArea(state, { area }) {
    state.areas = state.areas.map((row) =>
      row.map((col) => (state.selectedAreaMap[col] ? area : col))
    )
    state.selectedAreaMap = {}
  }
}
