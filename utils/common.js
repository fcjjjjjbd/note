//  内部公共函数
//封装弹窗 posttion 只有app使用
export function showToast({
  title = "",
  duration = 1500,
  icon = "none",
  mask = false
} = {}) {
  uni.showToast({
    title: String(title),
    icon,
    mask,
    posttion
  })
}
//判断管理员角色是否
export function isAdminRole() {
  return uniCloud.getCurrentUserInfo().role.includes('admin') ? true : false;
}
export const genderGroup = [{
  value: 0,
  text: "保密"
}, {
  value: 1,
  text: "男"
}, {
  value: 2,
  text: "女"
}]
//审核状态组
export const stateLists = [{
    "value": 0,
    "text": "审核中",
    "color": "#F3A73F",
    "bgColor": "#FDEDD9"
  },
  {
    "value": 1,
    "text": "审核通过",
    "color": "#18BC37",
    "bgColor": "#D1F2D7"
  },
  {
    "value": 2,
    "text": "审核不通过",
    "color": "#E43D33",
    "bgColor": "#FAD8D6"
  }
]
//传入value值返回，状态对象
export function stateFormat(value) {
  return stateLists.find(item => item.value == value)
}
//路由跳转方法
export const routerTo = (url, type = 'navigate') => {
  if (type === "navigate") {
    uni.navigateTo({
      url
    })
  } else if (type === 'redirect') {
    uni.redirectTo({
      url
    })
  } else if (type === "reLaunch") {
    uni.reLaunch({
      url
    })
  } else {
    return "错误信息"
  }
}
//返回上一页
export const goBack = (delta = 1) => {
  uni.navigateBack({
    delta
  })
}