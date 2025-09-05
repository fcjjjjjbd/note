// 注册随机昵称
function beforeRegister({
  userRecord,
  clientInfo
} = {}) {
  if (!userRecord.nickname) {
    userRecord.nickname = "匿名" + Math.random().toString(36).substring(3, 9)
  }
  /* if(userRecord.role) {
    userRecord.role.push('student')
  } else {
    userRecord.role = ['student']
  } */
  return userRecord
}

module.exports = {
  beforeRegister
}