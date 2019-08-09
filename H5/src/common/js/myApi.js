//生成biz-content里面json为:号的，瓦面的为=号，最终加上地址和签名可以访问接口
		/**
		 * 
		 * @param obj Object 输入对象
		 * @param orderByKeyASC Boolen 是否按照key的ACI值排序
		 * @param desc Boolen 是否按降序排列
		 */
<script>
		function objectTransKeyValue(obj, orderByKeyASC, desc) {
			const keys = Object.keys(obj)
			if(orderByKeyASC) {
				if(desc) {
					keys.sort((a, b) => a < b ? 1 : -1)
				} else {
					keys.sort((a, b) => a > b ? 1 : -1)
				}
			}
			const r = []
			keys.forEach((key) => {
				r.push(`${key}=${obj[key]}`)
			})
			return r.join('&')
		}

		function attrObjectToString(attrObject) {
			const keys = Object.keys(attrObject)
			const r = []
			keys.forEach((key) => {
				console.log(typeof attrObject[key])
				if(attrObject[key] instanceof Object){
					attrObject[key]=JSON.stringify(attrObject[key])
					r.push(`"${key}":${attrObject[key]}`)
				} else {
					r.push(`"${key}":"${attrObject[key]}"`)
				}	
		})
			return `{${r.join(',')}}`
		}
	</script></script>
	<script>
		//3.2商户创建---merchant.create
		/*
		function merchantCreate() {
			const params = {
				timestamp: '2013-01-01 08:08:08',
				method: 'paxpay.market.merchant.create',
				partner_id: '88888948',
				sign_type: 'RSA',
				hash_type: 'SHA256',
				version: '1.0',
				biz_content: {
					merchant_name: '肯德基',
					fax: "023-47904081",
					agent_id: '88888948',
					contact_name: '张三',
					mobile: '18502314927',
					email: 'zhangsan@paxsz.com',
					category_id: '2015050700000018',
					storeshortname: '万塘路店',
					property: '1',
					mchdealtype: '1',
					mcc: '4011',
					province_code: '110000',
					city_code: '110100',
					district_code: '140521',
					address: '万塘路18号黄龙时代广场',
					business_time: '09:00-11:00,13:00-15:00',
					contact_type: '0',
					contact_number: '13612344321',
					contact_province : '110000',
					contact_city : '140500',					
					contact_area : '140521',					
					contact_address : '万塘路18号黄龙时代广场',
					main_image: 'a3d1582530b14ac19e2f2e240c7ccb1d',
					shop_place_image: 'a3d1582530b14ac19e2f2e240c7ccb1d',
					shop_product_image: 'a3d1582530b14ac19e2f2e240c7ccb1d',
					shop_cashier_image: 'a3d1582530b14ac19e2f2e240c7ccb1d',
					shop_cas: 'a3d1582530b14ac19e2f2e240c7ccb1d',
					hier_image: 'AAAACMAAQEC',
					enterprise_type: '0',
					org_code: 'H001232',
					licence_name: '来伊份上海分公司',
					busi_address: 'XX省XX市XX区XX',
					busi_legal_name: '张三',
					reg_capital: '100',
					busi_province: '110000',
					busi_city: '110100',
					busi_area: '140521',
					busi_start: '2010-03-20',
					busi_end: '2020-03-20',
					busi_license_image: 'a3d1582530b14ac19e2f2e240c7ccb1d',
					legal_id_type: '1',
					legal_id_image1: 'a3d1582530b14ac19e2f2e240c7ccb1d',
					legal_id_image2: 'a3d1582530b14ac19e2f2e240c7ccb1d',
					legal_id_image5: 'a3d1582530b14ac19e2f2e240c7ccb1d',
					legal_id_start: '2020-10-20',
					legal_id_end: '2020-10-20',
					legal_name: '张三',
					legal_id_no: '500106198606304321',
					accounttype: '2',
					accountname: '张三',
					account_code: '622212345678901234',
					bankname: '工商银行',
					sub_bank_name: '中国工商银行股份有限公司北京通州支行新华分理处',
					open_bank_pro: '北京',
					open_bank_city: '北京',
					tel: '13312312312'
				}
			}

			params.biz_content = attrObjectToString(params.biz_content)
			const toGetSignString = objectTransKeyValue(params, true, false)
			console.log(toGetSignString)
		}
		merchantCreate()*/

		//3.4创建门店---shop.create
		/*
		function shopCreate() {
			const params = {
				partner_id: '88888948',
				method: 'paxpay.market.shop.create',
				sign_type: 'RSA',
				timestamp: '2016-08-23 03:07:50',
				version: '1.0',
				operate_notify_url: 'http://example.com/gateway.do',
				request_id: '2015123235324534',
				biz_content:{
					cid:'0885190600000001',
					merchant_name: "海底捞",
					contact_name: "张三",
					mobile: "13312345678",
					fax: "02367904081",
					contract_num: "12345312",
					outer_contract_num: "121321321",
					customer_manager: "李四",
					category_id: '2015050700000018',
					storeshortname: '万塘路店',
					property: '1',
					mchdealtype: '1',
					mcc: '4011',
					province_code: '110000',
					city_code: '140500',
					district_code: '140521',
					address: '万塘路18号黄龙时代广场',
					business_time: '09:00-11:00,13:00-15:00',
					contact_type: '0',
					contact_name: '张三',
					contact_number: '13612344321',
					email:'zhangsan@paxsz.com',
					office_number:'13867498729',
					contact_province:'110000',
					contact_city:'140500',
					contact_area:'140521',
					contact_address:'万塘路18号黄龙时代广场',		
					main_image: 'a3d1582530b14ac19e2f2e240c7ccb1d',
					shop_place_image: 'a3d1582530b14ac19e2f2e240c7ccb1d',
					shop_product_image: 'a3d1582530b14ac19e2f2e240c7ccb1d',
					shop_cashier_image:'a3d1582530b14ac19e2f2e240c7ccb1d',
					enterprise_type:'0',
					org_code: 'H001232',
					licence_name: '来伊份上海分公司',
					busi_address: 'XX省XX市XX区XX',
					busi_legal_name: '张三',
					reg_capital: '100',
					busi_province: '110000',
					busi_city: '140500',
					busi_area: '140521',
					busi_start: '2010-03-20',
					busi_end: '2020-03-20',
					busi_license_image: 'a3d1582530b14ac19e2f2e240c7ccb1d',
					legal_id_type: '1',
					legal_id_image1: 'a3d1582530b14ac19e2f2e240c7ccb1d',
					legal_id_image2: 'a3d1582530b14ac19e2f2e240c7ccb1d',
					legal_id_image5: 'a3d1582530b14ac19e2f2e240c7ccb1d',
					legal_id_start: '2020-10-20',
					legal_id_end: '2020-10-20',
					legal_name: '张三',
					legal_id_no: '500106198606304321',
					accounttype: '1',
					accountname: '张三',
					account_code: '622212345678901234',
					bankname: '工商银行',
					sub_bank_name: '中国工商银行股份有限公司北京通州支行新华分理处',
					open_bank_pro: '北京',
					open_bank_city: '北京市',
					tel: '13312312312'
				}
			}
			params.biz_content = attrObjectToString(params.biz_content)
			const toGetSignString = objectTransKeyValue(params, true, false)
			console.log(toGetSignString)
		}
		shopCreate()*/

		//3.6新增门店产品---paxpay.shop.product.create
		/*
		function shopProductCreate() {
			const params = {
				partner_id: '88888948',
				method: 'paxpay.shop.product.create',
				sign_type: 'RSA',
				hash_type: 'SHA256',
				timestamp: '2016-08-23 03:07:50',
				version: '1.0',
				operate_notify_url: 'http://example.com/gateway.do',
				request_id: '2015123235324534',
				biz_content:{
					merchant_name: "海底捞",
					contact_name: "张三",
					mobile: "13312345678",
					fax: "02367904081",
					contract_num: "12345312",
					outer_contract_num: "121321321",
					customer_manager: "李四",
					//需要使用创建商户时候返回的值，不然表里数据会出现主键冲突(需要在创建商户以后进行解析)
					store_id:'08851906000000010001',
					transtypes:[
						{
							"code":"BALANCE"
						},
						{
							"code":"PREAUTH"
						},
						{
							"code":"SALE"
						}
					],
					product_info:[
						{
							"product_id":"01",
							"lbid":"PXMP",
							"sttl_type":"T1",
							"nor_fee_rate_d":"0.38",
							"nor_fee_min_d":"0",
							"nor_fee_max_d":"999999"
						}
					]
				}
			}
			params.biz_content = attrObjectToString(params.biz_content)
			const toGetSignString = objectTransKeyValue(params, true, false)
			console.log(toGetSignString)
		}
		shopProductCreate()*/

		//3.8门店信息回填---paxpay.shop.backfill
		function shopBackfill() {
			const params = {
				partner_id: '88888948',
				method: 'paxpay.shop.backfill',
				sign_type: 'RSA',
				hash_type: 'SHA256',
				timestamp: '2016-08-23 03:07:50',
				version: '1.0',
				operate_notify_url:'http://example.com/gateway.do',
				request_id: '2015123235324534',
				biz_content: {
					merchant_name:"海底捞",
					contact_name:"张三",
					mobile: "13312345678",
					fax: "02367904081",
					contract_num: "12345312",
					outer_contract_num: "121321321",
					customer_manager: "李四",
					store_id: '08851906000000010001',
					"product_backfill_info": [
						{
							"product_id":"01",
							"lbid":"HXTN",
							"mid":"121212121212121"
						},{
							"product_id":"WA",
							"lbid":"WX",
							"mid":"121212121212121"
						},{
							"product_id":"AL",
							"lbid":"DM",
							"mid":"121212121212121"
						},
						{
							"product_id":"UC",
							"lbid":"CJZF",
							"mid":"121212121212122"
						}
					]
				}
			}
			params.biz_content = attrObjectToString(params.biz_content)
			const toGetSignString = objectTransKeyValue(params, true, false)
			console.log(toGetSignString)
		}
		shopBackfill()

		//3.9创建门店商户终端---paxpay.shop.MerTerm.create
		/*
		function shopMerTermCreate() {
			const params = {
				partner_id: '88888948',
				method: 'paxpay.shop.MerTerm.create',
				sign_type: 'RSA',
				hash_type: 'SHA256',
				timestamp: '2016-08-23 03:07:50',
				version: '1.0',
				operate_notify_url: 'http://example.com/gateway.do',
				request_id: '2015123235324534',
				biz_content: {
					merchant_name: "海底捞",
					contact_name: "张三",
					mobile: "13312345678",
					fax: "02367904081",
					contract_num: "12345312",
					outer_contract_num: "121321321",
					customer_manager: "李四",
					store_id: '03272017070300010001',
					term_num: "2",
					"term_info": [{
							"manucode": "PAX",
							"modelcode": "A920",
							"sn": "123",
							"term_product_info": [{
									"product_id": "CARDPAY",
									"lbid": "HXTN",
									"mid": "121212121212121",
									"tid": "00000001"
								},
								{
									"product_id": "UCLOUDPAY",
									"lbid": "CJZF",
									"mid": "121212121212122",
									"tid": "00000002"
								}
							]
						},
						{
							"manucode": "PAX",
							"modelcode": "A920",
							"sn": "456",
							"term_product_info": [{
								"product_id": "CARDPAY",
								"lbid": "HXTN",
								"mid": "121212121212121",
								"tid": "00000001"
							}]
						}
					]

				}
			}
			params.biz_content = attrObjectToString(params.biz_content)
			const toGetSignString = objectTransKeyValue(params, true, false)
			console.log(toGetSignString)
		}
		shopMerTermCreate()*/
		

		//3.10查询商户是否进件---paxpay.mer.checkMidandTid
		/*function merCheckMidandTid() {
			const params = {
				partner_id: '88888948',
				method: 'paxpay.mer.checkMidandTid',
				sign_type: 'RSA',
				hash_type: 'SHA256',
				timestamp: '2016-08-23 03:07:50',
				version: '1.0',
				operate_notify_url: 'http://example.com/gateway.do',
				request_id: '2015123235324534',
				biz_content:{
					mid: "888233221221",
					tid: "000001"
				}
			}
			params.biz_content = attrObjectToString(params.biz_content)
			const toGetSignString = objectTransKeyValue(params, true, false)
			console.log(toGetSignString)
		}
		merCheckMidandTid()*/