const db = uniCloud.database(); // 连接云对象整体
module.exports = async (obj) => {
  let user_order_success = true;
  let {
    data = {}
  } = obj;
  let {
    order_no,
    out_trade_no,
    total_fee
  } = data; // uni-pay-orders 表内的数据均可获取到
  await db.collection("goods_orders").where({
    order_no
  }).update({
    status: 1
  })
  // 删除所有没有支付订单
  db.collection("goods_orders").where({
    status: 0
  }).remove();
  return user_order_success;
};