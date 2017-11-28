# ionic-cordova-plugin-alipay
## 前言：
ionic3之后，官方自己的cordova-plugin-alipay都不是很好用，具体的issuus:
https://github.com/pipitang/cordova-alipay-base/issues/11
自己修改了，写了一套。
基于https://github.com/hhjjj1010/cordova-plugin-alipay-v2.git项目修改，ionic3上可以直接使用
使用最新alipaySdk-20170725包
### 本插件仅支持《APP支付》，不支持移动支付
***
## 功能说明
1. 根据支付宝的说明文档的建议，为保证安全，签名都放到后端去做，前端只需要接收后台传入签名字符串，使用该插件调用支付宝SDK完成支付
2. APP_ID：对应开放平台中应用的APPID，主要用于iOS平台xcode构建URL Schemes

***
## 支持平台
1. android （alipaySdk-20170725.jar）
2. iOS

***
## 安装
### 在线安装
    cordova plugin add https://github.com/open-more/cordova-plugin-ionic-alipay.git --variable APP_ID=[your AppId]

### 本地安装
下载插件到本地
    cordova plugin add /your/local/path --variable APP_ID=[your AppId]
***
### 使用 API
#### 1. 创建alipay.service.ts
```
import { Injectable } from '@angular/core';
import { CordovaInstance } from '@ionic-native/core';


@Injectable()
export class AlipayService {

    pay(payInfo, successCallback, errorCallback) {
        if (typeof window.Alipay === "undefined") {
            alert("alipay plugin is not installed.");
            return false;
        }
        window.Alipay.payment(payInfo, successCallback, errorCallback);
    }
}
```
#### 2. 在src/app/目录下创建app.definition.ts
```
interface Window {
    Alipay: any,
}
```
#### 3. 在对应的ts文件里直接调用Service即可
```
...
import { AlipayService } from '../../service/alipay.service';

@Component({
  ...
  providers: [
    AlipayService,
  ]
  ...
})

  ...
  constructor(private alipayService: AlipayService) {
  }
  ...

alipayClicked() {
    this.alipayService.pay(payInfo, function success(result){
      console.log(result); // Success
    }, function error(result){
      //result.resultStatus  状态代码  e.result  本次操作返回的结果数据 e.memo 提示信息
      //result.resultStatus  9000  订单支付成功 ;8000 正在处理中  调用function success
      //result.resultStatus  4000  订单支付失败 ;6001  用户中途取消 ;6002 网络连接出错  调用function error
      console.log(result); // error
    });
}
```
