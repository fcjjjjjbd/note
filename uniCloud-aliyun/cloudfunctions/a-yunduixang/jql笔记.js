// 注释解释
云对象jql校验database, else普通云函数
删除和修改先get测试
报错未连接服务空间, 重新启动多连几次空间
每次写完上传云端
云对象url接口每个npm install.. / common / url - utils
module.exports向外导出一个对象
uniCloud.request = uni.request
throw和return区别
  .count(); //符合条件的个数
顺序.where().filed("name,age").skip().limit().orderBy("time desc").updata({});
const db = uniCloud.database(); // 连接云数据库
.where(` user_id=='${UserStore.userInfo._id}'`).where(` user_id==$cloudEnv_uid && status!=0 `)
  .where(`status == 1 && _id in ${arr} `)
let parms = this.getClientInfo(); // 获取从客户端传过来的所有信息
}
搜索
const keyword = ref("");
db.collection("demo-user").where(`${new RegExp(keyword.value, 'i')}.test(name)`).get();
字段别名as
db.collection("demo-user").field("name as username,age").doc("123321").get({
  getOne: true
}).doc(id).remove().doc(id).update({
  name: "张三",
  age: "18"
})
支持同时追加多个（ 数组对象）
db.collection("demo-user").add([{
  name: "张三",
  age: 22
}, {
  name: "李四",
  age: 33
}])
翻页动态参数
const queryParams = ref({
  pageNum: 1,
  pageSize: 7,
  total: 0
})
let current = queryParams.value.pageSize * (queryParams.value.pageNum - 1);
db.collection("demo-user").skip(current).limit(queryParams.value.pageSize).get();
统计获取数量
db.collection("demo-user").count();