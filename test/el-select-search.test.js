import {mount} from '@vue/test-utils'
import Component from '../src/el-select-search.vue'

const options = [
  {name: '上衣', value: 1001},
  {name: '裤子', value: 1002},
  {name: '帽子', value: 1003},
  {name: '围巾', value: 1004}
]

const optionKeys = ['name', 'value']

describe('select-search component', () => {
  const wrapper = mount(Component, {
    propsData: {
      options,
      optionKeys,
      value: []
    },
    stubs: {
      'el-input': true,
      'el-checkbox': true,
      'el-checkbox-group': true
    }
  })
  test('should render select search component', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  //checkbox checkall
  test('check all should be false when init', () => {
    expect(wrapper.vm.checkAll).toBe(false)
  })

  test('text of check all', () => {
    expect(wrapper.find('.selector-item').text()).toBe('全选')
  })

  //checked values
  test('checked value is empty', () => {
    expect(wrapper.vm.checkValues).toBe('')
  })

  test("options's length should be 4", () => {
    expect(wrapper.vm.options.length).toEqual(4)
  })

  test('should have correct component name', () => {
    expect(wrapper.vm.$options.name).toBe('el-select-search')
  })

  test('should checkAll be true', () => {
    wrapper.vm.handleSelectAll(true)
    expect(wrapper.vm.checkAll).toBe(true)
  })
  test('should show 4 checked item when checkAll ', () => {
    wrapper.vm.handleSelectAll(true)
    expect(wrapper.vm.checkOptionsValue.length).toEqual(4)
  })

  test('should checked one when init', () => {
    wrapper.setProps({options: [{name: '上衣', value: 1001}]})
    expect(wrapper.vm.checkValues).toEqual('上衣')
  })
})
