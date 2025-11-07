<!--分类页面 console.log() plus-filled  -->
<template>
  <view class="self">



  </view>
</template>

<script setup>
  const db = uniCloud.database();
  const navPopup = ref(null)
  const dsobj = ref({
    title: "",
    sort: null
  })

  const list1 = ref([]);
  let updatid
  // 提交事件
  const nameConfirm = async () => {
    let res, errCode
    dsobj.value.sort = Number(dsobj.value.sort)
    if (updatid) {
      let res = await db.collection('afenlei').doc(updatid).update({
        title: dsobj.value.title,
        sort: dsobj.value.sort
      })
      errCode = res.result.errCode
    } else {
      let res = await db.collection('afenlei').add({
        title: dsobj.value.title,
        sort: dsobj.value.sort
      })
      errCode = res.result.errCode
    }
    if (errCode != 0) return
    dsobj.value.title = ''
    updatid = null
    navPopup.value.close()
    getnav();
  }
  // 获取数据
  const getnav = async () => {
    let {
      result: {
        data
      }
    } = await db.collection('afenlei').orderBy("sort", "asc").get()
    list1.value = data
  }

  //   新增弹窗

  const addclick = () => {
    navPopup.value.open();
  }
  //  修改分类
  const updataff = (title, id) => {
    navPopup.value.open();
    dsobj.value.title = title
    updatid = id

  }

  // 删除
  const removeff = async (id) => {
    let res = await uni.showModal({
      title: '是否删除'
    });
    if (res.confirm) {
      let res = await db.collection('afenlei').doc(id).remove()
      getnav()
    }
  }
  getnav()
</script>

<style lang="scss" scoped>
  .top {
    height: 300rpx;
    background: #bbb;
    padding: 0 30rpx;
    padding-top: var(--status-bar-height);
    position: relative;
    display: flex;
    align-items: center;

    .group {
      position: relative;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      color: #fff;

      .userinfo {
        display: flex;
        width: 100%;
        align-items: center;

        .pic {
          width: 120rpx;
          height: 120rpx;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid #fff;

          image {
            width: 100%;
            height: 100%;
          }
        }

        .text {
          padding-left: 20rpx;

          .nickname {
            font-size: 44rpx;
            font-weight: 600;
          }

          .year {
            font-size: 26rpx;
            opacity: 0.6;
            padding-top: 5rpx;
          }
        }
      }

      .more {
        .iconfont {
          font-size: 40rpx;
        }
      }
    }

    .bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;

      image {
        width: 100%;
        height: 100%;
        filter: blur(20px);
        transform: scale(2);
        opacity: 0.5;
      }
    }
  }
</style>