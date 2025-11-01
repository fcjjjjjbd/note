<!-- 搜索页面 uni-search-bar -->
<template>
  <view class="searchLayout">
    <view class="search">
      <uni-search-bar
        @confirm="onSearch"
        @cancel="onClear"
        @clear="onClear"
        focus
        placeholder="搜索"
        v-model="queryParams.keyword"
      >
      </uni-search-bar>
    </view>
    <view>
      <view class="history">
        <view class="topTitle" v-if="historySearch.length">
          <view class="text">历史搜索</view>
          <view class="icon" @click="removeHistory">
            <uni-icons type="trash" size="25"></uni-icons>
          </view>
        </view>
        <view class="tabs">
          <view
            class="tab"
            v-for="tab in historySearch"
            :key="tab"
            @click="clickTab(tab)"
            >{{ tab }}</view
          >
        </view>
      </view>

      <view class="recommend">
        <view class="topTitle">
          <view class="text">热门搜索</view>
        </view>
        <view class="tabs">
          <view
            class="tab"
            v-for="tab in recommendList"
            :key="tab"
            @click="clickTab(tab)"
            >{{ tab }}</view
          >
        </view>
      </view>
    </view>

    <!-- 产品哦列表 -->
  </view>
</template>

<script setup>
import { ref } from "vue";
const queryParams = ref({
  pageNum: 1,
  pageSize: 12,
  keyword: "",
});

const historySearch = ref(uni.getStorageSync("historySearch") || []);
const recommendList = ref(["美女", "帅哥", "宠物", "卡通"]);

//点击搜索
const onSearch = () => {
  historySearch.value = [
    ...new Set([queryParams.value.keyword, ...historySearch.value]),
  ].slice(0, 10);
  console.log(historySearch.value);
  uni.setStorageSync("historySearch", historySearch.value);
};
// 搜索栏清空
const onClear = () => {};
// 标签 搜索
const clickTab = (tab) => {
  console.log(tab);
  queryParams.value.keyword = tab;
};
//历史记录清空
const removeHistory = () => {
  uni.showModal({
    title: "清空历史搜索？",
    success: (res) => {
      if (res.confirm) {
        uni.removeStorageSync("historySearch");
        historySearch.value = [];
      }
    },
  });
};
</script>

<style lang="scss" scoped>
.searchLayout {
  .search {
    padding: 0 10rpx;
  }

  .topTitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 32rpx;
    color: #333;
  }

  .history {
    padding: 30rpx;
  }

  .recommend {
    padding: 30rpx;
  }

  .tabs {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding-top: 20rpx;

    .tab {
      background: #f4f4f4;
      font-size: 28rpx;
      color: #333;
      padding: 10rpx 28rpx;
      border-radius: 50rpx;
      margin-right: 20rpx;
      margin-top: 20rpx;
    }
  }

  .list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5rpx;
    padding: 20rpx 5rpx;

    .item {
      height: 440rpx;

      image {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }
}
</style>
