import './index.styl'
import $ from "jquery";
import axios from 'axios'
// import { querySelectorAllDeep, querySelectorDeep } from 'query-selector-shadow-dom';

// axios.defaults.baseURL ="https://used-api.jd.com/auctionRecord/batchCurrentInfo?auctionId=";

  // axios.defaults.headers.post['Origin']=getpriceurl(dbditemid)
  axios.defaults.headers.post['DNT']=1
  axios.defaults.headers.post['Access-Control-Allow-Headers']='x-requested-with,content-type'
  axios.defaults.headers.post['Access-Control-Allow-Origin']="*"
  // axios.defaults.headers.post['Access-Control-Allow-Origin']=getpriceurl(dbditemid)
  axios.defaults.headers.post['Sec-Metadata:']='destination=script, site=same-site'
  axios.defaults.headers.post['User-Agent']='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36'

const postpriceurl="https://used-api.jd.com/auctionRecord/offerPrice";
function geturl(auctionid,price,trackId,eid) {
  return "auctionId="+auctionid+"&price="+price+"&entryid=&trackId="+trackId+"&eid="+eid;
};
function getreferrer(auctionid){
  return "https://paipai.jd.com/auction-detail/"+auctionid;
};
function getpriceurl(argument) {
  return "https://used-api.jd.com/auctionRecord/batchCurrentInfo?auctionId="+argument;
}
function closetab(){
  window.location.href="about:blank";
  window.close();
}
var notificationstime=(s,url,img,lasts)=>{
 chrome.runtime.sendMessage({"action":"lasttime30s","skuname":s,"url":url,"img":img,"lasts":lasts}, function(response) {
  // console.log('最后30S');
  // console.log(response);
});
}
var jiankong;
  var maxprice=10000;
var dbdfilter="";
var wantmatch=new RegExp("");;
var watchlist;
var watchlisttime;
var watcharray=new Array;
var lasttime=55;
window.onload=()=>{
// console.log($('#app > div.list-selector > div > div.selector > div:nth-child(2) > div > div.sl-value > div > ul > li:nth-child(3) > a'))
// $('#app > div.list-selector > div > div.selector > div:nth-child(2) > div > div.sl-value > div > ul > li:nth-child(3) > a')[0].click()


var dbdnow=$('#app > div.list-selector > div > div.selector > div:nth-child(2) > div > div.sl-value > div > ul > li:nth-child(2) > a')[0]
var dbdlate=$('#app > div.list-selector > div > div.selector > div:nth-child(2) > div > div.sl-value > div > ul > li:nth-child(3) > a')[0]
var reflashdata=()=>{
  dbdlate.click();
  console.log(dbdnow)
  console.log(dbdlate)
  setTimeout(()=>{
    dbdnow.click()
  },1000)
}
var bindlist=()=>{
  // watchlist=$('.p-name');
  watchlist=$('.gl-item.now');
   // watchlisttime=$('.p-time .time');
}
  var nav=$('#navitems-group1')[0];
  var navbar=document.createElement('div');
  var input=document.createElement('input');
  var inputfilter=document.createElement('input');
  var startbutton=document.createElement('button');
  var stopbutton=document.createElement('button');
  var h1=document.createElement('h1');
  var h2=document.createElement('h1');
  h1.textContent="输入监控价格 如果没有超过监控价格 则发通知提醒 ";
  h2.textContent="默认最后拍卖前55S提醒";
  stopbutton.onclick=()=>{
        clearInterval(jiankong)

  }
  startbutton.onclick=()=>{


    clearInterval(jiankong)

setInterval1()

console.log(jiankong)

  }
  startbutton.textContent="点击按钮开始监听"
  stopbutton.textContent="停止监听"
  startbutton.style.height="30px";
  stopbutton.style.height="30px";
  input.id="mylqdinput"
  input.onchange=(event)=>{
maxprice=input.value;

console.log(maxprice)
  }
  inputfilter.onchange=(event)=>{
dbdfilter=inputfilter.value;
wantmatch=new RegExp(inputfilter.value);
watcharray=new Array;

console.log(watcharray)
  }
  input.placeholder="监控价格 默认为1000"
  inputfilter.placeholder="输入关键字过滤 默认不过滤"
  input.type="number"
  inputfilter.type="text"
  input.style.height="30px";
  inputfilter.style.height="30px";
  input.style.width="150px";
  inputfilter.style.width="150px";
  navbar.style.position="fixed";
  navbar.id="mylqd"
  navbar.style.top="50px";
  navbar.style.left="0px";
  navbar.style.height="200px";
  navbar.style.width="350px"
  navbar.style.zIndex=0;
  navbar.style.backgroundColor="#42B983";
  navbar.appendChild(input);
  navbar.appendChild(inputfilter);
  navbar.appendChild(startbutton);
  navbar.appendChild(stopbutton);
  navbar.appendChild(h1);
  navbar.appendChild(h2);
  $('#shortcut-2014')[0].appendChild(navbar)

var setdbd=()=>{
reflashdata()
setTimeout(()=>{
  initwatch()
},4000);
}
var setInterval1=()=>{
  jiankong=setInterval(setdbd,Math.floor(Math.random()*10555)+Math.floor(Math.random()*5500))
}
var initwatch=()=>{

  bindlist()

 // console.log(watchlist[3].querySelector('.gl-i-wrap').querySelector('.p-name').querySelector('a').innerText)
 // console.log(watchlist[3].querySelector('.gl-i-wrap').querySelector('.p-price').querySelector('i').innerText)
 // console.log(watchlist[3].querySelector('.gl-i-wrap').querySelector('.p-time').querySelectorAll('b'))

for (var i =0; i <  watchlist.length - 1; i++) {
  let lasth=parseInt(watchlist[i].querySelector('.gl-i-wrap').querySelector('.p-time').querySelectorAll('b')[0].innerText);
  let lastm=parseInt(watchlist[i].querySelector('.gl-i-wrap').querySelector('.p-time').querySelectorAll('b')[1].innerText)
  let lasts=parseInt(watchlist[i].querySelector('.gl-i-wrap').querySelector('.p-time').querySelectorAll('b')[2].innerText)
  let lastp=parseInt(watchlist[i].querySelector('.gl-i-wrap').querySelector('.p-price').querySelector('i').innerText);
  let dbdfilter=wantmatch.test(watchlist[i].querySelector('.gl-i-wrap').querySelector('.p-name').querySelector('a').innerText);
let lskuname=watchlist[i].querySelector('.gl-i-wrap').querySelector('.p-name').querySelector('a').innerText;
let taburl=watchlist[i].querySelector('.gl-i-wrap').querySelector('.p-name').querySelector('a').href;
let imgurl=watchlist[i].querySelector('.gl-i-wrap').querySelector('.p-img').querySelector('a').querySelector('img').src;

if (lastp<maxprice&&dbdfilter&&lasth==0&&lastm==0&&lasts<lasttime){
  // console.log(lasth)
  // console.log(lastm)
  // console.log(lasts)
  // console.log(lastp)
  // console.log(dbdfilter)
  // console.log(lskuname)
  // console.log(taburl)

notificationstime(lskuname,taburl,imgurl,lasts)

}








}

};


initwatch()









}
