网站mdn 即时设计
css辅助 border:1px solid black;
编译宽度375，注意苹果有安全区域
<template>
  <view class="pic">
    <image class="img" src="../../static/images/logo.png" mode="aspectFill"></image>
  </view>

  uni图标 <uni-icons type="contact" size="30"></uni-icons>
  uview <u-icon name="photo" uor="#2979ff" size="28"></u-icon>
  选中图标变化 active class="box active" :class="item.va == Value ? 'active':''"
  边框 border:1px solid black;
  圆形 border-radius: 50%; overflow: hidden;阴影
  将全部css过滤成灰色 filter: grayscale(100%); 恢复filter: grayscale(0%);
  flex-wrap: wrap; /nowrap撑不开换行
  flex：1，自动填充满 自动分配 内容区则会自动放大占满剩余空间,
  图片模糊度处理 filter: blur(10px);
  计算函数 width: calc(100% - 10px);
  width: fit-content; 宽度根据内容自适应
  uni.scss用法@include flex-box-set(); 有默认，可传值
  padding 细节给图标加触摸范围变大；
  max-height 最大高度 text-align:right 用于指定元素文本内容向右侧边对齐；
  opacity: 0.3; // (0-1透明度)
    class="La12_-" 开头字母,大小写字母数字_-
    vw vh视口宽高度
    网格布局
    1.实现网格布局的三要素：
    display：grid 是转为网格布局，
    grid-template-columns：1fr | px 这是将网格分为几列，1fr是自适配单位，可以当成栅格
    gap:30px 这是网格四周的间隔
    2.aspect-ratio宽高比例属性
    aspect-ratio: 1 / 1; 设置1比1正方形比例，非常常用
    aspect-ratio: 16 / 9; 16比9的比例
    aspect-ratio: 0.5; 相当于1 / 2

  <view style="font-size: 24rpx;margin-top: 5rpx; padding:60rpx"
    :style="{opacity:menuState?1:0,transform:menuState?'scaleY(1)':'scaleY(0)'}"> 内联css
    z-index改变层叠顺序
    aspect-ratio: 9 / 16; 等比例缩放
</template>
<script setup>
  const btnstate = ref(true);
</script>
<style lang="scss" scoped>
  //虾米网格布局grid 自动增加间距gap 
  display: grid;
  gap: 10rpx;
  grid-template-columns: repeat(3, 1fr);
  grid-template-columns: repeat(auto-fill, minmax(255px, 1fr)); //响应式布局，minmax最小值255px、最大值1fr
  // 弹性布局
  display: flex;
  flex-direction: column/row; // 横竖方向
  justify-content: center; //横方向space-between,space-around
  align-items: center;
  text-decoration:line-through 文本一条贯穿删除线;

  // 每页的固定定位,元素的位置在屏幕滚动时不会改变
  .info {
    position: fixed;
    bottom: 10%;
    left: 20rpx;

  }

  // 相对定位
  .box {
    position: relative;

    .mask {
      position: absolute;
      bottom: 0;
      reight: 0;
    }

    transform: translate(30px, 20px) rotate(20deg); // 自己本身位置偏移的 rotate旋转
    transform: scale(0.5) translateY(-50%) skew(30deg, 20deg); // scale可以缩小放大(0-num) skew倾斜
    opacity: 0.2; //不透明度0.0 到 1范围内

    transition: 0.3s; //过渡一个元素在不同状态之间切换的时候定义不同的过渡效果动画,如伪元素之间切换,js事件
    box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.3); //用于在元素的框架上添加阴影效果

    .btn {
      background: black;
      width: 50px;
      /* 圆球的宽度 */
      height: 50px;
      /* 圆球的高度 */
      border-radius: 50%;
      /* 形成圆形 */

      // 动态变active
      &.active {
        border-color: $brand-theme-color;
        color: $brand-theme-color;
        background: rgba(255, 0, 0, 1);
      }
    }

    .pic {
      height: 380rpx;
      width: 320rpx;
      border-radius: 20rpx;
      overflow: hidden;

      .img {
        width: 100%;
        height: 100%;
      }
    }

    .text {
      小程序最小字体24rpx=web 12px font-size: 34rpx;
      font-weight: bold;
      color: $brand-theme-color;

    }

    CSS选择器变化 .item:first-child.active {
      border-color: #1578FF;
      filter: grayscale(0%);

      swiper-item:nth-child(2n) {}

      .item:last-child.active {}
    }

    删除中划线css .remove {
      text-decoration: line-through;
      font-style: normal;
      font-weight: normal;
      color: $text-font-color-3;
    }
</style>