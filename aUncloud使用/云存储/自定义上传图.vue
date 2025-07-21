<!-- 删除点击放大  {知}1行动做到 1 错1改1 转0为1 不1则0 -->
<template>
  <view class="Layout">
    <view class="picarr">
      <view class="box pic" v-for="(item,index) in temparr">
        <image class="img" :src="item.path" mode="aspectFit"></image>
        <view class="mask">
          <view class="icon">
            <uni-icons type="compose" size="30"></uni-icons>
          </view>
          <view class="icon" @click="delepic(index)">
            <uni-icons type="trash" size="30"></uni-icons>
          </view>
        </view>
      </view>
      <view class="box add" @click="addpic" v-if="temparr.length<8">
        <uni-icons type="plus" size="39"></uni-icons>
      </view>
    </view>

    <button type="warn" @click="addyun">提交</button>
  </view>
</template>

<script setup>
  import dayjs from "dayjs";
  import {
    convertImageToWebP
  } from "@/utils/tools.js";
  const temparr = ref([]) //本地临时图片
  const yunpicarr = ref([]) //云端图片


  // 选择好图片
  const addpic = () => {
    uni.chooseImage({
      count: 8, //默认9
      success: function(res) {
        console.log(res);
        temparr.value = [...temparr.value, ...res.tempFiles].slice(0, 8)
      }
    });
  }
  // 提交云端
  const addyun = async () => {
    try {
      for (let item of temparr.value) {
        let yspic = await convertImageToWebP(item.path)
        let res = await uniCloud.uploadFile({
          filePath: yspic,
          cloudPathAsRealPath: true, //阿里云需要else
          cloudPath: "dspic/" + dayjs().format("YYYY-MM-DD") + "/" + Date.now() + ".webp"
        })
        yunpicarr.value.push(res);
      };
      console.log(yunpicarr.value);

    } catch (err) {
      console.log(err);
    }
  }
  // 删除本地图片
  const delepic = (index) => {
    temparr.value.splice(index, 1)
  }
</script>

<style lang="scss" scoped>
  .Layout {
    .picarr {
      display: grid;
      grid-template-columns: repeat(3, 1fr); // 每行显示三个图片
      gap: 3px; // 图片之间的间距

      .box {
        width: 240rpx;
        aspect-ratio: 9 / 16;
        border: 1px solid black;
      }


      .pic {
        image {
          width: 100%;
          height: 100%;
        }

        .mask {
          display: flex;
          background: rgba(240, 255, 255, 1);

          .icon {
            width: 50%;
          }
        }
      }

      .add {
        @include flex-box-set();
        cursor: pointer;
      }

    }
  }
</style>