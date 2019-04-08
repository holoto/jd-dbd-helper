/* eslint-disable no-var */
// const axios = require('axios');
// console.log(chrome)
// console.log(window)
// console.log(this)
// console.log(chrome.notifications)
// console.log(chrome.tabs)
// console.log(chrome.window)



let notificationtime;
let taburl;
const clearnotion = (id) => {
    chrome.notificationtime.clear(id)
}
const clicknot = () => {
    chrome.notifications.onClicked.addListener((id) => {
        // console.log("clicknot")
        // console.log(id)

        chrome.notifications.clear(id)
        setTimeout(() => {
            opentab(id)
        }, 300);



    })
    chrome.notifications.onClosed.addListener((id, a) => {
        // console.log(id)
        // console.log(a)
        chrome.notifications.clear(id)
    })

}
var opentab = (url) => {

    chrome.tabs.create({
        url
    })

    // clicktab(url);
}
const post = (url, skuname, img, lasts) => {

    chrome.notifications.create(url, {
        type: 'basic',
        iconUrl: "assets/icons/Icon16.png",
        // iconUrl: img,
        title: `还有${lasts}s结束`,
        // buttons: [{
        //     title: '按钮1的标题',
        //     iconUrl: 'assets/icons/Icon16.png'
        // }],
        // items:[{  title:'消息1',message: '今天天气真好！'}],
        message: skuname,
        eventTime: Date.now() + 2000

    }, (id) => {
        console.log(id)
            // clicknot()
    })

    // console.log(a)
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // console.log(request)
    // console.log(sender)
    // clicknot(request.url)
    // sendResponse(request)
    if (request.action === "lasttime30s") {
        // console.log(1)

        post(request.url, request.skuname, request.img, request.lasts);

    } else(
        console.log('else')
    )
})
clicknot()
