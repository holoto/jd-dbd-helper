/* eslint-disable no-var */
/* eslint-disable no-use-before-define */
import './index.styl'
import $ from "jquery";
import axios from 'axios'
// import { querySelectorAllDeep, querySelectorDeep } from 'query-selector-shadow-dom';

// axios.defaults.baseURL ="https://used-api.jd.com/auctionRecord/batchCurrentInfo?auctionId=";

// axios.defaults.headers.post['Origin']=getpriceurl(dbditemid)
axios.defaults.headers.post.DNT = 1
axios.defaults.headers.post['Access-Control-Allow-Headers'] = 'x-requested-with,content-type'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = "*"
    // axios.defaults.headers.post['Access-Control-Allow-Origin']=getpriceurl(dbditemid)
axios.defaults.headers.post['Sec-Metadata:'] = 'destination=script, site=same-site'
axios.defaults.headers.post['User-Agent'] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36'

const postpriceurl = "https://used-api.jd.com/auctionRecord/offerPrice";

function geturl(auctionid, price, trackId, eid) {
    return `auctionId=${auctionid}&price=${price}&entryid=&trackId=${trackId}&eid=${eid}`;
};

function getreferrer(auctionid) {
    return `https://paipai.jd.com/auction-detail/${auctionid}`;
};

function getpriceurl(argument) {
    return `https://used-api.jd.com/auctionRecord/batchCurrentInfo?auctionId=${argument}`;
}

