<template>
  <div class="EChartsComp">
    <div
      class="echarts-squareness"
      id="echarts-squareness"
    >

    </div>
    <div
      class="echarts-circular"
      id="echarts-circular"
    >

    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  components: {
  },
  methods: {
    drawLine(ajaxData) {
      // 基于准备好的dom，初始化echarts实例
      console.log('eee')
      let firstDayData='';
      let piestr = ""
      var curInt = 0;
      let pieGraphic = ''
      let chartDate = ['6-24', '6-25', '6-26', '6-27', '6-28', '6-29', '6-30'];
      let pieData = [{
        flag: 100,
        value: 2000,
        name: '工商'
      },
      {
        flag: 200,
        value: 3000,
        name: '农业'
      },
      {
        flag: 300,
        value: 4000,
        name: '建设'
      },
      {
        flag: 400,
        value: 5000,
        name: '支付宝'
      },
      {
        flag: 500,
        value: 6000,
        name: '微信'
      },
      {
        flag: 600,
        value: 7000,
        name: '翼支付'
      }];
      let myChart1 = echarts.init(document.getElementById('echarts-squareness'))
      let myChart2 = echarts.init(document.getElementById('echarts-circular'))
      // let myChart = echarts.init($('#echartsWrapper2'))
      let option1 = {
        title: {
          // text: '动态数据',
          // subtext: '纯属虚构'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#283b56'
            }
          }
        },
        legend: {
          data: ['有效金额', '有效笔数']
        },
        // toolbox: {
        //   show: true,
        // },
        dataZoom: {
          show: false,
          start: 0,
          end: 100
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            data: chartDate
          },
          {
            type: 'category',
            boundaryGap: true,
            show: false,
            data: chartDate
          }
        ],
        yAxis: [
          {
            type: 'value',
            scale: true,
            name: '万元',
            min: 0,
            boundaryGap: [0.2, 0.2]
          },
          {
            type: 'value',
            scale: true,
            name: '笔数',
            min: 0,
            boundaryGap: [0.2, 0.2]
          }
        ],
        series: [
          {
            name: '有效金额',
            type: 'bar',
            yAxisIndex: 0,
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
            type: 'line',
            yAxisIndex: 1,
            data: [120, 200, 150, 80, 70, 110, 100],
          }
        ]
      };
      let option2 = {
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
            radius: ['20%', '50%'],
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
                borderWidth: 20,
                borderRadius: 4,
                rich: {
                  a: {
                    color: '#999999',
                    fontSize: 12,
                    lineHeight: 16,
                    aligh: 'right',
                    padding: 2
                  },
                  b: {
                    color: '#999999',                       //name 文字样式
                    fontSize: 12,
                    lineHeight: 16,
                    aligh: 'right',
                    padding: 2

                  },
                  c: {                   //value 文字样式
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
        color: ['#259EF5', '#42BBD2', 'green', '#BCD259', '#F0B34E', '#256BF9']
      }
      myChart1.setOption(option1)
      myChart1.on('click', function (params) {
        console.log(params)
        curInt = params.dataIndex;
        myChart1.setOption(option1, false);
        pieGraphic = params.name;
        option2.graphic.style.text = pieGraphic;
        // pieData='动态数据';
        // option2.series.data=pieData;
        myChart2.setOption(option2, false)
      })
      myChart2.setOption(option2);
      getParam()
      function getParam(){
         let pieData=pieData
      }

    },
    getAJaxData(){
      let ajaxData=''
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

.EChartsComp {
  width: 100%;

  .echarts-squareness {
    width: 100%;
    height: 300px;
  }

  .echarts-circular {
    width: 100%;
    margin: 0 auto;
    height: 300px;
  }
}
</style>


