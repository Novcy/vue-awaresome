# 一个基于element-ui的多选下拉
### 特性
- 支持列表选项筛选
- 多选
  

### 参数说明
|属性|是否必传|说明|
|:--|:--|:--|
|list|是|需要渲染的下拉列表,子选项必须传label|
|showFilter|否|支持列表选项筛选|

### 做此组件的一些总结
做此组件的初衷是：element-ui的下拉不支持筛选，并且选择多个选项会撑高高度，就算使用`collapse-tags`也不是客户需要的，所以做次插件，初步功能不太完善，还有太多限制。总体来说，有一些收获：

- 过滤功能使用依赖输入框的`filterText`字段。最开始的使用`filter`方法过滤返回新数组，但是下一次过滤的初始数组是上一次的结果，应该每次过滤的都是通过`props`传递的数组。新思路是：每次传入的通过初始化的数组，通过输入框字段过滤
  ```javascript
  //list为初始化的数组，这样每次都是过滤初始数组
    filterList(list) {
        const filterText = this.filterText
        
        return list.filter(item => {
            if(item.label.indexOf(filterText) !== -1) {
                return item
            }
        })
    }
  ```
  - 组件内部通过`this.$emit("input",value)`传递给组件的`v-model`

### 待完善的功能
1. 组件内部依赖list的label字段