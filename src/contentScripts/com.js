import jsonp from 'jsonp'
// import "@babel/polyfill";
import localForage from "localforage";
localForage.config({
    name: 'I-heart-localStorage'
});
const mydbddata = localForage.createInstance({
    name: "mydbddata"
});
const closetab = () => {
    window.location.href = "about:blank";
    window.close();
}
const notificationstime = (s, url, img, lasts) => {
    chrome.runtime.sendMessage({
        "action": "lasttime30s",
        "skuname": s,
        "url": url,
        "img": img,
        "lasts": lasts
    }, response => {
        // console.log('最后30S');
        // console.log(response);
    });
}
const geturl = (auctionid, price, trackId, eid) => {
    return `auctionId=${auctionid}&price=${price}&entryid=&trackId=${trackId}&eid=${eid}`;
};
const jsonpFetch = (url, options) => new Promise((resolve, reject) => jsonp(url, options, (err, data) => err ? reject(err) : resolve(data.data)));
const getreferrer = (auctionid) => {
    return `https://paipai.jd.com/auction-detail/${auctionid}`;
};
const setlocaldata = list => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.set(list, res => {
            resolve(res)
                // console.log(res)
        });
    })

}
const getlocaldata = async(list) => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(list, function(res) {
            resolve(res)
                // console.log(res)
        });
    })

}
const getpriceurl = (argument) => {
    return `https://used-api.jd.com/auctionRecord/batchCurrentInfo?auctionId=${argument}`;
}
const baseurl = "https://used-api.jd.com"
const initqueryurl = `${baseurl}/auction/list?pageSize=100&status=2&orderDirection=1&orderType=1&pageNo=`
const querypricebaseurl = `${baseurl}/auctionRecord/batchCurrentInfo?auctionId=`
const getdbdlist = () => {
    chrome.runtime.sendMessage({
        "action": "getdbdlist",
    }, response => {

        // return response

        // console.log(response)
        // return response;
    })

}
const getdbditem = async(itemid, itemcategory) => {
    await new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({
            "action": "getendtime",
            "itemcategory": itemcategory,
            "itemid": itemid
        }, response => {

            resolve(response)

            //  console.log(response)
            // return response;
        })
    })



}
const getregep = (regex) => {
    let re = new RegExp(regex);
    return re;
}
const getmylist = (name, val) => {
    return {
        name: val
    }
}
const myobject = [];
export {
    closetab,
    jsonpFetch,
    getdbditem,
    setlocaldata,
    querypricebaseurl,
    initqueryurl,
    notificationstime,
    getregep,
    getlocaldata,
    mydbddata,
    getdbdlist,
    myobject,
    getmylist

}
