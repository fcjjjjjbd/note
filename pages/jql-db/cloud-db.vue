<!-- 前端操作普通函数 -->
<template>
  <script setup>
        const db = uniCloud.database(); // 连接云对象整体
        const cmd = db.command; //运算符
          const ncloubobj = uniCloud.importObject("db", {
          customUI: true
        }) //取消云对象加载框,弹窗框
        const current_id = ref(uniCloud.getCurrentUserInfo().uid) // 当前用户id

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
            删除
            let {
              result: {
                errCode
              }
            } = await db.collection("jubao_item").doc(newitem.value._id).remove();
            if (errCode != 0) return showToast("修改失败");
            showToast("删除成功");
          }

          //获取数据库中的品牌信息
          getBrand() {
              brandCloudObj.get().then(res => {
                if (!res.data.length) return;
                this.brandFormData = res.data[0]
              })
            },
            //点击提交表单
            onSubmit() {
              this.$refs.goodsForm.validate().then(res => {
                this.toDataBase();
              }).catch(err => {
                console.log(err);
              })
            },
            //上传到云数据库
            async toDataBase() {
              this.goodsFormData.thumb = this.goodsFormData.thumb.map(item => {
                return {
                  url: item.url,
                  name: item.name,
                  extname: item.extname
                }
              })

              let toastTit;
              if (goodID) {
                toastTit = "修改成功"
                await goodsCloudObj.update(this.goodsFormData)
              } else {
                toastTit = "新增成功"
                await goodsCloudObj.add(this.goodsFormData)
              }

              uni.showToast({
                title: toastTit
              })
              setTimeout(() => {
                uni.navigateBack()
              }, 1500)

            }
          addData() {
              db.collection("quanzi_article").add({
                ...this.artObj
              }).then(res => {
                uni.hideLoading();
                uni.showToast({
                  title: "发布成功"
                })
                setTimeout(() => {
                  uni.reLaunch({
                    url: "/pages/index/index"
                  })
                }, 800)
              })
            },
            // 删除item
            async ddelete(id, index) {
                await skuCloudObj.remove(id)
                this.Data.splice(index, 1)
              },
              async Confirm(e) {
                if (this.addAttrType == "parent") {
                  let obj = {
                    name: e,
                    checked: false,
                    ziArr: []
                  }
                  let res = await skuCloudObj.add(obj)
                  obj._id = res.id
                  this.Data.unshift(obj)
                } else if (this.addAttrType == "child") {
                  let obj = {
                    name: e,
                    checked: false,
                  }
                  let id = this.Data[this.attrIndex]._id
                  await skuCloudObj.update(id, obj)
                  this.Data[this.attrIndex].ziArr.unshift(obj)
                }

              },
        }
        }

        // 提交表单
        const addform = async () => {
              let res = await db.collection("add-soup").add(formData.value);
              console.log(res)
              let errCode = res.result.errCode
              if (errCode === 0) {
                uni.$emit("soupUpdate", {
                  msg: "更新了"
                });
                showToast("提交成功")
                setTimeout(() => uni.navigateBack(), 2000)
              }
              const getlist = async (pageNo, pageSize) => {
                let skip = (pageNo - 1) * pageSize;
                let {
                  result: {
                    data,
                    errCode
                  }
                } = await db.collection("add-soup").skip(skip).limit(pageSize).get();

                paging.value.complete(data); // 响应数据赋值
              }
              const getone = async () => {
                    uni.showLoading({
                      title: '加载中'
                    });
                    let Producttemp = await db.collection("add-soup").where({
                      _id: id
                    }).getTemp()
                    let usertemp = await db.collection("uni-id-users").field("_id,avatar,username").getTemp();
                    let {
                      result: {
                        errCode,
                        data
                      }
                    } = await db.collection(Producttemp, usertemp).get({
                      getOne: true
                    });
                    if (errCode != 0) return
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

  <style lang="scss" scoped></style>
</template>