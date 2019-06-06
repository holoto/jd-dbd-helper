/* eslint-disable no-var */
/* eslint-disable no-use-before-define */
import './index.styl'
import $ from "jquery";
// import "@babel/polyfill";
import {
    notificationstime,
    getdbdlist,
    getdbditem,
    mydbddata
} from './com'
getdbditem()
var dbdlist;


// console.log(dbdlist)



let jiankong;
let maxprice = 10000;
let dbdfilter = "";
let wantmatch = new RegExp("");;
let watchlist;
let watchlisttime;
let watcharray = new Array;
let lasttime = 25;
const reflashdatatime = 400;
chrome.storage.sync.get({
    maxprice: 10000,
    dbdfilter: "",
    lasttime: 25
}, (items) => {
    maxprice = items.maxprice;
    lasttime = items.lasttime;
    dbdfilter = items.dbdfilter;
    // console.log('get save data');
});
getdbdlist()
window.onload = () => {
    // console.log($('.current'))
    // console.log($('.sl-v-list'))
    // console.log($('.sl-v-list li:last-child'))
    // console.log($('.p-price'))
    // console.log($('.p-time b:first-child'))
    // console.log($('.p-time b:nth-child(2)'))
    // console.log($('.p-time b:last-child'))
    // console.log(jiankong)
    // console.log(2212396867)
    // console.log(typeof jiankong)
    // console.log(typeof jiankong === 'undefined')
    // console.log($('#app > div.list-selector > div > div.selector > div:nth-child(2) > div > div.sl-value > div > ul > li:nth-child(3) > a'))
    // $('#app > div.list-selector > div > div.selector > div:nth-child(2) > div > div.sl-value > div > ul > li:nth-child(3) > a')[0].click()
    // console.log($('.current'))
    // console.log($('.sl-v-list li:last-child'))
    var nhistory = window.history.length;
    var currentpage = $('.number.active')[0].innerHTML
    var npagesize = $('.el-pager')[0].childElementCount;
    let dbdnow = $('.db-state div:nth-child(3)')[0]
    let dbdlate = $('.db-state div:nth-child(5)')[0]
        // console.log(dbdnow)
        // console.log(dbdlate)
        // console.log($('.number.active')[0].innerHTML)
    const reflashdata = () => {
        // dbdnow = $('.current')[1]
        nhistory = window.history.length;
        npagesize = $('.el-pager')[0].childElementCount
        currentpage = $('.number.active')[0].innerHTML
        if (nhistory == 1) {

            let apage = 0
            currentpage < 2 ? apage = 1 : apage = 0;
            npagesize > 1 ? $('.number')[apage].click() : dbdlate.click()
        } else {
            window.history.back()
        }
        // $('.sl-v-list li:last-child')[0].click()

        setTimeout(() => {
            // $('.current')[0].click()
            currentpage = $('.number.active')[0].innerHTML
            nhistory = window.history.length;
            npagesize = $('.el-pager')[0].childElementCount
            if (nhistory == 1) {
                let apage = 0
                currentpage < 2 ? apage = 1 : apage = 0;
                npagesize > 1 ? $('.number')[apage].click() : dbdlate.click()
            } else {
                window.history.forward()
            }



        }, 230)

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


    }
    startbutton.onclick = () => {


        clearInterval(jiankong)

        setInterval1()

        // console.log(jiankong)

    }
    startbutton.textContent = "点击按钮开始监听"
    stopbutton.textContent = "停止监听"
    startbutton.style.height = "30px";
    stopbutton.style.height = "30px";
    input.id = "mylqdinput"
    flashpagedata.onclick = (event) => {
        reflashdata()
        getdbdlist()
    }
    inputlasttime.onchange = (event) => {
        if (inputlasttime.value >= 100 || inputlasttime < 1) {
            window.alert("超出最大限制100S")
        } else {
            chrome.storage.sync.set({
                lasttime: inputlasttime.value
            }, () => {
                // console.log('保');
            });
            lasttime = inputlasttime.value
            h2.textContent = `默认最后拍卖前${  lasttime  }S提醒`;
        }
    }
    input.onchange = (event) => {
        if (input.value > 500000 && input.value < 1) {
            window.alert("超出最大值500000")
        } else {
            chrome.storage.sync.set({
                maxprice: input.value,
            }, () => {
                // console.log('保存');
            });
            maxprice = input.value;
            h1.textContent = `当前监控价格:${maxprice} 当前监控过滤字:${dbdfilter}`;
        }

        // console.log(maxprice)
    }
    inputfilter.onchange = (event) => {
        dbdfilter = inputfilter.value;
        wantmatch = new RegExp(inputfilter.value);
        watcharray = new Array;
        chrome.storage.sync.set({
            dbdfilter: inputfilter.value
        }, () => {
            // console.log('保存');
        });
        h1.textContent = `当前监控价格:${maxprice} 当前监控过滤字:${dbdfilter}`;
        // console.log(watcharray)
    }
    input.placeholder = `监控价格 当前为:${maxprice}`
    inputfilter.placeholder = `输入关键字过滤 当前过滤关键字${  dbdfilter}`
    inputlasttime.placeholder = `商品拍卖截止时间 当前${  maxprice}S`
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
    navbar.style.zIndex = 1;
    navbar.style.backgroundColor = "#8BB59C";
    flashpagedata.style.backgroundColor = "#3EAFFF";
    flashpagedata.style.top = "600px";
    flashpagedata.innerHTML = "刷新页面"
    flashpagedata.style.zIndex = 1;
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
    const setInterval1 = () => {
        clearInterval(jiankong)
        jiankong = null
        jiankong = setInterval(setdbd, 800)
            // console.log(typeof jiankong === 'undefined')
    }
    const initwatch = () => {

        bindlist()

        // console.log(watchlist[3].querySelector('.gl-i-wrap').querySelector('.p-name').querySelector('a').innerText)
        // console.log(watchlist[3].querySelector('.gl-i-wrap').querySelector('.p-price').querySelector('i').innerText)
        // console.log(watchlist[3].querySelector('.gl-i-wrap').querySelector('.p-time').querySelectorAll('b'))

        for (let i = 0; i < watchlist.length - 1; i++) {
            let lastmin = 0

            let lastst = lasttime
            if (lasttime > 59) {
                lastmin = Math.floor(lasttime / 60)
                lastst = lasttime % 60
            }

            let lasth = parseInt(watchlist[i].querySelector('.gl-i-wrap').querySelector('.p-time').querySelectorAll('b')[0].innerText) === 0;
            let lastm = parseInt(watchlist[i].querySelector('.gl-i-wrap').querySelector('.p-time').querySelectorAll('b')[1].innerText);
            let lasts = parseInt(watchlist[i].querySelector('.gl-i-wrap').querySelector('.p-time').querySelectorAll('b')[2].innerText);
            let lastp = parseInt(watchlist[i].querySelector('.gl-i-wrap').querySelector('.p-price').querySelector('i').innerText);
            let dbdfilter = wantmatch.test(watchlist[i].querySelector('.gl-i-wrap').querySelector('.p-name').querySelector('a').innerText);
            let lskuname = watchlist[i].querySelector('.gl-i-wrap').querySelector('.p-name').querySelector('a').innerText;
            let taburl = watchlist[i].querySelector('.gl-i-wrap').querySelector('.p-name').querySelector('a').href;
            let imgurl = watchlist[i].querySelector('.gl-i-wrap').querySelector('.p-img').querySelector('a').querySelector('img').src;
            let notifyt = lasttime
            if (lasttime > 59) {
                notifyt = lastm * 60 + lasts
            }

            if (lastp && dbdfilter && lasth && lastm <= lastmin && lasts <= lastst) {
                // console.log(lasth)
                // console.log(lastm)
                // console.log(lasts)
                // console.log(lastp)
                // console.log(dbdfilter)
                // console.log(lskuname)
                // console.log(taburl)

                notificationstime(lskuname, taburl, imgurl, notifyt)

            }








        }

    };


    initwatch()









}
