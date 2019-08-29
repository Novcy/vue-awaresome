<template>
  <div>
    <el-select-search
      :options="options"
      :optionKeys="optionKeys"
      v-model="checkedval"
    ></el-select-search>
  </div>
</template>

<script>
import ElSelectSearch from '../src/el-select-search.vue'
export default {
  name: 'my-select',
  data() {
    return {
      checkedval: [1101],
      options: [
        {label: '衬衫', val: 1101},
        {label: '裤子', val: 1102},
        {label: '内衣', val: 1103},
        {label: '帽子', value: 1104}
      ],
      optionKeys: ['label', 'val']
    }
  },
  components: {
    'el-select-search': ElSelectSearch
  }
}
</script>
