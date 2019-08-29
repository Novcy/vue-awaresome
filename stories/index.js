import Vue from 'vue';
import { storiesOf } from "@storybook/vue";
import mySelect from './select.vue';

storiesOf('select', module)
    .add('下拉多选', () => mySelect)
