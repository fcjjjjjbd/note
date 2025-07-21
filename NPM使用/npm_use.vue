<!-- console.log()  <view class=""> </view> for()行动做到 错1改1 转恶0为善1 -->
npm用法
<template>
  <view class="Layout">
    npm i express  下载模块名
    npm uninstall express 卸载模块名
npm install -g pnpm
pnpm init
    dayjs日期格式化
    npm install dayjs
    官网地址 https://day.js.org/zh-CN/
    文档地址https://blog.csdn.net/qq_18798149/article/details/142902679
    视频地址https://www.bilibili.com/video/BV12hmFYBEvR/?spm_id_from=333.1387.upload.video_card.click&vd_source=ffa92565a81a5421ff9149517bb971d5
    import dayjs from "dayjs";
    dayjs().format("YYYY-MM-DD HH:mm:ss") //2024-10-13
    dayjs(1728509168538).format("YYYY年MM月DD HH时mm分ss秒") //2024年10月10


    收藏防抖重复触发tv鸡汤8.7
    npm i lodash.debounce
    _.debounce(func, [wait = 0], [options = ])
    const likeclick = debounce(likeFn, 1000, {
    'leading': true,
    'trailing': false
    })
    likeFn调用函数

    admin富文本功能wangeditor tv: admin3.10
    npm i wangeditor --save

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