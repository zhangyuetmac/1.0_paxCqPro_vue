<template>
  <div>
    <div @click="showGategory = true">
      <button>{{category_id}}</button>
    </div> 
     <!-- 显示行业类目 -->
    <van-popup v-model="showGategory" position="bottom">
      <mt-picker  show-toolbar :slots="slots" value-key="name" @change="onValuesChange">
        <div style="display: flex;height: 44px;line-height: 44px;-webkit-box-pack: justify;-ms-flex-pack: justify;justify-content: space-between;border-bottom:1px solid #ebedf0">
         <div @click="showGategory = false" class="van-picker__cancel">取消</div>
        <div @click="getGategory" class="van-picker__confirm">确认</div> </div> 
      </mt-picker> 
    </van-popup>
  </div>
</template>
<script>
import {getCategoriesAxios} from "common/js/basicAxios/getCategoriesAxios"
import {  Popup } from "vant";
import {picker} from "mint-ui"
const address = [
  {
    code: "",
    name: "美食",
    childs: [
      {
        code: "",
        name: "中餐",
        childs: [
          {
            code: "2015050700000010",
            name: "川菜"
          },
          {
            code: "2015050700000010",
            name: "湘菜"
          },
          {
            code: "2015050700000010",
            name: "湖北菜"
          }
        ]
      },
      {
        code: "",
        name: "火锅",
        childs: [
          {
            code: "2015050700000020",
            name: "麻辣烫/串串香"
          },
          {
            code: "2015050700000020",
            name: "川味/重庆火锅"
          }
        ]
      },
      {
        code: "",
        name: "烧烤",
        childs: [
          {
            code: "2015050700000040",
            name: "中式烧烤"
          },
          {
            code: "2015050700000040",
            name: "拉美烧烤"
          }
        ]
      }
    ]
  },
  {
    code: "",
    name: "超市便利店",
    childs: [
      {
        code: "2015091000058480",
        name: "超市",
        childs: []
      },
      {
        code: "2015091000056950",
        name: "个人护理",
        childs: []
      }
    ]
  },
  {
    code: "",
    name: "K歌",
    childs: [
      {
        code: "",
        name: "KTV",
        childs: [
          {
            code: "2015090700042460",
            name: "量贩式KTV"
          },
          {
            code: "2016042200000050",
            name: "会所式KTV"
          }
        ]
      }
    ]
  },
  {
    code: "",
    name: "电影",
    childs: [
      {
        code: "2016062900190380",
        name: "电影院",
        childs: []
      },
      {
        code: "2016062900190380",
        name: "私人电影",
        childs: []
      }
    ]
  }
];
export default {
  data() {
    return {
       slots: [
        {
          flex: 1,
          values: address,
          defaultIndex: 0,
          className: "slot1",
          textAlign: "center"
        },
        {
          divider: true,
          content: "---",
          className: "slot2"
        },
        {
          flex: 1,
          values: address[0].childs,
          defaultIndex: 0,
          className: "slot3",
          textAlign: "center"
        },
        {
          divider: true,
          content: "---",
          className: "slot4"
        },
        {
          flex: 1,
          values: address[0].childs[0].childs,
          defaultIndex: 0,
          className: "slot5",
          textAlign: "center"
        }
      ],
      category_id:'请选择',
      myAddress:'',
      showGategory:false,
    }
  },
  methods:{
    onValuesChange(picker, values) {
      console.log('values===='+JSON.stringify(values))
      console.log('values[0]===='+JSON.stringify(values[0]))
      console.log("values[0].childs值=="+JSON.stringify(values[0].childs))
      console.log("values[0].childs.length长度==="+values[0].childs.length)
      if(values[0].childs.length>0){
        picker.setSlotValues(1, values[0].childs);
        console.log("values[1].childs值"+JSON.stringify(values[1].childs))
        console.log("values[1].childs.length长度"+values[1].childs.length)
        if (values[1].childs.length>0 ) {
          picker.setSlotValues(2, values[1].childs);
        } else {
          picker.setSlotValues(2, '');
        }
      }else {
        picker.setSlotValues(1, '');
      }
    this.myAddress = values;
    console.log("滑动选择到的myAddress"+JSON.stringify(this.myAddress))
    },
    //获取经营类目
    getGategory(value) {
      // console.log("经营类目id");
      console.log(value);
      console.log(this.myAddress);
      if (this.myAddress[2] != undefined) {
        this.category_id = this.myAddress[2].name;
      } else if (this.myAddress[1] != undefined) {
        this.category_id = this.myAddress[1].name;
      } else {
        this.category_id = this.myAddress[0].name;
      }
      this.showGategory = false;
    },
  }
}
</script>
<style>

</style>


