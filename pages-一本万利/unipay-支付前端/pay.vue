组件ref="pay" 不能 ref="uniPay",支付成功返回页面return-url,alipay不能付自己
<template>
  <!-- 选择微信支付宝按钮 -->
  <!-- #ifndef MP-WEIXIN -->
  <view class="paytype">
    <view class="box" :class="item.value == payDefValue ? 'active':''" v-for="item in payType"
      @click="clickPayBtn(item.value)">
      <u-icon :name="item.icon" :color="item.color" class="icon" size="26"></u-icon>
      <text class="font">{{item.name}}</text>
    </view>
  </view>
  <!-- #endif -->
  <!-- 弹窗支付 -->
  <uni-pay ref="Pay" return-url="/pages/order/order" @success="paySuccess" @cancel="payCancel"></uni-pay>
  </view>
</template>

<script setup>
  const Pay = ref(null)
  const payorderOBJ = uniCloud.importObject("payorder", {
    customUI: true
  })
  const payType = ref([{
    name: "支付宝",
    value: "alipay",
    color: "#1578FF",
    icon: "zhifubao"
  }, {
    name: "微信",
    value: "wxpay",
    color: "#04C15F",
    icon: "weixin-fill"
  }])
  //支付状态的显示
  statusText(value) {
      let obj = {
        "-2": "支付异常",
        "-1": "已关闭",
        "1": "已支付",
        "0": "未支付",
        "2": "已部分退款",
        "3": "已全额退款"
      };
      return obj[value]
    },
    //提交云端
    const submit = () => {
      if (payobj.value.total_fee < 2)
        return showToast({
          title: "最低2元",
        });
      createOrder();
    };
  // 支付
  const createOrder = async () => {
    // #ifdef MP-WEIXIN
    let provider = "wxpay";
    // #endif
    // #ifndef MP-WEIXIN
    let provider = "alipay";
    // #endif
    let order_no = Date.now() + "_" + String(Math.random()).substring(3, 9);
    let obj = {
      ...payobj.value,
      total_fee: payobj.value.total_fee * 100,
      orderType: "payad",
      order_no,
    };
    let {
      result: {
        errCode
      },
    } = await db.collection("pay-order").add(obj);
    console.log();
    if (errCode != 0) return;
    let out_trade_no = order_no + "_" + String(Math.random()).substring(3, 9);

    Pay.value.createOrder({
      provider,
      total_fee: payobj.value.total_fee * 100, // 支付金额，单位分 100 = 1元
      type: "recharge", // 支付回调类型
      order_no, // 业务系统订单号
      out_trade_no, // 插件支付单号
      description: "直接向商户转账", // 支付描述
    });
  };
  const payCancel = () => {

  }
</script>

<style lang="scss" scoped>
  .paytype {
    @include flex-box();

    .box {
      width: 49%;
      height: 75rpx;
      background: #fff;
      border-radius: 10rpx;
      @include flex-box-set();
      border: 1px solid #fff;
      filter: grayscale(100%);

      .font {
        padding-left: 10rpx;
      }
    }

    .box:first-child.active {
      border-color: #1578FF;
      color: #1578FF;
      filter: grayscale(0%);
    }

    .box:last-child.active {
      border-color: #04C15F;
      color: #04C15F;
      filter: grayscale(0%);
    }
  }
</style>