<template>
  <div class="EChartsComp-date">
    <div class="echarts-squareness" id="echarts-squareness-date">
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import BankAmoutData from 'common/data/BankAmout'
export default {
  components: {
  },
  methods: {
    drawLine(ajaxData) {
      console.log('银行流水模拟数据==' + JSON.stringify(BankAmoutData))
      let curInt = 0;
      //树状图横坐标数据
      let chartDate = BankAmoutData[0].map((item)=>{
        return item.name
      });
      // 基于准备好的dom，初始化echarts实例
      let myChart1 = echarts.init(document.getElementById('echarts-squareness-date'))
      //树状图和折线图结合
     let option1 = {
        //柱状图头部
        title: {
          text: '本日总计',
          textStyle: {
            fontSize: 15,
            fontStyle: 'normal',
            fontWeight: 'normal',
            color:'#666666' 
          },
        },
        //点击柱状图的提示框
        tooltip: {
          show:true,
          trigger: 'axis',
          //坐标轴指示器是指示坐标轴当前刻度的工具。
          // axisPointer: {
          //   type: 'cross',
          //   label: {
          //     backgroundColor: '#283b56'
          //   }
          // }
        },
        //头部的图例组件
        legend: {
          data: [
            {
              name:'有效金额',
            },
            {
              name:'有效笔数',
            // icon: 'circle',
            }
          ],
          // show:false
        },
        //可视化的工具箱(目前没看出有什么作用在这个表)
        toolbox: {
          show: true,
        },
        //X轴数据
        xAxis: [
          //x轴下方数据(第一个默认在下方，通过position设置是在上放还是下方)
          {
            //值的类型，默认为category
            type: 'category',
            //坐标轴两边留白策略
            boundaryGap: true,
            data: chartDate,
            // position:"top"
             axisLabel: {
                interval:0 
            }
          },
          //x轴上方数据(隐藏了)
          {
            type: 'category',
            boundaryGap: true,
            show: false,
            data: chartDate
          }
        ],
        //Y轴数据
        yAxis: [
          //Y轴左边数据
          {
            type: 'value',
            name: '万元',
            //坐标轴最小刻度
            min: 0,
            boundaryGap: [0.2, 0.2],
          },
          //Y轴右边数据
          {
            type: 'value',
            name: '笔数',
            min: 0,
            boundaryGap: [0.2, 0.2],
            show:true
          }
        ],
        //折线/面积图(中间显示的图)
        series: [
          {
            name: '有效金额',
            type: 'bar',
            yAxisIndex: 0,
            data: BankAmoutData[0].map((item)=>{
              return item.value
            }),
            barWidth:'20px',
            itemStyle: {
              normal: {
                color: function (params) {
                  var key = params.dataIndex;
                  console.log(key);
                  console.log(curInt);
                  if (key === curInt) {
                    return '#173CDD'
                  } else {
                    return '#4399F1'
                  }
                }
              }
            }
          },
          {
            name: '有效笔数',
            //第二个折线图如果也设置成type为bar的话，就会是两个柱状图在页面上
            type: 'line',
            yAxisIndex: 1,
            data: BankAmoutData[0].map((item)=>{
              return item.flag
            }),
          }
        ]
      };
      myChart1.setOption(option1)
      myChart1.on('click', function (params) {
        //点击柱状图，获取当前的下标
        curInt = params.dataIndex;
        console.log('当前点击的curInt下标==' + curInt)
        myChart1.setOption(option1, false);
      })
    },
    getAJaxData() {
      let ajaxData = ''
      this.drawLine(ajaxData)
    }
  },
  mounted() {
    this.getAJaxData()
  },
}
</script>
<style lang="stylus" scoped>
@import '../../../common/stylus/mixin';
.EChartsComp-date 
  width: 100%;
  .echarts-squareness
    width: 100%;
    // width: 90%;
    // margin-left 5%
    height: 300px;
    margin-top 10px
    background #FFFFFF 
  .echarts-circular
    width: 100%;
    margin: 0 auto;
    height: 330px;
    background #FFFFFF 
</style>


