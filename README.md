# el-select-search
[![Build Status](https://travis-ci.org/jealxy/el-select-search.svg?branch=master)](https://travis-ci.org/jealxy/el-select-search)
> A select search component of Vue

## description
> The component is based on element-ui.it has functions,such as: filter search,select all etc.

## usage
```
yarn add @cuzvin/select or
npm install @cuzvin/select
```

```Vue
import ElSelectSearch  from 'ElSelectSearch'
<el-select-search
    :options="options
    :optionKeys="optionKeys"
    v-model="selectValue"
></el-select-search>

data: () => ({
    options: [
        {name: '衬衫', value: 1101},
        {name: '裤子', value: 1102}
    ],
    // name指定下拉选的label, value为下拉选择的绑定值
    optionKeys: ['name', 'value'],
    selectValue: []     //选中的值
})
```
属性|类型|是否必须|默认值|说明
--|:--:|:--:|:--:|--
options|Array|true|[]|下拉列表的展示值
optionKeys|Array|false|['label','value']|下拉列表子选项展示和用于数据的展示的key名,对应options,不传就是默认值

## Reference
- [@vue/test-utils](https://vue-test-utils.vuejs.org/)
- [学会vue单元测试](https://zhuanlan.zhihu.com/p/48758013)
