<!-- 取消自动获取数据 -->
<!-- 自动刷新插件和导航滑块 -->
@query自动触发方法请求数据, :auto="false"取消自动触发
reload手动刷新列表数据分页数据pageNo恢复为默认值 = refresh刷新列表数据，pageNo和pageSize不会重置
paging.value.complete(data); 响应列表数据赋值
default-page-size 自定义页数 #top置顶
safe-area-inset-bottom 底部安全区域
空数据显示的 uview有图
<z-paging empty-view-text="抢先回复" empty-view-img="http://cdn.uviewui.com/uview/empty/comment.png">
  插槽 固定顶部底部bottom
  <template #top>
  </template>
  学习为什么 nextTick(() => {
  paging.value.reload();
  });
