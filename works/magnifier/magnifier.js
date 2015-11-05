/**
 * Created by Administrator on 2015/11/5.
 */
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var watermarkCanvas = document.getElementById("watermark-canvas");
var watermarkContext = watermarkCanvas.getContext("2d");

var offCanvas = document.getElementById("offCanvas");
var offContext = offCanvas.getContext("2d");

var image = new Image();
var isMouseDown = false;
var scale;

window.onload = function(){

    canvas.width = 960;
    canvas.height = 540;

    image.src = "Miranda.jpg";
    image.onload = function(){   //移动端不好使，问题在哪里？？

        offCanvas.width = image.width;
        offCanvas.height = image.height;
        scale = offCanvas.width / canvas.width;

        context.drawImage( image , 0 , 0 , canvas.width , canvas.height );
        context.drawImage( watermarkCanvas , canvas.width - watermarkCanvas.width/1.8 ,
                                             canvas.height - watermarkCanvas.height );
        offContext.drawImage( image , 0 , 0 )
    };

    watermarkCanvas.width = 400;
    watermarkCanvas.height = 80;

    watermarkContext.font = "bold 50px Arial";
    watermarkContext.lineWidth = 1;
    watermarkContext.fillStyle = "rgba( 86 , 108 , 115 , 0.5 )";
    watermarkContext.textBaseline = "middle";
    watermarkContext.fillText( "Ah Goo" , 20 , 40 )
};

function windowToCanvas( x , y ){
    var bbox = canvas.getBoundingClientRect();
    return {x:x-bbox.left , y:y-bbox.top}
}

canvas.onmousedown = function(e){
    e.preventDefault();
    isMouseDown = true;
    var point = windowToCanvas( e.clientX , e.clientY );
    console.log( point.x , point.y );
    drawCanvasWithMagnifier( true , point )
};

canvas.onmouseup = function(e){
    e.preventDefault();
    isMouseDown = false;
    drawCanvasWithMagnifier( false )
};

canvas.onmouseout = function(e){
    e.preventDefault();
    isMouseDown = false;
    drawCanvasWithMagnifier( false )
};

canvas.onmousemove = function(e){
    e.preventDefault();
    if( isMouseDown == true ){
        var point = windowToCanvas( e.clientX , e.clientY );
        console.log( point.x , point.y );
        drawCanvasWithMagnifier( true , point )
    }
};

function drawCanvasWithMagnifier( isShowMagnifier , point ){

    context.clearRect( 0 , 0 , canvas.width , canvas.height );
    context.drawImage( image , 0 , 0 , canvas.width , canvas.height );
    context.drawImage( watermarkCanvas , canvas.width - watermarkCanvas.width/1.8 ,
                                         canvas.height - watermarkCanvas.height );
    if( isShowMagnifier == true ){
        drawMagnifier( point )
    }
}

function drawMagnifier( point ){

    var mr = 150;

    var imageLG_cx = point.x * scale;
    var imageLG_cy = point.y * scale;

    var sx = imageLG_cx - mr;
    var sy = imageLG_cy - mr;

    var dx = point.x - mr;
    var dy = point.y - mr;

    context.save();

    context.lineWidth = 10.0;
    context.strokeStyle = "#069";

    context.beginPath();
    context.arc( point.x , point.y , mr , 0 , Math.PI*2 , false );
    context.stroke();
    context.clip();
    context.drawImage( offCanvas , sx , sy , 2*mr , 2*mr , dx , dy , 2*mr , 2*mr );
    context.restore();
}