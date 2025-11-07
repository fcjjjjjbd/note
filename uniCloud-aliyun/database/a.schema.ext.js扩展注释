触发器用法笔记
beforeUpdate触发时机 钩子 = 前端生命周期 beforeRead(可以接受jql) afterRead（ 普通云函数）
trigger触发器 collection当前表名 clientInfo当前传过来客户信息 updateData当前的修改对象 operation当前操作类型get update..

const db = uniCloud.database()
const dbCmd = db.command
module.exports = {
  trigger: {
    beforeUpdate: async function({
      collection,
      operation,
      docId,
      updateData,
      clientInfo,
      addDataList, //捕获新增的对象
      result
    } = {}) { //  前端传过来的数据

      throw new Error(JSON.stringify(result))
      触发器调试方法 = console.log()
      if (typeof docId === 'string' && docId.length > 0) { //如果字段较多，也可以不列举字段，删掉后半个判断
        if (updateData.content) {
          // updateData.summary = 'xxxx' // 根据content生成summary
        }
        updateData.update_date = Date.now() // 更新数据的update_date字段赋值为当前服务器时间
      }
      let [{
        soup_id
      }] = addDataList
      let res = db.collection('goods_detail').where({
        _id: soup_id
      }).update({
        like_count: dbCmd.inc(1)
      })
    },
    afterRead: async function({
      collection,
      operation,
      where,
      field
    } = {}) {
      throw new Error(JSON.stringify())

    }
  }
}