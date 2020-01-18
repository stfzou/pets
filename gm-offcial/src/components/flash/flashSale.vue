<template>
  <div class="flashSaleWarp">
     <div class="title">限时折扣</div>
     <div class="flashSaleCnt">
       <el-tabs v-model="activeName" @tab-click="handleClick">
           <el-tab-pane label="所有活动" name="first">
             <div class="addBtnBox flex_r_s_b">
                 <el-button type="primary" size="small" @click="addLink">添加限时抢购</el-button>
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
                       prop="activityName"
                       label="活动名称"
                       >
                     </el-table-column>

                     <el-table-column
                       label="活动时间">
                       <template slot-scope="scope">
                        <div class="activityTime">
                          {{scope.row.startTime.split(' ')[0]}}
                        </div>
                       </template>
                     </el-table-column>
                     <el-table-column
                       label="状态">
                       <template slot-scope="scope">
                        <div class="activityStatus">
                          <span style="color:#45be89;" v-if="scope.row.activityStatus==1">进行中</span>
                          <span style="color:#ff523d;" v-if="scope.row.activityStatus==0">未开始</span>
                          <span style="color:#45be89;" v-if="scope.row.activityStatus==2">已结束</span>
                        </div>
                       </template>
                     </el-table-column>
                     <el-table-column
                       prop="address"
                       label="操作">
                       <template slot-scope="scope">
                        <div class="operation">
                         <!-- <a href="###">查看</a> -->
                          <router-link :to="{name:'editFlashSale',query:{id:scope.row.id}}">编辑</router-link>
                          <span class="pointer" v-if="scope.row.status===1" @click="revoke(scope.row)">撤销</span>
                          <span style="color:#ff523d;" class="pointer" v-else @click="resume(scope.row)">恢复正常</span>
                        </div>

                       </template>
                     </el-table-column>
                   </el-table>
             </div>
             <div class="paginationBox">
               <el-pagination
                 background
                 @current-change="currentChange"
                 @prev-click="prevClick"
                 @next-click="nextClick"
                 layout="prev, pager, next, jumper"
                 :total="totalPage">
               </el-pagination>
             </div>
           </el-tab-pane>
           <el-tab-pane label="未开始" name="second">
             <div class="addBtnBox flex_r_s_b">
                 <el-button type="primary" size="small" @click="addLink">添加限时抢购</el-button>
                 <el-input
                     class="search"
                     placeholder="请输入活动名称"
                     suffix-icon="el-icon-search"
                     v-model="input2">
                 </el-input>
             </div>
             <div class="tableBox">
                <el-table
                     :data="NotyetTableData"
                     style="width: 100%">
                     <el-table-column
                       prop="activityName"
                       label="活动名称"
                       >
                     </el-table-column>

                     <el-table-column
                       label="活动时间">
                       <template slot-scope="scope">
                        <div class="activityTime">
                          {{scope.row.startTime.split(' ')[0]}}
                        </div>
                       </template>
                     </el-table-column>
                     <el-table-column
                       label="状态">
                       <template slot-scope="scope">
                        <div class="activityStatus">
                          <span style="color:#45be89;" v-if="scope.row.activityStatus==1">进行中</span>
                          <span style="color:#ff523d;" v-if="scope.row.activityStatus==0">未开始</span>
                          <span style="color:#45be89;" v-if="scope.row.activityStatus==2">已结束</span>
                        </div>
                       </template>
                     </el-table-column>
                     <el-table-column
                       prop="address"
                       label="操作">
                       <template slot-scope="scope">
                        <div class="operation">
                         <!-- <a href="###">查看</a> -->
                          <router-link :to="{name:'editFlashSale',query:{id:scope.row.id}}">编辑</router-link>
                          <span class="pointer" v-if="scope.row.status===1" @click="revoke(scope.row)">撤销</span>
                          <span style="color:#ff523d;" class="pointer" v-else @click="resume(scope.row)">恢复正常</span>
                        </div>

                       </template>
                     </el-table-column>
                   </el-table>
             </div>
             <div class="paginationBox">
               <el-pagination
                 background
                 @current-change="currentChange2"
                 @prev-click="prevClick2"
                 @next-click="nextClick2"
                 layout="prev, pager, next, jumper"
                 :total="totalPage2">
               </el-pagination>
             </div>
           </el-tab-pane>
           <el-tab-pane label="进行中" name="third">
             <div class="addBtnBox flex_r_s_b">
                 <el-button type="primary" size="small" @click="addLink">添加限时抢购</el-button>
                 <el-input
                     class="search"
                     placeholder="请输入活动名称"
                     suffix-icon="el-icon-search"
                     v-model="input2">
                 </el-input>
             </div>
             <div class="tableBox">
                <el-table
                     :data="ongoingTableData"
                     style="width: 100%">
                     <el-table-column
                       prop="activityName"
                       label="活动名称"
                       >
                     </el-table-column>

                     <el-table-column
                       label="活动时间">
                       <template slot-scope="scope">
                        <div class="activityTime">
                          {{scope.row.startTime.split(' ')[0]}}
                        </div>
                       </template>
                     </el-table-column>
                     <el-table-column
                       label="状态">
                       <template slot-scope="scope">
                        <div class="activityStatus">
                          <span style="color:#45be89;" v-if="scope.row.activityStatus==1">进行中</span>
                          <span style="color:#ff523d;" v-if="scope.row.activityStatus==0">未开始</span>
                          <span style="color:#45be89;" v-if="scope.row.activityStatus==2">已结束</span>
                        </div>
                       </template>
                     </el-table-column>
                     <el-table-column
                       prop="address"
                       label="操作">
                       <template slot-scope="scope">
                        <div class="operation">
                         <!-- <a href="###">查看</a> -->
                          <router-link :to="{name:'editFlashSale',query:{id:scope.row.id}}">编辑</router-link>
                          <span class="pointer" v-if="scope.row.status===1" @click="revoke(scope.row)">撤销</span>
                          <span style="color:#ff523d;" class="pointer" v-else @click="resume(scope.row)">恢复正常</span>
                        </div>

                       </template>
                     </el-table-column>
                   </el-table>
             </div>
             <div class="paginationBox">
               <el-pagination
                 background
                 @current-change="currentChange3"
                 @prev-click="prevClick3"
                 @next-click="nextClick3"
                 layout="prev, pager, next, jumper"
                 :total="totalPage3">
               </el-pagination>
             </div>
            </el-tab-pane>
           <el-tab-pane label="已结束" name="fourth">
             <div class="addBtnBox flex_r_s_b">
                 <el-button type="primary" size="small" @click="addLink">添加限时抢购</el-button>
                 <el-input
                     class="search"
                     :page-size="3"
                     @current-change="currentChange4"
                     @prev-click="prevClick4"
                     @next-click="nextClick4"
                     placeholder="请输入活动名称"
                     suffix-icon="el-icon-search"
                     v-model="input2">
                 </el-input>
             </div>
             <div class="tableBox">
                <el-table
                     :data="endTableData"
                     style="width: 100%">
                     <el-table-column
                       prop="activityName"
                       label="活动名称"
                       >
                     </el-table-column>

                     <el-table-column
                       label="活动时间">
                       <template slot-scope="scope">
                        <div class="activityTime">
                          {{scope.row.startTime.split(' ')[0]}}
                        </div>
                       </template>
                     </el-table-column>
                     <el-table-column
                       label="状态">
                       <template slot-scope="scope">
                        <div class="activityStatus">
                          <span style="color:#45be89;" v-if="scope.row.activityStatus==1">进行中</span>
                          <span style="color:#ff523d;" v-if="scope.row.activityStatus==0">未开始</span>
                          <span style="color:#45be89;" v-if="scope.row.activityStatus==2">已结束</span>
                        </div>
                       </template>
                     </el-table-column>
                     <el-table-column
                       prop="address"
                       label="操作">
                       <template slot-scope="scope">
                        <div class="operation">
                         <!-- <a href="###">查看</a> -->
                          <router-link :to="{name:'editFlashSale',query:{id:scope.row.id}}">编辑</router-link>
                          <span class="pointer" v-if="scope.row.status===1" @click="revoke(scope.row)">撤销</span>
                          <span style="color:#ff523d;" class="pointer" v-else @click="resume(scope.row)">恢复正常</span>
                        </div>

                       </template>
                     </el-table-column>
                   </el-table>
             </div>
             <div class="paginationBox">
               <el-pagination
                 background
                 layout="prev, pager, next, jumper"
                 :total="totalPage4">
               </el-pagination>
             </div>
            </el-tab-pane>

         </el-tabs>

     </div>

  </div>
