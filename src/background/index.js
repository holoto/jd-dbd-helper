// import $ from "jquery";
// import localForage from "localforage";
import "@babel/polyfill";
// console.log(chrome)
// console.log(window)
// console.log(this)
// console.log(chrome.notifications)
// console.log(chrome.tabs)
// console.log(chrome.window)
import {
    initqueryurl,
    jsonpFetch,
    setlocaldata,
    querypricebaseurl,
    getmylist,
    getlocaldata,
    myobject,
    mydbddata
} from '../contentScripts/com'

// console.log(1)
const localForage = mydbddata
const category = `&category1=`
let notificationtime;
let taburl;
var dbdlist;
const getdbdlist = (pagenum, selectcategory) => {
    return selectcategory ? jsonpFetch(initqueryurl + pagenum + category + selectcategory) : jsonpFetch(initqueryurl + pagenum)





}

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
const opentab = (url) => {

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
        // console.log(id)
        // clicknot()
    })

    // console.log(a)
};

// chrome.runtime.onConnect.addListener(port => {
//     port.message.addListener(msg => {
//         if (msg.action === 'getdbdlist') {
//             getdbdlist().then((result) => {
//                 port.postMessage(result)
//             }).catch((err) => {

//             });
//         }
//     })
// })
const initdbdlist = () => {
    getdbdlist(1).then(res => {
        // console.log(res.category1List)
        setlocaldata({
            category1List: res.category1List,
            getcategory1List: true


        })
        localForage.setItem('category1List', res.category1List, (err, value) => {
            if (!err) {
                localForage.setItem('getcategory1List', true, (err1, value1) => {
                    // console.log(err)
                    value.map(a => {
                        getdbdlist(1, a.code).then(b => {
                            // let tmp = b.selectedCategory1 + '';
                            let tmp = a.name;
                            localForage.setItem(tmp, b.auctionInfos, (err11, value11) => {
                                // console.log(value11)
                                // console.log(err11)
                            })
                        })
                    })
                })

            }
            // console.log(value)
        })

    })
}
initdbdlist()
const updatedbdlist = () => {
    localForage.getItem(
        'getcategory1List', (err, value) => {

            if (value && !err) {
                localForage.getItem('category1List', (err1, value1) => {
                    if (!err1) {
                        value1.map(a => {
                            getdbdlist(1, a.code).then(b => {
                                let tmp = a.name;
                                localForage.setItem(tmp, b.auctionInfos, (err11, value11) => {
                                    // console.log(value11)
                                    // console.log(err11)
                                })
                            })
                        })
                    }
                })
            }

        })
}

// setlocaldata({
//         maxprice: 123,
//         dbdfilter: "231312",
//         lasttime: 10
//     })
// chrome.storage.local.set({
//     maxprice: 12313,
//     dbdfilter: "231312",
//     lasttime: 225
// }, (items) => {

//     console.log(items);
// });


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // console.log(request)
    // console.log(sender)
    // clicknot(request.url)
    // sendResponse(request)

    if (request.action === "lasttime30s") {
        // console.log(1)

        post(request.url, request.skuname, request.img, request.lasts);

    } else if (request.action === "getdbdlist") {
        console.log(request)
        console.log(sender)

        // sendResponse(dbdlist)
        initdbdlist()

    } else if (request.action === "getendtime") {
        console.log(request)
        console.log(sender)
            // localForage.iterate((value, key, iterationNumber) => {
            //   console.log(value)
            //   console.log(key)
            //   console.log(iterationNumber)
            // })
        localForage.getItem(
            'getcategory1List', (err, value) => {
                console.log(request.itemcategory)
                if (!err) {
                    localForage.getItem(request.itemcategory, (err1, value12) => {
                        if (!err) {
                            console.log(value12)
                            let marray = []
                            marray = value12
                            console.log(marray)
                            marray.map(res => {
                                // console.log(res.id)
                                if (res.id == request.itemid) {
                                    let tmp = request.itemid
                                    let endtime = res.endTime
                                        // console.log(tmp)
                                    myobject.tmp = res.endTime
                                        // console.log(myobject)
                                        // localForage.setItem(tmp, res, (err2, value2) => {
                                        //   console.log(err2)
                                        //   console.log(value2)
                                        // })
                                    setlocaldata({
                                            mydata1: res
                                        })
                                        // sendResponse(res.endTime)
                                        // setlocaldata(
                                        //   getmylist(tmp, res.endTime)

                                    // )
                                }
                            })
                        }
                    })
                };
            });

    };
});
clicknot();
