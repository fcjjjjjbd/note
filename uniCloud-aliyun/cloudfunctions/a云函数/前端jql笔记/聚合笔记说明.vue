<template>
  uni聚合=微信聚合文档
  https://developers.weixin.qq.com/miniprogram/dev/wxcloudservice/wxcloud/reference-sdk-api/database/Command.html
  仅用于复杂查询，不可执行增删改
</template>

<script>
  addFields拼接多个字段值 tv7 .2 / 13
  $ 1 字段路径 字段属性值
  pipeline里可以嵌套lookup

    .lookup({
        pipeline: $.pipeline().match(dbCmd.expr($.eq(['$reply_parent_id', '$$uuid']))) = jql where
          .lookup({
            )
          }(
          })
      .done() const getList = async () => {
        $变量字段路径,
        dbCmd聚合指令
        const res = await db.collection('soup-chicken').aggregate() 获取数据库集合,
          定义开始聚合操作
          .match(`status ==1 `) //  = jql里的where用法
          .match(dbCmd.expr($.not($.in(['$_id', "$readedarr"])))) //match可以连续写2个,not取反,in包含数组里
          .lookup({ // 联表查询方法
            from: "uni-id-users", // 关联哪个表
            let: {
              uid: '$user_id' // 变量,soup-chicken关联关系的字段
            },
            // $.pipeline()在aggregate里开启管道操作
            pipeline: $.pipeline().match(dbCmd.expr($.eq(['$_id',
                '$$uid'
              ]))) // eq比较相等true的返回，dbCmd.expr（符合条件的筛选出来)
              .project({
                = filed
                username: 1,
                avatar: 1,
              })
              .count('length')
              .done(), // $当前from里的表聚合操作符 $$当前的变量uid pipeline()开启一个管道
            as: "userinfo" //新增关联别名
          })
        sum 可以计算所有字段单字段的总和,
        //字段不存在,null,undefine返回默认值
        orderlength: $.ifNull(['$orderlength', 0])
          // map操作
          .addFields({ //新增新的字段,同名覆盖 /单独新增
            lastreads: $.map({
              input: "$lastreads", //处理的数组
              as: "item", //相当于item 数组各个元素的变量
              in: "$$item.goods_item" //map表达式遍历函数方法
            })
          })
          //三相表达式<布尔表达式>, <真值>, <假值>/project
          .dis: $.cond({
            if: $.gte(['$amount', 200]),
            then: 0.7,
            else: 0.9
          })
        $.and([ //所有条件都满足/match
          $.eq(['$like_type', 0]),
          $.eq(['$user_id', current_id]),
          $.eq(['$soup_id', '$$goodsid'])
        ])
        .project({ //过滤 = field
          content: 1,
          from: 1,
          userInfo: $.arrayElemAt(['$userinfo', 0]) //arrayElemAt（）把uid数组[0]对象直接解构对象， 同名覆盖原来的
          $.arrayElemAt(['$userinfo.length', 0])
        })
        .sample({
          size: 5
        }) 随机从数据中选取指定数量
        .sort({
          age: -1,
          score: -1
        }) //排序
        .end() // 聚合操作定义完成, 发起实际聚合请求
      }