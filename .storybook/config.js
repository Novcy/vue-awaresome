import Vue from 'vue';
import { configure } from "@storybook/vue";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)

function loadStories() {
    require('../stories/index');
}

configure(loadStories, module);
