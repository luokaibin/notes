
const wx = window.jWeixin;
let imgUrl;
const config = ({appId,timestamp,nonceStr,signature}) => {
  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId, // 必填，公众号的唯一标识
    timestamp, // 必填，生成签名的时间戳
    nonceStr, // 必填，生成签名的随机串
    signature,// 必填，签名
    jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage', 'updateAppMessageShareData', 'updateTimelineShareData'], // 必填，需要使用的JS接口列表
  });
}

const getBlob = canvas => {
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      resolve(blob);
    }, "image/png")
  })
}

const ready = async () => {
  const canvas = await html2canvas(document.body, {width: 300, height: 300, y: 100});
  const imgBlob = await getBlob(canvas);
  const formdata = new FormData();
  formdata.append('file', imgBlob)
  // const result = await fetch('https://notes.jindll.com/server/uploadImg', {
  const result = await fetch('https://notes.jindll.com/api/upload/singleFild', {
    method: 'POST',
    body: formdata,
  })
  const {data: url} = await result.json();
  imgUrl = url;
  wx.ready(shareFn);
}

const shareFn = () => {
  const link = window.location.href;
  const desc = document.querySelector('meta[name="description"]').content;
  const title = document.title;

  wx.updateAppMessageShareData({ 
    title,
    desc,
    link,
    imgUrl: imgUrl || 'https://notes.jindll.com/logo.png',
  });
  wx.updateTimelineShareData({ 
    title,
    link,
    imgUrl: imgUrl || 'https://notes.jindll.com/logo.png',
  });
  wx.onMenuShareTimeline({
    title,
    link,
    imgUrl: imgUrl || 'https://notes.jindll.com/logo.png',
  });
  wx.onMenuShareAppMessage({
    title,
    desc,
    link,
    imgUrl: imgUrl || 'https://notes.jindll.com/logo.png',
  });
}
var request = async () => {
  const url = window.location.href.split('#')[0];
  const result = await fetch(`https://notes.jindll.com/api/wechat/config?url=${url}`, {
    method: 'GET',
  })
  const {data} = await result.json();
  config(data);
  ready();
}
window.onload = () => {
  request();
}
