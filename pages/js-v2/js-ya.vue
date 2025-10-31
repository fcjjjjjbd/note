<!-- fil  .log(e)¥ -->
<template>
  <view class="">
    this 拿到整个vue实例
    删除 this.arr.splice(index, 1)
    添加 unshift this.arr.unshift({name: this.iptValue })
    组件周期created mountd 页面onLoad,
    拷贝删除_id delete res.data[0]._id;
    // map遍历方法 返回新数组
    // 数组转 字符串
    skuziArrname(arr) {
    return arr.join(" ");
    },
    // 过滤 返回新数组
    let arr = this.Data.filter(item => {

    return item.checked
    })
    console.log(arr)
    // 数组是否包含一个元素
    let bools = item.ziArr.some(ite => ite.checked)
    // 保留当前页面， 跳转到应用内的某个页面(除了tabber)
    uni.navigateTo({
    url: "/pages/demo2/demo2"
    })
    }
    // 关闭所有，打开任何页面
    uni.reLaunch({
    url: "/pages/index/index"
    })



  </view>
</template>
<script>
  export default {
    data() {
      return {
        currentPage: 1,
        loading: 0 //0默认  1加载中  2没有更多了
      }
    },
    onReachBottom() {
      console.log("到底部了")

    }
  }
</script>