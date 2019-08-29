import ElSelectSearch from './el-select-search.vue'

export function install(Vue) {
  if (install.installed) return
  install.installed = true
  Vue.component('ElSelectSearch', ElSelectSearch)
}

const myPlugin = {
  install
}

let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(myPlugin)
}

export default ElSelectSearch
