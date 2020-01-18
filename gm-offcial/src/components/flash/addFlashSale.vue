<template>
  <div class="addFlashSaleWarp">
    <div class="title">添加限时折扣</div>
    <div class="addFlashSaleCnt">

      <div class="topNav flex_r_f_s">
       <router-link :to="{name:'flashSale'}">所有活动</router-link>
      </div>
      <div class="activityInfo">
        <div class="itemTitle"><span>活动信息</span></div>
        <ul class="activityFrom">
          <li class="flex_r_f_s">
             <div class="list_l">
               <b>*</b>活动名称
             </div>
             <div class="list_r">
               <el-input
                 type="text"
                 size="mini"
                 class="nameInput"
                 placeholder="请输入内容"
                 v-model="activityName"

                 show-word-limit>
               </el-input>
             </div>
          </li>
          <li class="flex_r_f_s">
             <div class="list_l">
               <b>*</b>生效时间
             </div>
             <div class="list_r">

                <el-date-picker
                      size="mini"
                      v-model="activityTime"
                      @change="dataChange"
                      :picker-options="pickerOptions"
                      value-format="yyyy-MM-dd"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
             </div>
          </li>
          <li class="flex_r_f_s">
             <div class="list_l">
               <b style="color:#fff">*</b>活动描述
             </div>
             <div class="list_r">

               <el-input
                 type="textarea"
                 placeholder="请输入活动描述"
                 v-model="activityDesc"
                 maxlength="200"
                 show-word-limit
               >
               </el-input>

             </div>
          </li>
          <!-- <li class="flex_r_f_s">
             <div class="list_l">
               <b>*</b>限购设置
             </div>
             <div class="list_r">
                <div class="limitBox flex_r_f_s">
                  <div class="limit_l">
                    <el-radio v-model="radio" label="1">不限购</el-radio>
                  </div>
                  <div class="limit_r flex_r_f_s">
                     <el-radio v-model="radio" label="2">每人限购</el-radio>
                     <el-input
                       type="text"
                       size="mini"
                       class="limitInput"
                       v-model="input">
                     </el-input>
                     <span>件</span>
                  </div>

                </div>
             </div>
          </li> -->
         <!-- <li class="flex_r_f_s">
             <div class="list_l">
               <b>*</b>是否包邮
             </div>
             <div class="list_r">
                <el-checkbox v-model="checked">包邮</el-checkbox>
             </div>
          </li> -->
        </ul>
      </div>
      <div class="selectGoods">
        <div class="itemTitle"><span>选择活动商品</span></div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="选择商品" name="first" class="selectGoodsTab">
              <div class="addBtnBox flex_r_s_b">
                  <!-- <el-button type="primary" size="small"></el-button> -->
                  <span></span>
                  <el-input
                      class="search"
                      placeholder="请输入活动名称"
                      suffix-icon="el-icon-search"
                      v-model="input2">
                  </el-input>
              </div>
              <el-table
                  :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                  ref="multipleTable"
                  :data="selectGoodsTable"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="handleSelectionChange">
                  <el-table-column
                    type="selection"
                    width="55"
                    :selectable="isSelect">
                  </el-table-column>
                  <el-table-column
                    label="商品"
                    width="400">
                    <template slot-scope="scope">
                    <div class="imgBox flex_r_f_s pointer">
                      <img width="50" height="50" :src="scope.row.pIcon.split(',')[0]" alt="顶致宽台面碗">
                      <span>{{scope.row.pName}}</span>
                    </div>
                    </template>
                  </el-table-column>

                  <el-table-column
                    prop="sumStock"
                    label="可销售库存"
                    show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column
                    prop="boneBeanPrice"
                    label="销售价(元)"
                    show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column
                    prop="originalPrice"
                    label="市场价(元)"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="costPrice"
                    label="成本价(元)"
                  >
                  </el-table-column>
                  <el-table-column

                    label="操作"
                    show-overflow-tooltip>
                    <template slot-scope="scope">
                     <div class="operation">
                       <el-button v-if="!scope.row.isJoin" type="primary" size="mini" @click="single(scope.row)">参加</el-button>
                       <span class="pointer" v-else style="color: #ff523d;" @click="cancelSingle(scope.row)">取消参加</span>
                     </div>

                    </template>
                  </el-table-column>
                </el-table>
                <div class="paginationBox flex_r_s_b">
                  <div class="pagination_l">
                      <el-button size="mini" @click="batchJoin" :disabled="selectGoodsSelection.length==0">批量参加</el-button>
                  </div>
                  <el-pagination
                    background
                    layout="prev, pager, next, jumper"
                    :total="selectGoodsTotalPage"
                    :page-size="30"
                    @prev-click="selectGoodsPrevClick"
                    @next-click="selectGoodsNextClick"
                    @current-change="selectGoodsCurrentChange">
                  </el-pagination>
                </div>

            </el-tab-pane>

            <el-tab-pane :label="'设置折扣'+'('+saleTable.length+')'" name="second" class="setSaleBox">
                <div class="addBtnBox flex_r_s_b">
                  <!-- <el-button type="primary" size="small"></el-button> -->
                  <div class="item_l flex_r_f_s">
                    <div class="largeSale">
                      <el-button size="mini" :disabled="selectSetGoodsSelection.length==0" @click="isLargeChange(1)">批量打折</el-button>
                      <el-button size="mini" :disabled="selectSetGoodsSelection.length==0" @click="isLargeChange(2)">批量减价</el-button>
                      <el-button size="mini" :disabled="selectSetGoodsSelection.length==0" @click="isLargeChange(3)">批量限购</el-button>
                    </div>
                    <div class="largeInput" v-show="isLargeSale===1&&isBtn==true">
                      <el-input v-model="largeSale" @change="batchJoinSale" size="mini" type="number"></el-input>
                      <span>折</span>
                    </div>
                    <div class="largeInput" v-show="isLargeSale===2&&isBtn==true">
                      <el-input @change="batchReduce" v-model="reduceVal" size="mini" type="number"></el-input>
                      <span>元</span>
                    </div>
                    <div class="largeInput" v-show="isLargeSale===3&&isBtn==true">
                      <el-input @change="batchLimit" v-model="limitVal" size="mini" type="number"></el-input>
                      <span>件</span>
                    </div>
                  </div>
                  <div class="setLastPrice flex_r_f_s" v-show="selectSetGoodsSelection.length>0">
                    <span>设置价格尾数</span>
                    <el-input v-model="lastPrice" @change="batchLastPrice" size="mini" type="number"></el-input>
                  </div>
              </div>
              <el-table
                  :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                  ref="multipleTable2"
                  :data="saleTablePageData"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="setGoodsSelectionChange">
                  <el-table-column
                    type="selection"
                    width="55"
                    :selectable="isSetSelect">
                  </el-table-column>
                  <el-table-column
                    label="商品名称"
                    width="250">
                    <template slot-scope="scope">
                    <div class="imgBox flex_r_f_s pointer">
                      <img width="50" height="50" :src="scope.row.pIcon.split(',')[0]">
                      <span>{{scope.row.pName}}</span>
                    </div>
                    </template>
                  </el-table-column>

                  <el-table-column
                    prop="sumStock"
                    label="可销售库存"
                    show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column
                    prop="limitNum"
                    label="限购数量">
                    <template slot-scope="scope">
                    <div class="limitInputBox">
                      <el-input class="limitInput" type="number" v-model="scope.row.limitNum" @change="limitChange(scope.row)" size="mini"></el-input>
                     <!-- <input type="number"  v-model="scope.row.sale" @change="saleChange(scope.row)"> -->
                    </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="costPrice"
                    label="成本价(元)"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="originalPrice"
                    label="市场(元)"
                    show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column
                    width="320"
                    label="折扣设置"
                    class="head123"
                    align="center"
                    show-overflow-tooltip>
                    <template slot-scope="scope">
                     <div class="setSaleInput flex_r_s_b">
                        <div class="inputBox">
                          <span>打折</span>
                          <el-input class="input" type="number" v-model="scope.row.sale" @change="saleChange(scope.row)" size="mini"></el-input>
                         <!-- <input type="number"  v-model="scope.row.sale" @change="saleChange(scope.row)"> -->
                        </div>
                        <div class="inputBox">
                          <span>减价</span>
                          <!-- <el-input type="number" v-model="scope.row.boneBeanPrice-scope.row.sale*0.1*scope.row.boneBeanPrice" size="mini"></el-input> -->
                         <el-input class="input" type="number" size="mini" v-model="scope.row.reduce" @change="function(val){return reduceChange(val,scope.row)}"></el-input>
                         <!-- <input type="number"  v-model="scope.row.reduce" @change="function(val){return reduceChange(val,scope.row)}"> -->
                        </div>
                        <div class="inputBox">
                          <span>减价后</span>
                         <el-input class="input" type="number" v-model="scope.row.reduced" :readonly="true" size="mini"></el-input>
                           <!-- <input type="number"  v-model="scope.row.reduced" readonly> -->
                        </div>
                     </div>

                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    label="操作"
                    show-overflow-tooltip>
                    <template slot-scope="scope">
                     <div class="operation">
                       <span @click="setCancel(scope.row)" class="cancelJoin pointer" style="color:#409EFF;">取消参加</span>
                     </div>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="paginationBox flex_r_s_b">
                  <div class="pagination_l">
                      <el-button size="mini" :disabled="selectSetGoodsSelection.length==0" @click="batchCancel">批量取消</el-button>
                  </div>
                  <el-pagination
                    background
                    :page-size="30"
                    layout="prev, pager, next, jumper"
                    :total="saleTable.length"
                    @prev-click="setGoodsPrevClick"
                    @next-click="setGoodsNextClick"
                    @current-change="setGoodsCurrentChange">
                  </el-pagination>
                </div>
            </el-tab-pane>

          </el-tabs>
      </div>
    </div>
    <div class="saveBox">
      <el-button size="mini">取消</el-button>
      <el-button type="primary" size="mini" @click="commit">保存</el-button>
    </div>
  </div>
