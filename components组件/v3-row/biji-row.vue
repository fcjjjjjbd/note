<!-- 组件笔记 -->
<template>
  <view class="home" @click="goEdit">
    <navigator url="/pages/classlist/classlist" class="box" v-if="!isMore">
      <image class="pic" :src=" item.picurl " mode="aspectFill"></image>
    </navigator>
    <!-- 防止click冒泡 -->
    <view class="right" @click.stop="goDetail">
      <uni-icons type="eye" size="18" color="#999"></uni-icons>
      <text>详情</text>
    </view>
  </view>
</template>

<script setup>
  import {} from "@/utils/common.js"
  // 接收父页面数据,函数里如何使用 props.item._id  html{{item._id}}
  const props = defineProps({
    comments: {
      type: Object,
      default: () => ({})
    },
    item: {
      type: Object,
      default () {
        return {
          name: "默认名称",
          picurl: "../../common/images/classify1.jpg",
          updateTime: Date.now() - 1000 * 60 * 60 * 5
        }
      }
    },

    isMore: {
      type: Boolean,
      default: false
    },
    tabIndex: {
      type: Number,
      default: function() {
        return 0
      }
    }
  })
  // 组件向外暴露函数,数据
  defineExpose({
    message,
    sayHello
  });
</script>

<style lang="scss">