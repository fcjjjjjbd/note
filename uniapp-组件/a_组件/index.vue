<template>
  <!-- 导航分类 -->
  <z-tabs
    :current="current"
    ref="tabs"
    :list="tabList"
    @change="tabsChange"
  ></z-tabs>

    列表组件
  <uni-list>
    <uni-list-item
      link
      :title="`${index + 1}列表文字`"
      :note="`列表${Date.now()}描述信息\n已参与:10人`"
      rightText="右侧文字"
      v-for="(item, index) in 5"
    />
  </uni-list>
  //悬浮按钮，horizontal水平方向vertical垂直fabClick点击事件
  <uni-fab
    ref="fab"
    :pattern="{ icon: 'pyq' }"
    horizontal="right"
    vertical="bottom"
    @fabClick="goAdd"
  />
  展开菜单图标
  <uni-fab
    ref="fab"
    :pattern="{ icon: 'pyq' }"
    :content="content"
    horizontal="right"
    vertical="bottom"
    popMenu
    @trigger="trigger"
  />

  <!-- uni输入框 -->
  <uni-easyinput
    ref="uipt"
    @confirm="goComment"
    suffixIcon="paperplane"
    v-model="replyContent"
    :placeholder="placeholder"
    @iconClick="goComment"
  >
  </uni-easyinput>
   <!-- 分段器top分类 -->
  <uni-segmented-control
    :current="current"
    :values="values"
    @clickItem="onClickItem"
    styleType="button"
    activeColor="#000000"
  ></uni-segmented-control>
  轮播图
  <view class="banner">
    <swiper
      circular
      indicator-dots
      indicator-color="rgba(255,255,255,0.5)"
      indicator-active-color="#fff"
      autoplay
    >
      <swiper-item v-for="row in item.imageValue">
        <image :src="row.url" mode="aspectFill"></image>
      </swiper-item>
    </swiper>
  </view>
  多行文字
  <textarea
    class="textareas"
    auto-height
    maxlength="200"
    placeholder-style="color:#F76260"
    placeholder="1"
     v-model="formData.content" 
  />
  自动上传文件
  <view class="pics">
    <uni-file-picker v-model="pics" fileMediatype="image" mode="grid" />
  </view>
  提交按钮
  <button type="primary" plain :disabled="btnDisabled" @click="onSubmit">
    提交
  </button>
    </text>包裹文字内容可以自动换行,复制
<!-- 显示图片 -->
      <view class="pic">
        <image class="img" :src="userStore.userInfo.avatar || '../../static/images/defAvatar.png'" mode="aspectFill">
        </image>
      </view>
      <!-- 跳转传值 -->
      <navigator :url="`/pages/preview/preview?id=${item._id}&name=${item.name}`" class="item" v-for="item in classList"
        :key="item._id">
      </navigator>
      <!-- 左右布局 -->
      <up-cell-group>
        <up-cell size="large" label="地址" :title="item.address" value="详细地址" isLink></up-cell>
         <view class="">交易次数:350次</view>
      </up-cell-group>
      <!--下拉折叠  -->
      <up-collapse accordion>
        <up-collapse-item title="评论区">
          <template #value>
            <text class="u-page__item__title__slot-title">下拉打开</text>
          </template>
          <text class="u-collapse-content">众多的贴心小工具，是您开发过程中召之即来的利器，让您飞镖在手，百步穿杨</text>
        </up-collapse-item>
      </up-collapse>

      <!-- 输入框 -->
      <input :disabled="disabled || statusDisabled" v-model="formData.from" class="fromIpt" type="text"
        placeholder="如:《红楼梦》">

         <!-- 单选框 可以v-for 2一个个写 -->
      <radio-group>
        <label class="radio">
          <radio :value="0" color="#4F9153" :checked="0==0" />
          <text>心灵鸡汤</text>
        </label>
        <label class="radio">
          <radio :value="1" color="#f83162">
          </radio>心灵鸡汤
        </label>
      </radio-group>
      <!-- 滑块swiper -->
      <view class="center">
        <swiper vertical autoplay interval="1500" duration="300" circular>
          <swiper-item v-for="item in noticeList" :key="item._id">
            <navigator :url="'/pages/notice/detail?id='+item._id">
              {{item.title}}
            </navigator>
          </swiper-item>
        </swiper>
      </view>
</template>

<script>
// 跳转
const goDetail = () => {
  uni.navigateTo({
    url: "/pages/order/orderdetail?id=" + item.id
  })
  uni.navigateTo({
    url: "/pages/goods/add"
  })
  关闭销毁当前页面， 跳转到某个页面(没有返回功能 & 自动更新)
  提交成功后使用
  uni.redirectTo({
    url: 'test?id=1'
  });
  uni.$emit("fasong")
  在js接受
  uni.$on("fasong", (e) => {
    console.log(e)
  })
}

const content = ref([{
    iconPath: '/static/images/logo.png',
    text: '全部清空',
    active: false
  },
  {
    iconPath: '/static/images/logo.png',
    text: '置顶',
    active: false
  }
])
// uni悬浮框每个功能
const trigger = (e) => {
  const index = e.index;
  switch (index) {
    case 0:
      console.log('Index is 0');
      // 执行特定于 index 0 的逻辑
      break;
    case 1:
      console.log('Index is 1');
      // 执行特定于 index 1 的逻辑
      break;

    default:
      console.log(`默认逻辑}`);
      // 默认逻辑
      break;
  }
}
</script>

<style>
.textareas {
  background: #fcfcfc;
  height: 30rpx;
  width: 100%;
  border: 1px solid black;
  padding: 20rpx;
  font-size: 50rpx;
  border-radius: 15rpx;
}
.banner {
  width: 750rpx;
  padding: 30rpx 0;
  height: 540rpx;

  swiper {
    width: 750rpx;
    height: 540rpx;

    &-item {
      width: 100%;
      height: 100%;
      padding: 0 30rpx;

      image {
        width: 100%;
        height: 100%;
        border-radius: 10rpx;
      }
    }
  }
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
