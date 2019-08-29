<template>
  <div class="el-select-search-wrap" v-clickout="handleClose" v-bind="$attrs">
    <div class="el-input el-input--suffix" @click.stop="toggleMenu">
      <input
        class="el-input__inner dropdown"
        v-model="checkValues"
        disabled
        placeholder="请选择"
        suffix-icon="el-icon-arrow-down"
      />
      <span class="el-input__suffix">
        <span class="el-input__suffix-inner">
          <i
            :class="[
              'el-input__icon',
              visible ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
            ]"
          ></i>
        </span>
      </span>
    </div>
    <div class="select-container" v-show="visible">
      <el-input
        v-model.trim="filterText"
        clearable
        placeholder="请输入"
        prefix-icon="el-icon-search"
      />
      <div class="seletor-options">
        <div class="selector-item">
          <el-checkbox v-model="checkAll" @change="handleSelectAll"
            >全选</el-checkbox
          >
        </div>

        <el-checkbox-group
          v-model="checkOptionsValue"
          @change="handleSelectChange"
        >
          <el-checkbox
            v-for="opt in filterList(options)"
            :key="opt[optionProps['value']]"
            :label="opt[optionProps['value']]"
            >{{ opt[optionProps['label']] }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
  </div>
</template>

<script>
import Clickout from './clickout'
export default {
  name: 'el-select-search',
  data() {
    return {
      visible: false, //status of select panel, true => expand, false => collapse
      checkOptionsValue: [],
      filterText: ''
    }
  },
  directives: {Clickout},
  props: {
    options: {
      type: Array,
      default: function() {
        return []
      }
    },
    value: {
      type: Array,
      default: []
    },
    optionKeys: {
      type: Array,
      required: true,
      default: function() {
        return ['label', 'value']
      }
    }
  },
  mounted() {
    this.checkOptionsValue = this.value
  },
  methods: {
    toggleMenu() {
      this.visible = !this.visible
    },
    handleSelectAll(val) {
      let value = val ? this.filterList(this.options) : []
      const checkOptionsValue = value.map(
        item => item[this.optionProps['value']]
      )

      this.checkOptionsValue = val
        ? Array.from(new Set(this.checkOptionsValue.concat(checkOptionsValue)))
        : []

      this.$emit('input', this.checkOptionsValue)
    },
    handleSelectChange(val) {
      this.$emit('input', this.checkOptionsValue)
    },
    filterList(data) {
      if (!this.filterText) {
        return data
      }

      //支持模糊搜索和多个属性精确查找
      const filterList = this.filterText.replace(/\s+|,/g, ',').split(',')

      return data.filter(item => {
        if (
          filterList.includes(item[this.optionProps['value']]) ||
          item[this.optionProps['label']].indexOf(this.filterText) >= 0
        ) {
          return true
        }

        return false
      })
    },
    // 关闭下拉框函数
    handleClose() {
      this.visible = false
    }
  },
  computed: {
    optionProps() {
      const [label, value] = this.optionKeys

      return {label, value}
    },
    checkValues() {
      let result = this.options.reduce((cur, prev) => {
        const idx = this.checkOptionsValue.indexOf(
          prev[this.optionProps['value']]
        )

        if (idx > -1) {
          cur.splice(idx, 0, prev[this.optionProps['label']])
        }
        return cur
      }, [])

      return result.join(',')
    },
    checkAll: {
      get() {
        const filterList = this.filterList(this.options)

        let result = filterList.reduce((cur, prev) => {
          cur.push(
            this.checkOptionsValue.includes(prev[this.optionProps['value']])
          )
          return cur
        }, [])

        return result.length ? result.every(Boolean) : false
      },
      set(bool) {
        const filterList = this.filterList(this.options)
        const checkedValue = filterList.reduce((cur, prev) => {
          cur.push(prev[this.optionProps['value']])
          return cur
        }, [])

        bool ? (this.checkOptionsValue = checkedValue) : []
      }
    }
  }
}
</script>

<style lang="less">
.el-select-search-wrap {
  .dropdown {
    cursor: pointer;
  }

  .select-container {
    position: absolute;
    z-index: 1001;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    margin: 5px 0;
    padding: 10px;
    box-shadow: 1px 1px 1px #ccc;
    transform-origin: center top;
    max-width: 240px;

    .seletor-options {
      text-align: left;
    }
  }

  .el-checkbox {
    padding-top: 10px;
  }

  .el-input__icon {
    cursor: pointer;
  }

  .el-checkbox-group {
    max-height: 200px;

    .el-checkbox {
      display: block;
    }
  }
}
</style>
