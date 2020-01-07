<template>
  <div class="aboutBox">
    <div class="aboutWarp">
    	<div class="companyInt">
    		<div class="cntWarp cntBox flex_r_s_b">
    			<img src="../assets/about_01.png" alt="" />
    			<div class="desc">
    				<p>
    					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;骨米宠物是成都爱之宠宠物有用品限公司旗下的网站，创立于2018年4月，致力于打造成全国知名的宠物行业深度分销平台。创始核心团队人员主要来自阿里巴巴及百度，致力于将海内外最新的宠物行业顶级品牌、最新的宠物营销知识、最好的消费理念通过全中国宠物店，带给国内大中城市的宠物消费者，帮助消费者完成消费升级。
    				</p>
    				<div class="line"></div>
    			</div>
    		</div>
    	</div>
    	<div class="zsgjWarp">
    		<div class="cntWarp">
    			<h1>宠物互联网的推动者</h1>
    			<div class="desc">
    				骨米通过构建本地宠物生活商圈，为宠物门店提供精准的流量入口和丰富的营销工具，解决宠物门店客流量少、经营难的问题。以资源整合的方式，提升宠物店整体服务标准和经营能力，帮助商家构建线上线下结合的O2O经营体系。
    			</div>
    		</div>

    	</div>
    	<div class="missionWarp">
    		<div class="cntWarp missionCnt">

    			<ul class="flex_r_s_b">
    				<li>
    					<img src="../assets/index_jytd01.png"/>
    					<h3>使命</h3>
    					<p>让门店流量更有价值</p>
    				</li>
    				<li>
    					<img src="../assets/index_jytd02.png"/>
    					<h3>愿景</h3>
    					<p>成为中国最大的门店流量运营商</p>
    				</li>
    				<li>
    					<img src="../assets/index_jytd03.png"/>
    					<h3>价值观</h3>
    					<p>诚信   专注   开放   价值</p>
    				</li>
    			</ul>
    		</div>
    	</div>

    	<div class="teamWarp">
    		<div class="cntWarp">

    			<h1>团队优势</h1>
    			<ul>
    				<li class="flex_r_f_s">
    					<img class="teamImg" src="../assets/team_pic_01.png" alt="" />
    					<div class="list_r">
    						<img src="../assets/about_list_01.png" alt="" />
    						<p>20年产品运营、技术开发管理经验，有多年线下商超及新零售公司管理经验，十五年移动互联网行业经验。</p>
    					</div>
    				</li>
    				<li class="flex_r_f_s">
    					<img class="teamImg" src="../assets/team_pic_02.png" alt="" />
    					<div class="list_r">
    						<img src="../assets/about_list_02.png" alt="" />
    						<p>10年以上互联网、移动互联网产品研发领域的技术管理、产品需求分析平台设计和开发经验。互联网行业经验。</p>
    					</div>
    				</li>
    				<li class="flex_r_f_s">
    					<img class="teamImg" src="../assets/team_pic_03.png" alt="" />
    					<div class="list_r">
    						<img src="../assets/about_list_03.png" alt="" />
    						<p>中国青年电商精英，中国青年电商联盟成员，四川青年企业家协会成员，著名Ｏ２Ｏ电商品牌联合创始人。</p>
    					</div>
    				</li>
    				<li class="flex_r_f_s">
    					<img class="teamImg" src="../assets/team_pic_04.png" alt="" />
    					<div class="list_r">
    						<img src="../assets/about_list_04.png" alt="" />
    						<p>先后在到家美食会，百度外卖等公司任职区域经理等职务，带领团队开拓北京、天津、沈阳深圳、兰州等城市的外卖、智慧餐厅项目，拥有广泛的行业资源</p>
    					</div>
    				</li>
    			</ul>
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
  .aboutBox{
    padding-top:108px;
    .cntWarp{
      width:1100px;
      margin:0 auto;
    }
    .aboutWarp .companyInt .cntBox{
    	padding: 90px 0;
    	box-sizing: border-box;
    }
    .aboutWarp .companyInt .cntBox .desc{
    	width: 400px;
    }
    .aboutWarp .companyInt .cntBox .desc p{

    	font-size:16px;
    	color: #666;
    	line-height:48px;
    }
    .aboutWarp.companyInt .cntBox .desc .line{
    	height:2px;
    	background: #FF523D;
    	width: 350px;
    	margin: 40px auto 0 auto;
    }

    .aboutWarp .missionWarp{
    	height: 480px;
    	/*background: url(../../../assets/about_bg.png) no-repeat center center;*/

      .missionCnt{

        ul{
          padding:30px 10px 10px 10px;
        }
      }
    }
    .aboutWarp .zsgjWarp .desc{
    	padding: 30px 0 30px 0;
        font-size: 18px;
        line-height: 36px;
        text-align: center;
    }
    .aboutWarp .missionWarp .title{
    	font-size:36px;
    	color: #fff;
    	padding-top: 50px;
    }

    /*.aboutWarp .missionWarp ul li{
    	padding-top: 60px;
    }
    .aboutWarp .missionWarp ul li img{
    	margin-right: 18px;
    }
    .aboutWarp .missionWarp ul li p{
    	font-size:16px;
    	color: #fff;

    }*/
    .aboutWarp .missionWarp ul{
    	padding-top: 100px;
    }
    .aboutWarp .missionWarp ul li{
    	width: 300px;
    	padding: 50px 0 30px 0;
    	box-shadow:0px 0px 20px 0px rgba(90,90,90,0.1);
    	border-radius:20px;
    	box-sizing: border-box;
    	height: 360px;
    }
    .aboutWarp .missionWarp ul li img{
    	margin: 0 auto;
    	display: block;
    	height: 83px;
    }
    .aboutWarp .missionWarp ul li h3{
    	color:#333333;
    	font-weight:bold;
    	font-size:18px;
    	text-align: center;
    	width: 146px;
    	padding-top: 40px;

    	text-align: center;
    	margin: 0 auto;
    }
    .aboutWarp .missionWarp ul li p{
    	padding-top: 22px;
    	width: 146px;
    	color:#666666;
    	font-size:14px;
    	line-height:24px;
    	text-align: center;
    	margin: 0 auto;
    }
    .aboutWarp .teamWarp{
    	padding: 60px 0;
      text-align:left;
    }
    .aboutWarp .teamWarp .title_img{
    	margin: 0 auto;
    	display: block;
    }
    .aboutWarp .teamWarp ul{
    	padding-top: 20px;
    }
    .aboutWarp .teamWarp ul li{
    	padding-top: 30px;
    }
    .aboutWarp .teamWarp ul li .teamImg{
    	margin-right: 30px;
    }
    .aboutWarp .teamWarp ul li p{
    	font-size:14px;
    	color: #666;
    	line-height:24px;
    	padding-top: 20px;
    }
  }
</style>
