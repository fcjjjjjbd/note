<!-- console.log() -->
<script setup>
  pinia页面如何使用
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
</script>
<template>
  <view class="sfsh">
    pinia用法 鸡汤tv 5.5
    main.js全局引入Pinia
    npm i pinia-plugin-persistedstate
    h5,小程序文档pinia持久化存储
    https://blog.csdn.net/qq_18798149/article/details/149812599?sharetype=blog&shareId=149812599&sharerefer=APP&sharesource=2301_76170560&sharefrom=link

    1 读取统一模块共享数据的管理仓库 2 多组件同时使用一个响应式数据;
  </view>
</template>



<style lang="scss" scoped>
  .sfsh {}
</style>