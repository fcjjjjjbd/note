<!-- 页面组件,需要引入 console.log()  {知}1行动做到 1 错1改1 转0为1 不1则0 -->
<template>
  <view class="Layout">
    <!-- 审核弹窗 -->
    <uni-popup ref="genderPopup" type="dialog">
      <uni-popup-dialog @confirm="genderConfirm" title="修改审核" mode="input">
        <view class="genderForm">
          <radio-group @change="genderChange">

            <label class="radio" v-for="item in stateLists" :key="item.value">
              <view>
                <radio :value="item.value" :checked="genderValue == item.value" style="transform:scale(0.7)" />
                {{item.text}}
              </view>
            </label>

          </radio-group>
        </view>
      </uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script setup>
  import {
    stateLists
  } from "../../utils/common.js"
  const genderPopup = ref(null) //审核
  const genderValue = ref(0) // 审核弹窗选项默认值 
  const updateid = ref("") // 修改审核方法的id

  // 删除
  const removeid = async (id, index) => {
    let res = await uni.showModal({
      title: '是否删除'
    });
    if (res.confirm) {
      let res = await db.collection('user-tuijian').doc(id).remove();
      myarr.value.splice(index, 1)
    }
  }
  // 删除商品(收藏,历史,点赞..)
  const removeid = async (id, index) => {
    let imgarr = dataList.value[index].imageValue.map(item => item.url);
    let res = await uni.showModal({
      title: '是否删除'
    });
    if (res.confirm) {
      let res1 = db.collection('goods_detail').doc(id).remove(); //删除商品
      let res2 = db.collection('collect_g').where({
        goods_id: id
      }).remove(); //删除收藏商品
      let res3 = db.collection('goods_comment').where({
        soup_id: id
      }).remove(); //删除商品相关评论
      let res4 = db.collection('goods_like').where({
        soup_id: id
      }).remove(); //删除商品点赞
      let res5 = await goods_yun.removeimg(imgarr);
      Promise.all([res1, res2, res3, res4, res5]).then(res => {
        console.log(res);
      })
      paging.value.reload();
      showToast("删除成功")
    }
  }
  // 审核
  // 审核
  const adminsh = async (id) => {
    updateid.value = id
    genderPopup.value.open();
  }
  //  修改审核弹窗确认事件
  const genderConfirm = async (e) => {
    genderValue.value = Number(genderValue.value)
    let res = await db.collection("user-tuijian")
      .where(` _id=="${updateid.value}" `)
      .update({
        status: genderValue.value
      });

    genderPopup.value.close();
  }
  //  修改审核单选框Change 事件
  const genderChange = (e) => {
    genderValue.value = e.detail.value
  }
</script>

<style lang="scss" scoped>
  .Layout {}
</style>