</template>

<script>
  import Api from '../../api/api.js'
  export default{
    data(){
      let self = this;
      return{
        pickerOptions:{

                disabledDate: (time) => {

                    if(self.minTime){
                      if(time.getTime()-self.minTime == 86400000||self.minTime==time.getTime()){
                        return false
                      }else{
                        return true
                      }
                    }
                },
                onPick(dataVal){
                  self.minTime = (dataVal.minDate.getTime());
                }
        },
        minTime:'',
        input2:'',
        activityName:'',//活动名称
        radio:'',
        activityTime:'',//生效时间
        activityDesc:'',//活动描述
        checked: true,
        activeName: 'first',
        selectGoodsSelection: [],//选中的选择商品table数据
        selectGoodsTable:[],//选择商品table数据
        selectGoodsTotalPage:100,//选择商品总页数
        selectGoodsIndexPage:0,//选择商品当前页数
        setSaleTotalPage:100,//设置折扣总页数
        setSaleIndexPage:0,//设置折扣当前页
        saleTable:[],//折扣table全部
        saleTablePageData:[],
        selectSetGoodsSelection:[],//选中要设置的商品
        isLargeSale:'',
        largeSale:'',//批量打折
        reduceVal:'',//批量减价
        limitVal:'',//批量限制
        lastPrice:'',//价格尾数
      }
    },
    mounted() {
      this.getSelectGoods();
      //console.log((20.12+'').split('.'))
    },
    methods:{

      batchLastPrice(){//批量设置价格尾数
        let self = this;
        if(this.lastPrice<0){
          this.lastPrice = 0;
        }else if(this.lastPrice>99){
          this.lastPrice = 99;
        }else{
          this.lastPrice = parseInt(this.lastPrice);
        }
        let price = '';
        this.selectSetGoodsSelection.forEach(e=>{
          price =  (e.reduced+'').split('.')[0];
          e.reduced = parseFloat(price+'.'+this.lastPrice);
          e.reduce = (e.originalPrice-e.reduced).toFixed(2);
          e.sale = ((e.originalPrice-e.reduce)/e.originalPrice*10).toFixed(2);

          //e.reduced = (e.boneBeanPrice-e.reduce).toFixed(2);

        })
      },
      batchLimit(){//批量限制
        if(this.limitVal<1){
          this.limitVal = 1;
        }else{
          this.limitVal = parseInt(this.limitVal);
          this.selectSetGoodsSelection.forEach(e=>{
            e.limitNum = this.limitVal;
          })
        }
      },
      batchJoinSale(){//批量打折
        let self = this;
        if(this.largeSale>10){
          this.largeSale=10;
        }else if(this.largeSale<0){
          this.largeSale=0;
        }
        this.selectSetGoodsSelection.forEach(e=>{
          e.reduce = (e.originalPrice-self.largeSale*0.1*e.originalPrice).toFixed(2);
          e.reduced = (e.originalPrice-e.reduce).toFixed(2);
          e.sale = this.largeSale;
        })
      },
      batchReduce(){//批量减价
          let self = this;
          if(this.reduceVal<0){
            this.reduceVal=0
          }else{

            this.selectSetGoodsSelection.forEach(e=>{
              // e.reduce = (e.boneBeanPrice-self.largeSale*0.1*e.boneBeanPrice).toFixed(2);
              // e.reduced = (e.boneBeanPrice-e.reduce).toFixed(2);
              // e.sale = this.largeSale;
              if(self.reduceVal>e.originalPrice){
                e.reduce = e.originalPrice;
                e.sale = 0;
                e.reduced = e.originalPrice-e.reduce;
              }else{
                e.reduce = self.reduceVal;
                e.sale = ((e.originalPrice-self.reduceVal)/e.originalPrice*10).toFixed(1);
                e.reduced = e.originalPrice-self.reduceVal;
              }

            })
          }
      },
      batchJoin(){//批量加入
        let self = this
        if(this.selectGoodsSelection.length>0){
          let arr = [...self.selectGoodsSelection];
          arr.forEach(e=>{
            e.isJoin = true;
          })
          this.saleTable.push(...arr);
          this.saleTablePageData = this.pagination(1,30,self.saleTable);
          this.$refs.multipleTable.clearSelection();
        }

      },
      isLargeChange(num){
        this.isLargeSale = num;
        this.isBtn = true;
      },
      btnHide(){
        this.isBtn = false;
      },
      single(row){//单个加入
        let self = this;
        row.isJoin = true;
        this.saleTable.push(row);
        this.saleTablePageData = this.pagination(1,30,self.saleTable);
        this.$refs.multipleTable.clearSelection();
      },
      saleChange(row){
        if(row.sale>10){
          row.sale=10;

        }else if(row.sale<0){
          row.sale=0;
        }
        row.reduce = (row.originalPrice-row.sale*0.1*row.originalPrice).toFixed(1);
        row.reduced = (row.originalPrice-row.reduce).toFixed(1);
      },
      limitChange(row){
        if(row.limitNum<1){
          row.limitNum = 1;
        }
      },
      reduceChange(val,row){

        if(row.reduce>row.originalPrice){
          row.reduce = row.originalPrice;
        }else if(row.reduce<=0){
          row.reduce = 0;
        }else{
          row.reduce = val;
        }
        row.sale = ((row.originalPrice-row.reduce)/row.originalPrice*10).toFixed(1);
        row.reduced = (row.originalPrice-val).toFixed(1);
      },
      setCancel(row){//设置tab商品取消
        for(let i = 0; i<this.selectGoodsTable.length;i++){
          if(this.selectGoodsTable[i].cPId==row.cPId){
            this.selectGoodsTable[i].isJoin = false;
            break;
          }
        }
        for (let i = 0; i <this.saleTable.length;i++) {
            if(this.saleTable[i].cPId==row.cPId){
              this.saleTable.splice(i,1);
              this.saleTablePageData = this.pagination(1,30,this.saleTable);
              break;
            }
        }
        this.$refs.multipleTable2.clearSelection();
      },
      batchCancel(){//批量取消

        for(let i = 0; i<this.selectGoodsTable.length;i++){
          for (let j = 0; j<this.selectSetGoodsSelection.length;j++) {
              if(this.selectSetGoodsSelection[j].cPId==this.selectGoodsTable[i].cPId){
                this.selectGoodsTable[i].isJoin = false;
                //console.log(this.selectGoodsTable[i])
              }
          }
        }

        this.saleTable = this.getArrDifference(this.saleTable,this.selectSetGoodsSelection);
        this.saleTablePageData = this.getArrDifference(this.saleTablePageData,this.selectSetGoodsSelection);
        this.$refs.multipleTable2.clearSelection();
      },
      cancelSingle(row){//单个取消参加
        row.isJoin = false;
        for (let i = 0; i <this.saleTable.length;i++) {
            if(this.saleTable[i].cPId==row.cPId){
              this.saleTable.splice(i,1);
              this.saleTablePageData = this.pagination(1,30,this.saleTable);
              break;
            }
        }

      },
      getArrDifference(arr1, arr2) {//取出两个元素中不同的元素
          return arr1.concat(arr2).filter(function(v, i, arr) {
            return arr.indexOf(v) === arr.lastIndexOf(v);
          });
      },
      getSelectGoods(){
        let self = this;
        self.axios.post(Api.gtzApi + '/am/selectRushConvertProduct', self.qs.stringify({
        	activityId:'',
          pageNo:self.selectGoodsIndexPage,
          pageSize:30
        }), {
        	headers: {
        		'Content-Type': 'application/x-www-form-urlencoded'
        	}
        }).then((res)=>{
        	if(res.data.code == 1){
            self.selectGoodsTotalPage = res.data.data.total;
            if(self.saleTable.length>0){

              res.data.data.rows.forEach((j)=>{

                  j.isJoin = false;
                  j.sale = 10;
                  j.reduce = 0;
                  j.reduced = 0;

              })
              self.saleTable.forEach((e)=>{
                res.data.data.rows.forEach((j)=>{
                  if(e.cPId === j.cPId){
                    j.isJoin = true;
                  }
                })

              })
              self.selectGoodsTable = res.data.data.rows;

            }else{
             //console.log('没有选择的情况')
              res.data.data.rows.forEach((e,i)=>{
                //self.saleTable.forEach()
                e.isJoin = false;
                e.sale = 10;
                e.reduce = 0;
                e.reduced = 0;

              })
              self.selectGoodsTable = res.data.data.rows;
            }

            //console.log(self.selectGoodsTable)
        	}else{
        		alert(res.data.msg)
        	}

        })
      },
      isSelect(row){//是否选中表格
        if(row.isJoin){
          return false;
        }else{
          return true;
        }

      },
      isSetSelect(row){
        return true;
      },
      selectGoodsPrevClick(index){//选择商品分页减
        //console.log(index)
        this.selectGoodsIndexPage = index-1;
        this.getSelectGoods();
      },
      selectGoodsNextClick(index){//选择商品分页加
        //console.log(index)
        this.selectGoodsIndexPage = index-1;
        this.getSelectGoods();
      },
      selectGoodsCurrentChange(index){//选择商品当前页
        //console.log(index)
        this.selectGoodsIndexPage = index-1;
        this.getSelectGoods();
      },
      setGoodsPrevClick(index){//设置商品分页减

         let self = this;
         this.saleTablePageData = this.pagination(index,3,self.saleTable)
      },
      setGoodsNextClick(index){//设置商品分页加
        let self = this
        this.saleTablePageData = this.pagination(index,3,self.saleTable)
      },
      setGoodsCurrentChange(index){//设置商品当前页
        let self = this
        this.saleTablePageData = this.pagination(index,3,self.saleTable)
      },
      handleSelectionChange(val) {
        this.selectGoodsSelection = val;
      },
      setGoodsSelectionChange(val){
        this.selectSetGoodsSelection = val;
      },
      handleClick(){

      },
      pagination(pageNo, pageSize,array) {
        var offset = (pageNo - 1) * pageSize;
        return (offset + pageSize >= array.length) ? array.slice(offset, array.length) : array.slice(offset, offset + pageSize);
      },
      judgeTimeChange(time){//判断时间是否重合
        let self = this;
        this.axios.post(Api.gtzApi + '/am/selectActivityIsCoincide', this.qs.stringify({
        	startTime:time[0]+' 10',
          endTime:time[1]+' 10'

        }), {
        	headers: {
        		'Content-Type': 'application/x-www-form-urlencoded'
        	}
        }).then((res)=>{
        	if(res.data.code != 1){
            self.$message({
              message:res.data.msg,
              type: 'warning'
            });
            self.activityTime = '';
        	}

        })
      },
      dataChange(time){
        //console.log(val)
        this.minTime = '';

        if(time!=null){
          this.judgeTimeChange(time)
        }

      },
      commit(){
        let self = this;
        let isCommit = true;
        for(let i=0;i<this.saleTable.length;i++){
          if(this.saleTable[i].sale==10){
            isCommit = false;
            break;
          }else if(this.saleTable[i].limitNum==''){
            isCommit = false;
            break;
          }
        }


        if(this.activityName==''){
          this.$message({
            message:'请填写活动名称',
            type: 'warning'
          });
        }else if(this.activityTime==''){
          this.$message({
            message:'请选择活动时间',
            type: 'warning'
          });
        }else if(this.saleTable.length<1){
          this.$message({
            message:'请选择折扣商品',
            type: 'warning'
          });
        }else{

          if(!isCommit){
            this.$message({
              message:'有商品还未设置折扣',
              type: 'warning'
            });
          }else{

            let arr = [];
            this.saleTable.forEach(e=>{
              arr.push({
                cPId:e.cPId,
                type:1,
                discount:e.sale,
                activityPrice:e.reduced,
                limitNum:e.limitNum
              })
            })
            self.axios.post(Api.gtzApi + '/am/addActivityDiscount', self.qs.stringify({
            	activityName:self.activityName,
              activityType:1,
              activityDesc:self.activityDesc,
              startTime:self.activityTime[0]+' 10',
              endTime:self.activityTime[1]+' 10',
              discountProducts:JSON.stringify(arr)
            }), {
            	headers: {
            		'Content-Type': 'application/x-www-form-urlencoded'
            	}
            }).then((res)=>{
            	if(res.data.code == 1){
                setTimeout(()=>{
                  self.$message({
                    message: '添加成功',
                    type: 'success'
                  });
                },500)
            	}else{
            		alert(res.data.msg)
            	}

            })
          }

        }
      }
    }
  }
