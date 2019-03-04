// const axios = require('axios');
// console.log(chrome)
// console.log(window)
// console.log(this)
// console.log(chrome.notifications)
// console.log(chrome.tabs)
// console.log(chrome.window)



var notificationtime;
var taburl;
var clearnotion=(id)=>{
  chrome.notificationtime.clear(id)
}
var clicknot=()=>{
  chrome.notifications.onClicked.addListener((id)=>{
    console.log("clicknot")
    console.log(id)

    opentab(id)
      chrome.notificationtime.clear(id)

  })
}
var opentab=(url)=>{
  chrome.tabs.create({
    url:url
  })
  // clicktab(url);
}
var post=(url,skuname,img,lasts)=>{
    chrome.notifications.create(url, {
  type: 'basic',
  iconUrl:"assets/icons/icon_16.png",
    // imageUrl: img,
  title: '还有'+lasts+'s结束',
      // buttons: [{title:'按钮1的标题'}],
      // items:[{  title:'消息1',message: '今天天气真好！'}],
  message: skuname,
    eventTime: Date.now() + 2000

},(id)=>{
  console.log(id)
// clicknot()
})
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>
{
  console.log(request)
  console.log(sender)
// clicknot(request.url)
// sendResponse(request)
  if (request.action=="lasttime30s") {
console.log(1)
post(request.url,request.skuname,request.img,request.lasts);

  }else(
    console.log('else')
    )
})
clicknot()

