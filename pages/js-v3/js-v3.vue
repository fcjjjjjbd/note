1
<template>
  vue3语法
  v-model.number="value" 绑定数字类型
  <row @click.native="detail"></row> native 组件直接跳转详情页
  @click.stop="dd" 阻止事件冒泡(阻止一个组件很多点击事件)
  uni.showToast可以自带关闭uni.showLoading
  user?.profile?.name ?? '未知' 可选链(不会报格式错)
  操作数据的方法 unshift向前添加 push向后添加 splice() 删除插入,截取slice(0, 20),delete删除对象的自有属性

  </view>
</template>

<script setup>
  import {
    showToast
  } from '../../utils/common';


  const userinfoid = uniCloud.getCurrentUserInfo() // 获取当前用户信息
  const ncloubobj = uniCloud.importObject("db", {
      customUI: true
    }) <
    !--#ifndef MP - WEIXIN-- > html <
    !--#endif-- >
    // #ifdef MP-WEIXIN js
    // #endif
    // #ifdef APP-PLUS  || H5  css
    // #endif
    // 浅拷贝没影响,赋值影响原始数据的 
    let parms = {
      ...formData.value
    }
  delete parms.name
  // 解构
  let {
    name,
    ...parms
  } = formData.value
  //监听一个对象 函数 响应式,
  watch(() => prop.item, (newValue, oldValue) => { //具体一个值,不是ref类型(count.value.age)
    console.log(newValue, oldValue)
  })
  // map方法
  let arr = dataobj.value.imageValue.map(row => ({
    url: row.fileID
  }));

  const updatedData = data.map(item => {
    return {
      ...item,
      imgarr: item.imgarr.map(img => ({
        name: img.name,
        url: img.url,
        extname: img.extname
      }))
    };
  });



  watch(() => props.currentIndex, (nv, ov) => { //监听
    console.log(nv, ov)
    if (nv == props.tabIndex) {
      if (!firstLoaded.value) {
        nextTick(() => {
          setTimeout(() => {
            paging.value.reload();
          }, 100)
        })
      }
    }
  }, {
    immediate: true
  })
  //点击id复制内容
  function clickID(value) {
    if (!value) return;
    uni.setClipboardData({
      data: value,
      success: res => {
        console.log(res);
      },
      fail: err => {
        console.log(err);
      }
    })
  }
  // 变量拼接 esc下` 中文逗号  可以换行
  : text =
    "`通知：${useStateFormat.text}，${(formData.status == 0 || formData.status == 1)?'不允许再次编辑':formData.feedback+'，修改后可再次提交'}。`"
  // 解构对象 整理对象
  let {
    soup_type,
    content,
    status,
    from
  } = formData.value;
  let _formData = {
    soup_type,
    content,
    from,
    status: 0,
    last_modify_date: Date.now()
  };
  // emit发送声明的触发的自定义事件() 可以子向父 父向父
  const emit = defineEmits(['removUpdate']) // 声明引入 
  emit("removUpdate", { // 方法1 子组件里传递
    msg: "新增了"
  });
  // < soup - item: @removUpdate = "remo" > < /soup-item>  父接收事件
  //  function remo() {
  // paging.value.refresh();
  //  }
  // 方法2  子组件自由传参父监听
  uni.$emit("dd");
  uni.$emit("soupUpdate", {
    msg: "新增了"
  });
  uni.$on("dd", (e) => {
    paging.value.reload();
  });
  // 用完删除,占内存
  onUnload(() => {
    uni.$off("Update")
  })
  // 缓存覆盖 获取 删除
  uni.setStorageSync("storgClassList", classList.value);
  uni.removeStorageSync("storgClassList")
  const storgClassList = uni.getStorageSync("storgClassList") || [];
  uni.removeStorageSync("storgClassList", classList.value);
  // 将商品推荐历史记录
  setReadHistory() {
      // 获取阅读历史缓存，如果不存在则为空数组
      const historyCache = uni.getStorageSync('readHistory') || []
      // 过滤掉当前文章的阅读历史
      const readHistory = historyCache.filter(item => item.article_id !== this.id)
      // 将当前文章的阅读历史添加到数组最前面
      readHistory.unshift({
        article_id: this.id,
        last_time: Date.now()
      })
      // 将更新后的阅读历史缓存到本地
      uni.setStorageSync('readHistory', readHistory)

    },
    // 来每隔一定的时间执行某个函数
    setInterval(() => {
      num2.value++;
      console.log(num2.value);
    }, 1000)
  setTimeout(() => uni.navigateBack(), 1500);

  // 缓存的计算属性 响应式,
  const fullName = computed(() => {
    return firstName.value + "-" + lastName.value
  })
  // 头像URL拼接
  const picUrl = computed(() => {
    if (!newitem.value.userInfo.avatar_file) {
      return '../../static/images/logo.png'; // 默认图片路径
    }
    const {
      url,
      extname
    } = newitem.value.userInfo.avatar_file;
    return `${url}.${extname}`; // 拼接 URL 和扩展名
  });
  // 删除id
  const removeid = async (id, index) => {
    let imgarr = dataList.value[index].imageValue.map(item => item.url);
    let res = await uni.showModal({
      title: '是否删除'
    });
    if (res.confirm) {
      let res1 = db.collection('goods_detail').doc(id).remove(); //删除商品
      Paylist.value.splice(index, 1);
      let res2 = db.collection('collect_g').where({
        goods_id: id
      }).remove(); //删除收藏商品
      let res3 = db.collection('goods_comment').where({
        soup_id: id
      }).remove(); //删除商品相关评论

      let res5 = await goods_yun.removeimg(imgarr);
      Promise.all([res1, res2, res3, res5]).then(res => {
        console.log(res);
      })
      paging.value.reload();
      showToast({
        title: "删除成功"
      });
    }

  }
  // 滑动顶部
  uni.pageScrollTo({
    scrollTop: 0,
    duration: 100
  });
  // 点击拨通电话
  clickMobile(value) {
      uni.makePhoneCall({
        phoneNumber: value
      })
    },
    //跳转,携带对象需编码解码
    goDetail(value) {
      let params = encodeURIComponent(JSON.stringify(value));
      uni.navigateTo({
        url: "/pages/order/detail?obj=" + params
        url: "/pages/order/orderdetail?id=" + item.id
      })
    },
    //接受携带参数, 解码并解析传递的参数
    onLoad(async (obj) => {
      if (obj.item) {
        dsobj.value = JSON.parse(decodeURIComponent(obj.item));
      }
    })
  // 三元表达式
  const Balance = computed(() => scoreData.value.length ? scoreData.value[0].balance : 0)
  onLoad(async (e) => {
    console.log(e)
    // 解构 如果没有默认null
    let {
      id = null, name = null
    } = e;

  })
  // for循环
  for (let i = 1; i < 5; i++) {
    data
  }

  function request() {
    uni.request({
      url: "https://jsonplaceholder.typicode.com/posts"
    }).then(res => {
      console.log(res);
    })

    uni.request({
      url: "https://env-00jxhg31g2jf.dev-hz.cloudbasefunction.cn/fenlei/list",
      method: 'POST',
      data: JSON.stringify({
        num: 3,
        page: 1
      }),
      header: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      console.log(res);
    });

  }


  //触底加载更多
  onReachBottom(() => {
    console.log("到底部了")
  })
  // 传参
  function geshi(valie = '', data = false) {}
</script>

<style lang="scss" scoped>

</style>