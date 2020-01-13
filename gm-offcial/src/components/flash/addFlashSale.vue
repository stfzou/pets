<template>
  <div class="addFlashSaleWarp">
    <div class="title">添加限时折扣</div>
    <div class="addFlashSaleCnt">

      <div class="topNav flex_r_f_s">
        <a href="###">所有活动</a>
        <a href="###">未开始</a>
        <a href="###">进行中</a>
        <a href="###">已结束</a>
        <a href="###">已撤销</a>
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
                 v-model="input"
                 maxlength="10"
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
                      v-model="value1"
                      @change="dataChange"
                      value-format="yyyy-MM-dd H"
                      type="datetimerange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
             </div>
          </li>
          <li class="flex_r_f_s">
             <div class="list_l">
               <b>*</b>活动描述
             </div>
             <div class="list_r">

               <el-input
                 type="textarea"
                 placeholder="请输入活动描述"
                 v-model="textarea"
                 maxlength="30"
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
                    prop="originalPrice"
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
                      <el-button size="mini" @click="batchJoin">批量参加</el-button>
                  </div>
                  <el-pagination
                    background
                    layout="prev, pager, next, jumper"
                    :total="selectGoodsTotalPage"
                    @prev-click="prevClick"
                    @next-click="nextClick"
                    @current-change="currentChange">
                  </el-pagination>
                </div>

            </el-tab-pane>

            <el-tab-pane :label="'设置折扣'+'('+saleTable.length+')'" name="second" class="setSaleBox">
                <div class="addBtnBox flex_r_s_b">
                  <!-- <el-button type="primary" size="small"></el-button> -->

              </div>
              <el-table
                  :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                  ref="multipleTable2"
                  :data="saleTable"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="handleSelectionChange">
                  <el-table-column
                    type="selection"
                    width="55"
                    :selectable="isSetSelect">
                  </el-table-column>
                  <el-table-column
                    label="商品名称"
                    width="300">
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
                    width="400"
                    label="折扣设置"
                    class="head123"
                    align="center"
                    show-overflow-tooltip>
                    <template slot-scope="scope">
                     <div class="setSaleInput flex_r_s_b">
                        <div class="inputBox">
                          <span>打折</span>
                          <el-input type="number" v-model="scope.row.sale" @change="saleChange(scope.row)" size="mini"></el-input>
                        </div>
                        <div class="inputBox">
                          <span>减价</span>
                          <!-- <el-input type="number" v-model="scope.row.boneBeanPrice-scope.row.sale*0.1*scope.row.boneBeanPrice" size="mini"></el-input> -->
                          <el-input type="number" v-model="scope.row.reduce" @change="function(val){return reduceChange(val,scope.row)}" size="mini"></el-input>
                        </div>
                        <div class="inputBox">
                          <span>减价后</span>
                          <el-input type="number" v-model="scope.row.reduced" :readonly="true" size="mini"></el-input>
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
                       <span class="cancelJoin pointer" style="color:#409EFF;">取消参加</span>
                     </div>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="paginationBox flex_r_s_b">
                  <div class="pagination_l">
                      <el-button size="mini">批量取消</el-button>
                  </div>
                  <el-pagination
                    background
                    layout="prev, pager, next, jumper"
                    :total="setSaleTotalPage"
                    @prev-click="prevClick"
                    @next-click="nextClick"
                    @current-change="currentChange">
                  </el-pagination>
                </div>
            </el-tab-pane>

          </el-tabs>
      </div>
    </div>
    <div class="saveBox">
      <el-button size="mini">取消</el-button>
      <el-button type="primary" size="mini">保存</el-button>
    </div>
  </div>
</template>

<script>
  import Api from '../../api/api.js'
  export default{
    data(){
      return{
        input:'',
        value1:'',
        radio:'',
        input2:'',
        textarea:'',
        checked: true,
        activeName: 'first',
        selectGoodsSelection: [],//选中的选择商品table数据
        selectGoodsTable:[],//选择商品table数据
        selectGoodsTotalPage:0,//选择商品总页数
        selectGoodsIndexPage:0,//选择商品当前页数
        setSaleTotalPage:0,//设置折扣总页数
        setSaleIndexPage:0,//设置折扣当前页
        saleTable:[]//折扣table

      }
    },
    mounted() {
      this.getSelectGoods();
    },
    methods:{
      batchJoin(){//批量加入
        let self = this
        if(this.selectGoodsSelection.length>0){
          let arr = [...self.selectGoodsSelection];
          arr.forEach(e=>{
            e.isJoin = true;
          })
          this.saleTable.push(...arr);
          this.$refs.multipleTable.clearSelection();
        }

      },
      single(row){//单个加入
        row.isJoin = true;
        this.saleTable.push(row);
      },
      saleChange(row){
        if(row.sale>10){
          row.sale=10;

        }else if(row.sale<0){
          row.sale=0
        }
        row.reduce = (row.boneBeanPrice-row.sale*0.1*row.boneBeanPrice).toFixed(2);
        row.reduced = (row.boneBeanPrice-row.reduce).toFixed(2);
      },
      reduceChange(val,row){

        if(row.reduce>row.boneBeanPrice){
          row.reduce = row.boneBeanPrice;
        }else if(row.reduce<0){
          row.reduce = 0;
        }else{
          row.reduce = val;
        }
        row.sale = ((row.boneBeanPrice-row.reduce)/row.boneBeanPrice*10).toFixed(2);
        row.reduced = (row.boneBeanPrice-val).toFixed(2);
      },
      
      cancelSingle(row){//单个取消参加
        row.isJoin = false;
        for (let i = 0; i <this.saleTable.length;i++) {
            if(this.saleTable[i].cPId==row.cPId){
              this.saleTable.splice(i,1);
              break;
            }
        }
        //console.log(this.saleTable)
      },
      getSelectGoods(){
        let self = this;
        self.axios.post(Api.gtzApi + '/am/selectRushConvertProduct', self.qs.stringify({
        	activityId:'',
          pageNo:self.selectGoodsIndexPage,
          pageSize:10
        }), {
        	headers: {
        		'Content-Type': 'application/x-www-form-urlencoded'
        	}
        }).then((res)=>{
        	if(res.data.code == 1){
            self.selectGoodsTotalPage = res.data.data.total;
            res.data.data.rows.forEach(e=>{
              e.isJoin = false;
              e.sale = 10;
              e.reduce = 0;
              e.reduced = 0;
            })
            self.selectGoodsTable = res.data.data.rows;
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
      prevClick(index){//分页减
        console.log(index)
      },
      nextClick(index){//分页加

      },
      currentChange(index){//当前页

      },

      handleSelectionChange(val) {
        this.selectGoodsSelection = val;
      },
      handleClick(){

      },
      dataChange(val){
        console.log(val)
      }
    }
  }
</script>

<style lang="scss"scoped="scoped">
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
          .paginationBox{
            padding:30px 0;
          }
          .imgBox{
            span{
              margin-left:10px;
            }
          }
          .inputBox{
            width:120px;
            margin-right:5px;
            font-size:12px;
            .el-input--mini .el-input__inner{
              width:85px;
            }
            .el-input{
              width:85px;
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
