let CubeSideSize = 220;
let HTTPService = new XMLHttpRequest();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function checkIfMobile() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

let Cube = [];

let ControlButtons = [
    {
        "Name":"回上一動",
        "IMPORTANT?":false
    },
    {
        "Name":"整理泡泡",
        "IMPORTANT?":false
    },
    {
        "Name":"戳破泡泡",
        "IMPORTANT?":true
    },
    {
        "Name":"吹除泡泡",
        "IMPORTANT?":true
    },
]

function hex(a,b,c){
    if(a.substring(0,1) === "#") a = a.substring(1,7)
    if(b.substring(0,1) === "#") b = b.substring(1,7)

    a = a.toLowerCase()
    b = b.toLowerCase()

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

let PullUpInfo = {
    "PullUpType": false,
    "ChoseToPullUpIndex": false,
    "MainPullUpIndex": false,
};

let CubeInfo = {
    "XMoved":0,
    "YMoved":0,
    "LastXMoved":0,
    "LastYMoved":0,
    "LastToX":0,
    "LastToY":0,
    "LastDBX":-1,
    "LastDBY":-1
}


let DynamicBubbles = [];

function setView(){

    let height = window.innerHeight;
    let width =  window.innerWidth;

    document.documentElement.style.setProperty('--fh', `${height}px`);
    document.documentElement.style.setProperty('--fw', `${width}px`);
}
window.addEventListener("resize",setView);

document.addEventListener("DOMContentLoaded",  async function () {
    setView();


    let xStartScreen = 0,yStartScreen = 0;

    let Holding = 0;
    let Pushing = 0;
    let Pulling = 0;
    let Controlling = 0;

    let Locked = 0;

    let buttonElements = [];

    function SummonCube(CubeData){
        DeleteButtons();

        Cube = structuredClone(CubeData);

        CreateButtons();
    }

    function DeleteButtons() {
        if(!Cube.Buttons) return;
        for (let i = 0; i < Cube.Buttons.length; i++){
            let element = buttonElements[i];
            Cube.Buttons[i].depth = 0;
            element.style.opacity = "0";

            setTimeout(function (){
                element.remove();
            },120)
        }

        Cube.Buttons = [];
        buttonElements = [];


    }

    function CreateButtons(){
        for (let i = 0; i < Cube.Buttons.length; i++) {
            let newOne = document.createElement("div");
            newOne.classList.add("button");

            let newFrontSide = document.createElement("div");
            let newBackSide = document.createElement("div");
            let newRightSide = document.createElement("div");
            let newLeftSide = document.createElement("div");
            let newTopSide = document.createElement("div");
            let newBottomSide = document.createElement("div");


            let frontMain = document.createElement("div");


            if(Cube.Buttons[i].Icon)
            {
                let frontIcon = document.createElement("img");
                frontIcon.style.borderColor = hex(Cube.Buttons[i].Color,"404040",-1);
                frontIcon.src = Cube.Buttons[i].Icon;
                frontMain.appendChild(frontIcon);
            }
            else
            {
                let frontTitle = document.createElement("h1");
                frontTitle.style.borderColor = hex(Cube.Buttons[i].Color,"404040",-1);
                frontTitle.textContent = Cube.Buttons[i].Name.substring(0, 1);
                frontMain.appendChild(frontTitle);
            }


            frontMain.style.borderColor = hex(Cube.Buttons[i].Color,"252525",-1);
            frontMain.style.backgroundColor = hex(Cube.Buttons[i].Color,"181818",-1);

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

            newFrontSide.appendChild(frontMain);




            newRightSide.appendChild(document.createElement("div"));
            newLeftSide.appendChild(document.createElement("div"));
            newTopSide.appendChild(document.createElement("div"));
            newBottomSide.appendChild(document.createElement("div"));


            newTopSide.children[0].textContent = " • ";
            newBottomSide.children[0].textContent = " • ";
            newLeftSide.children[0].textContent = Cube.Buttons[i].Name;
            newRightSide.children[0].textContent = Cube.Buttons[i].Tag;

            newOne.style.color = hex(Cube.Buttons[i].Color,"121212",1);

            let pads = [
                newRightSide.children[0],
                newLeftSide.children[0],
                newTopSide.children[0],
                newBottomSide.children[0],
                newFrontSide
            ]

            for (let j = 0; j < pads.length; j++) {
                pads[j].style.backgroundColor = Cube.Buttons[i].Color;
            }

            newRightSide.children[0].style.width =
                newLeftSide.children[0].style.width =
                    newTopSide.children[0].style.height =
                        newBottomSide.children[0].style.height = "0px";

            document.getElementById("Hub").appendChild(newOne);

            newOne.id = String(i);
            buttonElements[buttonElements.length] = newOne;
        }
    }


    async function TidyUpDynamicBubbles(){
        resetPullUpInfo();

        let Base = document.getElementById("DynamicBubbleBase");

        if(DynamicBubbles.length > 3){
            for (let i = 0; i < DynamicBubbles.length; i++)
                DynamicBubbles[i].style.opacity = "0";

            setTimeout(async function(){
                Base.style.top = "50px"
                await sleep(120);
                Base.style.top = "30px"

            },0)

            await sleep(100);

        }else {
            await sleep(100);

        }



        for (let i = DynamicBubbles.length-1; i > DynamicBubbles.length-5; i--) {
            if(!DynamicBubbles[i]) continue;
            DynamicBubbles[i].style.top = `${8 * (DynamicBubbles.length-1-i)}`;
            DynamicBubbles[i].style.width = `${100 - 5 * (DynamicBubbles.length-1-i)}%`;
            DynamicBubbles[i].style.opacity = `${1 - 0.25*(DynamicBubbles.length-1-i)}`;

            DynamicBubbles[i].getElementsByClassName("DynamicBubbleControlBar")[0].style.opacity = "0";
            DynamicBubbles[i].getElementsByClassName("DynamicBubbleControlBar")[0].style.height = "0";
            DynamicBubbles[i].getElementsByClassName("DynamicBubbleControlBar")[0].style.width = "0";

            if(DynamicBubbles.length === 1){
                DynamicBubbles[i].getElementsByClassName("DynamicBubbleBottomBar")[0].innerHTML =
                    "點擊泡泡以閱覽全文"
            }else{
                DynamicBubbles[i].getElementsByClassName("DynamicBubbleBottomBar")[0].innerHTML =
                    "點擊並選取閱讀項目"
            }

            DynamicBubbles[i].getElementsByClassName("DynamicBubbleFrame")[0].style.overflowY =
                "hidden";

            if(i !== DynamicBubbles.length-1){
                DynamicBubbles[i].style.height = "120px";
            }else{
                if(DynamicBubbles[i].classList.contains("NotificationBubble"))
                    DynamicBubbles[i].style.height = "120px";
                else if(DynamicBubbles[i].classList.contains("PageBubble"))
                    DynamicBubbles[i].style.height = "330px";

            }
        }

    };



    function TweenUp(db,smoothSec){
        smoothSec = smoothSec ? smoothSec : 0.1;

        document.getElementById("box").style.transition=
            document.getElementById("passZFront").style.transition =
                document.getElementById("passZBack").style.transition =
                    document.getElementById("passZBack").style.transition =
                        document.getElementById("passXFront").style.transition =
                            document.getElementById("passXBack").style.transition =
                                document.getElementById("passYFront").style.transition =
                                    document.getElementById("passYBack").style.transition = db ?`all ${smoothSec}s ease` : "";

        for (let i = 0;i<buttonElements.length; i++){
            buttonElements[i].style.transition = document.getElementById("passZFront").style.transition;
            for (let j = 0; j<buttonElements[i].children.length; j++) {
                buttonElements[i].children[j].style.transition = document.getElementById("passZFront").style.transition;
                for (let  c= 0; c<buttonElements[i].children[j].children.length; c++)
                    buttonElements[i].children[j].children[c].style.transition = document.getElementById("passZFront").style.transition;

            }
        }

    }


    function moving(x, y) {
        let x360Moved = (x%360);
        let y360Moved = (y%360);

        let toFZDeg = (Math.abs(x360Moved)>180) ? 180-(Math.abs(x360Moved)-180) : Math.abs(x360Moved);
        let toFXDeg =
            (Math.abs((x-90)%360)>180) ? 180-(Math.abs((x-90)%360)-180) : Math.abs((x-90)%360);
        let toFYDeg =
            (Math.abs((y-90)%360)>180) ? 180-(Math.abs((y-90)%360)-180) : Math.abs((y-90)%360);
        let YtoFXnFZDeg =
            (Math.abs(y360Moved)>180) ? 180-(Math.abs(y360Moved)-180) : Math.abs(y360Moved);

        let FVisible = false,RVisible = false,LVisible = false,TVisible = false,BVisible = false,BackVisible = false;

        document.getElementById("box").style.width =
            document.getElementById("box").style.height =
                CubeSideSize

        for(let i = 0;i<document.getElementsByClassName("pass").length;i++)
            document.getElementsByClassName("pass")[i].style.width =
                document.getElementsByClassName("pass")[i].style.height =
                    CubeSideSize

        document.getElementById("passZFront").style.transform =
            `rotateX(${0+y}deg) rotateY(${180+x}deg) translateX(0) translateY(0) translateZ(-${String(CubeSideSize/2)}px)`


        document.getElementById("passZBack").style.transform =
            `rotateX(${0+y}deg) rotateY(${0+x}deg) translateX(0) translateY(0) translateZ(-${String(CubeSideSize/2)}px)`


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
            `rotateX(${0+y}deg) rotateY(${90+x}deg) translateX(0) translateY(0) translateZ(-${String(CubeSideSize/2)}px)`


        document.getElementById("passXBack").style.transform =
            `rotateX(${0+y}deg) rotateY(${270+x}deg) translateX(0) translateY(0) translateZ(-${String(CubeSideSize/2)}px)`

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
            `rotateX(${90+y}deg) rotateZ(${0-x}deg) translateX(0) translateY(0) translateZ(-${String(CubeSideSize/2)}px`



        document.getElementById("passYBack").style.transform =
            `rotateX(${270+y}deg) rotateZ(${0+x}deg) translateX(0) translateY(0) translateZ(-${String(CubeSideSize/2)}px)`

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


        let orgx = x,orgy = y;

        for (let i = 0; i<buttonElements.length;i++){
            let addX =  0,addY = 0,addZ = -CubeSideSize/2-(Cube.Buttons[i].depth/2);
            let addDegX = 0,addDegY = 0;
            let db = false;

            switch (Cube.Buttons[i].Side){
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


            switch (Cube.Buttons[i].Chunk){
                case 1:{
                    addX = - CubeSideSize/4;
                    addY = - CubeSideSize/4;
                    break;
                }
                case 2:{
                    addX = CubeSideSize/4;
                    addY = -CubeSideSize/4;
                    break;
                }
                case 3:{
                    addX = -CubeSideSize/4;
                    addY = CubeSideSize/4;
                    break;
                }
                case 4:{
                    addX = CubeSideSize/4;
                    addY = CubeSideSize/4;
                    break;
                }
            }



            x += addDegX;
            y += addDegY;

            x360Moved = (x%360);
            y360Moved = (y%360);


            toFZDeg = (Math.abs(x360Moved)>180) ? 180-(Math.abs(x360Moved)-180) : Math.abs(x360Moved);


            toFXDeg =
                (Math.abs((x-90)%360)>180) ? 180-(Math.abs((x-90)%360)-180) : Math.abs((x-90)%360);
            toFYDeg =
                (Math.abs((y-90)%360)>180) ? 180-(Math.abs((y-90)%360)-180) : Math.abs((y-90)%360);
            YtoFXnFZDeg =
                (Math.abs(y360Moved)>180) ? 180-(Math.abs(y360Moved)-180) : Math.abs(y360Moved);


            if((Cube.Buttons[i].Side < 5) ?
                (YtoFXnFZDeg < 90 ? toFXDeg > 90 : toFXDeg < 90)
                :
                ((Cube.Buttons[i].Side !== 6 ? toFYDeg < 90 : toFYDeg > 90)? toFXDeg > 90 : toFXDeg < 90)
            ){
                if(Cube.Buttons[i].Chunk%2===1){
                    buttonElements[i].style.zIndex = String(Number(buttonElements[i].style.zIndex) - 1);
                }
            }else{
                if(Cube.Buttons[i].Chunk%2!==1){
                    buttonElements[i].style.zIndex = String(Number(buttonElements[i].style.zIndex) - 1);
                }
            }

            if((Cube.Buttons[i].Side < 5   && Cube.Buttons[i].Side !== 6 )?
                toFYDeg > 90
                :
                (toFYDeg < 90? toFZDeg > 90 : toFZDeg < 90)
            ){
                if(Cube.Buttons[i].Chunk>2){
                    buttonElements[i].style.zIndex = String(Number(buttonElements[i].style.zIndex) - 1);
                }
            }else{
                if(Cube.Buttons[i].Chunk<=2){
                    buttonElements[i].style.zIndex = String(Number(buttonElements[i].style.zIndex) - 1);
                }
            }



            buttonElements[i].getElementsByClassName("buttonTopSide")[0].children[0].style.height =
                buttonElements[i].getElementsByClassName("buttonBottomSide")[0].children[0].style.height =
                    buttonElements[i].getElementsByClassName("buttonLeftSide")[0].children[0].style.width =
                        buttonElements[i].getElementsByClassName("buttonRightSide")[0].children[0].style.width = String(Cube.Buttons[i].depth)+"px";


            buttonElements[i].style.width =
                buttonElements[i].style.height =
                    buttonElements[i].getElementsByClassName("buttonFrontSide")[0].style.width =
                        buttonElements[i].getElementsByClassName("buttonFrontSide")[0].style.height =
                            buttonElements[i].getElementsByClassName("buttonBackSide")[0].style.width =
                                buttonElements[i].getElementsByClassName("buttonBackSide")[0].style.height =
                                    buttonElements[i].getElementsByClassName("buttonRightSide")[0].style.width =
                                        buttonElements[i].getElementsByClassName("buttonRightSide")[0].style.height =
                                            buttonElements[i].getElementsByClassName("buttonLeftSide")[0].style.width =
                                                buttonElements[i].getElementsByClassName("buttonLeftSide")[0].style.height =
                                                    buttonElements[i].getElementsByClassName("buttonTopSide")[0].style.width =
                                                        buttonElements[i].getElementsByClassName("buttonTopSide")[0].style.height =
                                                            buttonElements[i].getElementsByClassName("buttonBottomSide")[0].style.width =
                                                                buttonElements[i].getElementsByClassName("buttonBottomSide")[0].style.height =
                                                                    `${CubeSideSize * 4/11}px`;

                buttonElements[i].getElementsByClassName("buttonRightSide")[0].children[0].style.height =
                        buttonElements[i].getElementsByClassName("buttonLeftSide")[0].children[0].style.height =
                            `${CubeSideSize * 4/11}px`;

            buttonElements[i].getElementsByClassName("buttonTopSide")[0].children[0].style.width =
                    buttonElements[i].getElementsByClassName("buttonBottomSide")[0].children[0].style.width =
                            `${CubeSideSize * 4/11}px`;


            buttonElements[i].getElementsByClassName("buttonFrontSide")[0].style.transform =
                Cube.Buttons[i].Side < 5 ? `rotateX(${String(y)}deg) rotateY(${String(x)}deg) translateX(${String(addX)}px) translateY(${String(addY)}px) translateZ(${String(-addZ+Cube.Buttons[i].depth/2)}px)`
                    : `rotateX(${String(y)}deg) rotateZ(${String((Cube.Buttons[i].Side === 6 ? -1 : 1 )*(-x))}deg) translateX(${String(addX)}px) translateY(${String(addY)}px) translateZ(${String(-addZ+Cube.Buttons[i].depth/2)}px)`

            buttonElements[i].getElementsByClassName("buttonBackSide")[0].style.transform =
                Cube.Buttons[i].Side < 5 ? `rotateX(${String(y)}deg) rotateY(${String(x+180)}deg) translateX(${String(-addX)}px) translateY(${String(addY)}px) translateZ(${String(addZ+Cube.Buttons[i].depth/2)}px)`
                    : `rotateX(${String(y+180)}deg) rotateZ(${String((Cube.Buttons[i].Side === 6 ? -1 : 1 )*(x+180))}deg) translateX(${String(-addX)}px) translateY(${String(addY)}px) translateZ(${String((addZ+Cube.Buttons[i].depth/2))}px)`
            ;

            buttonElements[i].getElementsByClassName("buttonRightSide")[0].style.transform =
                Cube.Buttons[i].Side < 5 ? `rotateX(${y}deg) rotateY(${x+90}deg) translateX(${String(addZ)}px) translateY(${String(addY)}px) translateZ(${String(addX+CubeSideSize * 4/11/2)}px)`
                    : (`rotateX(${(Cube.Buttons[i].Side === 6 ? -1 : 1 )*(y+90)}deg) rotateY(${(-x-270)}deg) rotateZ(${(Cube.Buttons[i].Side === 6 ? 1 : 1 )*270}deg) translateX(${String(addZ)}px)  translateY(${addY * (Cube.Buttons[i].Side === 6 ? -1 : 1)}px) translateZ(${String(addX+CubeSideSize * 4/11/2)}px) `
            + (Cube.Buttons[i].Side === 6 ? "scaleY(-1)" :""));


            buttonElements[i].getElementsByClassName("buttonLeftSide")[0].style.transform =
                Cube.Buttons[i].Side < 5  ? `rotateX(${y}deg) rotateY(${x-90}deg) translateX(${String(-addZ)}px) translateY(${String(addY)}px) translateZ(${String(-addX + CubeSideSize * 4/11/2)}px)`
                    : (`rotateX(${(Cube.Buttons[i].Side === 6 ? -1 : 1 )*(y+90)}deg) rotateY(${-x-90 }deg) rotateZ(${(Cube.Buttons[i].Side === 6 ? 1 : 1 )*90}deg) translateX(${String(-addZ)}px)  translateY(${addY * (Cube.Buttons[i].Side === 6 ? -1 : 1)}px) translateZ(${String(-addX + CubeSideSize * 4/11/2 )}px)`
                    +( Cube.Buttons[i].Side === 6 ? "scaleY(-1)" :""));

            if(
                Cube.Buttons[i].Side < 5 ?
                    (YtoFXnFZDeg < 90  ? toFXDeg < 90 : toFXDeg > 90)
                    :
                    (toFYDeg < 90  ? (Cube.Buttons[i].Side  !== 6 ? toFXDeg < 90 :  toFXDeg > 90) : (Cube.Buttons[i].Side  !== 6 ? toFXDeg > 90 :  toFXDeg < 90))
            ){
                buttonElements[i].getElementsByClassName("buttonLeftSide")[0].style.opacity = "1";
                buttonElements[i].getElementsByClassName("buttonRightSide")[0].style.opacity = "0";
            }else {
                buttonElements[i].getElementsByClassName("buttonLeftSide")[0].style.opacity = "0";
                buttonElements[i].getElementsByClassName("buttonRightSide")[0].style.opacity = "1";
            }

            buttonElements[i].getElementsByClassName("buttonTopSide")[0].style.transform =
                Cube.Buttons[i].Side < 5 ? `rotateX(${y+90}deg) rotateZ(${-x}deg) translateX(${String(addX)}px) translateY(${String(-addZ)}px) translateZ(${String(-addY+CubeSideSize * 4/11/2)}px)`
                    :`rotateX(${(Cube.Buttons[i].Side === 6 ? -1 : 1 )*(y+90)}deg) rotateY(${-x}deg)  translateX(${String(addX)}px) translateY(${String(-addZ)}px) translateZ(${String((Cube.Buttons[i].Side === 6 ? -1 : 1 )*(-addY+CubeSideSize * 4/11/2))}px)`;

            buttonElements[i].getElementsByClassName("buttonBottomSide")[0].style.transform =
                Cube.Buttons[i].Side < 5 ? `rotateX(${y-90}deg) rotateZ(${x}deg) translateX(${String(addX)}px) translateY(${String(addZ)}px) translateZ(${String(addY+CubeSideSize * 4/11/2)}px)`
                    :`rotateX(${(Cube.Buttons[i].Side === 6 ? -1 : 1 )*(y-90)}deg) rotateY(${x}deg)  translateX(${String(addX)}px) translateY(${String(addZ)}px) translateZ(${String((Cube.Buttons[i].Side === 6 ? -1 : 1 )*(addY+CubeSideSize * 4/11/2))}px)`;

            if(
                Cube.Buttons[i].Side < 5?
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



            x = orgx;
            y = orgy;
        }
    }

    function resetPullUpInfo(){
        PullUpInfo.ChoseToPullUpIndex = false;
        PullUpInfo.MainPullUpIndex = false;
        PullUpInfo.PullUpType = 0;
    }

    async function CreateDynamicBubbles(BubbleType,Content){
        resetPullUpInfo();

        let Base = document.getElementById("DynamicBubbleBase");

        let newBubble = document.createElement("div");
        newBubble.classList.add("DynamicBubble");



        let newBubbleTypeTitle = document.createElement("h1");
        newBubbleTypeTitle.classList.add("DynamicBubbleTypeTitle");

        let newBubbleFrame = document.createElement("div");
        newBubbleFrame.classList.add("DynamicBubbleFrame");

        let newBubbleBottomBar = document.createElement("div");
        newBubbleBottomBar.classList.add("DynamicBubbleBottomBar");

        let newControlBar = document.createElement("div");
        newControlBar.classList.add("DynamicBubbleControlBar");



        let newControlBarMiddleContent = document.createElement("hr");
        newControlBar.appendChild(newControlBarMiddleContent);


        let myIndex = DynamicBubbles.length;

        for(let i = 0;i<ControlButtons.length;i++){
            let newControlButton = document.createElement("div");
            newControlBar.appendChild(newControlButton);
            newControlButton.innerText = ControlButtons[i].Name;
        }

        switch (BubbleType){
            case "Notification": {
                newBubbleTypeTitle.innerText = "A Notification";

                setTimeout(async function(){
                    newBubble.classList.add("NotificationBubble");

                    if(myIndex === DynamicBubbles.length-1){
                        newBubble.style.height = "120px";
                    }
                },280);
                break;
            }
            case "Page":{
                newBubbleTypeTitle.innerText = "A Page";

                setTimeout(async function(){
                    newBubble.classList.add("PageBubble")

                    if(myIndex === DynamicBubbles.length-1){
                        newBubble.style.height = "330px";
                    }
                },280);
                break;
            }
        }

        let newControlBarHandle = document.createElement("h2");
        newControlBarHandle.classList.add("DynamicBubbleControlBarHandle");

        let newControlBarHandleRope = document.createElement("h2");
        newControlBarHandleRope.classList.add("DynamicBubbleControlBarHandleRope");
        newControlBarHandle.appendChild(newControlBarHandleRope);

        let newControlBarHandleGrip = document.createElement("h2");
        newControlBarHandleGrip.classList.add("DynamicBubbleControlBarHandleGrip");
        newControlBarHandle.appendChild(newControlBarHandleGrip);

        newControlBarMiddleContent.appendChild(newControlBarHandle);



        for(let SectionIndex = 0;SectionIndex<Content.length; SectionIndex++){
            let newSection = document.createElement("div");
            newSection.classList.add("DynamicBubbleFrameSection");

            for(let index in Content[SectionIndex]){
                let newDOM;

                switch(index){
                    case"Title":{
                        newDOM = document.createElement("h1");
                        newDOM.classList.add("DynamicBubbleFrameTitle");
                        newDOM.innerText = Content[SectionIndex][index];
                        break;
                    }

                    case"Content":{
                        newDOM = document.createElement("h6");
                        newDOM.classList.add("DynamicBubbleFrameContent");
                        newDOM.innerText = Content[SectionIndex][index];
                        break;
                    }

                    default:{
                        //...
                    }
                }

                newSection.appendChild(newDOM);
            }

            newBubbleFrame.appendChild(newSection);
        }

        DynamicBubbles.push(newBubble);

        newBubble.appendChild(newControlBar);
        newBubble.appendChild(newControlBar);
        newBubble.appendChild(newBubbleTypeTitle);
        newBubble.appendChild(newBubbleFrame);
        newBubble.appendChild(newBubbleBottomBar);

        Base.appendChild(newBubble);

        await TidyUpDynamicBubbles();
    };



    function PullUpDynamicBubbles(MainIndex){
        PullUpInfo.ChoseToPullUpIndex = MainIndex;

        if(DynamicBubbles.length === 1){
            PullUpInfo.PullUpType = 1;
            PullUpMainBubble(MainIndex);
        }else if(DynamicBubbles.length <= 3){
            PullUpInfo.PullUpType = 2;

            let Accumulation = 0;

            for (let i = 0; i < DynamicBubbles.length; i++){
                let mixHeight = 0;

                if(DynamicBubbles[i].classList.contains("PageBubble")){
                    mixHeight = 240;
                }else if (DynamicBubbles[i].classList.contains("NotificationBubble")){
                    mixHeight = 120;
                }

                DynamicBubbles[i].getElementsByClassName("DynamicBubbleBottomBar")[0].innerText =
                    "選擇我？"

                DynamicBubbles[i].style.height = `${mixHeight}px`;
                DynamicBubbles[i].style.width = "100%";
                DynamicBubbles[i].style.opacity = "1";

                DynamicBubbles[i].style.top = String( Accumulation )+"px";
                Accumulation += mixHeight+20;
            }
        }else if(DynamicBubbles.length >= 4){
            PullUpInfo.PullUpType = 3;

            for (let i = 0; i < DynamicBubbles.length; i++){
                let mixHeight = 0;

                if(DynamicBubbles[i].classList.contains("PageBubble")){
                    mixHeight = 240;
                }else if (DynamicBubbles[i].classList.contains("NotificationBubble")){
                    mixHeight = 120;
                }

                DynamicBubbles[i].getElementsByClassName("DynamicBubbleBottomBar")[0].innerText =
                    "選擇我！"

                DynamicBubbles[i].style.height = `${mixHeight}px`;
                DynamicBubbles[i].style.width = `${100 - Math.abs(i - MainIndex )*10}%`;

                if(100 - Math.abs(i - MainIndex )*10 > 40)
                    DynamicBubbles[i].style.opacity = "1";
                else
                    DynamicBubbles[i].style.opacity = "0";

            }


            //

            let LastMixHeight = 0;

            let Accumulation = 0;



            for (let i = MainIndex; i >= 0; i--){
                let mixHeight = 0;

                if(DynamicBubbles[i].classList.contains("PageBubble")){
                    mixHeight = 240;
                }else if (DynamicBubbles[i].classList.contains("NotificationBubble")){
                    mixHeight = 120;
                }

                Accumulation += 20 + LastMixHeight - LastMixHeight + mixHeight;
                DynamicBubbles[i].style.top = `${400 - Accumulation}px`

                LastMixHeight = mixHeight;

            }

            Accumulation = 0;
            LastMixHeight = 0;

            for (let i = MainIndex+1; i < DynamicBubbles.length; i++){
                let mixHeight = 0;

                if(DynamicBubbles[i].classList.contains("PageBubble")){
                    mixHeight = 240;
                }else if (DynamicBubbles[i].classList.contains("NotificationBubble")){
                    mixHeight = 120;
                }

                Accumulation += 30 + LastMixHeight;
                DynamicBubbles[i].style.top = `${400 + Accumulation}px`

                LastMixHeight = mixHeight;
            }
        }
    }

    function PullUpMainBubble(MainIndex){

        let ClickOnBubble = DynamicBubbles[MainIndex];

        PullUpInfo.MainPullUpIndex = MainIndex;

        ClickOnBubble.style.height = "calc(var(--fh,100vh) - 60px)";
        ClickOnBubble.style.top = "0";
        ClickOnBubble.style.opacity = "1";

        ClickOnBubble.getElementsByClassName("DynamicBubbleBottomBar")[0].innerText =
            "向下拖拉右上方的按鈕看看？"

        ClickOnBubble.getElementsByClassName("DynamicBubbleFrame")[0].style.overflowY = "auto";

        ClickOnBubble.getElementsByTagName("hr")[0].style.opacity = "1";


        setTimeout(async function(){
            ClickOnBubble.getElementsByClassName("DynamicBubbleControlBar")[0].style.opacity = "1";

            ClickOnBubble.getElementsByClassName("DynamicBubbleControlBar")[0].style.width = "28px";
            ClickOnBubble.getElementsByClassName("DynamicBubbleControlBar")[0].style.height = "28px";
            await sleep(120);
            ClickOnBubble.getElementsByClassName("DynamicBubbleControlBar")[0].style.opacity = "1";

            StartAtElement.getElementsByClassName("DynamicBubbleControlBarHandle")[0].style.transition = "all 120ms ease-out";
            ClickOnBubble.getElementsByClassName("DynamicBubbleControlBarHandle")[0].style.transform =
                `translate(-50%,-50%) rotateZ(19deg)`;

            await sleep(120);

            ClickOnBubble.getElementsByClassName("DynamicBubbleControlBarHandle")[0].style.transform =
                `translate(-50%,-50%) rotateZ(-12deg)`;

            await sleep(120);

            ClickOnBubble.getElementsByClassName("DynamicBubbleControlBarHandle")[0].style.transform =
                `translate(-50%,-50%) rotateZ(0deg)`;
        },110)



        for (let i = 0;i<DynamicBubbles.length;i++){
            if(i !== MainIndex){
                let mixHeight= 0;

                if(DynamicBubbles[i].classList.contains("PageBubble")){
                    mixHeight = 240;
                }else if (DynamicBubbles[i].classList.contains("NotificationBubble")){
                    mixHeight = 120;
                }

                DynamicBubbles[i].style.opacity = "0";
                DynamicBubbles[i].style.top = `-${mixHeight}px`;
            }
        }
    }

    async function ClearBubble(MainIndex){
        let toDel = DynamicBubbles[MainIndex];
        DynamicBubbles.splice(MainIndex,1);

        setTimeout(async function(){
            toDel.style.opacity = "0";
            toDel.style.height = "0";
            toDel.style.minHeight = "0";
            await sleep(210);
            toDel.remove();
        },120);



        resetPullUpInfo();
        await TidyUpDynamicBubbles();
        await PullUpDynamicBubbles(DynamicBubbles.length-1);
    }


    let startAt = 0;

    let mouseOnButtons = [];
    let mouseOnBubbles = [];
    let mouseOnControlBars = [];

    let StartAtElement;

    function getFinalElementWitchAtPoint(x,y){
        let FinalInfo = {
            "Button":0,
            "Bubble":0,
            "ControlBar":0,
            "Rotating":0,
        };

        let ElementsWitchAtPoint = document.elementsFromPoint(x,y);

        for (let i = 0; i < ElementsWitchAtPoint.length; i++) {
            if(retIfParentMatch(ElementsWitchAtPoint[i],"box",0).Parent) break;

            let CheckButton = retIfParentMatch(ElementsWitchAtPoint[i],0,"button");

            if(CheckButton.SearchTimes === 1) continue;

            if(CheckButton.Parent){
                FinalInfo.Button = CheckButton.Parent;
                break
            }

            let ControlBar = retIfParentMatch(ElementsWitchAtPoint[i],0,"DynamicBubbleControlBar");
            if(ControlBar.Parent){
                FinalInfo.ControlBar = ControlBar.Parent;
                break
            }



            let CheckBubble = retIfParentMatch(ElementsWitchAtPoint[i],0,"DynamicBubble");

            if(CheckBubble.Parent){
                FinalInfo.Bubble = CheckBubble.Parent;
                break
            }


        }

        if(
            !FinalInfo.Button &&
            !FinalInfo.Bubble &&
            !FinalInfo.Rotating &&
            !FinalInfo.ControlBar
        )
            FinalInfo.Rotating = true;


        return FinalInfo;
    }

    let ToStableValue = checkIfMobile() ? 3 : 5;


    let startMove = async function (x,y)
    {
        if(Locked) return;

        if(Date.now() - startAt < 160) return;

        StartAtElement = false;

        xStartScreen = x;
        yStartScreen = y;

        let FinalInfo = getFinalElementWitchAtPoint(x,y);

        startAt = Date.now();

        if(!Holding && !Pushing && !Pulling && !Controlling && FinalInfo.Rotating ){
            Holding = true;
            TweenUp(false);

            CubeInfo.XMoved = (x - xStartScreen)/ToStableValue + CubeInfo.LastXMoved;
            CubeInfo.YMoved = (-y +   yStartScreen)/ToStableValue + CubeInfo.LastYMoved;
        }else if(FinalInfo.Button && !Pushing){
            let FinalElement = FinalInfo.Button;

            if(mouseOnButtons[FinalElement.id]) return;

            StartAtElement = FinalElement;
            mouseOnButtons[FinalElement.id] = FinalElement;

            Pushing = true;

            FinalElement.style.fontSize = "0px";

            TweenUp(true);

            Cube.Buttons[Number(FinalElement.id)].depth = 6;

            FinalElement.getElementsByClassName("buttonBackSide")[0].style.boxShadow =
                "black 0 0 5px 1px"

            moving(CubeInfo.LastXMoved,CubeInfo.LastYMoved);
        } else if(FinalInfo.Bubble && !Pulling && PullUpInfo.MainPullUpIndex === false){

            FinalInfo.Bubble.style.backgroundColor = "rgba(236,236,236,0.9)";
            FinalInfo.Bubble.style.borderColor = "rgba(218,218,218,0.9)";
            FinalInfo.Bubble.style.boxShadow =  "0 0 40px 5px rgba(184, 184, 184, 1)";

            FinalInfo.Bubble.style.transform = "translateX(-50%) translateY(10px)";

            mouseOnBubbles[mouseOnBubbles.length] = StartAtElement = FinalInfo.Bubble;

            Pulling = true;
        }else if(FinalInfo.ControlBar && !Controlling && PullUpInfo.MainPullUpIndex !== false){
            mouseOnControlBars[mouseOnControlBars.length] = StartAtElement = FinalInfo.ControlBar;

            FinalInfo.ControlBar.style.width =
                FinalInfo.ControlBar.style.height =
                    "34px";

            Controlling = true;
        }
    }



    let ControlBarIsDraw = false;
    let LastSelectControlButtonIndex = false;

    let endMove = async function (x,y){
        if(Locked) return;

        let FinalInfo = getFinalElementWitchAtPoint(x,y);

        if(Holding){
            Holding = false;

            let totalMs = Date.now() - startAt;

            let toX =(CubeInfo.XMoved - CubeInfo.LastXMoved)/(totalMs/200);
            let toY = (CubeInfo.YMoved - CubeInfo.LastYMoved)/(totalMs/200);

            let dbX = (CubeInfo.XMoved - CubeInfo.LastXMoved) > 0;
            let dbY = (CubeInfo.YMoved - CubeInfo.LastYMoved) > 0;

            if(CubeInfo.LastDBX===dbX && CubeInfo.LastToX !== 0 && Math.abs(CubeInfo.LastToX) < Math.abs(toX)) toX += CubeInfo.LastToX;
            if(CubeInfo.LastDBY===dbY && CubeInfo.LastToY !==0 && Math.abs(CubeInfo.LastToY) < Math.abs(toY)) toY+=CubeInfo.LastToY;

            CubeInfo.LastToX = toX;
            CubeInfo.LastToY = toY;

            CubeInfo.LastDBX = dbX;
            CubeInfo.LastDBY = dbY;

            CubeInfo.LastXMoved = CubeInfo.XMoved;
            CubeInfo.LastYMoved = CubeInfo.YMoved;

            moving(CubeInfo.XMoved,CubeInfo.YMoved);

            for (let index = 0;;index++){

                if(dbX ? toX > 0 : toX < 0) toX= dbX ? toX-2 : toX+2; else toX = 0;
                if(dbY ? toY > 0 : toY < 0)  toY= dbY ? toY-2 : toY+2; else toY = 0;


                if(
                    ((dbX ? toX <= 0 : toX >= 0) && (dbY ? toY <= 0 : toY >= 0)) ||
                    Holding || Pushing
                ) break;

                await moving(CubeInfo.XMoved+toX/50,CubeInfo.YMoved+toY/50);

                CubeInfo.LastXMoved = CubeInfo.XMoved = CubeInfo.XMoved+toX/50;
                CubeInfo.LastYMoved = CubeInfo.YMoved = CubeInfo.YMoved+toY/50;

                await sleep(1);
            }

        }else if(Pushing){
            Pushing = false;

            let FinalElement = FinalInfo.Button;
            let ButtonInfo = Cube.Buttons[FinalElement.id];

            if(FinalElement === StartAtElement){
                for (let index in ButtonInfo.Event){

                    let Content = await loadData(ButtonInfo.Event[index]);
                    if(!Content) break;

                    switch (index){
                        case "Page":{
                            await CreateDynamicBubbles(
                                "Page",
                                Content
                            )
                            break;
                        }
                        case "Cube":{
                            Locked = 1;
                            TweenUp(true,0.3);

                            CubeInfo.LastXMoved = CubeInfo.XMoved = CubeInfo.XMoved - CubeInfo.XMoved%360 - 15 - 360;
                            CubeInfo.LastYMoved = CubeInfo.YMoved = - 10;


                            let TheCube = structuredClone(Content);
                            SummonCube(TheCube);
                            TweenUp(true,0.3);


                            for(let i = 0;i<buttonElements.length;i++){
                                buttonElements[i].style.opacity = "0";
                                FinalElement.style.fontSize = "0px";
                            }

                            for(let i = 0;i<Cube.Buttons.length;i++)
                                Cube.Buttons[i].depth = 0;
                            moving(CubeInfo.XMoved,CubeInfo.YMoved);


                            CubeSideSize = 50;
                            moving(CubeInfo.XMoved,CubeInfo.YMoved);

                            await sleep(370);

                            CubeSideSize = 270;
                            moving(CubeInfo.XMoved,CubeInfo.YMoved);

                            await sleep(300)

                            CubeSideSize = 220;
                            moving(CubeInfo.XMoved,CubeInfo.YMoved);

                            await sleep(300);

                            Cube.Buttons = structuredClone(Content.Buttons);

                            await sleep(100);
                            for(let i = 0;i<buttonElements.length;i++){
                                buttonElements[i].style.opacity = "1";
                                FinalElement.style.fontSize = "15px";
                            }
                            Cube.Buttons =  structuredClone(Content.Buttons);

                            moving(CubeInfo.XMoved,CubeInfo.YMoved);

                            await sleep(300);
                            TweenUp(false);

                            Locked = 0;
                            break;
                        }
                    }
                }

            }

        }else if(Pulling){
            Pulling = false;
            let ClickOnIndex = false;

            if(FinalInfo.Bubble){
                for(let i = 0;i<DynamicBubbles.length;i++)
                    if(DynamicBubbles[i] === FinalInfo.Bubble){
                        ClickOnIndex = i
                        break;
                    }

                if(ClickOnIndex === false) return;
            }


            if(PullUpInfo.MainPullUpIndex !== false){
                // if(yStartScreen - y  >= 100){
                //     await ClearBubble(PullUpInfo.MainPullUpIndex);
                // }
            }else if(FinalInfo.Bubble === StartAtElement){
                if(!PullUpInfo.PullUpType)
                    PullUpDynamicBubbles(ClickOnIndex);
                else if(PullUpInfo.PullUpType === 3)
                {
                    if(ClickOnIndex !== PullUpInfo.ChoseToPullUpIndex){
                        await PullUpDynamicBubbles(ClickOnIndex);
                    }else{
                        PullUpMainBubble(ClickOnIndex);
                    }
                }else if(PullUpInfo.PullUpType === 2){
                    PullUpDynamicBubbles(ClickOnIndex);
                    PullUpMainBubble(ClickOnIndex);
                }
            }
        }else if(Controlling && PullUpInfo.MainPullUpIndex !== false){
            Controlling = false;

            if(LastSelectControlButtonIndex !== false){
                switch (ControlButtons[LastSelectControlButtonIndex].Name){
                    case "回上一動":{
                        //nothing
                        break;

                    }
                    case "整理泡泡":{
                        await TidyUpDynamicBubbles();
                        await resetPullUpInfo();

                        break;
                    }
                    case "吹除泡泡":{
                        await ClearBubble(PullUpInfo.MainPullUpIndex);

                        break;
                    }
                    case "戳破泡泡":{
                        let len = DynamicBubbles.length;

                        for (let i = 0;i<len;i++){
                             ClearBubble(0);
                        }

                        break;
                    }
                }

                setTimeout(function (){
                    StartAtElement.style.overflow = "visible"
                    StartAtElement.getElementsByTagName("hr")[0].style.opacity = "1";
                },200)
                LastSelectControlButtonIndex = false;
            }
        }



        for (let i in mouseOnControlBars){
            if(!mouseOnControlBars[i]) continue;

            setTimeout(async function(){
                for (let index = 0; index < mouseOnControlBars[i].getElementsByTagName("div").length; index++) {
                    await sleep(20)

                    if(!mouseOnControlBars[i]) return;

                    mouseOnControlBars[i].getElementsByTagName("div")[index].style.opacity = "0";
                }
                mouseOnControlBars[i].style.transition = "";
                await sleep(10);

                mouseOnControlBars[i].style.width =
                    mouseOnControlBars[i].style.height =
                        "28px";

                mouseOnControlBars[i].getElementsByClassName("DynamicBubbleControlBarHandle")[0].style.transition =
                    "all 120ms ease"
                mouseOnControlBars[i].getElementsByClassName("DynamicBubbleControlBarHandle")[0].style.transform =
                    `translate(-50%,-50%) rotateZ(0deg)`

                mouseOnControlBars[i] = null;
            },0)
        }

        ControlBarIsDraw = false;


        for (let i in mouseOnButtons){
            if(!mouseOnButtons[i]) continue;
            if(!Cube.Buttons[Number(mouseOnButtons[i].id)]) continue;

            Cube.Buttons[Number(mouseOnButtons[i].id)].depth = 24;

            mouseOnButtons[i].style.fontSize = "15px";

            mouseOnButtons[i] .getElementsByClassName("buttonBackSide")[0].style.boxShadow =
                "black 0 0 10px 2px"

            moving(CubeInfo.LastXMoved,CubeInfo.LastYMoved);

            await sleep(100);



            mouseOnButtons[i] = null;
        }



        for (let i in mouseOnBubbles){
            if(!mouseOnBubbles[i]) continue;

            mouseOnBubbles[i].style.backgroundColor = "rgba(228, 228, 228, 0.7)";
            mouseOnBubbles[i].style.borderColor = "rgba(207, 207, 207, 0.7)";
            mouseOnBubbles[i].style.boxShadow =  "0 0 40px 5px rgba(198, 198, 198, 1)";

            mouseOnBubbles[i].style.transform = "translateX(-50%) translateY(0)";

            mouseOnBubbles[i] = null;
        }
    }



    let fingerMoving = async function(x,y){
        if(Locked) return;

        if(Holding){
            CubeInfo.XMoved = (x - xStartScreen)/ToStableValue + CubeInfo.LastXMoved;
            CubeInfo.YMoved = (-y +   yStartScreen)/ToStableValue + CubeInfo.LastYMoved;

            moving(CubeInfo.XMoved, CubeInfo.YMoved);
        }else if (Controlling){
            if(ControlBarIsDraw === false){
                if(y - yStartScreen >= 100){
                    StartAtElement.style.transition = "";

                    StartAtElement.style.width = "120px";
                    StartAtElement.style.height = `${ControlButtons.length*50}px`;

                    ControlBarIsDraw = true;

                    for (let index = 0; index < StartAtElement.getElementsByTagName("div").length; index++) {
                        await sleep(20)
                        StartAtElement.getElementsByTagName("div")[index].style.opacity = "1";
                    }
                }else{

                    StartAtElement.style.width = StartAtElement.style.height =
                        `${(y - yStartScreen > 0 ? (y - yStartScreen)*.2 : 0)+34}px`;

                    let MidRect = StartAtElement.getBoundingClientRect();

                    let tX = x - (MidRect.left + MidRect.width/2);
                    let tY = y - (MidRect.top + MidRect.height/2);

                    let tSlide = Math.sqrt(tX**2 + tY**2);

                    StartAtElement.getElementsByClassName("DynamicBubbleControlBarHandle")[0].style.transform =
                        `translate(-50%,-50%) rotateZ(${-(Math.asin(tX/tSlide) * 180/Math.PI)*0.8}deg)`
                    StartAtElement.getElementsByClassName("DynamicBubbleControlBarHandle")[0].style.transition = "none";
                }
            }


            if(ControlBarIsDraw)
            {
                StartAtElement.style.overflow = "hidden";

                let LeastPXToCursor = false;
                let finalButton = false;


                for (let index = 0; index < StartAtElement.getElementsByTagName("div").length; index++) {
                    let DOMReat = StartAtElement.getElementsByTagName("div")[index].getBoundingClientRect();

                    if(LeastPXToCursor===false) LeastPXToCursor = Math.abs(DOMReat.top + DOMReat.height/2 -y);

                    if(LeastPXToCursor >= Math.abs(DOMReat.top + DOMReat.height/2-y)){
                        LeastPXToCursor = Math.abs(DOMReat.top + DOMReat.height/2-y);
                        finalButton = StartAtElement.getElementsByTagName("div")[index];
                        LastSelectControlButtonIndex = index;
                    }
                }

                StartAtElement.getElementsByTagName("hr")[0].style.opacity = "0";

                for (let index = 0; index < StartAtElement.getElementsByTagName("div").length; index++) {
                    let thisElement = StartAtElement.getElementsByTagName("div")[index];
                    if(finalButton === StartAtElement.getElementsByTagName("div")[index]){
                        thisElement.style.color = "#ffffff";

                        if(ControlButtons[index]["IMPORTANT?"])
                            thisElement.style.background = "#bf3232e0"
                        else
                            thisElement.style.background = "#393939e0";

                    }else{
                        if(ControlButtons[index]["IMPORTANT?"])
                            thisElement.style.color = "#bf3232"
                        else
                            thisElement.style.color = "#393939";

                        thisElement.style.background = "";
                    }
                }
            }else{
                StartAtElement.style.overflow = "visible";
            }
        }

    }

    if(checkIfMobile()) {
        document.addEventListener("touchend", function (m ){
            if(m.changedTouches.length > 1) return;
            endMove(m.changedTouches[0].clientX,m.changedTouches[0].clientY);
        })
        document.addEventListener("touchstart", function (m) {
            if(m.touches.length > 1) return;
            startMove(m.touches[0].clientX,m.touches[0].clientY);
        });
        document.addEventListener("touchmove", function (m) {
            if(m.touches.length > 1) return;
            fingerMoving(m.touches[0].clientX,m.touches[0].clientY);
        });
    }
    else {
        document.addEventListener("mouseup", function (m ){
            endMove(m.clientX,m.clientY);
        });
        document.addEventListener("mousedown", function (m) {
            startMove(m.clientX,m.clientY);
        });
        document.addEventListener("mousemove", function (m) {


            fingerMoving(m.clientX,m.clientY);
        });
        let Accumulation = 0;
        document.addEventListener("wheel",function (m){
            if(PullUpInfo.MainPullUpIndex === false && PullUpInfo.PullUpType === 3){
                Accumulation += m.deltaY;

                if(Math.abs(Accumulation)>= 100){

                    let index = PullUpInfo.ChoseToPullUpIndex + (Accumulation>0 ? 1 : -1);

                    Accumulation = 0;

                    if(index >= 0 && index<DynamicBubbles.length){
                        PullUpDynamicBubbles(index);
                    }
                }
            }
        })
    }
    function retIfParentMatch(e,id,cname,info){
        if(!info)
            info = {
                "SearchTimes":0,
                "Parent":0,
            };

        if (!e.parentElement) return info;

        info.SearchTimes++;

        if(id){
            if(e ? (e.id === id) : false){
                info.Parent = e;
                return info;
            }else{
                return retIfParentMatch(e.parentElement, id,cname,info);
            }
        }else{
            if(e ? (e.classList.contains(cname)) : false){
                info.Parent = e;
                return info;
            }else{
                return retIfParentMatch(e.parentElement, id,cname,info);
            }
        }

    }

    let waitUntilLoad = function (){
        return new Promise(function (resolve, reject) {
            HTTPService.addEventListener("loadend",function (){
                resolve(HTTPService.response);
            })
            HTTPService.addEventListener("error", (err) => {
                reject(err);
            });
        });
    }

    async function loadData(Path){
        let Content = null;

        try {
            HTTPService.open("GET",Path);
            HTTPService.send();
            Content = JSON.parse(await waitUntilLoad());
        } catch (err) {
             await CreateDynamicBubbles(
                "Notification",
                [
                    {
                        "Title": "好噁心的錯誤",
                        "Content": `你...你...做了什麼？？竟然導致我的寶貝出現錯誤！... 噓！我聽到他奄奄一息的氣聲：「${err}」`
                    },
                    {
                        "Content": "我們做個交易，要是你能將他說的那句話告訴 me@hxx.lol，這件事我們就當作沒發生過。哼！(還請多多見諒！)"
                    }
                ]
            );
        }

        return Content;
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
    //
    //
    //
    //
    //
    //
    //
    //
    //### START AT HERE ###
    TweenUp(true,.14);
    moving(0,0);

    let defaultCube = await loadData("./cube/Default.JSON");
    SummonCube(defaultCube);

    for(let i = 0;i<Cube.Buttons.length;i++)
        Cube.Buttons[i].depth = 0;

    for (let i = 0;i<buttonElements.length;i++)
    {
        buttonElements[i].style.fontSize = "0px";
        buttonElements[i].style.opacity = "0";
    }

    moving(CubeInfo.XMoved, CubeInfo.YMoved);
    TweenUp(true,.14);

    await sleep(740)

    await sleep(300);
    moving(0,-10);
    await sleep(340);
    moving(-15,-10);

    moving(-15,-10);
    CubeInfo.XMoved = -15;
    CubeInfo.YMoved = -10;

    await sleep(100);

    Locked = 1;


    TweenUp(true,.4);




    await sleep(120);

    Cube.Buttons = structuredClone(defaultCube.Buttons);

    for (let i = 0;i<buttonElements.length;i++){
        buttonElements[i].style.fontSize = "15px";
        buttonElements[i].style.opacity = "1";
    }

    moving(CubeInfo.XMoved, CubeInfo.YMoved);

    await sleep(200);

    TweenUp(true,.1);

    for (let i = 0; i < 4; i++){
        moving(-90*(i+1) - 15,-10);
        await sleep(100);
    }


    CubeInfo.LastXMoved = CubeInfo.XMoved =  -375;
    CubeInfo.LastYMoved = CubeInfo.YMoved = -10;


    await sleep(240);

    TweenUp(false);


    await CreateDynamicBubbles("Notification",[
        {
            "Title":"你是誰？！",
            "Content":"歡迎來到Hxx的Weblog，這裡存著Hxx很唐的...東西。"
        },
        {
            "Content":"眼前的方塊是這網站的核心，方塊上有許多按鈕，你可以轉動方塊選擇你想按的按鈕。按鈕裡面有...這是秘密，不跟你講。:-S"
        },
        {
            "Content":"而你在閱讀的這東西叫做Dynamic Bubble ，動態泡泡，是不是特別動態，特別動感(▀̿Ĺ̯▀̿ ̿)"
        },
        {
            "Content":"喔對了，看到右上角的把手了嗎？向下拉他就「有機會」帶你離開這顆泡泡喔。 (不是百分百的原因是我怕你不知道怎麼用ww)"
        },
        {
            "Content":"還有丫，蘇東坡沒有講過這句話：蘇波哀東的笑容。"
        }
    ])

    Locked = 0;
});

