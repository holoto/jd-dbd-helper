/* eslint-disable no-var */
/* eslint-disable no-use-before-define */
// import './index.styl'
import $ from "jquery";
// import axios from 'axios';
// import jsonp from 'jsonp';
// import "@babel/polyfill";
import {
    getdbditem,
    closetab,
    getmylist,
    mydbddata,
    myobject,
    getlocaldata
} from './com';
// import localForage from "localforage";
const localForage = mydbddata

const g102match = new RegExp('G102')
var g102price = 44
const g304match = new RegExp('G304')
var g304price = 115
const g403match = new RegExp('G403')
const g403matchwire = new RegExp('双模版')
var g403price = 112
const g403pricewire = 200
const gpromatch = new RegExp('Pro')
var gpropriceold = 111
const gpromatchold = new RegExp('12000')
const gpromatchnew = new RegExp('16000')
var gpropricenew = 120
const mx518match = new RegExp('MX518')
var mx518price = 82
const g703match = new RegExp('G703')
var g703price = 240

const itemid = window.location.href.slice(37, 46);




console.log(itemid)
let helper;
let itemprice;
let maxprice = 10000;
var deftimeout = 500;
getlocaldata({
    maxprice: 10000
}, items => {
    // maxprice = items.maxprice
})
let flashpricetime = 600
var endtime = 0;
const stoptitle = "请手动输入监听价格 并点击开始监听按钮(3s后开始)"
var nowtime = new Date().getTime()
    // console.log(typeof helper)
    // console.log( helper)
let helperlooptime = 500;
// console.log(localStorage.getItem('timecfjrr'))
// console.log(localStorage.getItem('timejrrwg'))

