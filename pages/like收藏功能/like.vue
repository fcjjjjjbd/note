<!-- 行止至善1 {知}1力行动做到1生 stay错1改1 转0为1 不1则0 以大1兼小 舍小1就大 抱1负0,好习惯 -->

<script setup>
  import debounce from "lodash.debounce";

  const current_id = ref(uniCloud.getCurrentUserInfo().uid); // 当前用户id

  const query = ref({
    pageSize: 10,
    pageCurrent: 1,
    category_id: "",
  });
  const queryList = async (pageNo, pageSize) => {
    try {
      const queryData = unref(query);
      queryData.pageSize = Math.min(10, queryData.pageSize);
      queryData.pageCurrent = (pageNo - 1) * queryData.pageSize;
      let {
        result: {
          errCode,
          data
        },
      } = await db
        .collection("pdd-adv")
        .aggregate()
        .match(`category_id=='${unref(query).category_id}' && order_status != 0 `)
        .lookup({
          from: "uni-id-users",
          let: {
            uid: "$user_id",
          },
          pipeline: $.pipeline()
            .project({
              username: 1,
            })
            .done(),
          as: "userInfo",
        })
        .lookup({
          from: "soup-like",
          let: {
            soupID: "$_id",
          },
          pipeline: $.pipeline()
            .match(
              dbCmd.expr(
                $.and([
                  $.eq(["$like_type", 0]),
                  $.eq(["$$soupID", "$soup_id"]),
                  $.eq(["$user_id", current_id.value]),
                ])
              )
            )
            .count("length")
            .done(),
          as: "likeState",
        })
        .project({
          isLike: $.cond({
            if: $.gt([$.arrayElemAt(["$likeState.length", 0]), 0]),
            then: true,
            else: false,
          }),
          like_count: 1,
          userInfo: $.arrayElemAt(["$userInfo", 0]),
        })
        .sort({
          like_count: -1,
        })
        .skip(queryData.pageCurrent)
        .limit(queryData.pageSize)
        .end();

      if (errCode !== 0) return paging.value.complete(false);
      paging.value.complete(data);

      console.log(data);
    } catch (err) {
      paging.value.complete(false);
    }
  };

  // 子组件收藏功能
  const clickLike = debounce(handleLike, 1000, {
    leading: true,
    trailing: false,
  });

  async function handleLike() {
    if (newItem.value.isLike) {
      newItem.value.like_count--;
      db.collection("soup-like")
        .where({
          soup_id: newItem.value._id,
          user_id: current_id,
          like_type: 0,
        })
        .remove();
    } else {
      newItem.value.like_count++;
      db.collection("soup-like").add({
        soup_id: newItem.value._id,
        like_type: 0,
      });
    }
    newItem.value.isLike = !newItem.value.isLike;
  }
  const demoo = async () => {

  }
  console.log()
</script>
<template>
  <view class="">
    <view class="adv-card-actions">
      <view class="adv-card-icons">
        <!-- 收藏 -->
        <view class="icon-item" @click="clickLike()">
          <uni-icons v-if="newItem.isLike" type="star-filled" size="20" color="#ff0000"></uni-icons>
          <uni-icons v-else type="star" size="20" color="#999"></uni-icons>
          <text v-if="newItem.like_count > 0"
            :style="{ color: newItem.isLike ? '#dd524d' : '#999' }">{{ newItem.like_count }}</text>
          <!-- 占位符，可替换为实际收藏数 -->
        </view>
        <!-- 差评 -->

        <!-- 评论 -->
        <view class="icon-item">
          <uni-icons type="chat" size="20" color="#999"></uni-icons>
        </view>
      </view>

    </view>
</template>

<style lang="scss" scoped>

</style>