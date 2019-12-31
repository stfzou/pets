<template>
  <div class="indexWarp">
    <div class="indexCnt">
        <div class="phoneBg">

        </div>
        <div class="propagandaBox">
          <div class="propaganda">
            养宠上骨米 <br>
            生活更有趣
          </div>
          <div class="erweimaBox flex_r_f_s">
            <div class="ios ewmItem">
              <div class="divTop flex_r_f_s">
                <img src="../assets/iOS.png" alt="">
                <span>IOS版</span>
              </div>
              <div class="ewm">
                <img src="../assets/ewm.png" alt="">
              </div>
            </div>
            <div class="android ewmItem">
              <div class="divTop flex_r_f_s">
                <img src="../assets/Android.png" alt="">
                <span>安卓版</span>
              </div>
             <div class="ewm">
                <img src="../assets/ewm.png" alt="">
              </div>
            </div>

          </div>
        </div>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{

      }
    }
  }
</script>

<style lang="scss" scoped="scoped">
  .indexWarp{
    // overflow: scroll;
    padding-top:106px;
    box-sizing:border-box;
    .indexCnt{

      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      .phoneBg{
        width: 300px;
        height: 600px;
        background: url('../assets/phoneBg.png') no-repeat;
        background-size: contain;
      }
      .propagandaBox{
        .propaganda{
          font-size:40px;
          line-height:56px;

        }
        .erweimaBox{
          padding-top:30px;
          margin-left:50px;
          align-items:flex-start;
          .ios{
            margin-right:20px;
          }
          .ewmItem{
            position: relative;
            border-radius: 20px;
            padding:10px;
            background:#fff;
            .divTop{
              width: 150px;
              background:#fff;
              justify-content: center;
              align-items: center;
              img{
                width:30px;
                margin-right:5px;
              }
            }
            .ewm{
              background:#fff;
              margin-top:10px;
              img{
                width:134px;
                height:134px;
              }
            }

          }
        }
      }
    }
  }
</style>
