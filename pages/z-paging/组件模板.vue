<!-- 下拉刷新模板 -->
<template>
  <view class="home">
    <z-paging ref="paging" v-model="dataList" @query="queryList" :default-page-size="4" empty-view-text="无数据">
      <!-- 一开始req加载状态 -->
      <template #loading>
        <view style="padding:60rpx;">
          <uni-load-more status="loading"></uni-load-more>
        </view>
      </template>
      <template #top>

      </template>

      <view class="list">
        <view class="item" v-for="item in 5">
          <view class="">
            {{item}}
          </view>

        </view>
      </view>
    </z-paging>
  </view>
</template>

<script setup>
  import {
    showToast
  } from "@/utils/common.js";
  const db = uniCloud.database();
  const addcloubobj = uniCloud.importObject("goods-backend")

  const paging = ref(null)
  const dataList = ref([])

  // 请求数据   
  const queryList = async (pageNo, pageSize) => {
    getgoodsList(pageNo, pageSize);
  }
  const getgoodsList = async (pageNo, pageSize) => {
    let skip = (pageNo - 1) * pageSize
    try {

      console.log()
      return;
      uni.showLoading({
        mask: true
      });
      let {
        errCode,
        errMsg,
        data
      } = await tjcloubobj.getrj();
      console.log(data)
      if (errCode !== 0) return showToast({
        title: errMsg
      });
      paging.value.complete(data);
    } catch (err) {
      showToast({
        title: err
      });
    } finally {
      uni.hideLoading();
    }
  }
</script>

<style lang="scss" scoped>
  .home {}
</style>