pinia用法 鸡汤tv 5.5
main.js全局引入import * as Pinia from 'pinia';
app.use(Pinia.createPinia());
return {
  Pinia
}
pinia 数据存储仓库 /
  1 多页面使用用户信息不用requst, 读取统一模块共享的管理仓库 2 多组件同时使用一个响应式数据;

pinia如何使用

import {
  useUserStore
} from "@/stores/user.js";
const userStore = ref(useUserStore());
console.log(userStore.value.userInfo)
// 使用 storeToRefs 解构pinia值 state 和 getters确保它们仍然是响应式的
const {
  name,
  age
} = storeToRefs(userStore);