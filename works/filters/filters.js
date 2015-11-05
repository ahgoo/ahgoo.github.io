/**
 * Created by Administrator on 2015/11/3.
 */
var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');
var image = new Image();

$(document).ready(function(){
    var documentWidth = $(window).width();
    var picWidth = 0.92 * documentWidth;

    if( documentWidth > 500 ){
        picWidth = 500;

    }

    canvas.height = canvas.width = picWidth;


    image.src = "Scarlett.jpg";
    image.onload = function(){

        context.drawImage( image , 0 , 0 , canvas.width , canvas.height )
    };

  //手机端效果不好使，尺寸也不对，问题在哪里？？？？？！！！

    $("a[title='none']").click(function (e) {
        e.preventDefault();
        none();
    });
    $("a[title='greyEffect']").click(function(e){
        e.preventDefault();
        greyEffect();
    });
    $("a[title='blackEffect']").click(function(e){
        e.preventDefault();
        blackEffect();
    });
    $("a[title='reverseEffect']").click(function(e){
        e.preventDefault();
        reverseEffect();
    });
    $("a[title='blurEffect']").click(function(e){
        e.preventDefault();
        blurEffect();
    });
    $("a[title='mosaicEffect']").click(function (e) {
        e.preventDefault();
        mosaicEffect();
    });
    $("a[title='mirrorEffect']").click(function(e){
        e.preventDefault();
        mirrorEffect();
    });
    $("a[title='embossEffect']").click(function(e){
        e.preventDefault();
        embossEffect();
    });

});

function none(){
    image.src = "Scarlett.jpg";
    image.onload = function(){

        context.drawImage( image , 0 , 0 , canvas.width , canvas.height )
    };
}


function greyEffect(){

    image.src = "Scarlett.jpg";
    image.onload = function(){

        context.drawImage( image , 0 , 0 , canvas.width , canvas.height )
    };

    setTimeout(function () {
        var imageData = context.getImageData( 0 , 0 , canvas.width , canvas.height );
        var pixelData = imageData.data;
        for( var i = 0 ; i < canvas.width * canvas.height ; i ++ ){

            var r = pixelData[i*4];
            var g = pixelData[i*4+1];
            var b = pixelData[i*4+2];

            var grey = r*0.3+g*0.59+b*0.11;

            pixelData[i*4] = grey;
            pixelData[i*4+1] = grey;
            pixelData[i*4+2] = grey;
        }

        context.putImageData( imageData , 0 , 0 , 0 , 0 , canvas.width , canvas.height );
    },50)

}

function blackEffect(){

    image.src = "Scarlett.jpg";
    image.onload = function(){

        context.drawImage( image , 0 , 0 , canvas.width , canvas.height )
    };

    setTimeout(function () {
        var imageData = context.getImageData( 0 , 0 , canvas.width , canvas.height );
        var pixelData = imageData.data;
        for( var i = 0 ; i < canvas.width * canvas.height ; i ++ ){

            var r = pixelData[i*4];
            var g = pixelData[i*4+1];
            var b = pixelData[i*4+2];

            var grey = r*0.3+g*0.59+b*0.11;
            if(grey > 125){
                var pv = 255
            }
            else{
                pv = 0
            }

            pixelData[i*4] = pv;
            pixelData[i*4+1] = pv;
            pixelData[i*4+2] = pv;
        }

        context.putImageData( imageData , 0 , 0 , 0 , 0 , canvas.width , canvas.height )
    },50)

}


function reverseEffect(){

    image.src = "Scarlett.jpg";
    image.onload = function(){

        context.drawImage( image , 0 , 0 , canvas.width , canvas.height )
    };
    setTimeout(function(){
        var imageData = context.getImageData( 0 , 0 , canvas.width , canvas.height );
        var pixelData = imageData.data;
        for( var i = 0 ; i < canvas.width * canvas.height ; i ++ ){

            var r = pixelData[i*4];
            var g = pixelData[i*4+1];
            var b = pixelData[i*4+2];

            pixelData[i*4] = 255 - r;
            pixelData[i*4+1] = 255 - g;
            pixelData[i*4+2] = 255 - b;
        }

        context.putImageData( imageData , 0 , 0 , 0 , 0 , canvas.width , canvas.height )
    },50)

}

function blurEffect(){

    image.src = "Scarlett.jpg";
    image.onload = function(){

        context.drawImage( image , 0 , 0 , canvas.width , canvas.height )
    };

    setTimeout(function(){
        var tmpImageData = context.getImageData( 0 , 0 , canvas.width , canvas.height );
        var tmpPixelData = tmpImageData.data;

        var imageData = context.getImageData( 0 , 0 , canvas.width , canvas.height );
        var pixelData = imageData.data;

        var blurR = 3;
        var totalnum = (2*blurR + 1)*(2*blurR + 1);

        for( var i = blurR ; i < canvas.height - blurR ; i ++ )
            for( var j = blurR ; j < canvas.width - blurR ; j ++ ){

                var totalr = 0 , totalg = 0 , totalb = 0;
                for( var dx = -blurR ; dx <= blurR ; dx ++ )
                    for( var dy = -blurR ; dy <= blurR ; dy ++ ){

                        var x = i + dx;
                        var y = j + dy;

                        var p = x*canvas.width + y;
                        totalr += tmpPixelData[p*4];
                        totalg += tmpPixelData[p*4+1];
                        totalb += tmpPixelData[p*4+2];
                    }

                p = i*canvas.width + j;
                pixelData[p*4] = totalr / totalnum;
                pixelData[p*4+1] = totalg / totalnum;
                pixelData[p*4+2] = totalb / totalnum;
            }

        context.putImageData( imageData , 0 , 0 , 0 , 0 , canvas.width , canvas.height )
    },50);

}

