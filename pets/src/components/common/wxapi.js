import wx from 'weixin-js-sdk'
import Axios from 'axios'
const wxApi = {
  /**
  * [wxRegister 微信Api初始化]
  * @param  {Function} callback [ready回调函数]
  */
  wxRegister (callback) {
    // 这边的接口请换成你们自己的
    console.log(window.location.href)
    Axios.post('http://app.gutouzu.com/getfour.action',{url:window.location.href},{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function(res) {

          let data = res.data; // PS: 这里根据你接口的返回值来使用
          console.log(data.sgture)
          wx.config({
            debug: false, // 开启调试模式
            appId: data.appid, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.noncestr, // 必填，生成签名的随机串
            signature: data.sgture, // 必填，签名，见附录1
            jsApiList: [
              'checkJsApi',
              'onMenuShareTimeline',//-----------------我们这里用了分享朋友圈
              'onMenuShareAppMessage',//----------------好友
              'onMenuShareQQ',
              'onMenuShareQZone'

            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          })


      }).catch(function(error) {
        console.log(error);
      });
    wx.ready((res) => {
      // 如果需要定制ready回调方法
      if (callback) {
        callback()
      }
    })
  },
  /**
  * [ShareTimeline 微信分享到朋友圈]
  * @param {[type]} option [分享信息]
  * @param {[type]} success [成功回调]
  * @param {[type]} error   [失败回调]
  */
  ShareTimeline (option) {
    wx.onMenuShareTimeline({
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
  },
  /**
  * [ShareAppMessage 微信分享给朋友]
  * @param {[type]} option [分享信息]
  * @param {[type]} success [成功回调]
  * @param {[type]} error   [失败回调]
  */
  ShareAppMessage (option) {
    wx.onMenuShareAppMessage({
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
  },
  ShareQQMessage (option){
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
  }
}
export default wxApi
