<template>
  <div class="flashSaleWarp">
     <div class="title">限时折扣</div>
     <div class="flashSaleCnt">
       <el-tabs v-model="activeName" @tab-click="handleClick">
           <el-tab-pane label="所有活动" name="first">
             <div class="addBtnBox flex_r_s_b">
                 <el-button type="primary" size="small">添加限时抢购</el-button>
                 <el-input
                     class="search"
                     placeholder="请输入活动名称"
                     suffix-icon="el-icon-search"
                     v-model="input2">
                 </el-input>

             </div>
             <div class="tableBox">
                <el-table
                     :data="tableData"
                     style="width: 100%">
                     <el-table-column
                       prop="date"
                       label="活动名称"
                       width="180">
                     </el-table-column>
                     <el-table-column
                       prop="name"
                       label="活动标签"
                       width="180">
                       <template slot-scope="scope">
                        <div class="activityTip">
                          {{scope.row.name}}
                        </div>
                       </template>
                     </el-table-column>
                     <el-table-column
                       prop="address"
                       label="活动时间">
                     </el-table-column>
                     <el-table-column
                       prop="address"
                       label="状态">
                     </el-table-column>
                     <el-table-column
                       prop="address"
                       label="操作">
                       <template slot-scope="scope">
                        <div class="operation">
                          <a href="###">查看</a>
                          <a href="###">删除</a>
                          <a href="###">编辑</a>
                        </div>

                       </template>
                     </el-table-column>
                   </el-table>
             </div>
             <div class="paginationBox">
               <el-pagination
                 background
                 layout="prev, pager, next, jumper"
                 :total="1000">
               </el-pagination>
             </div>
           </el-tab-pane>
           <el-tab-pane label="未开始" name="second">
             <div class="addBtnBox flex_r_s_b">
                 <el-button type="primary" size="small">添加限时抢购</el-button>
                 <el-input
                     class="search"
                     placeholder="请输入活动名称"
                     suffix-icon="el-icon-search"
                     v-model="input2">
                 </el-input>
             </div>
           </el-tab-pane>
           <el-tab-pane label="进行中" name="third">
             <div class="addBtnBox flex_r_s_b">
                 <el-button type="primary" size="small">添加限时抢购</el-button>
                 <el-input
                     class="search"
                     placeholder="请输入活动名称"
                     suffix-icon="el-icon-search"
                     v-model="input2">
                 </el-input>
             </div>
            </el-tab-pane>
           <el-tab-pane label="已结束" name="fourth">
             <div class="addBtnBox flex_r_s_b">
                 <el-button type="primary" size="small">添加限时抢购</el-button>
                 <el-input
                     class="search"
                     placeholder="请输入活动名称"
                     suffix-icon="el-icon-search"
                     v-model="input2">
                 </el-input>
             </div>
            </el-tab-pane>
            <el-tab-pane label="已撤销" name="fifth">
              <div class="addBtnBox flex_r_s_b">
                  <el-button type="primary" size="small">添加限时抢购</el-button>
                  <el-input
                      class="search"
                      placeholder="请输入活动名称"
                      suffix-icon="el-icon-search"
                      v-model="input2">
                  </el-input>
              </div>
             </el-tab-pane>
         </el-tabs>

     </div>

  </div>
</template>

<script>
  export default{
    data(){
      return{
        activeName: 'first',
        input2:'',
        tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                  }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                  }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                  }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                  }]
      }
    },
    methods:{
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>

<style lang="scss" scoped="scoped">
  .flashSaleWarp{

    .title{
      font-size:20px;
      color:#333;
      padding:20px 0 20px 20px;
      // border-bottom:1px solid #999;
    }
    .flashSaleCnt{
      padding:0 100px;
      .addBtnBox{
        padding-top:10px;
        .search{
          width:300px;
        }
      }
      .paginationBox{
        padding-top:20px;
      }
      .tableBox{
        .operation{
          a{
            color:#409EFF;
          }
        }
        .activityTip{
          background-color: rgb(69, 190, 137);
          cursor: default;
          width:100px;
          color:#fff;
          text-align:center;
          border-radius:4px;
        }
      }
    }
  }
</style>