function mosaicEffect(){
    image.src = "Scarlett.jpg";
    image.onload = function(){

        context.drawImage( image , 0 , 0 , canvas.width , canvas.height )
    };

    setTimeout(function(){
        var tmpImageData = context.getImageData( 0 , 0 , canvas.width , canvas.height );
        var tmpPixelData = tmpImageData.data;

        var imageData = context.getImageData( 0 , 0 , canvas.width , canvas.height );
        var pixelData = imageData.data;

        var size = 16;
        var totalnum = size*size;
        for( var i = 0 ; i < canvas.height ; i += size )
            for( var j = 0 ; j < canvas.width ; j += size ){

                var totalr = 0 , totalg = 0 , totalb = 0;
                for( var dx = 0 ; dx < size ; dx ++ )
                    for( var dy = 0 ; dy < size ; dy ++ ){

                        var x = i + dx;
                        var y = j + dy;

                        var p = x*canvas.width + y;
                        totalr += tmpPixelData[p*4];
                        totalg += tmpPixelData[p*4+1];
                        totalb += tmpPixelData[p*4+2];
                    }

                p = i*canvas.width+j;
                var resr = totalr / totalnum;
                var resg = totalg / totalnum;
                var resb = totalb / totalnum;

                for(  dx = 0 ; dx < size ; dx ++ )
                    for(  dy = 0 ; dy < size ; dy ++ ){

                        x = i + dx;
                        y = j + dy;

                        p = x*canvas.width + y;
                        pixelData[p*4] = resr;
                        pixelData[p*4+1] = resg;
                        pixelData[p*4+2] = resb;
                    }
            }

        context.putImageData( imageData , 0 , 0 , 0 , 0 , canvas.width, canvas.height )
    },50);

}

function mirrorEffect(){
    image.src = "Scarlett.jpg";
    image.onload = function(){

        context.drawImage( image , 0 , 0 , canvas.width , canvas.height )
    };

    setTimeout(function () {
        var tmpImageData = context.getImageData( 0 , 0 , canvas.width , canvas.height );
        var tmpPixelData = tmpImageData.data;

        var imageData = context.getImageData( 0 , 0 , canvas.width , canvas.height );
        var pixelData = imageData.data;
        for( var x = 0 ; x < canvas.width ; x ++ )  //col
         {
             for (var y = 0; y < canvas.height; y++)  //row
            {
               var idx = ( x + y * canvas.width);
               var midx = ( ((canvas.width - 1) - x) + y * canvas.width );

               pixelData[ midx*4 ]     = tmpPixelData[ idx*4 ];
               pixelData[ midx*4 + 1 ] = tmpPixelData[ idx*4 +1];
               pixelData[ midx*4 + 2 ] = tmpPixelData[ idx*4 + 2];

            }
        }

        context.putImageData( imageData , 0 , 0 , 0 , 0 , canvas.width , canvas.height )
    },50)
}

function embossEffect(){
    image.src = "Scarlett.jpg";
    image.onload = function(){

        context.drawImage( image , 0 , 0 , canvas.width , canvas.height )
    };

    setTimeout(function(){
        var tmpImageData = context.getImageData( 0 , 0 , canvas.width , canvas.height );
        var tmpPixelData = tmpImageData.data;

        var imageData = context.getImageData( 0 , 0 , canvas.width , canvas.height );
        var pixelData = imageData.data;
        for( var x = 1 ; x < canvas.width -1 ; x ++ )  //col
        {
            for (var y = 1; y < canvas.height -1 ; y++)  //row
            {
                var idx = ( x + y * canvas.width);
                var bidx = ( (x - 1) + y * canvas.width );
                var aidx = ( (x + 1) + y * canvas.width );

                var nr = tmpPixelData[ aidx * 4 ]    - tmpPixelData[ bidx * 4 ] + 128 ;
                var ng = tmpPixelData[ aidx * 4 + 1] - tmpPixelData[ bidx * 4 + 1 ] + 128 ;
                var nb = tmpPixelData[ aidx * 4 + 1] - tmpPixelData[ bidx * 4 + 1 ] + 128 ;
                nr = (nr < 0) ? 0 : ((nr >255) ? 255 : nr);
                ng = (ng < 0) ? 0 : ((ng >255) ? 255 : ng);
                nb = (nb < 0) ? 0 : ((nb >255) ? 255 : nb);

                pixelData[ idx*4 ]     = nr;
                pixelData[ idx*4 + 1 ] = ng;
                pixelData[ idx*4 + 2 ] = nb;

            }
        }

        context.putImageData( imageData , 0 , 0 , 0 , 0 , canvas.width , canvas.height )
    },50)
}

