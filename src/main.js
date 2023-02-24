// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'
// 从语言包文件中导入语言包对象
import zh from '../src/international/locales/zh-CN.json'
import en from '../src/international/locales/en-US.json'
import jp from '../src/international/locales/jp-JP.json'
Vue.use(VueI18n)
Vue.config.productionTip = false
const messages = {
  zh: {
    ...zh
  },
  en: {
    ...en
  },
  jp: {
    ...jp
  },
}

const i18n = new VueI18n({
  locale: 'jp', // 语言标识
  messages
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  components: { App },
  template: '<App/>'
})
