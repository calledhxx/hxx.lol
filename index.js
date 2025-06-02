let CubeSideSize = 220;


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function hex(a,b,c){
    if(a.substring(0,1) === "#") a = a.substring(1,7)
    if(b.substring(0,1) === "#") b = b.substring(1,7)

    let str = [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
    ];


    let abc = function(v){
        for (let i = 0;i<str.length;i++){
            if (str[i] === v){
                return i;
            }
        }
    }

    let Red = 0;
    let Green = 0;
    let Blue = 0;



    Red = Red + abc(a.substring(0,1))*16;
    Red = Red + abc(a.substring(1,2));

    Green = Green +  abc(a.substring(2,3))*16;
    Green = Green + abc(a.substring(3,4));

    Blue = Blue + abc(a.substring(4,5))*16;
    Blue = Blue + abc(a.substring(5,6));


    Red = Red +  c * abc(b.substring(0,1))*16;
    Red = Red +  c * abc(b.substring(1,2));

    Green = Green +   c*abc(b.substring(2,3))*16;
    Green = Green +  c*abc(b.substring(3,4));

    Blue = Blue +  c*abc(b.substring(4,5))*16;
    Blue = Blue +  c*abc(b.substring(5,6));


    let re = "";


    re = re + (str[ Math.floor(Red/16)] ? str[Math.floor(Red/16)] : (c > 0 ? "f" : "0"))  +  (str[Red%16] ? str[Red%16] : (c > 0 ? "f" : "0"));
    re = re + (str[ Math.floor(Green/16)] ? str[Math.floor(Green/16)] : (c > 0 ? "f" : "0"))  +  (str[Green%16] ? str[Green%16] : (c > 0 ? "f" : "0"));
    re = re + (str[ Math.floor(Blue/16)] ? str[Math.floor(Blue/16)] : (c > 0 ? "f" : "0"))  +  (str[Blue%16] ? str[Blue%16] : (c > 0 ? "f" : "0"));

    return re;
}

