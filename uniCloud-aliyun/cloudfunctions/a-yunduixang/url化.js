// 
const {
  giveMsg,
  giveCode,
  useResult
} = require("url-utils");
module.exports = {
  _before: function() { // 通用预处理器
    this.startTime = Date.now();
    // let body = this.getHttpInfo().body;
    // if (!body) throw new useResult(400, "required");
    this.params = JSON.parse(this.getHttpInfo().body)
  },

  // 菜单导航业务
  async navyewu() {
    const dbJQL = uniCloud.databaseForJQL({
      clientInfo: this.getClientInfo()
    })
    let {
      data
    } = await dbJQL.collection("adsnav").where(` state == true`).field("icon,content,classname").orderBy(
        "orderid asc")
      .get();
    const navarr = data.map(item => {
      return {
        ...item,
        icon: {
          name: item.icon.name,
          url: item.icon.url,
          extname: item.icon.extname
        }
      };
    });
    return new useResult(0, "success", navarr);
  },
  _after: function(error, result) {
    if (error) {
      throw error // 如果方法抛出错误，也直接抛出不处理
    }
    result.timeCost = Date.now() - this.startTime;
    result.author = "01for0-1,{知}1行1生"
    return result
  }
}