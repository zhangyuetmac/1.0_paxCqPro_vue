

function cameraTakePicture(name,addImgName) {
  console.log('cordovaplugin.js调用拍照走到')
  const idName = name
  const addImg = addImgName
  console.log('cordova----idName==='+idName)
  navigator.camera.getPicture(onSuccess,onFail,{
    quality:50,
    destinationType: Camera.DestinationType.DATA_URL
  });
  function onSuccess(imageData){
    var image = document.getElementById(idName)
    console.log('调用手机拍照成功')
    console.log('拍照返回的图片imageData==='+imageData)
    image.src = "data:image/jpeg;base64,"+imageData
    console.log('拍摄照片拿到的addImg=='+addImg)
    var addImgDiv = document.getElementById(addImg)
    addImgDiv.style.display = "none"
    // return imageData
  }
  function onFail(message){
    alert("调用相机失败:"+message)
  }
}

function getLocalPicture(name,addImgName) {
  console.log('cordovaplugin.js调用相册走到')
  const idName = name 
  const addImg = addImgName
  console.log('cordova----idName==='+idName)
  navigator.camera.getPicture(onSuccess,onFail,{
    quality:50,
    destinationType: Camera.DestinationType.FILE_URI,
    sourceType: 0
  });
  function onSuccess(imageURI){
    var image = document.getElementById(idName)
    console.log('调用手机相册成功')
    console.log('调用相册选择的图片imageURI==='+imageURI)
    image.src = imageURI
    console.log('拍摄照片拿到的addImg=='+addImg)
    var addImgDiv = document.getElementById(addImg)
    addImgDiv.style.display = "none"
    // return imageURI
  }
  function onFail(message){
    alert("调用手机相册失败:"+message)
  }
}

// async function cameraTakePicture(name) {
//   return new Promise((resolve,reject)=>{
//     const idName = name
//     navigator.camera.getPicture(onSuccess,onFail,{
//       quality:50,
//       destinationType: Camera.DestinationType.DATA_URL
//     });
//     function onSuccess(imageData){
//       var image = document.getElementById(idName)
//       console.log('调用手机拍照成功')
//       console.log('拍照返回的图片imageData==='+imageData)
//       image.src = "data:image/jpeg;base64,"+imageData
//       // return imageData
//       resolve('imgSuccess')
//     }
//     function onFail(message){
//       alert("调用相机失败:"+message)
//       reject('imgFail')
//     }
//   })
// }

// async function getLocalPicture(name) {
//   return new Promise((resolve,reject)=>{
//     console.log('cordovaplugin.js调用相册走到')
//     const idName = name 
//     console.log('cordova----idName==='+idName)
//     navigator.camera.getPicture(onSuccess,onFail,{
//       quality:50,
//       destinationType: Camera.DestinationType.FILE_URI,
//       sourceType: 0
//     });
//     function onSuccess(imageURI){
//       var image = document.getElementById(idName)
//       console.log('调用手机相册成功')
//       console.log('调用相册选择的图片imageURI==='+imageURI)
//       image.src = imageURI
//       // return imageURI
//       resolve('imgPicSuccess')
//     }
//     function onFail(message){
//       alert("调用手机相册失败:"+message)
//       reject('imgPicFail')
//     }
//   })
// }

export{
  cameraTakePicture,
  getLocalPicture
}