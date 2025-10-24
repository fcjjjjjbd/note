<script setup>
  const db = uniCloud.database(); // 连接云对象整体
  const cmd = db.command; //运算符
  const pddyun = uniCloud.importObject("pdd", {
    customUI: true
  }) //取消云对象加载框,弹窗框
  const current_id = ref(uniCloud.getCurrentUserInfo().uid) // 当前用户id
  // 根据id删除
  const delTable = async (id) => {
    try {
      if (!await showModal({
          content: "是否确认删除?"
        })) return;
      // 批量删除(商城新闻)
      let delIds = (id && typeof id == 'string') ? [id] : unref(multipleSelection).map(item => item._id);
      showLoading("执行中..")
      let {
        errCode,
        errMsg,
        data
      } = await newsCloudObj.remove(delIds);
      if (errCode !== 0) return showToast("删除失败");
      showToast("删除成功");
      getData()
    } catch (err) {
      showModal(err);
      console.log(err);
    } finally {
      uni.hideLoading()
    }

  }
  // 异步处理错误信息
  const submitForm = async () => {
        try {
          uni.showLoading({
            mask: true
          });
          let {
            errCode,
            errMsg
          } = await tjcloubobj.addtj(formData.value);
          if (errCode !== 0) return showToast({
            title: errMsg
          });
          showToast({
            title: "新增成功"
          });
        } catch (err) {
          showToast({
            title: err
          });
        } finally {
          uni.hideLoading();
        }
        //同一时间, 同时一起网络请求
        const getUserDataset = async () => {
          let soup = db.collection("soup-chicken").where(`user_id == $cloudEnv_uid && status==1`).count();
          let like = db.collection("soup-like").where(`user_id == $cloudEnv_uid`).count();
          let scores = db.collection("soup-scores").where(`user_id ==  $cloudEnv_uid`).orderBy("create_date",
              "desc")
            .limit(1).get({
              getOne: true
            });
          Promise.all([soup, like, scores]).then(res => {
            console.log(res);
            dataset.value.soup = res[0].result.total;
            dataset.value.like = res[1].result.total;
            dataset.value.scores = res[2].result?.data?.balance ?? 0;
          })

        }

        //jql联表查询
        const get = async () => {
          const collectdd = db.collection('collect_g').where(` user_id ==$cloudEnv_uid `).getTemp();
          const detaill = db.collection('goods_detail').field(
              "_id, address,  collect_count, goods_thumb,like_count,title")
            .getTemp();
          let {
            result: {
              data,
              errCode
            }
          } = await db.collection(collectdd, detaill).field(`
      arrayElemAt(goods_id._id, 0) as _id, //数组里[0]对象转化一个对象
      arrayElemAt(goods_id.title, 0) as title,
      arrayElemAt(goods_id.address, 0) as address,
      arrayElemAt(goods_id.collect_count, 0) as collect_count,
      arrayElemAt(goods_id.goods_thumb, 0) as goods_thumb,
      arrayElemAt(goods_id.like_count, 0) as like_count
      `).orderBy("publish_date", "desc").get();
        }

        //解构默认值,别名
        const get = async () => {
              let {
                result: {
                  data,
                  errCode,
                  errCode
                } = {}
              } = db.collection("jubao_item").get()

              const onSubmit = async () => {
                try {
                  disabled.value = true;
                  uni.showLoading({
                    title: "提交中"
                  })
                  formData.value.content = removeHtmlTags(formData.value.content);
                  if (formData.value.content === "") return showToast('鸡汤内容不能为空', "none", false);
                  let errCode, res
                  let {
                    soup_type,
                    status,
                    content,
                    from
                  } = formData.value;
                  let _formData = {
                    soup_type,
                    status: 0,
                    content,
                    from,
                    last_modify_date: Date.now()
                  };
                  if (id) {
                    res = await db.collection("soup-chicken").doc(id).update(_formData);
                  } else {
                    res = await db.collection("soup-chicken").add(formData.value);
                  }
                  errCode = res.result.errCode;


                  if (errCode === 0) {
                    uni.$emit("soupUpdate", {
                      msg: "更新了"
                    });
                    showToast("发表成功", "success");
                    setTimeout(() => uni.navigateBack(), 1000)
                  }
                } catch (e) {
                  showToast(e.errMsg, "error")
                } finally {
                  uni.hideLoading();
                  disabled.value = false;
                }
                let {
                  result: {
                    data,
                    errCode
                  }
                } = await db.collection("add-soup").where(`
          status==${statearr[props.tabindex].value} && is_delete != true
    `).get();
              }
</script>
<template>
</template>