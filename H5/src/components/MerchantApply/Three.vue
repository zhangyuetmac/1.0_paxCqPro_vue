<template>
	<div>
		<div class="input-box pr">
            <span class="label"><em>*</em>{{title}}</span>
            <select class="select-long"  v-on:change="classifyFirSel($event)" name = "classifyFir" v-model="classifyFir">
                <option value="0">请选择</option> 
                <option :value="item.zid" v-for="(item,index) in applyDataArrs" :key="index">{{item.typeName}}</option>
            </select>
            <select class="select-long"  @change="classifySecSel($event)" name = "classifySec" v-model="classifySec">
                <option value="0">请选择</option>
                <option :value="item.zid" v-for="(item,index) in applyDataSec" :key="index">{{item.typeName}}</option>
            </select>
            <select class="select-long"  name = "classifyThr" v-model="classifyThr">
                <option value="0">请选择</option>
                <option :value="item.zid" v-for="(item,index) in applyDataThr" :key="index">{{item.typeName}}</option>
            </select>
        </div>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				classifyFir: '',
				classifySec: '',
				classifyThr: '',
				applyDataArrs: this.applyDataArr,
				applyDataSec: [],
				applyDataThr: []
			}
		},
		props:[
			'applyDataArr',
			'title'
		],
		mounted(){
			this.classifyFir = '0'
			this.classifySec = '0'
			this.classifyThr = '0'
		},
		methods:{
			classifyFirSel:function(event){
                for(var i = 0;i<this.applyDataArrs.length;i++){
                    if(event.target.value==this.applyDataArrs[i].childList[0].parentId){
                        this.applyDataSec = this.applyDataArrs[i].childList
                        this.classifySec = '0'
                        this.classifyThr = '0'
                    }else if(event.target.value == 0){
                        this.applyDataSec = []
                        this.applyDataThr = []
                        this.classifySec = '0'
                        this.classifyThr = '0'
                    }
                }
            },
            classifySecSel:function(event){
                for(var i = 0;i<this.applyDataSec.length;i++){
                    if(event.target.value==this.applyDataSec[i].childList[0].parentId){
                        this.applyDataThr = this.applyDataSec[i].childList
                        this.classifyThr = '0'
                    }else if(event.target.value == 0){
                        this.applyDataThr = []
                        this.classifyThr = '0'
                    }
                }
            }
		}
	}