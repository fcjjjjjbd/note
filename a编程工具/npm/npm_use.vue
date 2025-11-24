<!-- console.log()  <view class=""> </view> for()行动做到 错1改1 转恶0为善1 -->
npm用法
<template>
  npm i express 下载模块名
  npm uninstall express 卸载模块名
  npm install -g pnpm
  pnpm init

  <view class="Layout">
    npm:
    工具类函数库xe-utils, lodash


    pinia持久化存储
    npm i pinia-plugin-persistedstate

    dayjs日期格式化
    npm install dayjs
    官网地址 https://day.js.org/zh-CN/
    文档地址https://blog.csdn.net/qq_18798149/article/details/142902679
    视频地址https://www.bilibili.com/video/BV12hmFYBEvR/?spm_id_from=333.1387.upload.video_card.click&vd_source=ffa92565a81a5421ff9149517bb971d5


    收藏防抖节流tv鸡汤8.7
    npm i lodash.debounce
    _.debounce(func, [wait = 0], [options = ])
    const likeclick = debounce(likeFn, 1000, {
    'leading': true,
    'trailing': false
    })
    async likeFn(){}

    后台富文本功能
    wangeditor tv: admin3.10
    npm i wangeditor --save

    xe-utils公共函数
  </view>
</template>

<script setup>
  import {
    ref,
    computed
  } from "vue";
</script>

<style lang="scss" scoped>
  .Layout {}
</style>