</script>

<style lang="scss">
  .addFlashSaleWarp{
    padding-bottom:50px;
    .title{
      font-size:20px;
      color:#333;
      padding:20px 0 20px 20px;
      // border-bottom:1px solid #999;
    }
    .saveBox{
      position: fixed;
      width:100%;
      bottom: 0;
      right:0;
      padding:10px 0;
      background-color: #f7f7f7;
      z-index: 99;
    }
    .addFlashSaleCnt{
      padding:0 100px;
      .topNav{
        padding-bottom:20px;
        border-bottom:1px solid #eee;
        a{
          color:#409EFF;
          margin-right:30px;
        }
      }
      .activityInfo{
        text-align:left;
        padding-bottom:30px;
        .itemTitle{
          padding:20px 0 20px 0;
          // border-bottom:1px solid #eee;

          span{
            color:#333;
            border-left:3px solid #409EFF;
            padding-left:20px;
          }
        }
        .activityFrom{
          color:#666;
          .el-textarea{
              width:500px;
              // height:200px;
          }
          li{
            padding-bottom:20px;
            .list_l{
              width:100px;

              b{
                color:#ff523d;
              }
            }
            .list_r{
              width:800px;
              .nameInput{
                width:300px;
              }
              .limitBox {
                .limit_r{
                  margin-left:20px;
                  .limitInput{
                    width:60px;
                    margin-left:2px;
                  }
                  span{
                    margin-left:5px;
                    display:inline-block;
                    height:16px;
                  }
                }
              }
            }
          }
        }
      }
      .selectGoods{
        padding-top:30px;
        border-top:1px solid #eee;
        text-align:left;
        .selectGoodsTab{
          .addBtnBox{
            padding-top:10px;
            padding-bottom:20px;
            align-items:flex-end;
            .search{
              width:300px;
            }
          }
          .paginationBox{
            padding:30px 0;
          }
          .imgBox{
            span{
              margin-left:10px;
            }
          }
        }
        .setSaleBox{
          .addBtnBox{
            padding-bottom:10px;
            .largeInput{
              margin-left:20px;
              width:120px;
              .el-input{
                width:100px;
              }
            }
            .setLastPrice{
              width:160px;
              span{
                font-size:12px;
                margin-right:5px;
                color:#C0C4CC;
              }
              .el-input{
                 width:80px;
              }
            }
            .item_l{
              width:600px;
            }
          }
          .paginationBox{
            padding:30px 0;
          }
          .imgBox{
            span{
              margin-left:10px;
            }
          }
          .limitInputBox{
            .limitInput{
              width:80px;
            }
          }
          .inputBox{
            width:120px;
            margin-right:5px;
            font-size:12px;
            .el-input{
               width:60px;
            }
            .input{
              input{
                padding:0;
                width:55px;
                padding-left:5px;
              }
            }


          }

        }
        .itemTitle{
          padding:20px 0 20px 0;
          // border-bottom:1px solid #eee;

          span{
            color:#333;
            border-left:3px solid #409EFF;
            padding-left:20px;
          }
        }

      }
    }
  }
</style>
