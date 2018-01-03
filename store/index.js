export const state = () => ({
  areas: [
    ['header', 'header', 'header'],
    ['left', 'main', 'right'],
    ['footer', 'footer', 'footer']
  ],
  columns: ['120px', '4fr', '1fr'],
  rows: ['160px', '1fr', '80px']
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
  renameArea(state, { oldValue, newValue }) {
    state.areas = state.areas.map((area) => area.map((a) => (a === oldValue ? newValue : a)))
  },
  column(state, { index, value }) {
    state.columns.splice(index, 1, value)
  },
  row(state, { index, value }) {
    state.rows.splice(index, 1, value)
  },
  breakArea(state, { area }) {
    let i = 0
    console.log('break', area)
    state.areas = state.areas.map((row) => row.map((col) => (col === area ? `${col}-${i++}` : col)))
  }
}
