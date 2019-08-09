let merObj = {
        image_type: "jpg",
        image_name: "海底捞",
        image_content:
          "/9j/4AAQSkZJRgABAQEASABIAAD/2wBDABALCwwMDBENDREYEA4QGBwVEREVHCEZGRkZGSEgGRwcHBwZICAlJygnJSAwMDQ0MDBAQEBAQEBAQEBAQEBAQED/2wBDAREQEBITEhYSEhYWEhUSFhwWFxcWHCgcHB0cHCgxJSAgICAlMSwvKCgoL/9j/4AAQSkZJRgABAQEASABIAAD/2wBDABALCwwMDBENDREYEA4QGBwVEREVHCEZGRkZGSEgGRwcHBwZICAlJygnJSAwMDQ0MDBAQEBAQEBAQEBAQEBAQED/2wBDAREQEBITEhYSEhYWEhUSFhwWFxcWHCgcHB0cHCgxJSAgICAlMSwvKCgoLyw2NjExNjZAQD9AQEBAQEBAQEBAQED/wAARCAAUACwDAREAAhEBAxEB/8QAGgAAAgMBAQAAAAAAAAAAAAAAAwUAAQIEBv/EACwQAAEDAwIEBQQDAAAAAAAAAAECAwQAESEFEhMiMVEUIzIzYRUkQUNygrH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A9hqGoeGKGWkcWU77bY/1XxQK16pKEnwjCTO1EZcQk7I7H81UHY1K1BpAflOsuJLqWi22gpF1KCORZUb2J7UDeglBKBLsVw5D4cSiS+soW6T7LYxbPxQAQ4y2wY2m2ZhozJnLwD3IJ9RNAOEv6g+1KILGjwT9tvwX3fTxCOwvj5oH/i4/NzgbBuVfFh3zQUJkZQSoOCzhsg9yKDTchp0bmzvT0uAbUA3oUR5e91lC19yKALmnR5K/PBW22eRn9Y/qKCtQSC5EY6NqcyBj0jFBkRW3prqVE+VsKc3JJv13XoOCOnjoZhrPkq4i1W6kgm2aBrpTinIaCr8XT2wDag//2Q=="
      };
      console.log(merObj.image_content);
      console.log(encodeURIComponent(merObj.image_content));
      //获取上传图片公共参数
      console.log("=====获取上传图片公共参数(含sign,method)========");
      let commonObj = commonParms(methodObj.imageUpload); //methodObj存储所有接口method值
      console.log(commonObj);
      //合并公共参数和请求参数
      console.log("=====合并公共参数========");
      let params = { ...merObj, ...commonObj };
      console.log(params);

      console.log("=====排序待签名字符串========");
      let str = dictOrder(params);
      console.log(str);
      console.log("=====签名========");
      // str ="charset=utf-8&format=JSON&hash_type=SHA256&image_name=txc&image_type=jpg&method=paxpay.material.image.upload&image_name=海底捞&partner_id=88888960&sign_type=RSA&timestamp=2013-01-01 08:08:08&version=1.0";
      params.sign = encrypt(str);
      console.log(params);
      console.log(params.sign);
      this.upload = params.sign;
     
      params.image_content = encodeURIComponent(params.image_content);
    
      this._Axios
        .post("/cms/gateway.do", params)
        .then(res => {
          console.log("post访问公网接口返回的数据===");

          console.log(res);
          console.log("=====验签========");
          let str2 = dictOrder(res.response);
          console.log(str2);
          console.log(decode(str2, res.sign));
          this.uploadflag = decode(str2, res.sign);
        })
        .catch();
