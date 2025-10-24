<!-- console.log() -->
<template>
  <view class="self">
    uid细节
    获取账号信息
    1 缓存2pinia3联表查询4.where(` user_id==$cloudEnv_uid)
    获取当前用户信息(uid, role, 权限,token过期时间),可以在html模板使用
    console.log(uniCloud.getCurrentUserInfo())
    登录方式 /uni_modules/uin-pages/config.json
    路由跳转(必须登录才能打开页面) pages.json unIdRouter
    密码强度passwordStrength改2个前端uni_modules/uin-pages/config.json 云端config.json
  </view>
</template>

<script setup>
  import {
    ref,
    computed
  } from "vue";
</script>

<style lang="scss" scoped>

</style>