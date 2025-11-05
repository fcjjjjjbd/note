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
        async list({
            pageSize = 10,
            pageCurrent = 1,
            keyword = ""
          } = {}) {
            try {
              pageSize = Math.min(100, pageSize);
              pageCurrent = (pageCurrent - 1) * pageSize;
              let wre = keyword ? `${new RegExp(keyword, 'i')}.test(title)` : {}
              let listTemp = dbJQL.collection("JLJ-news-articles")
                .where(wre)
                .orderBy("publish_date desc")
                .skip(pageCurrent)
                .limit(pageSize)
                .getTemp();
              let userTemp = dbJQL.collection("uni-id-users").where(`user_id ==$cloudEnv_uid`).field("_id,nickname")
                .getTemp();
              let {
                errCode,
                data,
                count,
                errMsg
              } = await dbJQL.collection(listTemp, userTemp)
                .field(`
        		arrayElemAt(goods_id._id, 0) as _id, //数组里[0]对象转化一个对象
        		arrayElemAt(goods_id.title, 0) as title,
        		arrayElemAt(goods_id.address, 0) as address,
        		arrayElemAt(goods_id.collect_count, 0) as collect_count,
        		arrayElemAt(goods_id.goods_thumb, 0) as goods_thumb,
        		arrayElemAt(goods_id.like_count, 0) as like_count
        		`)
                .field(
                  `_id,arrayElemAt(user_id.nickname,0) as nickname,title,article_status,view_count,is_sticky,avatar,publish_date`
                  ).get({
                  getCount: true
                });
              if (errCode !== 0) return result({
                errCode: 400,
                errMsg: "error",
                custom: errMsg
              });
              return result({
                errCode: 0,
                errMsg: "success",
                data,
                total: count
              });
            } catch (err) {
              return result({
                errCode: 500,
                errMsg: "bug",
                custom: err
              })
            }
          },
          const get = async () => {
</script>
<template>
</template>