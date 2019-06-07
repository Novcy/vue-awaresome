<template>
    <div>
        <b>多选测试</b>
        <div class="my-selector">
            <multiple-selector :list="cities"></multiple-selector>
        </div>
    </div>
</template>

// <script>
import multipleSelector from '../src/multiple-selector.vue'
export default {
    name: 'my-selctor',
    components: {
        multipleSelector
    },
    data() {
        return {
            cities: [{
          value: 'Beijing',
          label: '北京新浪科技有限公司'
        }, {
          value: 'Shanghai',
          label: '上海携程有限公司'
        }, {
          value: 'Nanjing',
          label: '南京途牛旅游有限公司'
        }, {
          value: 'Chengdu',
          label: '成都'
        }, {
          value: 'Shenzhen',
          label: '深圳腾讯科技有限公司'
        }, {
          value: 'Guangzhou',
          label: '广州滴普科技有限公司'
        }],
        }
    },
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
}
    .my-selector {
        width: 120px
    }
</style>