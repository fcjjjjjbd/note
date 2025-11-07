<script setup>
  const db = uniCloud.database()
  const dbCmd = db.command
  const $ = dbCmd.aggregate

  const getList = async () => {
      let {
        result: {
          errCode,
          data
        }
      } = await db.collection('goods-chicken').aggregate()
        .lookup({
          from: 'books',
          pipeline: $.pipeline()
            .match(dbCmd.expr($.and([ 
              $.eq(['$title', '$$order_book']),
              $.eq(['$goods_id', '$$uid']),
              $.gte(['$total_fee', 600])
            ])))
            .done(),
          as: 'bookList',
        })
        .lookup({
          from: "goods-lastread",
          let: {
            goodid: '$_id'
          },
          pipeline: $.pipeline().match(dbCmd.expr($.eq(['$user_id', userinfoid])))
            .project({
              goods_item: 1
            }).done(),
          as: "lastreads"
        })
        .addFields({
          lastreads: $.map({
            input: "$lastreads",
            as: "item",
            in: "$$item.goods_item"
          })
        })
        .match({
          status: 1,
          isdelete: dbCmd.neq(true)
        })
        .addFields({
          lastreads: $.map({
            input: "$lastreads",
            as: "item",
            in: "$$item.goods_item"
          })
        })
        .lookup({
          from: "uni-id-users",
          let: {
            uid: '$user_id'
          },
          pipeline: $.pipeline().match(dbCmd.expr($.eq(['$_id', '$$uid'])))
            .count('length')
            .project({
              username: 1,
              avatar: 1,
            }).done(),
          as: "userInfo"
        })
        .addFields({
          numa: 5
        })
        .project({
          collect: $.multiply(['$collect_count', '$numa']), 

          collect_count: $.cond({
            if: $.gte(['$amount', 200]),
            then: 0.7,
            else: 0.9
          }),
          comment_count: 1,
          content: 1,
          from: 1,
          like_count: 1,
          soup_type: 1,
          view_count: 1,
          userInfo: $.arrayElemAt(['$userInfo', 0]),
          lastreads: 1
        })




        .sort({
          time: -1
        })
        .sample({
          size: 5
        })
        .skip(skip)
        .limit(pageSize)
        .end();
      console.log(data);
      listData.value = data
      if (errCode != 0) return showToast("信息有误，请重新刷新", "none");
    }
  .lookup({
      from: "goods_orders",
      let: {
        uid: '$_id'
      },
      pipeline: $.pipeline()
        .match(dbCmd.expr($.and([ 
          $.eq(['$goods_id', '$$uid']),
          $.gte(['$total_fee', 600])
        ])))
        .project({
          goods_id: 1,
          total_fee: 1
        })
        .count('length')
        .done(),
      as: "orderlength"
    })
  project({
      orderlength: $.arrayElemAt(['$orderlength.length', 0]),
    })
    .addFields({
      orderlength: $.ifNull(['$orderlength', 0]),
    })
 
    
</script>
<template>
</template>