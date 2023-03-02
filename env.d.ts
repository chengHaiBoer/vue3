/// <reference types="vite/client" />

//1有的公司可能会是用define写组件，这里表明导出的是一个组件
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}
declare module '*.mjs'
