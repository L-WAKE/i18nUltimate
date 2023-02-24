const shineUpon = require('./locales/en-US.json')
const externalFiles = require('./external/externalFiles')
const globalData = {
  shineUpon: shineUpon,//映射文件 加入则不会重复翻译映射文件中存在的值
  appid: '',//百度翻译的appid
  key: '',//百度翻译的key  申请网址 https://fanyi-api.baidu.com/manage/developer
  delay: 1200,
  to: 'th',//中zh,俄ru,日jp,英en,荷兰nl,泰国th
  isExternalFiles: true,//是否为外部翻译文件 针对所罗门项目
  externalFiles: externalFiles,//被翻译的文件
}

module.exports = {
  globalData,
}
