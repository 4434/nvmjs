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
        <el-form-item label="选择日期">
          <el-date-picker
            v-model="addForm.time"
            type="date"
            value-format="timestamp"
            style="width: 100%"
            size="small"
            placeholder="选择日期">
          </el-date-picker>          
        </el-form-item>
        <el-form-item label="输入数字">
          <el-input type="number" v-model="addForm.num" size="small"  autocomplete="off" placeholder="请输入数字"></el-input>
        </el-form-item>        
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
        backgroundColor: '#fff',   // 设置背景色
        xAxis: {
          type: "category",
          // boundaryGap: false,        // 设置刻度从0开始
          axisLabel: {
            rotate: 30,         // 设置X轴 旋转角度
            color: "#999",       // 设置X轴 文字颜色
          },
          axisLine: {
            lineStyle: {
              color: "#999",      // 设置X轴 的颜色
            }
          },          
          data: display
        },
        yAxis: {
          type: "value",
          axisLabel: {
            color: "#999",       // 设置Y轴 文字颜色
          },
          axisLine: {
            lineStyle: {
              color: "#999",      // 设置Y轴 的颜色
            }
          },
          splitLine: {
            lineStyle: {
              color: ["#abcdef", "#999"],   // 使用深浅的间隔色
              width: 1,                     // 分割线的宽度
              type: "dashed"                 // 分割线的类型
            }
          }                
        },
        grid: {
            left: "80px",
            right: "80px",
            top: "10%",
            bottom: "10%"
        },        
        series: [
          {
            data: data,
            color: "#0097A7",     // 设置线条颜色
            type: "bar",          // 图标类型
            smooth: 0.3,            // 设置弧度
            itemStyle : { normal: {label : {show: true}}},      // 显示数值
          },
        ]
      };
      myEcharts.setOption(option);
    },
    addBtn () {
      this.flag.add = true;
      this.addForm.id = null;
      this.$set(this.addForm, 'time', this.timeInit().getTime);
      this.$set(this.addForm, 'num', null);
    },
    getData () {
      echartServe.listData(this.queryForm).then(res=>{
        if(res.code == 200){
          this.tableData = res.data.map(res=>{
            res.timeString = this.timeInit(res.time).year + '-' + this.timeInit(res.time).month + '-' + this.timeInit(res.time).day;
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
      if(!this.addForm.time){
        this.open('请选择日期', 'error');
        return
      }      
      if(this.addForm.num == null || this.addForm.num == undefined || this.addForm.num == ''){
        this.open('请输入数值', 'error')
        return
      }
      this.addForm.token = localStorage.token || '';
      this.flag.add = false;
      if(this.addForm.id){
        echartServe.dataUpdate(this.addForm).then(res=>{
          if(res.code == 200){
            this.addForm = {}
            this.open('修改成功', 'success');
            this.getData();
          }
        });
      }else{
        echartServe.addData(this.addForm).then(res=>{
          if(res.code == 200){
            this.addForm = {}
            this.getData();
            this.open('添加成功', 'success');
          }
        });
      }
    },
    dataUpdateBtn (item) {
      this.flag.add = true;
      this.$set(this.addForm, 'num', item.num);
      this.$set(this.addForm, 'time', item.time);
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
