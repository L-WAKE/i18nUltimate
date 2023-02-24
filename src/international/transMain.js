const { translate } = require('./translate')
const ProgressBar = require('progress')
const fs = require('fs');
const { globalData } = require('./config')

// 节流函数
const throttle = (function (delay = 1500) {
  const wait = []
  let canCall = true
  return function throttle(callback) {
    if (!canCall) {
      if (callback) wait.push(callback)
      return
    }
    callback()
    canCall = false
    setTimeout(() => {
      canCall = true
      if (wait.length) {
        throttle(wait.shift())
      }
    }, delay)
  }
}(globalData.delay))

//首字母大写
function titleCase(item) {
  let list = String(item).split(' ')
  list = list.map((item, index) => {
    if (index > 0) {
      return item.toLowerCase()
    } else {
      return item.charAt(0).toUpperCase() + item.substr(1, item.length)
    }
  })
  let hand = list.join(' ')
  return hand.trim()
}

//针对此项目配置的翻译脚本
function generateI18nData() {
  let { to, shineUpon, isExternalFiles } = globalData
  let i18nData = {}
  if (isExternalFiles) {//针对外部文件进行处理
    return new Promise(resolve => resolve(false))
  }
  let i18nMap = fs.readFileSync('./locales/zh-CN.json', 'utf-8')
  if (!i18nMap.toString() || i18nMap.toString().length <= 3) {
    return new Promise(resolve => resolve(false))
  }
  i18nMap = JSON.parse(i18nMap.toString())
  let shineUponKeys = shineUpon && Object.keys(shineUpon) || []
  let messages = Object.keys(i18nMap) || []
  let totalBar = messages.length - shineUponKeys.length

  console.log('i18nMap', i18nMap)
  const bar = new ProgressBar('translating [:bar] :percent :etas', { total: totalBar })
  return new Promise(resolve => {
    if (!messages.length) resolve(i18nData)
    for (let i = 0; i < messages.length; i++) {
      if (shineUponKeys && shineUponKeys.length > 0) {
        let isHave = shineUponKeys.find(v => v == messages[i])
        if (isHave) continue //如果已经存在key值,则不做翻译处理
      }
      const key = i18nMap[messages[i]]
      throttle(() => {
        translate(messages[i]).then(res => {
          if (res) {
            //如果是英文则对首字母大写处理
            i18nData[key] = to == 'en' ? titleCase(res[0].dst) : res[0].dst
          } else {
            i18nData[key] = null
          }
          bar.tick()
          if (i == messages.length - 1) {
            resolve(i18nData)
          }
        })
      })
    }
  })
}

//针对外部文件翻译脚本
function externalFilesHanld() {
  let { to, isExternalFiles, externalFiles } = globalData
  let i18nData = {}
  if (!isExternalFiles) {
    return new Promise(resolve => resolve(false))
  }
  let i18nMap = externalFiles
  if (!i18nMap.toString() || JSON.stringify(i18nMap).length <= 2) {
    return new Promise(resolve => resolve(false))
  }
  let messages = Object.keys(i18nMap) || []
  let totalBar = messages.length

  console.log('i18nMap', i18nMap)
  const bar = new ProgressBar('translating [:bar] :percent :etas', { total: totalBar })
  return new Promise(resolve => {
    if (!messages.length) resolve(i18nData)
    for (let i = 0; i < messages.length; i++) {
      const key = messages[i]
      throttle(() => {
        translate(i18nMap[messages[i]]).then(res => {
          if (res) {
            //如果是英文则对首字母大写处理
            i18nData[key] = to == 'en' ? titleCase(res[0].dst) : res[0].dst
          } else {
            i18nData[key] = null
          }
          bar.tick()
          if (i == messages.length - 1) {
            resolve(i18nData)
          }
        })
      })
    }
  })
}
//合并已有的中文
function mergeFile() {
  if (globalData.isExternalFiles) return
  let nowData = require('./locales/zh-CN.json')
  let getData = require('../../locales/zh-CN.json')
  const concatData = { ...nowData, ...getData }
  fs.writeFileSync('./locales/zh-CN.json', JSON.stringify(concatData))
}
mergeFile()

// externalFilesHanld()
//翻译外部文件的方法-定制化
externalFilesHanld().then(data => {
  if (!data) return
  fs.writeFile('./external/externalFilesData.json', JSON.stringify(data),
    'utf-8',
    err => {
      if (err) throw err
    },
  )
})

// generateI18nData()
//调用翻译方法
generateI18nData().then(data => {
  if (!data) return
  fs.writeFile('./writeFileSync.json', JSON.stringify(data),
    'utf-8',
    err => {
      if (err) throw err
    },
  )
})
