<template>
    <div class="el-multiple-selector">
        <div class="selected-input el-input" @click="openOptionBox">
            <i :class="[iconType,{'icon-rotate-up':isShowOptionBox}]"></i>
            <input type="text"
                v-model="selectedText"
                readonly="true"
                class="el-input__inner"
            >
        </div>
        <el-collapse-transition>
            <div class="selector-container" v-if="isShowOptionBox">
                <div class="filter-input" v-if="showFilter">
                    <el-input v-model.trim="filterText" prefix-icon="el-icon-search"></el-input>
                </div>
                <div class="selector-options">
                    <ul>
                        <li 
                            v-for="(item,idx) in filterList(optionList)"
                            :key="idx"
                        >
                            <el-checkbox v-model="item.isSelected">{{item.label}}</el-checkbox>
                        </li>
                    </ul>
                </div>
                <div class="selector-footer">
                    <el-button @click="confirm" type="primary">确定</el-button>
                    <el-button @click="reset">取消</el-button>
                </div>
            </div>
        </el-collapse-transition>
    </div>
</template>

<script>

export default {
    name: 'multiple-selector',
    data() {
        return {
            filterText: '',
            selectedText: '',
            optionList: [],
            iconType: 'el-input__icon el-icon-arrow-down',
            isShowOptionBox: false
        }
    },
    props: {
        list: {
            type: Array
        },
        showFilter: {
            type: Boolean,
            default: true
        }
    },
    mounted() {
        this.initData()
    },
    methods: {
        initData() {
            this.optionList = this.list.map(item => Object.assign({},item,{isSelected: false}))
        },
        filterList(list) {
            const filterText = this.filterText
            
            return list.filter(item => {
                if(item.label.indexOf(filterText) !== -1) {
                    return item
                }
            })
        },
        confirm() {
            const selectedValue = this.optionList
                .filter(item => item.isSelected)
                
            this.$emit('input', selectedValue)

            this.selectedText = selectedValue
                .map(item => item.label)
                .join(",")

            this.isShowOptionBox = false
            
        },
        //还原配置
        reset() {
            this.initData()
            this.filterText = ''
            this.selectedText = ''
            this.isShowOptionBox = false
        },
        openOptionBox() {
            this.isShowOptionBox = !this.isShowOptionBox
        }
    },
}
</script>

<style lang="less">
.el-multiple-selector {
    position: relative;
    li {
        list-style: none;
    }

    .selected-input {
        cursor: pointer;

        .el-input__inner {
            cursor: pointer;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #707070;
            border-color: #dcdfe6;
        }

        .el-input__icon {
            position: absolute;
            width: 35px;
            height: 100%;
            right: 0;
            top: 0;
            text-align: center;
            color: #bfcbd9;
            transition: all 0.3s;
        }

        .icon-rotate-up {
            transform: rotate(180deg);
        }
    }
    .selector-container {
        position: absolute;
        z-index: 1000;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        padding: 10px;
        border: 1px solid #ebeef5;
        margin-top: 10px;
        border-radius: 4px;
        transform-origin: right center;
        min-width: 160px;

        .selector-options {
            padding: 10px;
            li {
                margin-bottom: 10px;
            }
        }

        .selector-footer {
            display: flex;
            justify-content: center;
            padding-bottom: 10px;
        }
    }
}
</style>
