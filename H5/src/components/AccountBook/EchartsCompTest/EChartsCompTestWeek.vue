<template>
  <div class="EChartsComp-week">
    <div class="echarts-squareness" id="echarts-squareness-week">
    </div>
    <div class="echarts-circular" id="echarts-circular-week">
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
      let firstDayData = '';
      let piestr = ""
      let curInt = 0;
      //饼状图中心显示的6.24日期
      let pieGraphic = BankAmoutData[0][0].date
      let chartDate = ['6.24', '6.25', '6.26', '6.27', '6.28', '6.29', '6.30'];
      //饼状图 6月24号的所有交易数据
      let pieData = BankAmoutData[0]
      // 基于准备好的dom，初始化echarts实例
      let myChart1 = echarts.init(document.getElementById('echarts-squareness-week'))
      let myChart2 = echarts.init(document.getElementById('echarts-circular-week'))
      //树状图和折线图结合
      let option1 = {
        //柱状图头部
        title: {
          text: '本周总计',
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
            barWidth:'20px',
            data: [1200, 2000, 1050, 800, 700, 1100, 1030],
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
            data: [120, 200, 150, 80, 70, 110, 100],
          }
        ]
      };
      //饼状图
      let option2 = {
        //饼状图中心显示的名称6.24(日期)
        graphic: {
          type: 'text',
          left: 'center',
          top: 'center',
          style: {
            text: pieGraphic
          }
        },
        grid: {
          left: 20,
          right: 20
        },
        //头部标题
        title: {
          text: '有效金额占比',
          left: "center"
        },
        tooltip: {
          show: true,
        },
        series: [
          {
            name: '金额',
            type: 'pie',
            radius: ['20%', '45%'],
            data: pieData,
            avoidLabelOverlap: true,
            itemStyle: {
              emphasis: {
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            labelLine: {
              normal: {
                length: 5,
                length2: 10
              }
            },
            label: {
              normal: {
                formatter: function (params) {
                  piestr = '{a|' + '金额：' + params.value + '元' + '}' + '\n'
                    + '{b|' + '笔数：' + params.data.flag + '笔' + '}' + '\n'
                    + '{hr|}' + '\n'
                    + '{c|' + params.name + '}'
                  return piestr
                },
                borderWidth: 0,
                borderRadius: 0,
                rich: {
                  a: {
                    color: '#999999',
                    fontSize: 12,
                    lineHeight: 16,
                    aligh: 'right',
                    padding: 2
                  },
                  //name 文字样式
                  b: {
                    color: '#999999',
                    fontSize: 12,
                    lineHeight: 16,
                    aligh: 'right',
                    padding: 2

                  },
                  //value 文字样式
                  c: {      
                    fontSize: 12,
                    lineHeight: 16,
                    color: '#333333',
                    aligh: 'right',
                    padding: 2
                  },
                  hr: {
                    borderColor: '#12EABE',
                    width: '100%',
                    borderWidth: 2,
                    height: 0,
                  }
                }
              }
            },
            textStyle: {
              color: 'rgba(255, 255, 255, 0.3)'
            }
          }
        ],
        color: ['#259EF5 ', '#42BBD2', 'green', '#BCD259', '#F0B34E', '#256BF9']
      }
      myChart1.setOption(option1)
      myChart1.on('click', function (params) {
        console.log('点击柱状图的params')
        console.log(params)
        //点击柱状图，获取当前的下标
        curInt = params.dataIndex;
        console.log('当前点击的curInt下标==' + curInt)
        myChart1.setOption(option1, false);
        //点击柱状图获取name(当前的日期)，放在饼状图的中心
        pieGraphic = params.name;
        option2.graphic.style.text = pieGraphic;
        //点击柱状图，记录下标，用下标去拿模拟的数据，复制给饼状图
        pieData = BankAmoutData[curInt]
        option2.series[0].data = pieData;
        //把整个饼状图的数据赋值给myChart2，达到更新的目的
        myChart2.setOption(option2, false)
      })
      myChart2.setOption(option2);
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
.EChartsComp-week
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
    height: 300px;
    background #FFFFFF 
</style>


