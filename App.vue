<!-- 必须设置css -->
<script setup>
  import {
    onLaunch,
    onShow,
    onHide
  } from "@dcloudio/uni-app"
  import {
    useUserStore
  } from "@/stores/user.js"
  const uniIdCo = uniCloud.importObject("uni-id-co")
  const UserStore = useUserStore()

  onLaunch(() => {
    console.log('App Launch')
    //隐式微信自动注册 登录
    // uni.login({
    //   success: login => {
    //     console.log(login)
    //     uniIdCo.loginByWeixin({
    //       code: login.code
    //     }).then(res => {
    //       console.log(res)
    //       UserStore.loginSuccess(res)
    //     })
    //   }
    // })

  })
  onShow(() => {
    console.log('App Show')
  })
  onHide(() => {
    console.log('App Hide')
  })
  // v2生命周期
  export default {
    onLaunch: function() {
      console.log('App Launch')
    },
    onShow: function() {
      console.log('App Show')
    },
    onHide: function() {
      console.log('App Hide')
    }
  }
</script>

<style lang="scss">
  v2 @import "@/uni_modules/uview-ui/index.scss";
  v3 @import "@/uni_modules/uview-plus/index.scss";
  @import "common/style/common-style.scss"
</style>