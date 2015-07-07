/**
 * Created by Administrator on 2015/7/7.
 */
window.onload=function  () {
    waterfall('main','box');
    var dataInt = {"data":[{"src":"1.jpg"},
        {"src":"2.jpg"},
        {"src":"3.jpg"},
        {"src":"4.jpg"},
        {"src":"5.jpg"},
        {"src":"6.jpg"},
        {"src":"7.jpg"},
        {"src":"8.jpg"},
        {"src":"9.jpg"},
        {"src":"10.jpg"},
        {"src":"11.jpg"},
        {"src":"12.jpg"},
        {"src":"13.jpg"},
        {"src":"14.jpg"},
        {"src":"15.jpg"},
        {"src":"16.jpg"},
        {"src":"17.jpg"},
        {"src":"18.jpg"},
        {"src":"19.jpg"},
        {"src":"20.jpg"},
        {"src":"21.jpg"},
        {"src":"22.jpg"},
        {"src":"23.jpg"},
        {"src":"24.jpg"},
        {"src":"25.jpg"}

    ]}
    window.onscroll=function  () {
        if(checkScrollSlide){
            var oParent=document.getElementById('main');
            //将数据块渲染到页面的尾部
            for(var i=0;i<dataInt.data.length;i++){
                var oBox=document.createElement('div');
                oBox.className='box';
                oParent.appendChild(oBox);
                var oPic = document.createElement('div');
                oPic.className='pic';
                oBox.appendChild(oPic);
                var oImg = document.createElement('img');
                oImg.src="img/"+dataInt.data[i].src;
                oPic.appendChild(oImg);
            }
            waterfall('main','box');
        }
    }
}

function waterfall (parent,box) {
    //将main下的所有class为box的元素取出来
    var oParent = document.getElementById(parent);
    var oBoxs = getByClass(oParent,box);
    //计算整个页面显示的列数（页面宽/box的宽）
    var oBoxW = oBoxs[0].offsetWidth;
    var cols =Math.floor(document.documentElement.clientWidth/oBoxW);
    //设置main的宽
    oParent.style.cssText='width:' +oBoxW*cols+'px;margin:0 auto';
    var hArr = [];  //存放每一列高度
    for(var i=0;i<oBoxs.length;i++){
        if(i<cols){
            hArr.push(oBoxs[i].offsetHeight);
        }else{
            var minH=Math.min.apply(null,hArr);
            var index=getMinhIndex(hArr,minH);
            oBoxs[i].style.position="absolute";
            oBoxs[i].style.top=minH+'px';
            //oBoxs[i].style.left=oBoxW*index+'px';
            oBoxs[i].style.left=oBoxs[index].offsetLeft+'px';
            hArr[index] = hArr[index] + oBoxs[i].offsetHeight;

        }
    }

}

//根据class获取元素
function getByClass (parent,clsName) {
    var boxArr = new Array(), //用来存储获取到的所有class为box的元素
        oElements = parent.getElementsByTagName('*');
    for(var i = 0; i<oElements.length;i++){
        if(oElements[i].className == clsName){
            boxArr.push(oElements[i]);
        }
    }
    return boxArr;
}

function getMinhIndex (arr,val) {
    for(var i in arr){
        if(arr[i]==val){
            return i;
        }
    }
}
//检测是否具备了滚动加载数据块的条件
function checkScrollSlide () {
    var oParent=document.documentElementById('main');
    var oBoxs =getByClass(oParent,'box');
    var lastBoxH=oBoxs[oBoxs.length-1].offsetTop + Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.body.clientHeight || document.documentElement.clientHeight;
    return (lastBoxH < scrollTop + height) ? true : false;
}


