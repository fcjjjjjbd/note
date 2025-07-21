// 规范云对象
const demoobj = uniCloud.importObject("demo")

const cmd = db.command
const {
  giveMsg,
  giveCode,
  useResult
} = require("url-utils");
const utils = require("self-utils")
module.exports = {
  _before: function() { // 通用预处理器
    await redisIpCount(this); //redis
    this.parms = {
      name: "丫丫"
    }
    if (bool) {
      throw new Error("没有权限")
    } //判断后前端会直接显示
    this.clientInfo = this.getClientInfo();
    dbJQL = uniCloud.databaseForJQL({
      clientInfo: this.getClientInfo()
    })
    this.startTime = Date.now();
    // 判断是否登录,token对错,有问题的去登录
    this.userInfo = await utils.getUserInfo(this);
    if (!this.userInfo.uid) throw this.userInfo;
    // 前端调用云对象接受参数
    this.params = this.getParams()[0]
    // 请求url携带的参数
    let body = this.getHttpInfo().body;
    if (!body) throw result(400, "required"); //判断调用url携带的参数!空  
    this.params = JSON.parse(this.getHttpInfo().body)
  },
  // 参数
  async update(id = "", parmas = {}, size = 3) {

  },
  // 向字段数组里新增obj,jql不支持
  async update(id, obj) {
    return await db.collection("aa-sku").doc(id).update({
      ziArr: cmd.push([obj])
    })
  },
  // 返回网络接口
  async url() {
    const dbJQL = uniCloud.databaseForJQL();
    let res = await dbJQL.collection("ademo").get();
    return new useResult(400, "required")

  }
  //获取产品列表
  getlist: async function() {
    let {
      navid,
      limit = 5,
      size = 0,
      keyword = ""
    } = this.params;
    let res = await dbJQL.collection("xzs_product_list").where(wer)
      .field("picurl.url as picpath,title,weight,year,price,grade,pronum")
      .skip(size).limit(limit).orderBy("orderid", "asc").get({
        getOne: true
      });
    let count = await dbJQL.collection("xzs_product_list").where(wer).count()
    return result(0, "success", res.data, count.total)
  }
  // 删除商品的云存储url多个图片
  let imgarr = dataList.value[index].imageValue.map((item) => item.url);
  let res5 = await goods_yun.removeimg(imgarr);
  async removeimg(params) {
    const db = uniCloud.databaseForJQL({
      clientInfo: this.getClientInfo()
    })
    let result = await uniCloud.deleteFile({
      fileList: [
        ...params
      ]
    });
  },

  // 根据url删除商品的云存储多个图片
  async removeimg(params) {
    const db = uniCloud.databaseForJQL({
      clientInfo: this.getClientInfo()
    })
    let result = await uniCloud.deleteFile({
      fileList: [
        ...params
      ]
    });
  },
  // 获取每个当前用户ip地址
  async getAddress() {
    let province;
    let {
      clientIP
    } = this.getClientInfo();
    try {
      let {
        data: {
          pro
        }
      } = await uniCloud.request({
        url: "https://whois.pconline.com.cn/ipJson.jsp?json=true&ip=" + clientIP,
        method: "GET",
        timeout: 2000
      })
      province = pro || "未知";
    } catch (err) {
      province = "未知";
    }
    return province;
  }
  // 定时触发,不会自动触发,需配置时间
  async _timing() {
    await db.collection("uni-pay-orders").where({
      status: 0
    }).remove();
    await db.collection("goods_orders").where({
      status: 0
    }).remove();
  }
  // 新增鸡汤积分
  async soupAdd(params = {}) {
    const db = uniCloud.databaseForJQL({
      clientInfo: this.getClientInfo()
    })
    let res1 = await db.collection("soup-scores").where(`user_id == "${params.user_id}"`).limit(1).get();
    let balance = 0
    if (res1.data.length) {
      balance = res1.data[0].balance
    }
    let res2 = await db.collection("soup-scores")
      .where(`user_id == "${params.user_id}" && soup_id == "${params.soup_id}"`).count();
    if (res2.total != 0) {
      return {
        errMsg: "积分重复"
      }
    }
    return await db.collection("soup-scores").add({
      ...params,
      score: 10,
      type: 1,
      comment: "鸡汤投稿奖励",
      balance: balance + 10
    })
  }
  // 联表查询
  async list() {
    const dbJQL = uniCloud.databaseForJQL({
      clientInfo: this.getClientInfo()
    });
    let blogTemp = dbJQL.collection("pro-blog").orderBy("publish_date desc").getTemp();
    let userTemp = dbJQL.collection("uni-id-users").field("_id,nickname").getTemp();
    return dbJQL.collection(blogTemp, userTemp).get();
  },
  // 删除
  async remove(id) {
    const dbJQL = uniCloud.databaseForJQL({
      clientInfo: this.getClientInfo()
    });
    return await dbJQL.collection("pro-blog").doc(id).remove();
  },
  // 评论文字内容检测
  async textcheck(content, openid, scene = 2, version = 2) {
    const uniSecCheck = new UniSecCheck({ // 创建内容安全检测模块实例
      provider: 'mp-weixin', // 指定所使用服务的提供商，目前仅支持mp-weixin
      requestId: this.getUniCloudRequestId() // 请求Id 对哪个图片id进行校验的
    })
    let checkres = await uniSecCheck.textSecCheck({
      content,
      openid,
      scene,
      version
    })
    if (checkres.errCode === "uni-sec-check-risk-content") {
      return {
        Code: 400,
        result: checkres.result,
        errMsg: checkres.errMsg
      }
    } else if (checkres.errCode) {
      return {
        Code: 400,
        result: checkres.result,
        errMsg: checkres.errMsg
      }
    }
    return {
      Code: 0,
      result: checkres.result,
      errMsg: checkres.errMsg
    }
  },
  // jql搜索正则
  async searchlist() {
    .where(`${new RegExp(kerword.value, 'gi')}.test(title)`)
    普通函数.where {
      title: new RegExp(kerword.value, 'gi')
    }
  }
  _after: function(error, result) {
    if (error) {
      throw error // 如果方法抛出错误，也直接抛出不处理
    }
    result.timeCost = Date.now() - this.startTime;
    result.author = "分01for0-1,{知}1行1生"
    return result
  }
}