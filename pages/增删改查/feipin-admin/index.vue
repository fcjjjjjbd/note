<!-- console.log() <view class=""></view> {知}1行动做到 1 错1改1 转0为1 不1则0 -->
<template>
  <view class="Layout">
    <view class="add" @click="goadd">
      <button type="primary">添加废品</button>
    </view>
    <view class="navb">
      <z-tabs :list="list1" @change="tabsChange" />
    </view>
    <view class="content">
      <view class="item" v-for="(item,index) in rights" :key="item._id">
        <view class="top">
          <view> {{ item.name }}</view>
          <view class="info">
            <view @click="updataa(item)"><uni-icons type="compose" size="30"></uni-icons>
            </view>
            <view @click.stop="removeid(item._id,index)"><uni-icons type="trash" size="30"></uni-icons>
            </view>
          </view>
        </view>
        <view class="bottom"> <text>{{ item.jinjia }}</text></view>
      </view>
    </view>

    <view class="goback" @click="goback">返回</view>
  </view>
</template>

<script setup>
  const db = uniCloud.database()
  const dsyunobj = uniCloud.importObject("goods-backend")

  const list1 = ref([]) //分类
  const list2 = ref([]) //分类下所有列表数据
  const rights = ref([]); //选中的分类数据
  // 云对象
  const getdata = async () => {

    let res1 = db.collection("feipin-fenlei").orderBy("sort", "asc").get();
    let res2 = db.collection("feipin-fenleilist").orderBy("sort", "asc").get();
    Promise.all([res1, res2]).then(res => {
      console.log(res[1].result.data);
      list1.value = res[0].result.data
      list2.value = res[1].result.data
      rights.value = list2.value.filter(item => {
        return item.category_id === list2.value[0]._id;
      });
    })

  }
  getdata()

  // 删除
  const removeid = async (id, index) => {
    let res = await uni.showModal({
      title: '是否删除'
    });
    if (res.confirm) {
      let res1 = db.collection('feipin-fenleilist').doc(id).remove(); //删除商品
      rights.value.splice(index, 1);
    }
  }
  // 新增分类
  const goadd = async () => {
    uni.navigateTo({
      url: "/pages_fen/feipin-admin/edit"
    })
  }
  // 修改
  const updataa = async (e) => {
    let params = encodeURI(JSON.stringify(e));
    uni.navigateTo({
      url: "/pages_fen/feipin-admin/edit?item=" + params
    })
  }

  const tabsChange = (e) => {
    rights.value = list2.value.filter(item => item.category_id === list1.value[e]._id);

  }
  uni.$on("getdb", () => {
    getdata()
  });
  const goback = () => {
    uni.navigateTo({
      url: "/pages_fena/manage/list"
    })

  }
</script>

<style lang="scss" scoped>
  .Layout {
    padding: 20rpx;
    position: relative;

    .add {
      padding: 0 150rpx;
    }

    .content {
      width: 100%;
      height: 100%;
      background-color: #fff;
      padding: 20rpx;
      border-radius: 8rpx;

      .item {
        letter-spacing: 4rpx;
        font-size: 34rpx;
        font-weight: bold;
        border-bottom: 1rpx solid $text-font-color-3;
        padding-bottom: 28rpx;

        .top {
          @include flex-box();

          .info {
            display: flex;

            .uni-icons {
              margin-left: 20rpx;

            }
          }
        }

        .bottom {}
      }
    }

    .goback {
      position: absolute;
      top: 1vh;
      left: 10rpx;
      background: rgba(0, 0, 0, 0.3);
      width: 70rpx;
      height: 70rpx;
      border-radius: 50%;
      @include flex-box-set();
    }
  }
</style>