document.addEventListener("DOMContentLoaded",  async function () {

    let xLastMoved = 0,yLastMoved = 0;

    let xStartScreen = 0,yStartScreen = 0;

    let Holding = 0;

    let LockHolding = 0;

    let buttons = [
        {
            "Side": 1,
            "Chunk": 1,
            "Color":"#e8a428",
            "depth":24,
            "Icon": "./img/a9a72e835d8a6266b636180a30014def.png"
        },

        {
            "Side": 1,
            "Chunk": 2,
            "Color":"#e4e4e4",
            "depth":24,
            "Icon": "./img/32f8f2203ecb889671ddd843e2d737b9.png"

        },




        {
            "Side": 1,
            "Chunk": 4,
            "Color":"#7441cd",
            "depth":24,
            "Icon": "./img/160889760.png"

        },
        {
            "Side": 1,
            "Chunk": 3,
            "Color":"#e4e4e4",
            "depth":24,
            "Icon": "./img/3cefb2f1f8b976328364daafe647af0d.png"
        },


        {
            "Side": 6,
            "Chunk": 4,
            "Color":"#7441cd",
            "depth":24,
            "Icon": "./img/160889760.png"

        },
        {
            "Side": 5,
            "Chunk": 3,
            "Color":"#e4e4e4",
            "depth":24,
            "Icon": "./img/3cefb2f1f8b976328364daafe647af0d.png"
        },



        {
            "Side": 2,
            "Chunk": 1,
            "Color":"#0a85b1",
            "depth":24,
            "Icon": "./img/52929faad24d847a8c75de0d10dd082e.png"
        },

        {
            "Side": 2,
            "Chunk": 4,
            "Color":"#bac5a3",
            "depth":24,
            "Icon": "./img/IMG_20250408_223421_737.jpg"
        },
        {
            "Side": 2,
            "Chunk": 3,
            "Color":"#fa7965",
            "depth":24,
            "Icon": "./img/148810bbcbcc4db37d2ec8188a8a6399.png"
        },
        {
            "Side": 2,
            "Chunk": 2,
            "Color":"#202020",
            "depth":24,
            "Icon": "./img/62993182ae16f24ad926f01f9bafa892.png"
        },


    ];

    let buttonElements = [];

    for (let i = 0; i < buttons.length; i++) {
        let newOne = document.createElement("div");
        newOne.classList.add("button");

        let newFrontSide = document.createElement("div");
        let newBackSide = document.createElement("div");
        let newRightSide = document.createElement("div");
        let newLeftSide = document.createElement("div");
        let newTopSide = document.createElement("div");
        let newBottomSide = document.createElement("div");


        let frontIcon = document.createElement("img");
        frontIcon.src = buttons[i].Icon;

        frontIcon.style.borderColor = hex(buttons[i].Color,"252525",-1);

        newFrontSide.classList.add("buttonFrontSide");
        newBackSide.classList.add("buttonBackSide");
        newTopSide.classList.add("buttonTopSide");
        newBottomSide.classList.add("buttonBottomSide");
        newLeftSide.classList.add("buttonLeftSide");
        newRightSide.classList.add("buttonRightSide");

        newOne.appendChild(newFrontSide);
        newOne.appendChild(newBackSide);
        newOne.appendChild(newRightSide);
        newOne.appendChild(newLeftSide);
        newOne.appendChild(newTopSide);
        newOne.appendChild(newBottomSide);

        newFrontSide.appendChild(frontIcon);

        newRightSide.appendChild(document.createElement("div"));
        newLeftSide.appendChild(document.createElement("div"));
        newTopSide.appendChild(document.createElement("div"));
        newBottomSide.appendChild(document.createElement("div"));

        let pads = [
            newRightSide.children[0],
            newLeftSide.children[0],
            newTopSide.children[0],
            newBottomSide.children[0],
            newFrontSide
        ]

        for (let j = 0; j < pads.length; j++) {
            pads[j].style.backgroundColor = buttons[i].Color;
        }

        newRightSide.children[0].style.width = String(buttons[i].depth)+"px";
        newLeftSide.children[0].style.width = String(buttons[i].depth)+"px";
        newTopSide.children[0].style.height = String(buttons[i].depth)+"px";
        newBottomSide.children[0].style.height = String(buttons[i].depth)+"px";

        document.body.appendChild(newOne);

        newOne.id = String(i);
        buttonElements[buttonElements.length] = newOne;
    }



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

        for (let i = 0;i<buttonElements.length; i++)
            for (let j = 0; j<buttonElements[i].children.length; j++) {
                buttonElements[i].children[j].style.transition =document.getElementById("passZFront").style.transition;
                for (let  c= 0; c<buttonElements[i].children[j].children.length; c++)
                    buttonElements[i].children[j].children[c].style.transition = document.getElementById("passZFront").style.transition;

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

        let FVisible = false,RVisible = false,LVisible = false,TVisible = false,BVisible = false,BackVisible = false;



        document.getElementById("passZFront").style.transform =
            `rotateX(${0+yMoved}deg) rotateY(${180+xMoved}deg) translateX(0) translateY(0) translateZ(-${String(CubeSideSize/2)}px)`


        document.getElementById("passZBack").style.transform =
            `rotateX(${0+yMoved}deg) rotateY(${0+xMoved}deg) translateX(0) translateY(0) translateZ(-${String(CubeSideSize/2)}px)`


        if(
            YtoFXnFZDeg < 90 ? toFZDeg < 90 : toFZDeg > 90
        ){
            document.getElementById("passZFront").style.opacity = "1";
            document.getElementById("passZBack").style.opacity = "0";
            FVisible = true;
            BackVisible = false;
        }else {
            document.getElementById("passZFront").style.opacity = "0";
            document.getElementById("passZBack").style.opacity = "1";
            FVisible = false;
            BackVisible = true;
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
            LVisible = true;
            RVisible = false;
        }else {
            document.getElementById("passXFront").style.opacity = "0";
            document.getElementById("passXBack").style.opacity = "1";
            LVisible = false;
            RVisible = true;
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
            BVisible = true;
            TVisible = false;
        }else {
            document.getElementById("passYFront").style.opacity = "0";
            document.getElementById("passYBack").style.opacity = "1";
            BVisible = false;
            TVisible = true;
        }


        //
        //
        //
        //
        //
        //
        //
        //
        //


        let orgXMoved = xMoved,orgYMoved = yMoved;

        for (let i = 0; i<buttonElements.length;i++){
            let addX =  0,addY = 0,addZ = -110-(buttons[i].depth/2);
            let addDegX = 0,addDegY = 0;
            let db = false;

            switch (buttons[i].Side){
                case 1:{ //f
                    addDegX = 0;
                    db = FVisible;
                    break;
                }
                case 2:{ // r
                    addDegX = 90;
                    db = RVisible;


                    break;
                }
                case 3:{ // back
                    addDegX = 180;
                    db = BackVisible;

                    break;
                }
                case 4:{ // l
                    addDegX = 270;
                    db = LVisible;

                    break;
                }
                case 5:{ // t
                    addDegY = 90;
                    db = TVisible;

                    break;
                }
                case 6:{ //bottom
                    addDegY = 270;
                    db = BVisible;

                    break;
                }
            }

            if (db){
                buttonElements[i].style.zIndex = "3";

            }else {
                buttonElements[i].style.zIndex = "-1";
            }


            switch (buttons[i].Chunk){
                case 1:{
                    addX = -55;
                    addY = -55;
                    break;
                }
                case 2:{
                    addX = 55;
                    addY = -55;
                    break;
                }
                case 3:{
                    addX = -55;
                    addY = 55;
                    break;
                }
                case 4:{
                    addX = 55;
                    addY = 55;
                    break;
                }
            }

            xMoved += addDegX;
            yMoved += addDegY;

            x360Moved = (xMoved%360);
            y360Moved = (yMoved%360);


            toFZDeg = (Math.abs(x360Moved)>180) ? 180-(Math.abs(x360Moved)-180) : Math.abs(x360Moved);


            toFXDeg =
                (Math.abs((xMoved-90)%360)>180) ? 180-(Math.abs((xMoved-90)%360)-180) : Math.abs((xMoved-90)%360);
            toFYDeg =
                (Math.abs((yMoved-90)%360)>180) ? 180-(Math.abs((yMoved-90)%360)-180) : Math.abs((yMoved-90)%360);
            YtoFXnFZDeg =
                (Math.abs(y360Moved)>180) ? 180-(Math.abs(y360Moved)-180) : Math.abs(y360Moved);


            if(buttons[i].Side < 5 ?
                (YtoFXnFZDeg < 90 ? toFXDeg > 90 : toFXDeg < 90)
                :
                (toFYDeg < 90 ? toFXDeg > 90 : toFXDeg < 90)
            ){
                if(buttons[i].Chunk%2===1){
                    buttonElements[i].style.zIndex = String(Number(buttonElements[i].style.zIndex) - 1);
                }
            }else{
                if(buttons[i].Chunk%2!==1){
                    buttonElements[i].style.zIndex = String(Number(buttonElements[i].style.zIndex) - 1);
                }
            }

            if (buttons[i].Side >= 5) console.log(
              Math.floor(toFZDeg)  ,
                Math.floor(toFXDeg),
                    Math.floor(toFYDeg),
                        Math.floor(YtoFXnFZDeg)
            )

            if(buttons[i].Side < 5 ?
                toFYDeg > 90
                :
                (toFYDeg < 90 ? toFZDeg > 90 : toFZDeg < 90)
            ){
                if(buttons[i].Chunk>2){
                    buttonElements[i].style.zIndex = String(Number(buttonElements[i].style.zIndex) - 1);
                }
            }else{
                if(buttons[i].Chunk<=2){
                    buttonElements[i].style.zIndex = String(Number(buttonElements[i].style.zIndex) - 1);
                }
            }



            buttonElements[i].getElementsByClassName("buttonFrontSide")[0].style.transform =
                buttons[i].Side < 5 ? `rotateX(${String(yMoved)}deg) rotateY(${String(xMoved)}deg) translateX(${String(addX)}px) translateY(${String(addY)}px) translateZ(${String(-addZ+buttons[i].depth/2)}px)`
                    : `rotateX(${String(yMoved)}deg) rotateZ(${String((buttons[i].Side === 6 ? -1 : 1 )*(-xMoved))}deg) translateX(${String(addX)}px) translateY(${String(addY)}px) translateZ(${String(-addZ+buttons[i].depth/2)}px)`

            buttonElements[i].getElementsByClassName("buttonBackSide")[0].style.transform =
                buttons[i].Side < 5 ? `rotateX(${String(yMoved)}deg) rotateY(${String(xMoved+180)}deg) translateX(${String(-addX)}px) translateY(${String(addY)}px) translateZ(${String(addZ+buttons[i].depth/2)}px)`
                    : `rotateX(${String(yMoved+180)}deg) rotateZ(${String((buttons[i].Side === 6 ? -1 : 1 )*(xMoved+180))}deg) translateX(${String(-addX)}px) translateY(${String(addY)}px) translateZ(${String((addZ+buttons[i].depth/2))}px)`
            ;


            // if(
            //
            //         YtoFXnFZDeg < 90 ? toFZDeg < 90 : toFZDeg > 90
            //
            // ){
            //     buttonElements[i].getElementsByClassName("buttonFrontSide")[0].style.opacity = "1";
            //     // document.getElementsByClassName("buttonBackSide")[0].style.opacity = "0";
            // }else {
            //     buttonElements[i].getElementsByClassName("buttonFrontSide")[0].style.opacity = "0";
            //     // document.getElementsByClassName("buttonBackSide")[0].style.opacity = "1";
            // }



            //!!! sid 6 left right re-changed
            //!!! sid 6 left right re-changed
            //!!! sid 6 left right re-changed
            //!!! sid 6 left right re-changed
            //!!! sid 6 left right re-changed
            //!!! sid 6 left right re-changed
            //!!! sid 6 left right re-changed
            //!!! sid 6 left right re-changed
            //!!! sid 6 left right re-changed
            //!!! sid 6 left right re-changed
            //!!! sid 6 left right re-changed
            //!!! sid 6 left right re-changed
            //!!! sid 6 left right re-changed
            //!!! sid 6 left right re-changed
            //!!! sid 6 left right re-changed
            //!!! sid 6 left right re-changed
            //!!! sid 6 left right re-changed
            //!!! sid 6 left right re-changed
            //!!! sid 6 left right re-changed
            //!!! sid 6 left right re-changed
            //!!! sid 6 left right re-changed
            //!!! sid 6 left right re-changed
            //!!! sid 6 left right re-changed
            //!!! sid 6 left right re-changed
            //!!! sid 6 left right re-changed
            //!!! sid 6 left right re-changed
            //!!! sid 6 left right re-changed
            //!!! sid 6 left right re-changed
            //!!! sid 6 left right re-changed
            //!!! sid 6 left right re-changed
            //!!! sid 6 left right re-changed
            //!!! sid 6 left right re-changed
            //!!! sid 6 left right re-changed
            //!!! sid 6 left right re-changed


            buttonElements[i].getElementsByClassName("buttonRightSide")[0].style.transform =
                buttons[i].Side < 5 ? `rotateX(${yMoved}deg) rotateY(${xMoved+90}deg) translateX(${String(addZ)}px) translateY(${String(addY)}px) translateZ(${String(addX+40)}px)`

                    : `rotateX(${(buttons[i].Side === 6 ? -1 : 1 )*(yMoved+90)}deg) rotateY(${(-xMoved-270)}deg) rotateZ(270deg) translateX(${String(addZ)}px)  translateY(${String((buttons[i].Side === 6 ? -1 : 1 )*addY)}px) translateZ(${String(addX+(buttons[i].Side === 6 ? -1 : 1 )*40)}px)`


            buttonElements[i].getElementsByClassName("buttonLeftSide")[0].style.transform =
                buttons[i].Side < 5  ? `rotateX(${yMoved}deg) rotateY(${xMoved-90}deg) translateX(${String(-addZ)}px) translateY(${String(addY)}px) translateZ(${String(-addX + 40)}px)`
                    : `rotateX(${(buttons[i].Side === 6 ? -1 : 1 )*(yMoved+90)}deg) rotateY(${-xMoved-90}deg) rotateZ(90deg) translateX(${String(-addZ)}px)  translateY(${String((buttons[i].Side === 6 ? -1 : 1 )*addY)}px) translateZ(${String(-addX + (buttons[i].Side === 6 ? -1 : 1 )*40 )}px)`;

            if(
                buttons[i].Side < 5 ?
                    (YtoFXnFZDeg < 90  ? toFXDeg < 90 : toFXDeg > 90)
                    :
                    (toFYDeg < 90  ? toFXDeg < 90 : toFXDeg > 90)
            ){
                buttonElements[i].getElementsByClassName("buttonLeftSide")[0].style.opacity = "1";
                buttonElements[i].getElementsByClassName("buttonRightSide")[0].style.opacity = "0";
            }else {
                buttonElements[i].getElementsByClassName("buttonLeftSide")[0].style.opacity = "0";
                buttonElements[i].getElementsByClassName("buttonRightSide")[0].style.opacity = "1";
            }

            buttonElements[i].getElementsByClassName("buttonTopSide")[0].style.transform =
                buttons[i].Side < 5 ? `rotateX(${yMoved+90}deg) rotateZ(${-xMoved}deg) translateX(${String(addX)}px) translateY(${String(-addZ)}px) translateZ(${String(-addY+40)}px)`
                    :`rotateX(${(buttons[i].Side === 6 ? -1 : 1 )*(yMoved+90)}deg) rotateY(${-xMoved}deg)  translateX(${String(addX)}px) translateY(${String(-addZ)}px) translateZ(${String((buttons[i].Side === 6 ? -1 : 1 )*(-addY+40))}px)`;

            buttonElements[i].getElementsByClassName("buttonBottomSide")[0].style.transform =
                buttons[i].Side < 5 ? `rotateX(${yMoved-90}deg) rotateZ(${xMoved}deg) translateX(${String(addX)}px) translateY(${String(addZ)}px) translateZ(${String(addY+40)}px)`
                    :`rotateX(${(buttons[i].Side === 6 ? -1 : 1 )*(yMoved-90)}deg) rotateY(${xMoved}deg)  translateX(${String(addX)}px) translateY(${String(addZ)}px) translateZ(${String((buttons[i].Side === 6 ? -1 : 1 )*(addY+40))}px)`;

            if(
                buttons[i].Side < 5?
                    (toFYDeg < 90)
                    :
                    (toFZDeg < 90  ? toFYDeg < 90 : toFYDeg > 90)
            ){
                buttonElements[i].getElementsByClassName("buttonBottomSide")[0].style.opacity = "1";
                buttonElements[i].getElementsByClassName("buttonTopSide")[0].style.opacity = "0";

            }else {
                buttonElements[i].getElementsByClassName("buttonBottomSide")[0].style.opacity = "0";
                buttonElements[i].getElementsByClassName("buttonTopSide")[0].style.opacity = "1";


            }



            xMoved = orgXMoved;
            yMoved = orgYMoved;
        }



    }

    TweenUp(true);

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

    let xMoved = 0,yMoved = 0;


    xLastMoved = xMoved =  -375;
    yLastMoved = yMoved = -10;



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

        xMoved = (x - xStartScreen)/3 + xLastMoved;
        yMoved = (-y +   yStartScreen)/3 + yLastMoved;

        moving(xMoved, yMoved);
    }

    document.addEventListener("mousedown", function (m) {
        if(LockHolding) return;

        startMove(m.clientX,m.clientY);
    });

    document.addEventListener("touchstart", function (m) {
        if(LockHolding) return;
         

        startMove(m.touches[0].clientX,m.touches[0].clientY);
    });

    document.addEventListener("mouseup", function ( ){
        if(LockHolding) return;
        endMove();
    });

    document.addEventListener("touchend", function ( ){
        if(LockHolding) return;

        endMove();
    });

    document.addEventListener("mousemove", function (m) {
        if(LockHolding) return;
        Mmoving(m.clientX,m.clientY);
    });

    document.addEventListener("touchmove", function (m) {
        if(LockHolding) return;
         

        Mmoving(m.touches[0].clientX,m.touches[0].clientY);
    });

    function retIfParentMatch(e,id,cname,notFirst){
        if (e === document.parentElement) return false;

        if(id){
            if(e ? (e.id === id) : false){
                if(notFirst) return false;
                return e;
            }else{
                return retIfParentMatch(e.parentElement, id,cname);
            }
        }else{
            if(e ? (e.className === cname) : false){
                if(notFirst) return false;
                return e;
            }else{
                return retIfParentMatch(e.parentElement, id,cname);
            }
        }
    }



    document.addEventListener("click", async function (m) {
        let e = false;
        let els = document.elementsFromPoint(m.clientX,m.clientY);

        for (let i = 0; i < els.length; i++) {
            e = retIfParentMatch(els[i],0,"button",true);
            if(e) break;
        }


        if(e){
            LockHolding = true;
            TweenUp(true);

            buttons[Number(e.id)].depth = 6;


            e.getElementsByClassName("buttonBackSide")[0].style.boxShadow =
                "black 0 0 5px 1px"


                e.getElementsByClassName("buttonTopSide")[0].children[0].style.height =
                e.getElementsByClassName("buttonBottomSide")[0].children[0].style.height =
                    e.getElementsByClassName("buttonLeftSide")[0].children[0].style.width =
                        e.getElementsByClassName("buttonRightSide")[0].children[0].style.width = String(buttons[Number(e.id)].depth)+"px";

            moving(xLastMoved,yLastMoved);
            await sleep(100);

            buttons[Number(e.id)].depth = 24;

            e.getElementsByClassName("buttonBackSide")[0].style.boxShadow =
                "black 0 0 10px 2px"

            e.getElementsByClassName("buttonTopSide")[0].children[0].style.height =
                e.getElementsByClassName("buttonBottomSide")[0].children[0].style.height =
                    e.getElementsByClassName("buttonLeftSide")[0].children[0].style.width =
                        e.getElementsByClassName("buttonRightSide")[0].children[0].style.width = String(buttons[Number(e.id)].depth)+"px";

            moving(xLastMoved,yLastMoved);

            await sleep(100);


            TweenUp(false);

            await sleep(100);


            LockHolding = false;
        };
    })
});