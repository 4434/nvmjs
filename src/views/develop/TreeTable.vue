<template>
    <div class="tree-table">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          fixed="left"  
          prop="date"
          label="部门"
          width="180">
          <template slot-scope="scope">              
                <div class="tree-btn" :style="'margin-left:'+ scope.row.label * 30 +'px;'">
                    <span v-if="scope.row.childs.length > 0">
                        <i class="el-icon-plus" v-if="scope.row.flag" @click="flagTrueBtn(scope.row, scope.$index);"></i>
                        <i class="el-icon-minus" v-if="!scope.row.flag" @click="flagFalseBtn(scope.row, scope.$index);"></i> 
                    </span>    
                    <span>事件{{scope.row.data.label}}</span>
                </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="data.info.brand"
          label="负责品牌"
          width="180">
        </el-table-column>
        <el-table-column
          prop="data.info.channel"
          label="负责渠道"
          width="180">
        </el-table-column>
        <el-table-column
          prop="data.info.name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="data.info.isCharge"
          label="是否部门负责人"
          width="180">
        </el-table-column>
        <el-table-column
          prop="data.info.KPI"
          label="KPI"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="1月"
          show-overflow-tooltip
          >
          <template slot-scope="scope">
            项目：<span>{{scope.row.data.info.month1.target}}</span>
            进度：<span>{{scope.row.data.info.month1.completionPath}}</span>
            完成：<span>{{scope.row.data.info.month1.completionStatus}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="2月">
        </el-table-column>
        <el-table-column
          prop="address"
          label="3月">
        </el-table-column>
        <el-table-column
          prop="address"
          label="4月">
        </el-table-column>
      </el-table>        
    </div>
</template>
<script>
    export default {
      data() {
        return {
          tableData: [
            {label: 0, ykId:0,flag: true, childs: [{childs: [{childs:[]},{childs:[]}]}]},
          ],
        }
      },
      mounted () {
        var [_arr, _json] = [[],{}];
        this.getData().forEach((e,i)=>{
          _json = {
            label: 0,
            ykId: i,
            flag: true,
            data: e,
            childs: e.childs
          }
          _arr.push(_json);
        });
        this.tableData = _arr;
      },
      methods: {
        flagTrueBtn (data, index) {
            data.flag   = false;
            const that  = this;
            var label   = data.label + 1;
            let _JSON   = {};
            data.childs.forEach((e,i)=>{ 
                _JSON = {
                    label: label,
                    ykId: data.ykId + '-' + i,
                    flag: true,
                    data: e,
                    childs: e.childs
                }
                that.tableData.splice(index + 1 + i, 0, _JSON);
                console.log(that.tableData);
            });
        },
        flagFalseBtn (data, index) {
          data.flag = true;
          var num = 0;
          this.tableData.forEach((e,i)=>{
            if(e.ykId.toString().split(data.ykId.toString())[0] == ''){
              num ++ ;
            }
          });
          this.tableData.splice(index + 1, num - 1);
        },
        getData () {
          var arr = [
            {
              label:"信息中心",
              info:{brand:"",channel:"",name:"WYX",isCharge:'是',KPI:"中心的KPI",month1:{target:"完成",completionPath:'1nn',completionStatus:"50"}},
              childs: [
              {
              label:"开发部",
              info:{brand:"",channel:"",name:"",isCharge:'是',KPI:"中心的KPI",month1:{target:"完成",completionPath:'1nn',completionStatus:"40"}},
              childs:[
              {
              label:"中台组",
              info:{brand:"品牌A",channel:"",name:"WW4",isCharge:'是',KPI:"中心的KPI",month1:{target:"完成",completionPath:'1nn',completionStatus:"40"}},
              childs:[]
              },
              {
              label:"OA组",
              info:{brand:"品牌B",channel:"",name:"CWG",isCharge:'是',KPI:"中心的KPI",month1:{target:"完成",completionPath:'1nn',completionStatus:"40"}},
              childs:[]
              }
              ]
              },
              {
              label:"IT支持部",
              info:{brand:"",channel:"",name:"",isCharge:'是',KPI:"中心的KPI",month1:{target:"完成",completionPath:'1nn',completionStatus:"40"}},
              childs:[
              { 
              label:"桌面支持组",
              info:{brand:"品牌C",channel:"",name:"WJ",isCharge:'是',KPI:"中心的KPI",month1:{target:"完成",completionPath:'1nn',completionStatus:"40"}},
              childs:[]
              },
              ]
              }
              ]
            },            
          ]
          return arr;         
        }
      }
    } 
</script>
<style>
  .tree-table{
    padding: 10px;
    box-sizing: border-box;
  }
  .tree-btn i{
      cursor: pointer;
  }
</style>