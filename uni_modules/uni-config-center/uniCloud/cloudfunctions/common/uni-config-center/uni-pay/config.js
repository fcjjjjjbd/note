const fs = require('fs');
const path = require('path')
module.exports = {
  // 支付文档https://blog.csdn.net/qq_18798149/article/details/151727409
  // 线上环境服务空间-支付回调地址（如果只有一个服务空间，则只需要配置线上环境服务空间即可）
  "notifyUrl": {
    "mp-809a65a0-175d-4ce6-b53d-81522f24f79b": "https://fc-mp-809a65a0-175d-4ce6-b53d-81522f24f79b.next.bspapp.com/uni-pay-co"
  },
  "notifyKey": "5FB2CD73C7B53918728417C50762E6D45FB2CD73C7B53918728417C50762E6D4", // 跨云函数通信时的加密密钥，建议手动改下，不要使用默认的密钥，长度保持在64位以上即可
  // 微信支付相关
  "wxpay": {
    "enable": true, // 是否启用微信支付
    // 微信 - 小程序支付
    "mp": {
      "appId": "wx8e6e164b2cf51f88",
      "secret": "b1ce55ca32161501348e38eda5149fd5", // 小程序的secret
      "mchId": "1688601235", // 商户id
      "key": "cowyyj3p0pipjfj9p18tcyr11i4mbkca", // v2的api key
      "pfx": fs.readFileSync(__dirname + '/wxpay/apiclient_cert.p12'), // v2需要用到的证书
      "v3Key": "", // v3的api key
      "appCertPath": path.join(__dirname, 'wxpay/apiclient_cert.pem'), // v3需要用到的证书
      "appPrivateKeyPath": path.join(__dirname, 'wxpay/apiclient_key.pem'), // v3需要用到的证书
      "version": 2, // 启用支付的版本 2代表v2版本 3 代表v3版本
    },
    // 微信 - APP支付
    "app": {
      "appId": "", // app开放平台下的应用的appid
      "secret": "", // app开放平台下的应用的secret
      "mchId": "", // 商户id
      "key": "", // v2的api key
      "pfx": fs.readFileSync(__dirname + '/wxpay/apiclient_cert.p12'), // v2需要用到的证书
      "v3Key": "", // v3的api key
      "appCertPath": path.join(__dirname, 'wxpay/apiclient_cert.pem'), // v3需要用到的证书
      "appPrivateKeyPath": path.join(__dirname, 'wxpay/apiclient_key.pem'), // v3需要用到的证书
      "version": 2, // 启用支付的版本 2代表v2版本 3 代表v3版本
    },
    // 微信 - 扫码支付
    "native": {
      "appId": "", // 可以是小程序或公众号或app开放平台下的应用的任意一个appid
      "secret": "", // secret
      "mchId": "", // 商户id
      "key": "", // v2的api key
      "pfx": fs.readFileSync(__dirname + '/wxpay/apiclient_cert.p12'), // v2需要用到的证书
      "v3Key": "", // v3的api key
      "appCertPath": path.join(__dirname, 'wxpay/apiclient_cert.pem'), // v3需要用到的证书
      "appPrivateKeyPath": path.join(__dirname, 'wxpay/apiclient_key.pem'), // v3需要用到的证书
      "version": 2, // 启用支付的版本 2代表v2版本 3 代表v3版本
    },
    // 微信 - 公众号支付
    "jsapi": {
      "appId": "", // 公众号的appid
      "secret": "", // 公众号的secret
      "mchId": "", // 商户id
      "key": "", // v2的api key
      "pfx": fs.readFileSync(__dirname + '/wxpay/apiclient_cert.p12'), // v2需要用到的证书
      "v3Key": "", // v3的api key
      "appCertPath": path.join(__dirname, 'wxpay/apiclient_cert.pem'), // v3需要用到的证书
      "appPrivateKeyPath": path.join(__dirname, 'wxpay/apiclient_key.pem'), // v3需要用到的证书
      "version": 2, // 启用支付的版本 2代表v2版本 3 代表v3版本
    },
    // 微信 - 手机外部浏览器H5支付
    "mweb": {
      "appId": "", // 可以是小程序或公众号或app开放平台下的应用的任意一个appid
      "secret": "", // secret
      "mchId": "", // 商户id
      "key": "", // v2的api key
      "pfx": fs.readFileSync(__dirname + '/wxpay/apiclient_cert.p12'), // v2需要用到的证书
      "v3Key": "", // v3的api key
      "appCertPath": path.join(__dirname, 'wxpay/apiclient_cert.pem'), // v3需要用到的证书
      "appPrivateKeyPath": path.join(__dirname, 'wxpay/apiclient_key.pem'), // v3需要用到的证书
      "version": 2, // 启用支付的版本 2代表v2版本 3 代表v3版本
      // 场景信息，必填
      "sceneInfo": {
        "h5_info": {
          "type": "Wap", // 此值固定Wap
          "wap_url": "", // 你的H5首页地址，必须和你发起支付的页面的域名一致。
          "wap_name": "", // 你的H5网站名称
        }
      }
    },
  },
  // 支付宝相关（加签方式选证书模式，加密算法选RSA2）
  "alipay": {
    "enable": true, // 是否启用支付宝支付
    // 支付宝 - 小程序支付配置
    "mp": {
      "appId": "", // 支付宝小程序appid
      "privateKey": "", // 支付宝商户私钥
      "appCertPath": path.join(__dirname, 'alipay/appCertPublicKey.crt'), // 支付宝商户公钥路径
      "alipayPublicCertPath": path.join(__dirname, 'alipay/alipayCertPublicKey_RSA2.crt'), // 支付宝公钥路径
      "alipayRootCertPath": path.join(__dirname, 'alipay/alipayRootCert.crt'), // 支付宝根证书路径
    },
    // 支付宝 - APP支付配置
    "app": {
      "appId": "2021004108648743", // 支付宝开放平台下应用的appid
      "privateKey": "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDcFJf84MQxqxTFrefXusAdxMpH0f/Qm+oPu9F6Cs3oZndY9nhdNioPMsUX6Vi74SPl5JDxbMtolI7tA0WqOHgS8UG9LZmlQSp8cGjVq7SkgLWNnq7aur0eKf6NQk4KcmA9pYVG4jhjoSce+3TT3Njmv4XzfxIiwYnknY6oJtWBaOUVEdObw8Y2jeii0FaxHbTDYvfAgMuRBXOp5bFGSCrS6snjzldrwojphVzeQlr4JaMkp74/bWB+xhJh8y3ff+rrXPp400DuZEFlTauCDm/svpo42XPUhCC2ofZvyWc5TXEqbEKbPAfUMPb+gtla7KbSI2SXI4pWlqcRNt5wIoPlAgMBAAECggEAKxB8jScOPQnVDrlw3G3Wmfyf+F3HSPK5YkrGOrNSh19Fi0rvUo3+vOqaVot6qYjslVecZSF8zAIF1asGPsC9/jbnPjVmE0glICR+3xCyUF4/KG8cmABicTyWat3Gl5S58FYrNiueDSDDnvRlb++PIdfoRjVfPx3P9cQ+3fh7Xs7i0OxTHvgz97+SS1DfZgCuWMTYa8fwfSBYSmcCpMopsvgany90Te4QgZ/iNl7fdKRxvdJy9yrDomQnqL/HnjqIVTP+uNQMgtyyIhK8A5kF4BZQxLlfon520iaZnoC3bY57rb5yjIkCZWvz9lLg+8dyLx/podBHIO1UAZ74ijUuIQKBgQD1+TdB/P63ArY/P8vBk3ZBzetKi3UiexHt5upDawvMR7YgXA8XfWQfMmp+JQbt6vkWeIKMBQ8P6wO8gDmwrZVXGZI3EOauFKB7aSz4fzRGAH5reLnOUHqvauIcx7zReqjmX61msXZ/WIZf4RDliEagykeiVaiPAma91u1iN+GpNwKBgQDlDS2xLNY/l76MQ35hPFClE21ul5LXdR28KimkPQlLmL6IKsKIpahisdO6BvwReQ3CckACmt904tCq53woHUWirUs+cFU7CX25jYSM4EGezS9loHXMPuyrkwcAXJ+14QUi5vhYa4mBzpV7cP3dLBKAOuu2uQ7YfXXrzcp66ynZwwKBgQC/ZAU9EVBYsoGAQXGX09fmaAW24UBpbf2LcWvCvZ5We04Za8hKbMTlCWOXd9Qmd/kNJQPfU2he6Gzl1ZgOA2L6fOkqc7oqpd4haLsXOFNCTMwRb8ST5kcwCyiZYElpbdnSN4xDJb6gZA9at1NgZmMeZYbLp38al7G98WiQTg8GjQKBgHI0uPSfe5AntC2xtYD8FuXIIwdCckgVsCbTCwJGIK1d0pqIX4jMuIHFUuFtfB+mMTMjzkC+Qe7A7PRaCXDi74amS18tmYGfQN3U7yNi6bUpb5mHgVS+hzkhTRtkE4oXUX1OlsNXky9y9tuewiWWRP9E4aSw7vMI01Qovu289ZgLAoGAFNNIcpVOIs6SkISh69XSQIAtUf0hEh//x7E07T1MoYsAN8jnS+l64oNF/WReot3G6GQedtEupVfmU7HI0XcHeRBlL8n7hCq61RzhmQLqP/lhnhHBsyFzeQPhdjijgj6/uky9SXsYA4fQWycFbc78SPvZbNDtgj2C+QZ/7iaTuSo=", // 支付宝商户私钥
      "appCertPath": path.join(__dirname, 'alipay/appCertPublicKey.crt'), // 支付宝商户公钥路径
      "alipayPublicCertPath": path.join(__dirname, 'alipay/alipayCertPublicKey_RSA2.crt'), // 支付宝公钥路径
      "alipayRootCertPath": path.join(__dirname, 'alipay/alipayRootCert.crt'), // 支付宝根证书路径
    },
    // 支付宝 - H5支付配置（包含：网站二维码、手机H5，需申请支付宝当面付接口权限）
    "native": {
      "appId": "2021004108648743", // 支付宝开放平台下应用的appid
      "privateKey": "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDcFJf84MQxqxTFrefXusAdxMpH0f/Qm+oPu9F6Cs3oZndY9nhdNioPMsUX6Vi74SPl5JDxbMtolI7tA0WqOHgS8UG9LZmlQSp8cGjVq7SkgLWNnq7aur0eKf6NQk4KcmA9pYVG4jhjoSce+3TT3Njmv4XzfxIiwYnknY6oJtWBaOUVEdObw8Y2jeii0FaxHbTDYvfAgMuRBXOp5bFGSCrS6snjzldrwojphVzeQlr4JaMkp74/bWB+xhJh8y3ff+rrXPp400DuZEFlTauCDm/svpo42XPUhCC2ofZvyWc5TXEqbEKbPAfUMPb+gtla7KbSI2SXI4pWlqcRNt5wIoPlAgMBAAECggEAKxB8jScOPQnVDrlw3G3Wmfyf+F3HSPK5YkrGOrNSh19Fi0rvUo3+vOqaVot6qYjslVecZSF8zAIF1asGPsC9/jbnPjVmE0glICR+3xCyUF4/KG8cmABicTyWat3Gl5S58FYrNiueDSDDnvRlb++PIdfoRjVfPx3P9cQ+3fh7Xs7i0OxTHvgz97+SS1DfZgCuWMTYa8fwfSBYSmcCpMopsvgany90Te4QgZ/iNl7fdKRxvdJy9yrDomQnqL/HnjqIVTP+uNQMgtyyIhK8A5kF4BZQxLlfon520iaZnoC3bY57rb5yjIkCZWvz9lLg+8dyLx/podBHIO1UAZ74ijUuIQKBgQD1+TdB/P63ArY/P8vBk3ZBzetKi3UiexHt5upDawvMR7YgXA8XfWQfMmp+JQbt6vkWeIKMBQ8P6wO8gDmwrZVXGZI3EOauFKB7aSz4fzRGAH5reLnOUHqvauIcx7zReqjmX61msXZ/WIZf4RDliEagykeiVaiPAma91u1iN+GpNwKBgQDlDS2xLNY/l76MQ35hPFClE21ul5LXdR28KimkPQlLmL6IKsKIpahisdO6BvwReQ3CckACmt904tCq53woHUWirUs+cFU7CX25jYSM4EGezS9loHXMPuyrkwcAXJ+14QUi5vhYa4mBzpV7cP3dLBKAOuu2uQ7YfXXrzcp66ynZwwKBgQC/ZAU9EVBYsoGAQXGX09fmaAW24UBpbf2LcWvCvZ5We04Za8hKbMTlCWOXd9Qmd/kNJQPfU2he6Gzl1ZgOA2L6fOkqc7oqpd4haLsXOFNCTMwRb8ST5kcwCyiZYElpbdnSN4xDJb6gZA9at1NgZmMeZYbLp38al7G98WiQTg8GjQKBgHI0uPSfe5AntC2xtYD8FuXIIwdCckgVsCbTCwJGIK1d0pqIX4jMuIHFUuFtfB+mMTMjzkC+Qe7A7PRaCXDi74amS18tmYGfQN3U7yNi6bUpb5mHgVS+hzkhTRtkE4oXUX1OlsNXky9y9tuewiWWRP9E4aSw7vMI01Qovu289ZgLAoGAFNNIcpVOIs6SkISh69XSQIAtUf0hEh//x7E07T1MoYsAN8jnS+l64oNF/WReot3G6GQedtEupVfmU7HI0XcHeRBlL8n7hCq61RzhmQLqP/lhnhHBsyFzeQPhdjijgj6/uky9SXsYA4fQWycFbc78SPvZbNDtgj2C+QZ/7iaTuSo=", // 支付宝商户私钥
      "appCertPath": path.join(__dirname, 'alipay/appCertPublicKey.crt'), // 支付宝商户公钥路径
      "alipayPublicCertPath": path.join(__dirname, 'alipay/alipayCertPublicKey_RSA2.crt'), // 支付宝公钥路径
      "alipayRootCertPath": path.join(__dirname, 'alipay/alipayRootCert.crt'), // 支付宝根证书路径
    }
  },
  // ios内购相关
  "appleiap": {
    // ios内购支付
    "app": {
      "password": "", // App 专用共享密钥，App 专用共享密钥是用于接收此 App 自动续期订阅收据的唯一代码。如果您要将此 App 转让给其他开发者或不想公开主共享密钥，建议使用 App 专用共享密钥。非自动续订场景不需要此参数
      "timeout": 10000, // 请求超时时间，单位：毫秒
      "sandbox": false, // 是否是沙箱环境（本地调试ios走的是沙箱环境，故要设置为true，正式发布后，需要设置为false）
    }
  }
}