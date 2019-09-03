import wx from 'weixin-js-sdk'
import Axios from 'axios'
import Qs from 'qs'
const wxApi = {
  /**
  * [wxRegister 微信Api初始化]
  * @param  {Function} callback [ready回调函数]
  */
  wxRegister (option) {
    // 这边的接口请换成你们自己的

    Axios.post('http://app.gutouzu.com/getfour.action',Qs.stringify({url:encodeURIComponent(window.location.href.split('#')[0])}),{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function(res) {

          wx.config({
            debug: false, // 开启调试模式
            appId: res.data.appid, // 必填，公众号的唯一标识
            timestamp: res.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.data.noncestr, // 必填，生成签名的随机串
            signature: res.data.sgture, // 必填，签名，见附录1
            jsApiList: [
              'checkJsApi',
              'onMenuShareTimeline',//-----------------我们这里用了分享朋友圈
              'onMenuShareAppMessage',//----------------好友
              'onMenuShareQQ',
              'onMenuShareQZone'

            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          })
          wx.ready(() => {
            // 如果需要定制ready回调方法
            // alert(1)
            wx.onMenuShareQQ({
                  title: option.title, // 分享标题
                  desc: option.desc, // 分享描述
                  link: option.link, // 分享链接
                  imgUrl: option.imgUrl, // 分享图标
                  success () {
                    // 用户成功分享后执行的回调函数
                    option.success()
                  },
                  cancel () {
                    // 用户取消分享后执行的回调函数
                    option.error()
                  }

            });

            wx.onMenuShareAppMessage({//分享微信好友
              title: option.title, // 分享标题
              desc: option.desc, // 分享描述
              link: option.link, // 分享链接
              imgUrl: option.imgUrl, // 分享图标
              success () {
                // 用户成功分享后执行的回调函数
                option.success()
              },
              cancel () {
                // 用户取消分享后执行的回调函数
                option.error()
              }
            })

            wx.onMenuShareTimeline({//微信朋友圈分享
              title: option.title, // 分享标题
              link: option.link, // 分享链接
              imgUrl: option.imgUrl, // 分享图标
              success () {
                // 用户成功分享后执行的回调函数

                option.success()
              },
              cancel () {
                // 用户取消分享后执行的回调函数
                option.error()
              }
            })
          });

      }).catch(function(error) {
        console.log(error);
      });

  }

}
export default wxApi
