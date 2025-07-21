// 公共工具类引入 import {giveName} from "../../utils/tools.js"	
// 价格把分换成元
export function priceFormat(num) {
  return (num / 100).toFixed(2);
}

// 压缩图片上传,最低0.6
export async function convertImageToWebP(blobUrl, scale = 0.6) {
  return new Promise((resolve, reject) => {
    // 创建一个Image对象
    const img = new Image();
    img.crossOrigin = 'anonymous'; // 处理跨域问题

    img.onload = () => {
      // 创建一个canvas元素
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

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
          reject(new Error('Failed to convert image to WebP format.'));
        }
      }, 'image/webp');
    };

    img.onerror = (error) => {
      reject(new Error('Failed to load image from blob URL.'));
    };

    // 设置Image对象的src为传入的blob URL
    img.src = blobUrl;
  });
}


//获取富文本内的图片url地址
export function getImgSrc(richtext, num = 3) {
  let imgList = [];
  richtext.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, (match, capture) => {
    imgList.push(capture);
  });
  imgList = imgList.slice(0, num)
  export function removeHtmlTags(text) {
    return text.replace(/<[^>]*>/g, '');
  }
  //向外导出省份
  export function getProvince() {
    return new Promise((resolve, reject) => {
      let historyProvince = uni.getStorageSync("historyProvince");
      if (historyProvince) {
        if ((Date.now() - historyProvince.time) > 1000 * 60 * 60) {
          getIp().then(res => {
            resolve(res)
          }).catch(err => {
            reject(err)
          })
        } else {
          resolve(historyProvince.province);
        }
      } else {
        getIp().then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      }
    })
  }
  //获取所在省市
  function getIp() {
    return new Promise((resolve, reject) => {
      uni.request({
        url: "https://restapi.amap.com/v3/ip?key=4a43fb1fc001e386a52215b6feea63f4",
        success: res => {
          let str = ""
          typeof(res.data.province) == "string" ? str = res.data.province: str = "火星"
          resolve(str)
          let obj = {
            province: str,
            time: Date.now()
          }
          uni.setStorageSync("historyProvince", obj);
        },
        fail: err => {
          reject(err)
        }
      })
    })
  }


  //获取昵称
  export function giveName(item) {
    return item.user_id[0].nickname || item.user_id[0].username || item.user_id[0].mobile || "请设置昵称"
  }

  //获取默认头像
  export function giveAvatar(item) {
    return item.user_id[0]?.avatar_file?.url ?? '../../static/images/user-default.jpg'
  }


  const db = uniCloud.database();
  const utilsObj = uniCloud.importObject("utilsObj", {
    customUI: true
  });

  //点赞操作数据库的方法
  export async function likeFun(artid) {
    let count = await db.collection("quanzi_like")
      .where(`article_id=="${artid}" && user_id==$cloudEnv_uid`).count()
    if (count.result.total) {
      db.collection("quanzi_like").where(`article_id=="${artid}" && user_id==$cloudEnv_uid`)
        .remove();
      utilsObj.operation("quanzi_article", "like_count", artid, -1)

    } else {
      db.collection("quanzi_like").add({
        article_id: artid
      })
      utilsObj.operation("quanzi_article", "like_count", artid, 1)
    }
  }

  // 防止程序员写程序攻击
  export function removeHtmlTags(text) {
    return text.replace(/<[^>]*>/g, '');
  }




  //性别格式化
  export function formatGender(value) {
    const genderMap = {
      0: "保密",
      1: "男",
      2: "女"
    };
    return genderMap[value] || "保密";
  }

  //超出指定字符显示省略号
  export function truncateString(str, num) {
    if (str.length > num) {
      return str.substring(0, num) + '...';
    } else {
      return str;
    }
  }