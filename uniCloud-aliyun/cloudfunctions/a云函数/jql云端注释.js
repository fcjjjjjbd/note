按量付费最便宜, 阿里云最稳定, 支付宝bug多
云对象jql(封装了很多属性) 0 普通云函数
写完函数, 测试运行本地云对象
报错未连接服务空间, 重新启动多连几次空间
连接云端函数, 每次写完上传云端
云对象关联utils才能使用
module.exports向外导出一个对象
uniCloud.request = uni.request

操作顺序.where().filed("name,age").skip().limit().orderBy("time desc").updata({});
const db = uniCloud.database(); // 连接云数据库
.where(` user_id=='${UserStore.userInfo._id}'`).where(` user_id==$cloudEnv_uid && status!=0 `)
  .where(`status == 1 && _id in ${arr} `)
let parms = this.getClientInfo(); // 获取从客户端传过来的所有信息
}
jql搜索
db.collection("demo-user").where(`${new RegExp(keyword.value, 'i')}.test(name)`).get();
字段别改名as, doc只能写id字符串, getOne获取一条对象, 统计获取数量count()
db.collection("demo-user").field("name as username,age").doc("123321").get({
  getOne: true
})