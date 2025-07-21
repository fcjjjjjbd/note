<!-- 操作弹窗 console.log() -->
<template>
  <view class="self">
    <!-- 显示模态弹窗 -->
    const removeclick = async () => {
    let res1 = await uni.showModal({
    title: '删除',
    content: '是否删除评论',
    });
    if(!res1.confirm) return;
    <!-- 提示弹窗 -->
    uni.showToast({
    title: '标题',
    duration: 2000
    });

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