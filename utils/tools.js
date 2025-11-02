import dayjs from "dayjs";

// 压缩图片上传
export async function convertImageToWebP(blobUrl, scale = 0.6) {
  return new Promise((resolve, reject) => {
    // 创建一个Image对象
    const img = new Image();
    img.crossOrigin = "anonymous"; // 处理跨域问题

    img.onload = () => {
      // 创建一个canvas元素
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // 设置canvas的宽度和高度为图像尺寸乘以缩放比例
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      // 将图像绘制到canvas上，并应用缩放比例
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // 将canvas内容转换为WebP格式的Blob
      canvas.toBlob((webpBlob) => {
        if (webpBlob) {
          // 创建一个新的Blob URL
          const webpBlobUrl = URL.createObjectURL(webpBlob);
          resolve(webpBlobUrl);
        } else {
          reject(new Error("Failed to convert image to WebP format."));
        }
      }, "image/webp");
    };

    img.onerror = (error) => {
      reject(new Error("Failed to load image from blob URL."));
    };

    // 设置Image对象的src为传入的blob URL
    img.src = blobUrl;
  });
}
// 价格把分换成元
export function priceFormat(num) {
  return num / 100;
}



//超出指定字符显示省略号
export function truncateString(str, num) {
  if (str.length > num) {
    return str.substring(0, num);
  } else {
    return str;
  }
}

//性别格式化
export function formatGender(value) {
  const genderMap = {
    0: "保密",
    1: "男",
    2: "女",
  };
  return genderMap[value] || "保密";
}

// 防止程序员写代码混乱
export function removeHtmlTags(text) {
  return text.replace(/<[^>]*>/g, "");
}
//向外导出省份
export function getProvince() {
  return new Promise((resolve, reject) => {
    let historyProvince = uni.getStorageSync("historyProvince");
    if (historyProvince) {
      if (Date.now() - historyProvince.time > 1000 * 60 * 60) {
        getIp()
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        resolve(historyProvince.province);
      }
    } else {
      getIp()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
}

//获取所在省市
function getIp() {
  return new Promise((resolve, reject) => {
    uni.request({
      url: "https://restapi.amap.com/v3/ip?key=4a43fb1fc001e386a52215b6feea63f4",
      success: (res) => {
        let str = "";
        typeof res.data.province == "string" ?
          (str = res.data.province) :
          (str = "火星");
        resolve(str);
        let obj = {
          province: str,
          time: Date.now(),
        };
        uni.setStorageSync("historyProvince", obj);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
} //获取缩略图
export function getSmallImg(url, width = 100) {
  if (url) return url + "?x-oss-process=image/resize,w_" + width;
  else return "/static/images/notPic.png";
}

export function calculateDistance(point1, point2) {
  // 从数组中提取经纬度，数组格式为 [经度, 纬度]
  const lon1 = point1[0];
  const lat1 = point1[1];
  const lon2 = point2[0];
  const lat2 = point2[1];

  // 地球半径（公里）
  const R = 6371;

  // 将角度转换为弧度
  const toRadians = (degree) => degree * (Math.PI / 180);

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
    Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // 计算距离并格式化输出（保留1位小数）
  const distance = R * c;
  return `${distance.toFixed(1)}km`;
}
// 生成订单号
export function uuid() {
  // 生成17位的时间字符串（YYYYMMDDHHmmssSSS）
  const baseTime = dayjs().format("YYYYMMDDHHmmssSSS");

  // 生成5位随机数（00000-99999），确保补足5位
  const randomNum = Math.floor(Math.random() * 100000)
    .toString()
    .padStart(5, "0");

  // 拼接后总长度为 17 + 5 = 22 位
  const result = baseTime + randomNum;
  return result;
}