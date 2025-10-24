//校验token是否存在,和云端一致 需关联公共函数uid
const uniID = require("uni-id-common");
const getUserInfo = async function(that) {
  const token = that.getUniIdToken()
  const clientInfo = that.getClientInfo()
  const uniIDIns = uniID.createInstance({ // 创建uni-id实例，其上方法同uniID
    clientInfo
  })
  return await uniIDIns.checkToken(token)
}

module.exports = {
  getUserInfo
}