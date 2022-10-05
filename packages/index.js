// 导入组件
import Progress from './Progress'

// 组件列表
const components = [
  Progress
]

// 1、用vue.use进行组件注册时候，会首先判断组件的installed属性是否为true,
//为true说明此组件已经注册过,如果没有注册的话,在use注册的同时,
//会给组件添加一个属性installed：true
// 2、定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，那么所有的组件都会被注册
const install = Vue => {
  // 判断是否安装
  if (install.installed) return
  // 遍历注册全局组件
  components.forEach(component => Vue.component(component.name, component))
}

// 判断是否是直接引入文件  使用cdn引入时
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
    // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
    install,
    // 以下是具体的组件列表
    Progress
}