function closetab() {
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
    }, function(response) {
        // console.log('最后30S');
        // console.log(response);
    });
}
let jiankong;
let maxprice = 10000;
let dbdfilter = "";
let wantmatch = new RegExp("");;
let watchlist;
let watchlisttime;
let watcharray = new Array;
let lasttime = 25;
const reflashdatatime = 400;
window.onload = () => {
    // console.log(jiankong)
    // console.log(2212396867)
    // console.log(typeof jiankong)
    // console.log(typeof jiankong === 'undefined')
    // console.log($('#app > div.list-selector > div > div.selector > div:nth-child(2) > div > div.sl-value > div > ul > li:nth-child(3) > a'))
    // $('#app > div.list-selector > div > div.selector > div:nth-child(2) > div > div.sl-value > div > ul > li:nth-child(3) > a')[0].click()
    // console.log($('.current'))
    // console.log($('.sl-v-list li:last-child'))

    let dbdnow = $('.current')[0]
    let dbdlate = $('.sl-v-list li:last-child')[0]
    const reflashdata = () => {
        dbdnow = $('.current')[0]
        dbdlate.click();
        // $('.sl-v-list li:last-child')[0].click()
        // console.log(dbdnow)
        // console.log(dbdlate)
        setTimeout(() => {
            // $('.current')[0].click()


            dbdnow.click()


        }, 100)
    }
    const bindlist = () => {
        // watchlist=$('.p-name');
        watchlist = $('.gl-item.now');
        // watchlisttime=$('.p-time .time');
    }
    const nav = $('#navitems-group1')[0];
    const br = document.createElement("br");
    const navbar = document.createElement('div');
    const flashpagedata = document.createElement('button');
    const input = document.createElement('input');
    const inputlasttime = document.createElement('input');
    const inputfilter = document.createElement('input');
    const startbutton = document.createElement('button');
    const stopbutton = document.createElement('button');
    const h1 = document.createElement('h1');
    const h2 = document.createElement('h1');
    h1.textContent = `当前监控价格  ${maxprice} 当前监控过滤字${dbdfilter}`;
    h2.textContent = `当前最后拍卖前${  lasttime  }S提醒`;
    stopbutton.onclick = () => {
        clearInterval(jiankong)
        jiankong = null
        let urla = "https://m.360buyimg.com/n1/s220x220_jfs/t25885/91/2593306724/55144/2603ad19/5bea2a94N8137e121.jpg"
        notificationstime("ad1", urla, urla, "1")
        notificationstime("ad2", "taburl2", "imgurl2", "2")
        notificationstime("ad3", "taburl3", "imgurl3", "3")


    }
    startbutton.onclick = () => {


        clearInterval(jiankong)

        setInterval1()

        console.log(jiankong)

    }
    startbutton.textContent = "点击按钮开始监听"
    stopbutton.textContent = "停止监听"
    startbutton.style.height = "30px";
    stopbutton.style.height = "30px";
    input.id = "mylqdinput"
    flashpagedata.onclick = (event) => {
        reflashdata()
    }
    inputlasttime.onchange = (event) => {
        if (inputlasttime.value > 55 && inputlasttime < 1) {
            window.alert("超出最大限制55S")
        } else {
            lasttime = inputlasttime.value
            h2.textContent = `默认最后拍卖前${  lasttime  }S提醒`;
        }
    }
    input.onchange = (event) => {
        if (input.value > 500000 && input.value < 1) {
            window.alert("超出最大值500000")
        } else {
            maxprice = input.value;
            h1.textContent = `当前监控价格  ${maxprice} 当前监控过滤字${dbdfilter}`;
        }

        console.log(maxprice)
    }
    inputfilter.onchange = (event) => {
        dbdfilter = inputfilter.value;
        wantmatch = new RegExp(inputfilter.value);
        watcharray = new Array;
        h1.textContent = `当前监控价格  ${maxprice} 当前监控过滤字${dbdfilter}`;
        // console.log(watcharray)
    }
    input.placeholder = "监控价格 默认为1000"
    inputfilter.placeholder = "输入关键字过滤 默认不过滤"
    inputlasttime.placeholder = "商品拍卖截止时间 默认25S"
    input.type = "number"
    inputlasttime.type = "number"
    inputfilter.type = "text"
    input.style.height = "30px";
    inputfilter.style.height = "30px";
    inputlasttime.style.height = "30px";
    input.style.width = "150px";
    inputlasttime.style.width = "150px";
    inputfilter.style.width = "150px";
    navbar.style.position = "fixed";
    navbar.id = "mylqd"
    navbar.style.top = "50px";
    navbar.style.left = "0px";
    navbar.style.height = "700px";
    navbar.style.width = "350px"
    navbar.style.zIndex = 0;
    navbar.style.backgroundColor = "#8BB59C";
    flashpagedata.style.backgroundColor = "#3EAFFF";
    flashpagedata.style.top = "600px";
    flashpagedata.innerHTML = "刷新页面"
    flashpagedata.style.zIndex = 0;
    flashpagedata.style.position = "fixed";
    flashpagedata.style.left = "50px"
    flashpagedata.style.width = "50px"
    flashpagedata.style.height = "50px"
    navbar.appendChild(input);
    navbar.appendChild(inputfilter);
    navbar.appendChild(inputlasttime);
    navbar.appendChild(br);
    navbar.appendChild(startbutton);
    navbar.appendChild(stopbutton);
    navbar.appendChild(h1);
    navbar.appendChild(h2);
    $('#shortcut-2014')[0].appendChild(navbar)
    $('#shortcut-2014')[0].appendChild(flashpagedata)

    const setdbd = () => {
        reflashdata()
        setTimeout(() => {
            initwatch()
        }, 3500);
    }
    var setInterval1 = () => {
        jiankong = setInterval(setdbd, Math.floor(Math.random() * 10555) + Math.floor(Math.random() * 5500))
            // console.log(typeof jiankong === 'undefined')
    }
    var initwatch = () => {

        bindlist()

        // console.log(watchlist[3].querySelector('.gl-i-wrap').querySelector('.p-name').querySelector('a').innerText)
        // console.log(watchlist[3].querySelector('.gl-i-wrap').querySelector('.p-price').querySelector('i').innerText)
        // console.log(watchlist[3].querySelector('.gl-i-wrap').querySelector('.p-time').querySelectorAll('b'))

        for (let i = 0; i < watchlist.length - 1; i++) {
            const lasth = parseInt(watchlist[i].querySelector('.gl-i-wrap').querySelector('.p-time').querySelectorAll('b')[0].innerText);
            const lastm = parseInt(watchlist[i].querySelector('.gl-i-wrap').querySelector('.p-time').querySelectorAll('b')[1].innerText)
            const lasts = parseInt(watchlist[i].querySelector('.gl-i-wrap').querySelector('.p-time').querySelectorAll('b')[2].innerText)
            const lastp = parseInt(watchlist[i].querySelector('.gl-i-wrap').querySelector('.p-price').querySelector('i').innerText);
            const dbdfilter = wantmatch.test(watchlist[i].querySelector('.gl-i-wrap').querySelector('.p-name').querySelector('a').innerText);
            const lskuname = watchlist[i].querySelector('.gl-i-wrap').querySelector('.p-name').querySelector('a').innerText;
            const taburl = watchlist[i].querySelector('.gl-i-wrap').querySelector('.p-name').querySelector('a').href;
            const imgurl = watchlist[i].querySelector('.gl-i-wrap').querySelector('.p-img').querySelector('a').querySelector('img').src;

            if (lastp < maxprice && dbdfilter && lasth == 0 && lastm == 0 && lasts < lasttime) {
                // console.log(lasth)
                // console.log(lastm)
                // console.log(lasts)
                // console.log(lastp)
                // console.log(dbdfilter)
                // console.log(lskuname)
                // console.log(taburl)

                notificationstime(lskuname, taburl, imgurl, lasts)

            }








        }

    };


    initwatch()









}
