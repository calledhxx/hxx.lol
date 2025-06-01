let CubeSideSize = 225;


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


document.addEventListener("DOMContentLoaded",  async function () {

    let xLastMoved = 0,yLastMoved = 0;

    let xStartScreen = 0,yStartScreen = 0;

    let Holding = 0;

    TweenUp(true);

    function TweenUp(db){
        if(db){
            document.getElementById("passZFront").style.transition =
                document.getElementById("passZBack").style.transition =
                    document.getElementById("passZBack").style.transition =
                        document.getElementById("passXFront").style.transition =
                            document.getElementById("passXBack").style.transition =
                                document.getElementById("passYFront").style.transition =
                                    document.getElementById("passYBack").style.transition = "all .1s ease-in-out";
        }else{
            document.getElementById("passZFront").style.transition =
                document.getElementById("passZBack").style.transition =
                    document.getElementById("passZBack").style.transition =
                        document.getElementById("passXFront").style.transition =
                            document.getElementById("passXBack").style.transition =
                                document.getElementById("passYFront").style.transition =
                                    document.getElementById("passYBack").style.transition = "";
        }
    }

    function moving(xMoved, yMoved) {


        let x360Moved = (xMoved%360);
        let y360Moved = (yMoved%360);

        let toFZDeg = (Math.abs(x360Moved)>180) ? 180-(Math.abs(x360Moved)-180) : Math.abs(x360Moved);
        let toFXDeg =
            (Math.abs((xMoved-90)%360)>180) ? 180-(Math.abs((xMoved-90)%360)-180) : Math.abs((xMoved-90)%360);
        let toFYDeg =
            (Math.abs((yMoved-90)%360)>180) ? 180-(Math.abs((yMoved-90)%360)-180) : Math.abs((yMoved-90)%360);
        let YtoFXnFZDeg =
            (Math.abs(y360Moved)>180) ? 180-(Math.abs(y360Moved)-180) : Math.abs(y360Moved);



        document.getElementById("passZFront").style.transform =
            `rotateX(${0+yMoved}deg) rotateY(${180+xMoved}deg) translateX(0) translateY(0) translateZ(-${String(CubeSideSize/2)}px)`


        document.getElementById("passZBack").style.transform =
            `rotateX(${0+yMoved}deg) rotateY(${0+xMoved}deg) translateX(0) translateY(0) translateZ(-${String(CubeSideSize/2)}px)`


        if(
            YtoFXnFZDeg < 90 ? toFZDeg < 90 : toFZDeg > 90
        ){
            document.getElementById("passZFront").style.opacity = "1";
            document.getElementById("passZBack").style.opacity = "0";
        }else {
            document.getElementById("passZFront").style.opacity = "0";
            document.getElementById("passZBack").style.opacity = "1";
        }


        document.getElementById("passXFront").style.transform =
            `rotateX(${0+yMoved}deg) rotateY(${90+xMoved}deg) translateX(0) translateY(0) translateZ(-${String(CubeSideSize/2)}px)`


        document.getElementById("passXBack").style.transform =
            `rotateX(${0+yMoved}deg) rotateY(${270+xMoved}deg) translateX(0) translateY(0) translateZ(-${String(CubeSideSize/2)}px)`

        if(
            YtoFXnFZDeg < 90 ? toFXDeg < 90 : toFXDeg > 90
        ){
            document.getElementById("passXFront").style.opacity = "1";
            document.getElementById("passXBack").style.opacity = "0";
        }else {
            document.getElementById("passXFront").style.opacity = "0";
            document.getElementById("passXBack").style.opacity = "1";
        }


        document.getElementById("passYFront").style.transform =
            `rotateX(${90+yMoved}deg) rotateZ(${0-xMoved}deg) translateX(0) translateY(0) translateZ(-${String(CubeSideSize/2)}px`



        document.getElementById("passYBack").style.transform =
            `rotateX(${270+yMoved}deg) rotateZ(${0+xMoved}deg) translateX(0) translateY(0) translateZ(-${String(CubeSideSize/2)}px)`

        if(
            toFYDeg < 90
        ){
            document.getElementById("passYFront").style.opacity = "1";
            document.getElementById("passYBack").style.opacity = "0";
        }else {
            document.getElementById("passYFront").style.opacity = "0";
            document.getElementById("passYBack").style.opacity = "1";
        }

    }

    moving(0,0);

    await sleep(1000);

    moving(-90,-10);
    await sleep(100);
    moving(-180,-10);
    await sleep(100);
    moving(-270,-10);
    await sleep(100);
    moving(-360,-10);
    await sleep(100);

    moving(-375,-10);
    await sleep(120);
    xLastMoved = -375;
    yLastMoved = -10;




    let xMoved = 0,yMoved = 0;

    let startMove = function (x,y)
    {
        Holding = true;

        TweenUp(false);

        xStartScreen = x;
        yStartScreen = y;
    }

    let endMove = function (){
        Holding = false;

        TweenUp(true);

        xLastMoved = xMoved;
        yLastMoved = yMoved;

        // moving((Math.floor((xMoved-45)/90)+1)*90,(Math.floor((yMoved-45)/90)+1)*90) ;
        //
        // xLastMoved = (Math.floor((xMoved-45)/90)+1)*90;
        // yLastMoved = (Math.floor((yMoved-45)/90)+1)*90;
    }

    let Mmoving = function(x,y){
        if(!Holding) return;

        xMoved = (x - xStartScreen)/4 + xLastMoved;
        yMoved = (-y +   yStartScreen)/4 + yLastMoved;

        moving(xMoved, yMoved);
    }

    document.addEventListener("mousedown", function (m) {
        startMove(m.clientX,m.clientY);
    });

    document.addEventListener("touchstart", function (m) {
        startMove(m.touches[0].clientX,m.touches[0].clientY);
    });

    document.addEventListener("mouseup", endMove);

    document.addEventListener("touchend", endMove);

    document.addEventListener("mousemove", function (m) {
        Mmoving(m.clientX,m.clientY);
    });

    document.addEventListener("touchmove", function (m) {
        Mmoving(m.touches[0].clientX,m.touches[0].clientY);
    });
});