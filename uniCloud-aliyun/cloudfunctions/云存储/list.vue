<!-- console.log() -->
<template>
  <view class="self">
    blob本地图像
  </view>
</template>

<script setup>
  import {
    ref,
    computed
  } from "vue";
  本地图片上传到云端将blob临时地址转换为可访问的https地址
  let str = "cloud://env-00jxhf99mvd2/1729091076640_0.jpg";
  let str2 = str.replace("cloud://", "https://");
  let [, , env] = str.split("/");
  let str3 = str2.replace(env, env + ".normal.cloudstatic.cn")
  封装精简的方法
  const cloudToHttps = (str) => {
    return str.replace("cloud://", "https://")
      .replace(str.split("/")[2], str.split("/")[2] + ".normal.cloudstatic.cn");
  }
  cloudToHttps("cloud://env-00jxhf99mvd2/1729091076640_0.jpg");
  // 删除商品的云存储url多个图片
  async removeimg(params) {
    const db = uniCloud.databaseForJQL({
      clientInfo: this.getClientInfo()
    })
    let result = await uniCloud.deleteFile({
      fileList: [
        ...params
      ]
    });
  }
</script>

<style lang="scss" scoped>

</style>