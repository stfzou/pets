<template>
  <div class="addWorkTable">
   <div class="login_nav">
   	<div class="back" @click="back"></div>
   	<div class="title">添加工作报表</div>
   </div>
   <div class="cntList">
     <ul>
       <li class="list1">
         <h3>本周工作总结:</h3>
         <textarea id="summaryRef" v-model="summary" ref="summaryRef"></textarea>
       </li>
       <li>
         <h3>下周工作安排:</h3>
         <textarea v-model="arrange" ref="arrangeRef"></textarea>
       </li>
       <li>
         <h3>需协助工作内容及建议:</h3>
         <textarea v-model="proposal" ref="proposalRef"></textarea>
       </li>
     </ul>
   </div>
   <div class="cmiBtn" @click="commit">提交</div>
  </div>
</template>

<script>
  import Api from '../common/apj.js'
  export default{
    data(){
      return{
        summary:'',//总结
        arrange:'',//安排
        proposal:'',//建议
      }
    },
    mounted() {

      // let t1 = new Date(2019,7,22).getTime();
      // let t2 = new Date(2019,7,30).getTime();

    },
    methods:{
      back(){
      	this.$router.push({
      		name:'workOsInfoList'
      	});
      },
      erroTost(str){
        let toast = this.$createToast({
        	txt:str,
        	type: 'error'
          })
        toast.show()
        return false;
      },
      replaceText(val) {
        var v = val.replace(/\r/g, '');
        if (v != '') {
            v = '<p>' + v.replace(/\n*$/g, '').replace(/\n/g, '</p><p>') + '</p>';
            // alert(v)
            console.log(v)
            return v
        }
      },
      commit(){
        let self = this;
        if(self.summary == ''){
          self.erroTost('请填写本周总结')
        }else if(self.arrange == ''){
          self.erroTost('请填写下周安排')
        }else if(self.proposal == ''){
          self.erroTost('请填写协助工作内容或建议')
        }else{
          let summaryHtml = self.replaceText(self.summary)
          let arrangeHtml = self.replaceText(self.arrange)
          let proposalHtml = self.replaceText(self.proposal)
          self.axios.post(Api.staffApi + '/workReport/addWorkReport', this.qs.stringify({
          	staffId:JSON.parse(localStorage.getItem('staff')).staffId,
            thisWeekContent:summaryHtml,
            nextWeekContent:arrangeHtml,
            suggest:proposalHtml
          }), {
          	headers: {
          		'Content-Type': 'application/x-www-form-urlencoded'
          	}
          }).then((res)=>{
            if(res.data.code==1){

              let toast = this.$createToast({
                txt: '添加成功',
                type: 'correct'
                })
              toast.show();

              setTimeout(()=>{
              	self.$router.push({
                  name:'workTable'
                })
              },500)
            }else{
              alert(res.data.msg)
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  .addWorkTable{
    .login_nav{
    	height: 42px;
    	padding: 22px 0;
    	position: relative;
    	border-bottom: 1px solid #e8e8e8;
    	.back{
    		background: url("../../assets/icon/backColory.png") no-repeat center 0;
    		background-size: cover;
    		width: 24px;
    		height: 40px;
    		position: absolute;
    		left: 20px;
    		top: 50%;
    		margin-top: -21px;
    	}
    	.title{
    		font-size: 30px;
    		color: #333;
    		line-height: 42px;
    		text-align: center;
    	}
    }
    .cntList{
      li{

        padding: 0 20px;
        padding-top: 20px;
        h3{
          font-size: 28px;
          color: #333;
          margin-bottom: 10px;
        }
        textarea{
          width: 100%;
          height: 200px;
          box-sizing: border-box;
          // outline: none;
          border: 1px solid #e8e8e8;/*no*/
        }
      }
      .list1{
        textarea{
          height: 300px;
        }

      }

    }
    .cmiBtn{
      width: 100px;
      height: 50px;
      background: #ff523d;
      color: #fff;
      line-height: 50px;
      text-align: center;
      font-size: 26px;
      margin: 30px auto 0 auto;
      border-radius: 5px;
    }
  }
</style>
