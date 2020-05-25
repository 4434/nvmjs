<template>
  <div class="echarts-box">
    <el-form :model="queryForm" status-icon ref="queryForm" label-width="40px" class="demo-ruleForm">
      <el-form-item>
        <el-button type="success" @click="addBtn" size="small">新增</el-button>
      </el-form-item>
    </el-form>
    <ul class="tablelist">
      <li v-for="item in tableData" :key="item.id">
        <div class="title">{{item.timeString}}</div>
        <div class="inner">
          <span>{{item.num}}</span>
          <div class="set">
            <i class="el-icon-edit" @click="dataUpdateBtn(item)"></i>
            <i class="el-icon-delete" @click="deleteBtn(item)"></i>
          </div>          
        </div>
      </li>

    </ul>    

    <div class="echarts-content">
      <div class="echart-line" ref="echartLine"></div>
    </div>
    <el-dialog
      :title="addForm.id ? '修改数据' : '添加数据'"
      :visible.sync="flag.add"
      width="30%">
      <el-form :model="addForm" status-icon ref="addForm" label-width="80px" class="demo-ruleForm">
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="输入数字">
              <el-input type="number" v-model="addForm.num" size="small"  autocomplete="off" placeholder="请输入数字"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>       
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addDataBtn" size="small">确 定</el-button>
      </span>
    </el-dialog>        
  </div>
</template>

<script>
import echarts from "echarts"
import echartServe from "@/server/echart"
export default {
  name: "HelloWorld",
  data() {
    return {
      queryForm: {
        token: localStorage.token
      },
      addForm: {
        token: localStorage.token
      },
      flag: {
        add: false
      },
      tableData: [],      
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    initEchartLine(display = [], data = []) {
      let myEcharts = echarts.init(this.$refs.echartLine);
      let option = {
        xAxis: {
          type: "category",
          data: display
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: data,
            type: "line",
            itemStyle : { normal: {label : {show: true}}},      // 显示数值
          },
        ]
      };
      myEcharts.setOption(option);
    },
    addBtn () {
      this.flag.add = true;
      this.addForm.id = null;
      this.$set(this.addForm, 'num', null);
    },
    getData () {
      echartServe.listData(this.queryForm).then(res=>{
        if(res.code == 200){
          this.tableData = res.data.map(res=>{
            res.timeString = this.timeInit().year + '-' + this.timeInit().month + '-' + this.timeInit().day;
            return res;
          });
          let echartData = this.echartCollation(this.tableData);
          this.initEchartLine(echartData.title, echartData.num);
        }
      });
    },
    dataCollation (data = [], len = 12) {
      if(data.length < len){
        this.tableData.push({row: data})
      }else{
        let arr = [];
        for(let i=1; i<=data.length; i++){
          arr.push(data[i-1]);
          if(i%len == 0){
            this.tableData.push({row: arr})
            arr = [];
          }
        }
      }
    },
    echartCollation (data) {
      let titleArr = [],
          numArr = [];
      for(let i=0; i<data.length; i++){
          titleArr.push(data[i].timeString);
          numArr.push(data[i].num);
      }
      return {
        title: titleArr,
        num: numArr
      }
    },
    addDataBtn () {
      if(this.addForm.num == null || this.addForm.num == undefined || this.addForm.num == ''){
        this.open('请输入数值', 'error')
        return
      }
      this.flag.add = false;
      if(this.addForm.id){
        echartServe.dataUpdate(this.addForm).then(res=>{
          if(res.code == 200){
            this.addForm.num = null;
            this.addForm.id  = null;
            this.open('修改成功', 'success');
            this.getData();
          }
        });
      }else{
        this.addForm.time = this.timeInit().getTime
        echartServe.addData(this.addForm).then(res=>{
          if(res.code == 200){
            this.addForm.num = null;
            this.addForm.id  = null;
            this.getData();
            this.open('添加成功', 'success');
          }
        });
      }
    },
    dataUpdateBtn (item) {
      this.flag.add = true;
      this.$set(this.addForm, 'num', item.num);
      this.addForm.id  = item.id;
    },
    deleteBtn (item) {
      echartServe.dataDelete({id: item.id}).then(res=>{
        if(res.code == 200){
          this.getData();
        }
      });
    },
    update(item) {
      item.flag = !item.flag
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.echarts-box {
  margin: 10px;
  padding: 10px;
  background: #fff;
}
.echarts-content{
  display: flex;
  .echart-line{
    width: 100%;
    height: 500px;
  }  
}
.tablelist{
  display: flex;
  flex-wrap: wrap;
  li{
    border: 1px solid #ebeef5;
    margin: 5px;
    border-radius: 5px;
    .title{
      padding: 8px 20px;
      border-bottom: 1px solid #ebeef5;
      color: #909399;
      font-weight: bold;
    }
    .inner{
      padding: 8px 20px;
      position: relative;
      .set{
        position: absolute;
        top: 8px;
        right: 3px;
        cursor: pointer;
        i{
          margin-right: 5px;
          opacity: .5;
          &:hover{
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
