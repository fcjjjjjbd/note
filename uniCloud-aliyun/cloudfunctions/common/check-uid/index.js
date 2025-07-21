// 关联uid-common,校验token真实性
const uniID = require("uni-id-common");
const getUserInfo = async function(that) {
  const token = that.getUniIdToken()
  const clientInfo = that.getClientInfo()
  const uniIDIns = uniID.createInstance({ // 创建uni-id实例，其上方法同uniID
    clientInfo
  })
  return await uniIDIns.checkToken(token);
}
module.exports = {
  getUserInfo
}
用法
const utils = require("check-uid")
module.exports = {
    _before: async function() { // 通用预处理器
      this.userInfo = await utils.getUserInfo(this);

    },
    get() {
      if (!this.userInfo.uid) return this.userInfo;
      params.user_id = this.userInfo.uid
    }