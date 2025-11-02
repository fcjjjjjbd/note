<template>
  <view>
    <view class="commentpp">
      <input class="ipt" :focus="commentFocus" @confirm="addcomment" v-model="commentobj.comment_content"
        :placeholder="commentobj.reply_username ? '回复 @'+commentobj.reply_username : ' 评论一下'" maxlength="50" />
      <view class="button" @click="addcomment">
        <uni-icons type="paperplane" size="30"></uni-icons>
      </view>
    </view>
    <view class="safe-area-bottom"></view>
  </view>
</template>

<script setup>

  import {
    ref,
    nextTick
  } from "vue";

  import {
    useUserStore
  } from "@/stores/user.js"
  const userStore = useUserStore()
  const checkinfo = uniCloud.importObject("check_info",{customUI: true})
 const emit = defineEmits(['success']) //关闭评论弹窗
  const db = uniCloud.database();
  const commentFocus = ref(false)
  const commentobj = ref({
    comment_content: ""
  })
  const props = defineProps({
    source: {
      type: Object,
      default () {
        return {}
      }
    }
  })

  // 获取焦点
  const focusFn = () => {
    commentFocus.value = false;
    nextTick(() => {
      commentFocus.value = true;
      commentobj.value = {
        ...props.source,
        ...commentobj.value
      }
    })
  }

  //  提交评论 
  const addcomment = async () => {
        uni.showLoading();
 // #ifdef MP-WEIXIN
        let res1 = await checkinfo.textcheck(commentobj.value.comment_content,userStore.userInfo.openid);
     if(res1.Code != 0){
        uni.hideLoading();
        uni.showModal({
          title:res1.errMsg,
        content: `涉及"${res1.result.label}"请修改后再次提交`,
        showCancel:false
        })
        return;
     }
     // #endif
       const {
      reply_username,
      ...newSource
    } = {
      ...commentobj.value
    }
    let res = await db.collection("goods_comment").add(newSource)
    uni.hideLoading();
    commentobj.value.comment_content = ""
    emit("success");
  }
  defineExpose({
    focusFn
  })
</script>

<style lang="scss" scoped>
  .commentpp {
    background: #fff;
    padding: 30rpx;
    @include flex-box();

    .ipt {
      flex: 1;
      padding: 0 20rpx;
      font-size: 28rpx;
      background: #f7f7f7;
      height: 80rpx;
    }

    .button {
      width: 80rpx;
      height: 80rpx;
      margin-left: 20rpx;
      border: 1px solid #f7f7f7;
    }
  }
</style>