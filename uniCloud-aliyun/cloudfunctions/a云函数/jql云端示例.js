let dbJQL = uniCloud.databaseForJQL()
let {
  result
} = require("utils");
const {
  giveMsg,
  giveCode,
  useResult
} = require("url-utils");
let dbCmd = dbJQL.command;
// 云函数调用js使用
let {
  processedData,
  skuSort
} = require("./hooks.js")

module.exports = {
  _before: function() { // 通用预处理器
    // jql
    const clientInfo = this.getClientInfo();
    dbJQL = uniCloud.databaseForJQL({
      clientInfo
    })
    // 接受请求url携带的参数
    let body = this.getHttpInfo().body;
    if (!body) throw result(400, "required"); //判断调用url携带的参数!空  
    this.params = JSON.parse(this.getHttpInfo().body)
    //redis
    await redisIpCount(this);
    // 判断是否登录token对错,有问题的去登录
    this.userInfo = await utils.getUserInfo(this);
    if (!this.userInfo.uid) throw this.userInfo;
    // 前端调用云对象接受参数
    this.params = this.getParams()[0]
    // 主要计算响应结果时间
    this.startTime = Date.now();
  },
  // 向字段数组里新增obj,jql不支持
  async update(id, obj) {
    return await db.collection("aa-sku").doc(id).update({
      ziArr: cmd.push([obj])
    })
  },
  // 搜索列表
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
      let userTemp = dbJQL.collection("uni-id-users").field("_id,nickname").getTemp();
      let {
        errCode,
        data,
        count,
        errMsg
      } = await dbJQL.collection(listTemp, userTemp)
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
  // 新增,view_count初始浏览量
  async add(params = {}) {
    try {
      const randomInt = Math.floor(Math.random() * 51) + 50;
      params.view_count = randomInt;
      let {
        errCode,
        errMsg,
        id
      } = await dbJQL.collection("JLJ-news-articles").add(params)
      if (errCode !== 0) return result({
        errCode: 400,
        errMsg: "error",
        custom: errMsg
      });
      return result({
        errCode: 0,
        errMsg: "success",
        data: {
          id
        }
      });
    } catch (err) {
      return result({
        errCode: 500,
        errMsg: "bug",
        custom: err
      })
    }
  },
  //修改
  async update(params = {}) {
    try {
      let {
        _id,
        ...rest
      } = params
      if (!_id) return result({
        errCode: 400,
        errMsg: "error",
        custom: "_id不能为空"
      });
      let {
        errCode,
        errMsg,
        updated
      } = await dbJQL.collection("aopen-wen").doc(_id).update({
        ...rest
      })
      if (errCode !== 0) return result({
        errCode: 400,
        errMsg: "error",
        custom: errMsg
      });
      return result({
        errCode: 0,
        errMsg: "success",
        data: {
          updated
        }
      });
    } catch (err) {
      return result({
        errCode: 500,
        errMsg: "bug",
        custom: err
      })
    }
  },
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

  //批量删除
  async remove(ids = []) {
    try {
      if (!Array.isArray(ids)) return result({
        errCode: 400,
        errMsg: "error",
        custom: "ids字段必须为数组类型"
      });
      if (!ids.length) return result({
        errCode: 400,
        errMsg: "error",
        custom: "要删除的id不能为空"
      });

      let {
        errCode,
        errMsg,
        deleted
      } = await dbJQL.collection("JLJ-news-articles")
        .where(`_id in ${JSON.stringify(ids)}`).remove()
      if (!errCode === 0) return result({
        errCode: 400,
        errMsg: "error",
        custom: errMsg
      });
      return result({
        errCode: 0,
        errMsg: "success",
        data: {
          deleted
        }
      });
    } catch (err) {
      return result({
        errCode: 500,
        errMsg: "bug",
        custom: err
      })
    }
  },
  // 删除一个
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

  _after: function(error, result) {
    if (error) {
      throw error // 如果方法抛出错误，也直接抛出不处理
    }
    result.timeCost = Date.now() - this.startTime;
    result.author = "分01for0-1,{知}1行1生"
    return result
  }
}