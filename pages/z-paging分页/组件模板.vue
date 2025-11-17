<!-- 下拉刷新模板 -->
<template>
  <view class="home">
    <z-paging ref="paging" v-model="dataList" @query="queryList" :default-page-size="8" >
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
    const addcloubobj = uniCloud.importObject("goods-backend")

  const paging = ref(null)
  const dataList = ref([])

  // 请求数据   
  const queryList = async (pageNo, pageSize) => {
    getgoodsList(pageNo, pageSize);
  }
 const searchVal = ref("")
const dataList  = ref([])
const paging = ref(null);

const queryList = async(pageCurrent, pageSize)=>{
	try{
		let {errCode,data} = await goodsCloudObj.goodsList({pageCurrent,pageSize,keyword:unref(searchVal)})
		if(errCode!==0) return paging.value.complete(false);
		paging.value.complete(data);
	}catch(err){
		paging.value.complete(false);
		console.log(err);
	}	
}
</script>

<style lang="scss" scoped>
  .home {}
</style>