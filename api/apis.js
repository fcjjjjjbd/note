// 网络请求公共配置
import {
  request
} from "@/utils/request.js"
export function apiGetBanner() {
  return request({
    url: "/homeBanner"
  })
}
export function apiGetfenlei(data = {}) {
  return request({
    url: "/clas",
    data: data,
    method: "POST"
  })
}