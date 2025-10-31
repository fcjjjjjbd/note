<!-- 行止至善1 {知}1力行动做到1生 stay错1改1 转0为1 不1则0 以大1兼小 舍小1就大 抱1负0,好习惯 -->
<script setup>
  openid: "o5tQd7U__aPjwWnoYBPUivS4C_sw"
  需要关联2个文件

  const onSubmit = async () => {
    const secCheckObj = uniCloud.importObject("secCheckContent");

    uni.showLoading();
    let secRes = await secCheckObj.textSecCheck(
      dataobj.value.content,
      "o5tQd7U__aPjwWnoYBPUivS4C_sw"
    );
    console.log(secRes);
    if (secRes.code == 0) {
      goodsff();
    } else {
      uni.hideLoading();
      uni.showModal({
        title: secRes.errMsg || '操作失败',
        content: secRes.result?.label ? `发布内容存在"${secRes.result.label}"问题,请重新编辑后发布!` : '请检查输入内容后重试',
        showCancel: false,
      });
      return;
    }

  }
  const demoo = async () => {

  }
  console.log()
</script>
<template>
  <view class="">

  </view>
</template>

<style lang="scss" scoped>

</style>