</template>

<script>
  import Api from '../../api/api.js'
  export default{
    data(){
      return{
        activeName: 'first',
        input2:'',
        totalPage:0,
        totalPage2:0,
        totalPage3:0,
        totalPage4:0,
        tableData:[],//所有
        NotyetTableData:[],//未开始
        ongoingTableData:[],//进行中
        endTableData:[],//已结束

      }
    },
    mounted() {
      this.getActivityList(0);
      this.getActivityList2(0);
      // this.getActivityList3(0);
      // this.getActivityList4(0);
    },
    methods:{
      handleClick(tab, event) {
        //console.log(tab, event);
      },
      addLink(){
        this.$router.push({
          name:'addFlashSale'
        })
      },
      resume(row){//恢复正常
        let self = this;
        self.axios.post(Api.gtzApi + '/am/updateActivity', self.qs.stringify({
        	id:row.id,
          status:1
        }), {
        	headers: {
        		'Content-Type': 'application/x-www-form-urlencoded'
        	}
        }).then(res=>{
          if(res.data.code==1){
            setTimeout(()=>{
              self.$message({
                message: '恢复正常',
                type: 'success'
              });
            },500)

            for(let i=0;i<self.tableData.length;i++){
              if(self.tableData[i].id==row.id){
                self.tableData[i].status=1;
                break;
              }
            }
            for(let i=0;i<self.NotyetTableData.length;i++){
              if(self.NotyetTableData[i].id==row.id){
                self.NotyetTableData[i].status=1;
                break;
              }
            }
            for(let i=0;i<self.ongoingTableData.length;i++){
              if(self.ongoingTableData[i].id==row.id){
                self.ongoingTableData[i].status=1;
                break;
              }
            }
            for(let i=0;i<self.endTableData.length;i++){
              if(self.endTableData[i].id==row.id){
                self.endTableData[i].status=1;
                break;
              }
            }
          }
        })
      },
      revoke(row){//撤销
        let self = this;
        self.axios.post(Api.gtzApi + '/am/updateActivity', self.qs.stringify({
        	id:row.id,
          status:0
        }), {
        	headers: {
        		'Content-Type': 'application/x-www-form-urlencoded'
        	}
        }).then(res=>{
          if(res.data.code==1){
            setTimeout(()=>{
              self.$message({
                message: '撤销成功',
                type: 'success'
              });
            },500)

            for(let i=0;i<self.tableData.length;i++){
              if(self.tableData[i].id==row.id){
                self.tableData[i].status=0;
                break;
              }
            }
            for(let i=0;i<self.NotyetTableData.length;i++){
              if(self.NotyetTableData[i].id==row.id){
                self.NotyetTableData[i].status=0;
                break;
              }
            }
            for(let i=0;i<self.ongoingTableData.length;i++){
              if(self.ongoingTableData[i].id==row.id){
                self.ongoingTableData[i].status=0;
                break;
              }
            }
            for(let i=0;i<self.endTableData.length;i++){
              if(self.endTableData[i].id==row.id){
                self.endTableData[i].status=0;
                break;
              }
            }
          }
        })
      },
      currentChange(index){
        this.getActivityList(index-1);
      },
      prevClick(index){
        this.getActivityList(index-1);
      },
      nextClick(index){
        this.getActivityList(index-1);
      },
      currentChange2(index){
        this.getActivityList2(index-1);
      },
      prevClick2(index){
        this.getActivityList2(index-1);
      },
      nextClick2(index){
        this.getActivityList(index-1);
      },
      currentChange3(index){
        this.getActivityList3(index-1);
      },
      prevClick3(index){
        this.getActivityList3(index-1);
      },
      nextClick3(index){
        this.getActivityList3(index-1);
      },
      currentChange4(index){
        this.getActivityList3(index-1);
      },
      prevClick4(index){
        this.getActivityList3(index-1);
      },
      nextClick4(index){
        this.getActivityList3(index-1);
      },
      getActivityList(pageNo){
        let self = this;
        self.axios.post(Api.gtzApi + '/am/selectActivityAll', self.qs.stringify({
        	activityName:'',
          activityStatus:'',
          status:'',
          pageNo:pageNo,
          pageSize:10
        }), {
        	headers: {
        		'Content-Type': 'application/x-www-form-urlencoded'
        	}
        }).then(res=>{
          if(res.data.code==1){
            self.tableData = res.data.data.rows;
            self.totalPage = res.data.data.total;
          }
        })
      },
      getActivityList2(pageNo){
        let self = this;
        self.axios.post(Api.gtzApi + '/am/selectActivityAll', self.qs.stringify({
        	activityName:'',
          activityStatus:0,
          status:'',
          pageNo:pageNo,
          pageSize:10
        }), {
        	headers: {
        		'Content-Type': 'application/x-www-form-urlencoded'
        	}
        }).then(res=>{
          if(res.data.code==1){
            self.NotyetTableData = res.data.data.rows;
            self.totalPage2 = res.data.data.total;
          }
        })
      },
      getActivityList3(pageNo){
        let self = this;
        self.axios.post(Api.gtzApi + '/am/selectActivityAll', self.qs.stringify({
        	activityName:'',
          activityStatus:1,
          status:'',
          pageNo:pageNo,
          pageSize:10
        }), {
        	headers: {
        		'Content-Type': 'application/x-www-form-urlencoded'
        	}
        }).then(res=>{
          if(res.data.code==1){
            self.ongoingTableData = res.data.data.rows;
            self.totalPage3 = res.data.data.total;
            //console.log(this.tableData)
          }
        })
      },
      getActivityList4(pageNo){
        let self = this;
        self.axios.post(Api.gtzApi + '/am/selectActivityAll', self.qs.stringify({
        	activityName:'',
          activityStatus:2,
          status:'',
          pageNo:pageNo,
          pageSize:10
        }), {
        	headers: {
        		'Content-Type': 'application/x-www-form-urlencoded'
        	}
        }).then(res=>{
          if(res.data.code==1){
            self.endTableData = res.data.data.rows;
            self.totalPage4 = res.data.data.total;
          }
        })
      },
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
        padding-top:30px;
        .operation{
          a{
            color:#409EFF;
          }
          span{
            color:#409EFF;
          }
        }
        .activityStatus{
          font-size:12px;
        }
      }
    }
  }
</style>
