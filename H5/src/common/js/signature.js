import RSA from 'jsrsasign';
const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDP+D8KA7MWyD9r
jtKr/7xhpmqSDga3PKqRO12cNbR7EM0SkZOOfCbDRgmKHFVOSGwoEkBGz1DysebP
kpwZMThQYNNPI6dvy29IUTARhkLSs9tFJxEl01jB4JRSuqWZYk+a3yLsLUOoDwQ6
XNEjPvV2P9K9VPHIJUfD6zQUsWwL+DeNGu+WOM4q8VpVJRDzUTRPOq4dx1iSaTly
aLY1XJkRLMgLy5IXBkSIq3yjsf/QYyf5AJFNGDZipJukz87yojAk62bSqXiT1d5B
DBbUm6VlniHQfvduN1P2QMwUNPyYzP04nottC72j+pwowJYqFHa25SgYhZBK6TFh
fp9BwcR1AgMBAAECggEAbA0so4VcjN+po7Zm2ppaQ9n00MGc16Mbc62Ga1yz0qTe
B2G/am4yrY478pfZ8nxKRV+GKcQY6J9prjscAzLBcXF9GEcL/VeTD92uvcwl99ce
e4VasW5nVQPbzEfRNioP9gUs3cx+tFho9/G1bzyMx81NLrVtkXFdIfuX6ZBs9KIn
aPD9HDTRD+6m+235qvd2vI6iny7eeOREheYSQCpX7aPpJnLZlUGvGPaMKcJ4SpR3
wGPH6GzSeQFw3Hkdfd7406B2z7ft+3p/idBzCU3t9fIp09EFpo1FhpWUyznmwoZ8
xkyT5TwdX1r6d/a82pX2BGepfcfY48MIu1kruJF7gQKBgQD8sD7Meg3HtVcPKqit
HQdO8bpRH9g9fYViB8bjRKnvPZ/ongV3lJdgMAb4/SUJWZ3jrdSQd7YTem5LhAMy
0K9J4K1mF1rWNF5KNhq5zsHZlMsiqc8nucLXu1Lc/Ax2v13UfzsV4GDTd/Tg12gd
+pIYQOQddDW5JTermUrUDBdocQKBgQDSsfjjD0g7ZeQ45U9RFEbJHHE6OnnDCyAo
emqMRBJudiiSbFC2MuT81hEGloRJQ2Jptqw/xpES/+FuiHKOJ/XEKKe5AVPasJoB
NPh0TTFUk1aR0cDG2frOwLPlnXvL149u4SpdAs+dYiq9Bl0MrZ2zgX6ZUHje3S/f
UqGJ6Dt+RQKBgQCYMctROz5rh+SM5QO9aNuLB/tRe12yA5U/6zE2l5fG2hYjdHIU
iTH3pFW+yDHzhL+db4i1DvVim/4si7GlfJ3nYGTwNabnl5knF5lXSpnlZEJJeX+l
DLS3XUNWiJU1PKPWJl+/GGsZU4nxlqxGSjKOWx9KQkFNZ4Y1W9n/B91dcQKBgQC6
fyJJCcvsF8Ktwfw1TndhqLVozz3cMUrjyYfqZI7UC+7ZvNqsi9w5GNq1NCIgH29L
F5DcWs0rPiezCUAtKJ3YZgwgLFanKs8G5nZNq85QiKKGLF4xJd1liRkz0/QyeLnT
cadn8QcIzk36R1mx0TPYInWHC74Rt0Oar6+hPFj86QKBgF52ySrh8UO923seCXyx
lUoZrVpzGFZr6mlZsVRk2SWEBl1Xcg+wO9/HYl91VwLH6tfHTT/AiAaj9IMeVjN2
Fn9NGw5dzbhNhqoO2irEuR1MP8fUKjN0ibOzaE9eHibeMbqcVCWtiTtO7z9H3isN
CrL/GGWzVNIETXoaur4a6VVa
-----END PRIVATE KEY-----`;
const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwwUtaXwEcBvMsrsmNJrP
+s5o95s5NCklWkmPRAvm/ihS5tDamt7nwpl08WfZhD9qj1jeXX8VNPQKiUZJWige
Xmer9WEqsKx5NaKsEEBxoz/lsvTUAE1/nLABbCzTfPqne98eEcQk+fzZQoQLmVXd
4LXu/hmlRztjm7YgXUkkKi+czUE3LjOs8Ypr8QT+YuV+VndkkJ+LojUd2LJyiqf2
oVE6WKtjJr6ctPPoucyU2UYSZnxb9EZaUow9ZcFobeZgB1bvtwPyHBHWiRGJ5uZi
57ko131zislfsO+aMeiZEY+wwQBvLuGF1+wXArIh14ePSux8TGJs+L/sBkDF6kv+
rQIDAQAB
-----END PUBLIC KEY-----`

/*
**组合待签名参数
**params:待签名对象
*/
export function dictOrder(params) {

  let keys = Object.keys(params)
  // console.log(keys)
  keys.sort((a, b) => a > b ? 1 : -1);
  // console.log(keys)
  let kv = []
  keys.forEach((v, i, arr) => {
    if (v != 'sign' && params[v] != '') {
      let val = ""
      if (typeof (params[v]) == 'object') {

        // console.log(JSON.stringify(params[v]));
        val = JSON.stringify(params[v])
      } else {
        val = params[v]
      }

      kv.push(`${v}=${val}`)

      // kv.push(`${v}=${params[v]}`)


    }

  })
  let toGetSignString = kv.join('&')
  // console.log('按照KEY的ASCII字符顺序排序，组成待签名字符串----' + toGetSignString)
  return toGetSignString
}
//签名
export function encrypt(newStr) {
  console.log(newStr)
  console.log('====开始签名===');
  // 签名

  let signature = new RSA.KJUR.crypto.Signature({ alg: "SHA256withRSA", prvkeypem: privateKey });
  signature.updateString(newStr);  //src待签名字符串
  // 签名返回结果是16进制字符串，注意转码
  let a1 = signature.sign();
  // a = encodeURIComponent(encodeURIComponent(a));
  let sign = RSA.hextob64(a1);

  console.log(`私钥签名：${sign}`);
  return encodeURIComponent(sign);//发送http请求进行两次encodeURIComponent
  // return sign;
}
//验签
export function decode(str, sign) {
  console.log('====开始验签===');
  console.log(sign)
  let signatureVf = new RSA.KJUR.crypto.Signature({ alg: "SHA256withRSA", prvkeypem: publicKey });
  signatureVf.updateString(str);  //取摘要
  // 验签入参是16进制字符串，注意转码

  let flag = signatureVf.verify(RSA.b64tohex(sign));
  // console.log(signatureVf.verify);
  // console.log(RSA.b64tohex(sign));
  console.log(`公钥验签：${flag}`);
  return flag;
}