window.onload = () => {

        const tabdefault =  $('.detail-elevator li:nth-child(3)')[0]
        // console.log(tabdefault)
        // console.log(1)
        const tabprice = $('.detail-elevator li:last-child')[0]
        tabprice.click()
            // var port = chrome.runtime.connect({
            //     name: "knockknock"
            // });
            // port.postMessage({
            //     action: "getdbdlist"
            // });
            // port.onMessage.addListener((msg) => {
            //     console.log(msg)
            // });
        const itemcategory = $('.crumb div:nth-child(3)')[0].innerHTML;
        // console.log(itemcategory)
        // console.log(chrome.storage.local)
        // console.log(chrome.storage.sync)

        // console.log(new Date().getTime())



        if ($('.sprite-medal').length) {
            closetab()
        } else {

            // setTimeout(() => {
            //     console.log($('.winner'))
            // }, 2000);
            const priceshow = $('.price')[0]
            const pricediv = $('.p-choose-wrap')[0]
            var pricetext = document.createElement('div')
            pricetext.style.color = "#F4473D"

            pricetext.style.textAlign = "center"
            pricetext.style.fontSize = "30px"

            pricetext.innerHTML = stoptitle
            const startbuttonparent = $('#choose-btns')[0]
            const startbutton = document.createElement('button')
            const stopbutton = document.createElement('button')
            startbutton.style.height = "48px"
            startbutton.style.backgroundColor = "#44CF0C"
            stopbutton.style.height = "48px"
            stopbutton.style.backgroundColor = "#71B5FB"
            startbutton.style.width = "48px"
            stopbutton.style.width = "48px"
            startbutton.innerHTML = "开始监听"
            stopbutton.innerHTML = "停止监听"
            stopbutton.onclick = e => {
                e.stopPropagation();




                if (typeof helper === "undefined") {

                } else {
                    clearInterval(helper)
                    pricetext.innerHTML = stoptitle
                }
            }
            startbutton.onclick = e => {
                e.stopPropagation();
                if (!endtime) {
                    getdbditem(itemid, itemcategory).then(res1 => {
                        setTimeout(() => {
                            getlocaldata({
                                mydata1: null
                            }).then(res => {
                                // console.log(res)
                                console.log(res.mydata1.id)
                                if (res.mydata1.id == itemid) {
                                    endtime = res.mydata1.endTime;
                                    startevent()

                                } else {
                                    pricetext.innerHTML = "出错了   重新点击"
                                }

                            })
                        }, 3000);

                    });

                } else {
                    startevent()

                }


            }
            const startevent = () => {

                itemprice = $('.el-input__inner')[0]._value;
                clearInterval(helper)
                helper = null;
                helper = setInterval(() => {
                    // tabdefault.click()
                    // tabprice.click()
                    // setTimeout(() => {
                    setpricehelper()

                    // }, 100);

                }, helperlooptime);
                pricetext.innerHTML = "当前正在监听 可点击停止按钮停止监听"

                // console.log(typeof helper)
            }
            const subbutton = () => {
                $('#InitCartUrl')[0].click()
            }

            pricediv.appendChild(pricetext)
            startbuttonparent.appendChild(startbutton)
            startbuttonparent.appendChild(stopbutton)

            const setpricehelper = () => {
                // console.log('loop')
                if ($('.sprite-medal').length) {
                    clearInterval(helper)
                        // closetab()
                } else {
                    // console.log(tabprice)
                    // console.log(tabdefault)

                    matchprice($('.sku-name')[0].innerHTML)

                    // console.log(maxprice)


                    nowtime = new Date().getTime();
                    console.log(endtime - nowtime);
                    if ((endtime - nowtime) / 6 > 1000) {
                        helperlooptime = 4000
                        startevent()
                    } else if (helperlooptime > 500) {

                        helperlooptime = 460
                        startevent()



                    }

                    // console.log(helperlooptime)
                    // console.log($('.winner:first-child td+td')[0])

                    // if (
                    //     Math.floor($('.winner:first-child td+td')[0].innerText.slice(1)) >
                    //     maxprice ||
                    //     Math.floor($('.winner:first-child td+td')[0].innerText.slice(1)) >
                    //     itemprice
                    // ) {
                    //     stopevent()

                    // }
                    if (
                        Math.floor($('.el-input__inner')[0]._value) > maxprice
                    ) {
                        clearInterval(helper)
                            // closetab()
                    }
                    // console.log(Math.floor($('.winner:first-child td+td')[0].innerText.slice(1)))
                    // console.log(Math.floor($('#J-count-down > i:nth-child(5)')[0].innerText))
                    // let a1 = Math.floor($('.winner:first-child td+td')[0].innerText.slice(1)) < itemprice
                    // let a2 = Math.floor($('#J-count-down > i:nth-child(3)')[0].innerText) === 0
                    // let a3 = Math.floor($('#J-count-down > i:nth-child(5)')[0].innerText) < 3
                    let a4 = Math.floor($('.el-input__inner')[0]._value) <= itemprice
                    let a5 = Math.floor($('.el-input__inner')[0]._value) <= maxprice

                    let a6 = endtime - nowtime < 1222;
                    let a7 = endtime - nowtime < 1;


                    if (a6) {
                        subbutton()
                        stopevent()
                            // clearInterval(helper)
                            // closetab()
                    } else if (a7) {
                        stopevent()
                    }

                }
            }
            const stopevent = () => {
                clearInterval(helper)
                    // eslint-disable-next-line block-scoped-var
                pricetext.innerHTML = '监听结束 已停止监听'
                setTimeout(() => {

                    // closetab()
                }, 600);

            }
            const matchprice = itemname => {
                if (g102match.test(itemname)) {
                    maxprice = g102price
                } else if (g304match.test(itemname)) {
                    maxprice = g304price
                } else if (gpromatch.test(itemname)) {
                    if (gpromatchnew.test(itemname)) {
                        maxprice = gpropricenew
                    } else if (gpromatchold.test(itemname)) {
                        maxprice = gpropriceold
                    }
                } else if (g403match.test(itemname)) {
                    if (g403matchwire.test(itemname)) {
                        maxprice = g403pricewire
                    } else {
                        maxprice = g403price
                    }
                } else if (g703match.test(itemname)) {
                    maxprice = g703price
                } else if (mx518match.test(itemname)) {
                    maxprice = mx518price
                }

            }
        }




    }
    // $.getJSON(querypricebaseurl + itemid,res=>{
    //   console.log(res)
    // })
    // jsonp(querypricebaseurl + itemid, res => {
    //   console.log(res)
    // })
