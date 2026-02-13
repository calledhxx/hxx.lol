let CubeSideSize = 220;
let HTTPService = new XMLHttpRequest();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function checkIfMobile() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
}; //i forgot wheres it from,but... oh it's https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser

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

let Cube = {};

const ControlButtons = [
    {
        "Name":"回上一動",
        "IMPORTANT?":false //我也是腦袋破洞才會這樣設計
    },
    {
        "Name":"整理泡泡",
        "IMPORTANT?":false
    },
    {
        "Name":"消滅泡泡",
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
}

let DynamicBubbles = [];
let BubbleFunctions = {};

let FunctionButtons = {};

function setView(){

    let height = window.innerHeight;
    let width =  window.innerWidth;

    document.documentElement.style.setProperty('--fh', `${height}px`);
    document.documentElement.style.setProperty('--fw', `${width}px`);
}
window.addEventListener("resize",function (){
    setView();

    if(checkIfMobile() !== useTouchPad) location.reload();
});

let CubePath = [];

let useTouchPad = checkIfMobile();

let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";

let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let CurrentVideo = null;


document.addEventListener("DOMContentLoaded",  async function () {
    setView();


    let ModuleFunction = {
        "Music-Next": async function (){
            if(!CurrentVideo) return;

            CurrentVideo.nextVideo();
        },
        "Music-Last": async function (){
            if(!CurrentVideo) return;

            CurrentVideo.previousVideo();
        },
        "Music-PlayAndPause": async function (){
            if(!CurrentVideo) return;

            switch (CurrentVideo.getPlayerState()){
                case YT.PlayerState.PAUSED:
                case YT.PlayerState.ENDED:
                case YT.PlayerState.CUED:
                    CurrentVideo.playVideo(); break;

                case YT.PlayerState.PLAYING:
                    CurrentVideo.pauseVideo(); break;
            }
        },
        "Music-JumpToYoutube": async function (){
            if(!CurrentVideo) return;

            window.open(CurrentVideo.getVideoUrl(), "_blank");
        },
        "Music-GiveControl": async function (){
            if(CurrentVideo === null){
                let Content = await loadData("./function/Music.JSON");
                if(!Content) return;

                setTimeout(async function (){
                    await CreateDynamicBubbles(
                        "Function",
                        Content
                    )});
            }
        },
    }

    let xStartScreen = 0,yStartScreen = 0;

    let Holding = 0;
    let Pushing = 0;
    let Pulling = 0;
    let Controlling = 0;
    let Dragging = 0;
    let Viewing = 0; //當初是吃錯藥還是怎樣？

    let Locked = 1;

    let cubeElement = document.getElementById('cube');
    let cubeSkin = "cube";

    let buttonElements = [];
    
    function SummonCube(CubeData,SavePath){

        DeleteButtons();

        if(SavePath) CubePath[CubePath.length] = structuredClone(CubeData);
        Cube = structuredClone(CubeData);

        CreateButtons(structuredClone(CubeData));
    }

    async function ShowCube(Content,SavePath){
        Locked = 1;
        TweenUp(true,0.3);

        CubeInfo.LastXMoved = CubeInfo.XMoved =
            CubeInfo.XMoved - CubeInfo.XMoved%360 - 15 -
            ((Math.abs(CubeInfo.XMoved)%360 < 180) ? 360 : 720);
        CubeInfo.LastYMoved = CubeInfo.YMoved =
            CubeInfo.YMoved - CubeInfo.YMoved%360 + 10;


        let TheCube = structuredClone(Content);
        SummonCube(TheCube,SavePath);
        TweenUp(true,0.3);


        for(let i = 0;i<buttonElements.length;i++){
            buttonElements[i].style.opacity = "0";
            buttonElements[i].style.fontSize = "0px";
        }

        for(let i = 0;i<Cube.Buttons.length;i++)
            Cube.Buttons[i].depth = 0;
        moving(CubeInfo.XMoved,CubeInfo.YMoved);

        CubeSideSize = 50;
        moving(CubeInfo.XMoved,CubeInfo.YMoved);

        cubeElement.style.opacity = "0";

        await sleep(185);

        TweenUp(false);

        cubeSkin = Content.Skin;
        cubeElement = document.getElementById(cubeSkin);

        moving(CubeInfo.XMoved,CubeInfo.YMoved);

        cubeElement.style.opacity = "1";

        TweenUp(true,0.3);

        await sleep(185);

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
            buttonElements[i].style.fontSize = "15px";
        }
        Cube.Buttons =  structuredClone(Content.Buttons);

        moving(CubeInfo.XMoved,CubeInfo.YMoved);

        await sleep(300);
        TweenUp(false);

        Locked = 0;

        if(Content.Module)
            ModuleFunction[Content.Module]();

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

    function CreateButtons(Cube){
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
                frontIcon.style.borderColor = "#"+hex(Cube.Buttons[i].Color,"404040",-1);
                frontIcon.src = Cube.Buttons[i].Icon;
                frontMain.appendChild(frontIcon);
            }
            else
            {
                let frontTitle = document.createElement("h1");
                frontTitle.style.borderColor = "#"+hex(Cube.Buttons[i].Color,"404040",-1);
                frontTitle.textContent = Cube.Buttons[i].Name.substring(0, 1);
                frontMain.appendChild(frontTitle);
            }


            frontMain.style.borderColor = "#"+hex(Cube.Buttons[i].Color,"252525",-1);
            frontMain.style.backgroundColor = "#"+hex(Cube.Buttons[i].Color,"181818",-1);

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

            newOne.style.color = "#"+hex(Cube.Buttons[i].Color,"1A1A1A",1);

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
        if(PullUpInfo.MainPullUpIndex!==false)
            DynamicBubbles[PullUpInfo.MainPullUpIndex].classList.remove("SearchableBubble");

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

        for(let i = 0; i < DynamicBubbles.length; i++){
            DynamicBubbles[i].style.height = "0";
            DynamicBubbles[i].style.filter = ``;
            DynamicBubbles[i].style.transform = "translateX(-50%) translateY(0)"
            DynamicBubbles[i].style.top = `0`;
            DynamicBubbles[i].getElementsByClassName("DynamicBubbleControlBar")[0].style.opacity = "0";
            DynamicBubbles[i].getElementsByClassName("DynamicBubbleControlBar")[0].style.height = "0";
            DynamicBubbles[i].getElementsByClassName("DynamicBubbleControlBar")[0].style.width = "0";
            DynamicBubbles[i].getElementsByClassName("DynamicBubbleFrame")[0].style.overflowY =
                "hidden";
        }

        for (let i = DynamicBubbles.length-1; i > DynamicBubbles.length-5; i--) {
            if(!DynamicBubbles[i]) continue;
            DynamicBubbles[i].style.top = `${8 * (DynamicBubbles.length-1-i)}px`;
            DynamicBubbles[i].style.width = `${100 - 5 * (DynamicBubbles.length-1-i)}%`;
            DynamicBubbles[i].style.opacity = `${1 - 0.25*(DynamicBubbles.length-1-i)}`;


            if(DynamicBubbles.length === 1){
                DynamicBubbles[i].getElementsByClassName("DynamicBubbleBottomBar")[0].innerHTML =
                    "點擊泡泡以閱覽全文"
            }else{
                DynamicBubbles[i].getElementsByClassName("DynamicBubbleBottomBar")[0].innerHTML =
                    "點擊並選取閱讀項目"
            }


            if(i !== DynamicBubbles.length-1){
                DynamicBubbles[i].style.height = "120px";
            }else{
                if(DynamicBubbles[i].classList.contains("NotificationBubble"))
                    DynamicBubbles[i].style.height = "160px";
                else if(DynamicBubbles[i].classList.contains("PageBubble"))
                    DynamicBubbles[i].style.height = "330px";
                else if(DynamicBubbles[i].classList.contains("FunctionBubble"))
                    DynamicBubbles[i].style.height = "360px";
            }
        }

    }

    function TweenUp(db,smoothSec){
        smoothSec = smoothSec ? smoothSec : 0.1;

        cubeElement.style.transition = db ?`all ${smoothSec}s ease` : "";

        for (let i = 0; i < cubeElement.children.length; i++)
            cubeElement.children[i].style.transition = cubeElement.style.transition;

        for (let i = 0;i<buttonElements.length; i++){
            buttonElements[i].style.transition = cubeElement.getElementsByClassName("passZFront")[0].style.transition;
            for (let j = 0; j<buttonElements[i].children.length; j++) {
                buttonElements[i].children[j].style.transition = cubeElement.getElementsByClassName("passZFront")[0].style.transition;
                for (let  c= 0; c<buttonElements[i].children[j].children.length; c++)
                    buttonElements[i].children[j].children[c].style.transition = cubeElement.getElementsByClassName("passZFront")[0].style.transition;

            }
        }
    }

    function moving(x, y) {
        y = -y;//ive nothing to say...
        let x360Moved = (x%360);
        let y360Moved = (y%360);

        let toFZDeg = (Math.abs(x360Moved)>180) ? 180-(Math.abs(x360Moved)-180) : Math.abs(x360Moved);
        let toFXDeg =
            (Math.abs((x-90)%360)>180) ? 180-(Math.abs((x-90)%360)-180) : Math.abs((x-90)%360);
        let toFYDeg =
            (Math.abs((y-90)%360)>180) ? 180-(Math.abs((y-90)%360)-180) : Math.abs((y-90)%360);
        let YtoFXnFZDeg =
            (Math.abs(y360Moved)>180) ? 180-(Math.abs(y360Moved)-180) : Math.abs(y360Moved);

        let toFXDegForMB =
            (Math.abs((x-90+45+10)%360)>180) ? 180-(Math.abs((x-90+45+10)%360)-180) : Math.abs((x-90+45+10)%360);

        if(cubeSkin === "musicBox")
            if(toFYDeg < 90){
                if(toFXDegForMB < 90){
                    cubeElement.getElementsByClassName("cdCarrier")[0].style.zIndex = "4";
                    cubeElement.getElementsByClassName("column1Carrier")[0].style.zIndex = "1";
                    cubeElement.getElementsByClassName("column2Carrier")[0].style.zIndex = "2";
                    cubeElement.getElementsByClassName("column3Carrier")[0].style.zIndex = "3";
                }else{
                    cubeElement.getElementsByClassName("cdCarrier")[0].style.zIndex = "3";
                    cubeElement.getElementsByClassName("column1Carrier")[0].style.zIndex = "4";
                    cubeElement.getElementsByClassName("column2Carrier")[0].style.zIndex = "2";
                    cubeElement.getElementsByClassName("column3Carrier")[0].style.zIndex = "1";
                }
            }else{
                if(toFXDegForMB < 90){
                    cubeElement.getElementsByClassName("cdCarrier")[0].style.zIndex = "1";
                    cubeElement.getElementsByClassName("column1Carrier")[0].style.zIndex = "0";
                    cubeElement.getElementsByClassName("column2Carrier")[0].style.zIndex = "4";
                    cubeElement.getElementsByClassName("column3Carrier")[0].style.zIndex = "3";
                }else{
                    cubeElement.getElementsByClassName("cdCarrier")[0].style.zIndex = "1";
                    cubeElement.getElementsByClassName("column1Carrier")[0].style.zIndex = "4";
                    cubeElement.getElementsByClassName("column2Carrier")[0].style.zIndex = "3";
                    cubeElement.getElementsByClassName("column3Carrier")[0].style.zIndex = "2";
                }
            }

        let FVisible = false,RVisible = false,LVisible = false,TVisible = false,BVisible = false,BackVisible = false;

        for(let i = 0;i<document.getElementsByClassName("pass").length;i++)
            document.getElementsByClassName("pass")[i].style.width =
                document.getElementsByClassName("pass")[i].style.height =
                    CubeSideSize+"px"

        cubeElement.style.width =
            cubeElement.style.height =
                CubeSideSize+"px"

        cubeElement.getElementsByClassName("passZFront")[0].style.transform =
            `rotateX(${0+y}deg) rotateY(${180+x}deg) translateX(0) translateY(0) translateZ(-${(CubeSideSize/2)}px)`


        cubeElement.getElementsByClassName("passZBack")[0].style.transform =
            `rotateX(${0+y}deg) rotateY(${0+x}deg) translateX(0) translateY(0) translateZ(-${(CubeSideSize/2)}px)`


        if(
            YtoFXnFZDeg < 90 ? toFZDeg < 90 : toFZDeg > 90
        ){
            cubeElement.getElementsByClassName("passZFront")[0].style.opacity = "1";
            cubeElement.getElementsByClassName("passZBack")[0].style.opacity = "0";
            FVisible = true;
            BackVisible = false;
        }else {
            cubeElement.getElementsByClassName("passZFront")[0].style.opacity = "0";
            cubeElement.getElementsByClassName("passZBack")[0].style.opacity = "1";
            FVisible = false;
            BackVisible = true;
        }


        cubeElement.getElementsByClassName("passXFront")[0].style.transform =
            `rotateX(${0+y}deg) rotateY(${90+x}deg) translateX(0) translateY(0) translateZ(-${(CubeSideSize/2)}px)`


        cubeElement.getElementsByClassName("passXBack")[0].style.transform =
            `rotateX(${0+y}deg) rotateY(${270+x}deg) translateX(0) translateY(0) translateZ(-${(CubeSideSize/2)}px)`

        if(cubeSkin === "musicBox"){
            cubeElement.getElementsByClassName("column1Carrier")[0].style.transform =
                `rotateX(${0+y}deg) rotateY(${315+10+x}deg) translateX(0) translateY(0) translateZ(-${(CubeSideSize/2)}px)`

            cubeElement.getElementsByClassName("column3Carrier")[0].style.transform =
                `rotateX(${0+y}deg) rotateY(${315+10+x}deg) translateX(0) translateY(-20px) translateZ(45px)`
        }

        if(
            YtoFXnFZDeg < 90 ? toFXDeg < 90 : toFXDeg > 90
        ){
            cubeElement.getElementsByClassName("passXFront")[0].style.opacity = "1";
            cubeElement.getElementsByClassName("passXBack")[0].style.opacity = "0";
            LVisible = true;
            RVisible = false;
        }else {
            cubeElement.getElementsByClassName("passXFront")[0].style.opacity = "0";
            cubeElement.getElementsByClassName("passXBack")[0].style.opacity = "1";
            LVisible = false;
            RVisible = true;
        }

        cubeElement.getElementsByClassName("passYFront")[0].style.transform =
            `rotateX(${90+y}deg) rotateZ(${0-x}deg) translateX(0) translateY(0) translateZ(-${(CubeSideSize/2)}px`

        if(cubeSkin === "cube"){
            cubeElement.getElementsByClassName("passYBack")[0].style.transform =
                `rotateX(${270+y}deg) rotateZ(${0+x}deg) translateX(0) translateY(0) translateZ(-${(CubeSideSize/2)}px)`
        }else if(cubeSkin === "musicBox"){
            cubeElement.getElementsByClassName("passYBack")[0].style.transform =
                `rotateX(${270+y}deg) rotateZ(${0+x}deg) translateX(0) translateY(0) translateZ(0)`

            cubeElement.getElementsByClassName("cdCarrier")[0].style.transform =
                `rotateX(${270+y}deg) rotateZ(${0+x}deg) translateX(0) translateY(0) translateZ(-20px)`

            cubeElement.getElementsByClassName("column2Carrier")[0].style.transform =
                `rotateX(${270+y}deg) rotateZ(${135+180+10+x}deg) translateX(0) translateY(0) translateZ(-40px)`
        }


        if(
            toFYDeg < 90
        ){
            cubeElement.getElementsByClassName("passYFront")[0].style.opacity = "1";
            cubeElement.getElementsByClassName("passYBack")[0].style.opacity = "0";

            BVisible = true;
            TVisible = false;
        }else {
            cubeElement.getElementsByClassName("passYFront")[0].style.opacity = "0";
            cubeElement.getElementsByClassName("passYBack")[0].style.opacity = "1";

            BVisible = false;
            TVisible = true;
        }

        let iai = (a)=>a?Number(a):0;

        if(toFYDeg < 90){
            cubeElement.getElementsByClassName("passZFront")[0].style.zIndex =
                cubeElement.getElementsByClassName("passZBack")[0].style.zIndex =
                    cubeElement.getElementsByClassName("passYFront")[0].style.zIndex =
                        cubeElement.getElementsByClassName("passYBack")[0].style.zIndex =
                            cubeElement.getElementsByClassName("passXFront")[0].style.zIndex =
                                cubeElement.getElementsByClassName("passXBack")[0].style.zIndex =
                                    "5";
        }else{
            cubeElement.getElementsByClassName("passZFront")[0].style.zIndex =
                cubeElement.getElementsByClassName("passZBack")[0].style.zIndex =
                    cubeElement.getElementsByClassName("passYFront")[0].style.zIndex =
                        cubeElement.getElementsByClassName("passYBack")[0].style.zIndex =
                            cubeElement.getElementsByClassName("passXFront")[0].style.zIndex =
                                cubeElement.getElementsByClassName("passXBack")[0].style.zIndex =
                                    "0";
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
                        buttonElements[i].getElementsByClassName("buttonRightSide")[0].children[0].style.width =
                            String(Cube.Buttons[i].depth)+"px";


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
                Cube.Buttons[i].Side < 5 ? `rotateX(${(y)}deg) rotateY(${(x)}deg) translateX(${(addX)}px) translateY(${(addY)}px) translateZ(${(-addZ+Cube.Buttons[i].depth/2)}px)`
                    : `rotateX(${(y)}deg) rotateZ(${((Cube.Buttons[i].Side === 6 ? -1 : 1 )*(-x))}deg) translateX(${(addX)}px) translateY(${(addY)}px) translateZ(${(-addZ+Cube.Buttons[i].depth/2)}px)`

            buttonElements[i].getElementsByClassName("buttonBackSide")[0].style.transform =
                Cube.Buttons[i].Side < 5 ? `rotateX(${(y)}deg) rotateY(${(x+180)}deg) translateX(${(-addX)}px) translateY(${(addY)}px) translateZ(${(addZ+Cube.Buttons[i].depth/2)}px)`
                    : `rotateX(${(y+180)}deg) rotateZ(${((Cube.Buttons[i].Side === 6 ? -1 : 1 )*(x+180))}deg) translateX(${(-addX)}px) translateY(${(addY)}px) translateZ(${((addZ+Cube.Buttons[i].depth/2))}px)`
            ;

            buttonElements[i].getElementsByClassName("buttonRightSide")[0].style.transform =
                Cube.Buttons[i].Side < 5 ? `rotateX(${y}deg) rotateY(${x+90}deg) translateX(${(addZ)}px) translateY(${(addY)}px) translateZ(${(addX+CubeSideSize * 4/11/2)}px)`
                    : (`rotateX(${(Cube.Buttons[i].Side === 6 ? -1 : 1 )*(y+90)}deg) rotateY(${(-x-270)}deg) rotateZ(${(Cube.Buttons[i].Side === 6 ? 1 : 1 )*270}deg) translateX(${(addZ)}px)  translateY(${addY * (Cube.Buttons[i].Side === 6 ? -1 : 1)}px) translateZ(${(addX+CubeSideSize * 4/11/2)}px) `
                        + (Cube.Buttons[i].Side === 6 ? "scaleY(-1)" :""));


            buttonElements[i].getElementsByClassName("buttonLeftSide")[0].style.transform =
                Cube.Buttons[i].Side < 5  ? `rotateX(${y}deg) rotateY(${x-90}deg) translateX(${(-addZ)}px) translateY(${(addY)}px) translateZ(${(-addX + CubeSideSize * 4/11/2)}px)`
                    : (`rotateX(${(Cube.Buttons[i].Side === 6 ? -1 : 1 )*(y+90)}deg) rotateY(${-x-90 }deg) rotateZ(${(Cube.Buttons[i].Side === 6 ? 1 : 1 )*90}deg) translateX(${(-addZ)}px)  translateY(${addY * (Cube.Buttons[i].Side === 6 ? -1 : 1)}px) translateZ(${(-addX + CubeSideSize * 4/11/2 )}px)`
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
                Cube.Buttons[i].Side < 5 ? `rotateX(${y+90}deg) rotateZ(${-x}deg) translateX(${(addX)}px) translateY(${(-addZ)}px) translateZ(${(-addY+CubeSideSize * 4/11/2)}px)`
                    :`rotateX(${(Cube.Buttons[i].Side === 6 ? -1 : 1 )*(y+90)}deg) rotateY(${-x}deg)  translateX(${(addX)}px) translateY(${(-addZ)}px) translateZ(${((Cube.Buttons[i].Side === 6 ? -1 : 1 )*(-addY+CubeSideSize * 4/11/2))}px)`;

            buttonElements[i].getElementsByClassName("buttonBottomSide")[0].style.transform =
                Cube.Buttons[i].Side < 5 ? `rotateX(${y-90}deg) rotateZ(${x}deg) translateX(${(addX)}px) translateY(${(addZ)}px) translateZ(${(addY+CubeSideSize * 4/11/2)}px)`
                    :`rotateX(${(Cube.Buttons[i].Side === 6 ? -1 : 1 )*(y-90)}deg) rotateY(${x}deg)  translateX(${(addX)}px) translateY(${(addZ)}px) translateZ(${((Cube.Buttons[i].Side === 6 ? -1 : 1 )*(addY+CubeSideSize * 4/11/2))}px)`;

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
        await TidyUpDynamicBubbles();
        // resetPullUpInfo(); TidyUpDynamicBubbles有了 ( 以防我忘記

        let Base = document.getElementById("DynamicBubbleBase");

        let TheDate = performance.now().toString();
        let newBubble = document.createElement("div");
        newBubble.classList.add("DynamicBubble");
        newBubble.id = TheDate;

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
        newBubble.style.top = "-300px";

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
                        newBubble.style.height = "160px";
                    }
                },280);
                break;
            }
            case "Page":{
                newBubbleTypeTitle.innerText = "A Page";

                setTimeout(async function(){
                    newBubble.classList.add("PageBubble");

                    if(myIndex === DynamicBubbles.length-1){
                        newBubble.style.height = "330px";
                    }
                },280);
                break;
            }
            case "Function":{
                newBubbleTypeTitle.innerText = "A Function";

                setTimeout(async function(){
                    newBubble.classList.add("FunctionBubble");

                    if(myIndex === DynamicBubbles.length-1){
                        newBubble.style.height = "360px";
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

        let MusicPlayer = null;

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

                    case"Button":{
                        newDOM = document.createElement("div");
                        let button = document.createElement("div");
                        button.classList.add("DynamicBubbleFrameButton");
                        let buttonDate = performance.now().toString();
                        button.id = buttonDate;
                        button.innerText = Content[SectionIndex][index].Text;
                        newDOM.appendChild(button);
                        newDOM.classList.add("DynamicBubbleFrameButtonCase");

                        FunctionButtons[buttonDate] = Content[SectionIndex][index].Module;

                        await sleep(1);
                        break;
                    }


                    case"Photos":{
                        newDOM = document.createElement("div");
                        newDOM.classList.add("DynamicBubbleFramePhotosCaseCarrier");

                        for (let PhotoIndex in Content[SectionIndex][index]){
                            let Case =  document.createElement("div");
                            Case.classList.add("DynamicBubbleFramePhotoCase");

                            let Photo =  document.createElement("div");
                            Photo.classList.add("DynamicBubbleFramePhoto");

                            let Img =  document.createElement("Img");
                            Img.classList.add("DynamicBubbleFramePhotoImage");
                            Img.src = Content[SectionIndex][index][PhotoIndex].Photo;

                            let Title =  document.createElement("h1");
                            Title.classList.add("DynamicBubbleFramePhotoTitle");
                            Title.innerText = Content[SectionIndex][index][PhotoIndex].Title;

                            let Captain =  document.createElement("h6");
                            Captain.classList.add("DynamicBubbleFramePhotoCaptain");
                            Captain.innerText = Content[SectionIndex][index][PhotoIndex].Captain;


                            newDOM.appendChild(Case);
                            Case.appendChild(Photo);
                            Photo.appendChild(Img);
                            Photo.appendChild(Title);
                            Photo.appendChild(Captain);
                        }

                        break;
                    }

                    case"Music":{
                        newDOM = document.createElement("div");
                        newDOM.classList.add("DynamicBubbleFrameMusicPlayerMedia");

                        let Glass =  document.createElement("div");
                        Glass.classList.add("DynamicBubbleFrameMusicPlayerGlass");

                        let PlayerCase =  document.createElement("div");
                        PlayerCase.classList.add("DynamicBubbleFrameMusicPlayerCase");

                        let Player =  document.createElement("div");
                        Player.classList.add("DynamicBubbleFrameMusicPlayer");
                        MusicPlayer = Player;

                        newDOM.appendChild(Glass);
                        newDOM.appendChild(PlayerCase);
                        PlayerCase.appendChild(Player);

                        BubbleFunctions[newBubble.id] = {
                            "close":function(){
                                CurrentVideo.destroy();
                                CurrentVideo = null;

                                if(CubePath[CubePath.length - 1].Tag === "Music"){
                                    CubePath.splice(CubePath.length-1, 1);
                                    let backTo = structuredClone(CubePath[CubePath.length-1]);

                                    ShowCube(backTo,false)
                                }
                            }
                        }

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

        if(MusicPlayer && CurrentVideo === null)
            CurrentVideo = new YT.Player(MusicPlayer, {
                height: '570',
                width: '570',
                playerVars: {
                    listType: 'playlist',
                    list: 'PL3PTi1UZlseqiFJFtYMe2KrYlj36dXffn',
                    controls: 0,
                    playsinline: 1
                },
            });

        await sleep(1);
        await TidyUpDynamicBubbles();
    };

    function getHeightOfDynamicBubble(Bubble){
        let result = 0;

        if (Bubble.classList.contains("PageBubble"))
            result = 240;
        else if (Bubble.classList.contains("NotificationBubble"))
            result = 155;
        else if (Bubble.classList.contains("FunctionBubble"))
            result = 300;

        return result;
    }

    function PullUpDynamicBubbles(MainIndex){
        PullUpInfo.ChoseToPullUpIndex = MainIndex;

        if(DynamicBubbles.length === 1){
            PullUpInfo.PullUpType = 1;
            PullUpMainBubble(MainIndex);
        }else if(DynamicBubbles.length <= 3){
            PullUpInfo.PullUpType = 2;

            let Accumulation = 0;

            for (let i = 0; i < DynamicBubbles.length; i++){
                let mixHeight = getHeightOfDynamicBubble(DynamicBubbles[i]);

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
                let absIndex = Math.abs(i - MainIndex);

                if(absIndex < 4)
                {
                    if(absIndex)
                        DynamicBubbles[i].style.opacity = String((8 - absIndex) / 8);
                    else
                        DynamicBubbles[i].style.opacity = "1";

                    DynamicBubbles[i].style.filter = `blur(${(absIndex)}px)`;


                    DynamicBubbles[i].getElementsByClassName("DynamicBubbleBottomBar")[0].innerText =
                        "選擇我？"

                    DynamicBubbles[i].style.width = `${100 - absIndex*10 * absIndex/4}%`;
                    DynamicBubbles[i].style.height = `${getHeightOfDynamicBubble(DynamicBubbles[i])}px`;
                }
                else
                {
                    DynamicBubbles[i].getElementsByClassName("DynamicBubbleBottomBar")[0].innerText =
                        "選擇我？"

                    DynamicBubbles[i].style.width = "0";
                    DynamicBubbles[i].style.height = "0";
                    DynamicBubbles[i].style.opacity = "0";
                    DynamicBubbles[i].style.filter = `blur(5px)`;
                }

            }

            DynamicBubbles[MainIndex].getElementsByClassName("DynamicBubbleBottomBar")[0].innerText =
                "再點擊一次以閱覽泡泡"

            const Horizontal = 200;

            setTimeout( function (){
                let Accumulation = 0;

                for (let i = MainIndex - 1; i >= 0; i--){
                    let absIndex = Math.abs(MainIndex - i);

                    if(absIndex >= 4)
                        break;

                    let mixHeight = getHeightOfDynamicBubble(DynamicBubbles[i]);

                    mixHeight *= Math.cos(absIndex * 90/4 * Math.PI / 180);

                    const pizzaC = Math.sin((absIndex * 90/4/2) * Math.PI / 180)*160*2;
                    const cosB = Math.cos((90 - (180 - (absIndex * 90/4))/2) * Math.PI / 180);
                    const freeSpace = (pizzaC * cosB);

                    DynamicBubbles[i].style.transform = `translateX(-50%) rotateX(${absIndex * 90/4}deg)`;

                    Accumulation += mixHeight;
                    DynamicBubbles[i].style.top = `${Horizontal - Accumulation - freeSpace}px`;

                }
            });


            setTimeout( function (){
                let Accumulation = 0;

                let LastMixHeight = 0;

                for (let i = MainIndex; i < DynamicBubbles.length; i++){
                    let absIndex = Math.abs(MainIndex - i);

                    if(absIndex >= 4)
                        break;

                    let mixHeight = getHeightOfDynamicBubble(DynamicBubbles[i]);

                    mixHeight *= Math.cos(absIndex * 90/4 * Math.PI / 180);

                    const pizzaC = Math.sin((absIndex * 90/4/2) * Math.PI / 180)*160*2;
                    const cosB = Math.cos((90 - (180 - (absIndex * 90/4))/2) * Math.PI / 180);
                    const freeSpace = (pizzaC * cosB);

                    DynamicBubbles[i].style.transform = `translateX(-50%) rotateX(${absIndex * 90/4}deg)`;

                    Accumulation+= LastMixHeight;
                    DynamicBubbles[i].style.top = `${Horizontal + Accumulation + freeSpace}px`;

                    LastMixHeight = mixHeight;

                }
            });

        }
    }

    function PullUpMainBubble(MainIndex){

        let ClickOnBubble = DynamicBubbles[MainIndex];

        PullUpInfo.MainPullUpIndex = MainIndex;

        ClickOnBubble.style.height = "calc(var(--fh,100vh) - 60px)";
        ClickOnBubble.style.top = "0";
        ClickOnBubble.style.opacity = "1";
        ClickOnBubble.style.filter = ``;

        ClickOnBubble.classList.add("SearchableBubble");

        ClickOnBubble.getElementsByClassName("DynamicBubbleBottomBar")[0].innerText =
            "向下拖拉右上方的握把看看？"

        ClickOnBubble.getElementsByClassName("DynamicBubbleFrame")[0].style.overflowY = "auto";

        ClickOnBubble.getElementsByTagName("hr")[0].style.opacity = "1";


        setTimeout(async function(){
            if(!ClickOnBubble)
                return;

            ClickOnBubble.getElementsByClassName("DynamicBubbleControlBar")[0].style.opacity = "1";
            ClickOnBubble.getElementsByClassName("DynamicBubbleControlBar")[0].style.width = "28px";
            ClickOnBubble.getElementsByClassName("DynamicBubbleControlBar")[0].style.height = "28px";

            await sleep(120);

            if(!ClickOnBubble || !StartAtElement)
                return;

            ClickOnBubble.getElementsByClassName("DynamicBubbleControlBar")[0].style.opacity = "1";
            StartAtElement.getElementsByClassName("DynamicBubbleControlBarHandle")[0].style.transition = "all 120ms ease-out";
            ClickOnBubble.getElementsByClassName("DynamicBubbleControlBarHandle")[0].style.transform =
                `translate(-50%,-50%) rotateZ(19deg)`;

            await sleep(120);

            if(!ClickOnBubble)
                return;

            ClickOnBubble.getElementsByClassName("DynamicBubbleControlBarHandle")[0].style.transform =
                `translate(-50%,-50%) rotateZ(-12deg)`;

            await sleep(120);

            if(!ClickOnBubble)
                return;

            ClickOnBubble.getElementsByClassName("DynamicBubbleControlBarHandle")[0].style.transform =
                `translate(-50%,-50%) rotateZ(0deg)`;
        },110)



        for (let i = 0;i<DynamicBubbles.length;i++){
            if(i !== MainIndex){
                let mixHeight= getHeightOfDynamicBubble(DynamicBubbles[i]);

                DynamicBubbles[i].style.opacity = "0";
                DynamicBubbles[i].style.top = `-${mixHeight}px`;
            }
        }
    }

    async function ClearBubble(MainIndex){
        let toDel = DynamicBubbles[MainIndex];
        DynamicBubbles.splice(MainIndex,1);

        if(
            toDel.classList.contains("FunctionBubble")
            &&
            BubbleFunctions[toDel.id]
        )
            BubbleFunctions[toDel.id].close();

        for (let i = 0 ; i < toDel.getElementsByClassName("DynamicBubbleFrameButton").length; i++)
            FunctionButtons[toDel.getElementsByClassName("DynamicBubbleFrameButton")[i].id] = null;

        setTimeout(async function(){
            toDel.style.opacity = "0";
            toDel.style.height = "0";
            toDel.style.minHeight = "0";
            await sleep(340);
            toDel.remove();
        },120);

        resetPullUpInfo();
        await TidyUpDynamicBubbles();
        await PullUpDynamicBubbles(DynamicBubbles.length-1);
    }

    let startAt = 0;

    let mouseOnButtons = {};
    let mouseOnBubbles = [];
    let mouseOnControlBars = [];
    let mouseOnFunctionButtons = [];
    let mouseOnView = [];

    let StartAtElement;

    function getFinalElementWitchAtPoint(x,y){
        let FinalInfo = {
            "Button":0,
            "Bubble":0,
            "ControlBar":0,
            "FunctionButton":0,
            "Photos":0,
            "Rotating":0,
        };

        let ElementsWitchAtPoint = document.elementsFromPoint(x,y);

        for (let i = 0; i < ElementsWitchAtPoint.length; i++) {
            if(retIfParentMatch(ElementsWitchAtPoint[i],cubeSkin,0).Parent) break;

            let CheckButton = retIfParentMatch(ElementsWitchAtPoint[i],0,"button");
            if(CheckButton.SearchTimes === 1) continue;

            if(CheckButton.Parent){
                if(!Pushing) if (retIfParentMatch(ElementsWitchAtPoint[i],0,"buttonRightSide").SearchTimes === 1 ||
                    retIfParentMatch(ElementsWitchAtPoint[i],0,"buttonLeftSide").SearchTimes === 1 ||
                    retIfParentMatch(ElementsWitchAtPoint[i],0,"buttonTopSide").SearchTimes === 1 ||
                    retIfParentMatch(ElementsWitchAtPoint[i],0,"buttonBottomSide").SearchTimes === 1)
                    continue;

                FinalInfo.Button = CheckButton.Parent;
                break
            }


            if(PullUpInfo.MainPullUpIndex !== false){
                let ControlBar = retIfParentMatch(ElementsWitchAtPoint[i],0,"DynamicBubbleControlBar");

                if(ControlBar.Parent){
                    FinalInfo.ControlBar = ControlBar.Parent;
                    break
                }

                let FunctionButton = retIfParentMatch(ElementsWitchAtPoint[i],0,"DynamicBubbleFrameButton");

                if(FunctionButton.Parent){
                    FinalInfo.FunctionButton = FunctionButton.Parent;
                    break

                }

                let CheckPhoto = retIfParentMatch(ElementsWitchAtPoint[i],0,"DynamicBubbleFramePhoto");

                if(CheckPhoto.Parent){
                    FinalInfo.Photos = CheckPhoto.Parent;
                    break
                }
            }




            let CheckBubble = retIfParentMatch(ElementsWitchAtPoint[i],0,"DynamicBubble");

            if(CheckBubble.Parent){
                FinalInfo.Bubble = CheckBubble.Parent;
                break
            }
        }


        FinalInfo.Rotating =
            !FinalInfo.Button &&
            !FinalInfo.Bubble &&
            !FinalInfo.Rotating &&
            !FinalInfo.ControlBar &&
            !FinalInfo.Photos &&
            !FinalInfo.FunctionButton;


        return FinalInfo;
    }

    let ToStableValue = useTouchPad ? 3 : 5;

    let ViewBase = 0;

    let startMove = async function (x,y)
    {
        if(Locked) return;

        if(Date.now() - startAt < 160) return;

        StartAtElement = false;

        xStartScreen = x;
        yStartScreen = y;

        let FinalInfo = getFinalElementWitchAtPoint(x,y);

        startAt = Date.now();

        if(FinalInfo.Rotating){
            Holding = true;
            TweenUp(false);

            XVertex = x;
            YVertex = y;

            XVertexRecordedAtTime = YVertexRecordedAtTime = Date.now();

            CubeInfo.XMoved = (x - xStartScreen)/ToStableValue + CubeInfo.LastXMoved;
            CubeInfo.YMoved = (y -  yStartScreen)/ToStableValue + CubeInfo.LastYMoved;
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

            FinalInfo.Bubble.classList.add("MouseOnBubble");

            // FinalInfo.Bubble.style.transform = "translateX(-50%) translateY(10px)";

            mouseOnBubbles.push(StartAtElement = FinalInfo.Bubble)

            LastPullUpAtY = y;
            PullUpMoving = 0;
            Pulling = true;
        }else if(FinalInfo.ControlBar && !Controlling && PullUpInfo.MainPullUpIndex !== false){
            mouseOnControlBars.push(StartAtElement = FinalInfo.ControlBar)

            FinalInfo.ControlBar.style.width =
                FinalInfo.ControlBar.style.height =
                    "34px";

            Controlling = true;
        }else if(FinalInfo.FunctionButton && !Dragging && PullUpInfo.MainPullUpIndex !== false){
            mouseOnFunctionButtons.push(StartAtElement = FinalInfo.FunctionButton);

            FinalInfo.FunctionButton.style.width = "96%";
            FinalInfo.FunctionButton.style.height = "98%";

            FinalInfo.FunctionButton.style.fontSize = "17px";

            FinalInfo.FunctionButton.style.zIndex = "1";

            const res = retIfParentMatch(FinalInfo.FunctionButton,0,"DynamicBubble",0);
            res.Parent.classList.remove("SearchableBubble");
            res.Parent.getElementsByClassName("DynamicBubbleFrame")[0].style.overflowY = "hidden";

            Dragging = true;
        }else if (FinalInfo.Photos && !Viewing && PullUpInfo.MainPullUpIndex !== false){
            Viewing = true;
            mouseOnView.push(StartAtElement = FinalInfo.Photos);
            let Carrier = retIfParentMatch(StartAtElement,0,"DynamicBubbleFramePhotosCaseCarrier");
            ViewBase = Carrier.Parent.scrollLeft;

            StartAtElement.style.translate = "0 -10px";

            const res = retIfParentMatch(StartAtElement,0,"DynamicBubble",0);
            res.Parent.classList.remove("SearchableBubble");
            res.Parent.getElementsByClassName("DynamicBubbleFrame")[0].style.overflowY = "hidden";

        }
    }


    let ControlBarIsDraw = false;
    let LastSelectControlButtonIndex = false;

    let LastPullUpAtY = 0;

    let XVertex = 0,YVertex = 0;
    let XVectorFocus = 0,YVectorFocus = 0;
    let LastXOnOnMoving = 0,LastYOnOnMoving = 0;
    let XVertexRecordedAtTime,YVertexRecordedAtTime;

    let SafetyLocker = 0;

    let endMove = async function (x,y){
        if(Locked) return;

        let FinalInfo = getFinalElementWitchAtPoint(x,y);

        if(Holding){
            Holding = false;

            let sec = Date.now() - XVertexRecordedAtTime;
            sec = sec ? sec : 1;

            let XV = 500 * (x - XVertex)/(sec);
            let YV = 500 * (y - YVertex)/(sec);

            let IfXVNeg = XV < 0;
            let IfYVNeg = YV < 0;

            CubeInfo.LastXMoved = CubeInfo.XMoved;
            CubeInfo.LastYMoved = CubeInfo.YMoved;

            let ms10Past = 0;

            let XVStoped = false;
            let YVStoped = false;


            if(!SafetyLocker){
                SafetyLocker = 1;

                while (1){
                    ms10Past++;

                    if(Holding || Pushing || Dragging || Viewing)
                        break;

                    if(!XVStoped) {
                        if (IfXVNeg)
                            XV += 20;
                        else
                            XV -= 20;
                    }else XV = 0;

                    if(!YVStoped){
                        if(IfYVNeg)
                            YV += 20;
                        else
                            YV -= 20;
                    }else YV = 0;


                    XVStoped = (IfXVNeg ? XV >= 0 : XV <= 0);
                    YVStoped = (IfYVNeg ? YV >= 0 : YV <= 0);

                    if(XVStoped && YVStoped)
                        break;

                    moving(CubeInfo.LastXMoved + XV/500,CubeInfo.LastYMoved + YV/500);

                    CubeInfo.LastXMoved = CubeInfo.XMoved = CubeInfo.LastXMoved + XV/500;
                    CubeInfo.LastYMoved = CubeInfo.YMoved = CubeInfo.LastYMoved + YV/500;


                    await sleep(2);
                }

                SafetyLocker = 0;
            }



            return;
        }

        if(Pushing){
            Pushing = false;
            let FinalElement = FinalInfo.Button;
            let ButtonInfo = Cube.Buttons[Number(FinalElement.id)];

            if(FinalElement === StartAtElement){
                if(Object.keys(ButtonInfo.Event).length === 0){
                    let CubePathInString = "";
                    CubePath.forEach(function (v){
                        CubePathInString = CubePathInString + v.Tag +"/";
                    })
                    await CreateDynamicBubbles(
                        "Notification",
                        [
                            {
                                "Title":"怎麼沒反應？？",
                                "Content":`你剛剛壓下的這顆按鈕沒有任何動靜，似乎是Hxx忘記附魔給他了。之後再來看看吧！`
                            },
                            {
                                "Content":`你也可以回報「反饋小尖兵」所提供的內容給 me@hxx.lol，讓Hxx熬夜趕工把遺漏的部分補完整。(邪惡`
                            },
                            {
                                "Title":"反饋小尖兵",
                                "Content":`反饋原因：ButtonInfo內的Event沒有任何內容。\n按鈕名稱與標籤：${ButtonInfo.Name},${ButtonInfo.Tag}\n路徑：${CubePathInString}`
                            }
                        ]
                    )
                }else for (let index in ButtonInfo.Event){
                    let data = ButtonInfo.Event[index];

                    switch (index){
                        case "Page":{
                            let Content = await loadData(data);
                            if(!Content) break;

                            setTimeout(async function (){
                                await CreateDynamicBubbles(
                                    "Page",
                                    Content
                                )
                            })

                            break;
                        }
                        case "Function":{
                            let Content = await loadData(data);
                            if(!Content) break;

                            setTimeout(async function (){
                                await CreateDynamicBubbles(
                                    "Function",
                                    Content
                                )

                                // await CreateDynamicBubbles(
                                //     "Notification",
                                //     [
                                //         {
                                //             "Title":"恐龍康啷今天罷工，不給你用這東西。",
                                //             "Content":"等恐龍康啷來上班時，你就可以用這個酷咚咚了。"
                                //         }
                                //     ]
                                // )
                            })

                            break;
                        }
                        case "Cube":{
                            const Content = await loadData(data);
                            if(!Content) break;

                            ShowCube(Content,true)

                            break;
                        }
                        case "Action":{
                            switch (data){
                                case "Return":{
                                    CubePath.splice(CubePath.length-1, 1);
                                    let backTo = structuredClone(CubePath[CubePath.length-1]);

                                    ShowCube(backTo,false)
                                    break;
                                }
                            }

                            break;
                        }
                        case "Module":{
                            ModuleFunction[data]();

                            break;
                        }
                    }
                }

            }
        }

        if(Pulling){
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

            if(PullUpInfo.PullUpType === 3)
            {
                document.getElementById("DynamicBubbleBase").style.transition = "all 140ms cubic-bezier(0, 0.2, 0.1, 1)";
                document.getElementById("DynamicBubbleBase").style.top = `30px`;

                setTimeout(function(){
                    document.getElementById("DynamicBubbleBase").style.transition = `none`;
                },140)

                if(LastPullUpAtY - y > 340)
                    await TidyUpDynamicBubbles();
                else if(LastPullUpAtY - y < -340)
                    await PullUpMainBubble(0);
            }

            if(PullUpInfo.MainPullUpIndex !== false){

            }else if(FinalInfo.Bubble === StartAtElement){
                if(!PullUpInfo.PullUpType)
                    PullUpDynamicBubbles(ClickOnIndex);
                else if(PullUpInfo.PullUpType === 3 && !PullUpMoving)
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
        }

        if(Controlling && PullUpInfo.MainPullUpIndex !== false){
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
                    case "留言泡泡":{
                        await CreateDynamicBubbles(
                            "Notification",
                            [
                                {
                                    "Title":"恐龍康啷今天罷工，不給你用這東西。",
                                    "Content":"等恐龍康啷來上班時，你就可以用這個酷咚咚了。"
                                }
                            ]
                        )

                        break;
                    }
                    case "吹除泡泡":{
                        await ClearBubble(PullUpInfo.MainPullUpIndex);

                        break;
                    }
                    case "消滅泡泡":{
                        let len = DynamicBubbles.length;

                        for (let i = 0;i<len;i++)
                            ClearBubble(0);

                        await sleep(120);

                        if(Math.random() > 0.8) CreateDynamicBubbles("Notification",[
                            {
                                "Title":"嘿嘿，你弄不破我。",
                                "Content":"亨，你以為使用「消滅泡泡」就可以消除我嗎？太天真了哈哈哈哈。"
                            },
                            {
                                "Content":"其實還是有東西能夠消滅我，那就是「吹除泡泡」... ㄜ...當我沒說好嗎？不要ㄍㄚˊ了我呀！"
                            }
                        ]);

                        break;
                    }
                }

            }
        }

        if(Dragging){
            Dragging = false;

            if(FinalInfo.FunctionButton && FinalInfo.FunctionButton === StartAtElement)
                if(FunctionButtons[FinalInfo.FunctionButton.id])
                    ModuleFunction[FunctionButtons[FinalInfo.FunctionButton.id]]();

        }

        if(Viewing){
            Viewing = false;
        }

        for (let ni = 0 ; ni < mouseOnView.length; ni++) {
            const i = mouseOnView.length - ni - 1;

            if(!mouseOnView[i]) continue;
            mouseOnView[i].style.translate = "0 0";

            const res = retIfParentMatch(mouseOnView[i],0,"DynamicBubble",0);
            res.Parent.classList.add("SearchableBubble");
            res.Parent.getElementsByClassName("DynamicBubbleFrame")[0].style.overflowY = "auto";

            mouseOnView.pop()
        }
        for (let ni = 0 ; ni < mouseOnFunctionButtons.length; ni++) {
            const i = mouseOnFunctionButtons.length - ni - 1;
            if(!mouseOnFunctionButtons[i]) continue;

            setTimeout(async function(){
                mouseOnFunctionButtons[i].style.transition = "";

                mouseOnFunctionButtons[i].style.zIndex = "0";
                mouseOnFunctionButtons[i].style.fontSize = "18px";

                mouseOnFunctionButtons[i].style.width =
                    mouseOnFunctionButtons[i].style.height = `100%`;

                mouseOnFunctionButtons[i].style.top =
                    mouseOnFunctionButtons[i].style.left = `50%`;

                const res = retIfParentMatch(mouseOnFunctionButtons[i],0,"DynamicBubble",0);
                res.Parent.classList.add("SearchableBubble");
                res.Parent.getElementsByClassName("DynamicBubbleFrame")[0].style.overflowY = "auto";

                mouseOnFunctionButtons.pop();
            },0)
        }

        for (let ni = 0 ; ni < mouseOnControlBars.length; ni++) {
            const i = mouseOnControlBars.length - ni - 1;
            if(!mouseOnControlBars[i]) continue;

            setTimeout(async function(){
                for (let index = 0; index < mouseOnControlBars[i].getElementsByTagName("div").length; index++) {
                    await sleep(20)

                    if(!mouseOnControlBars[i]) return;

                    mouseOnControlBars[i].getElementsByTagName("div")[index].style.opacity = "0";
                }

                mouseOnControlBars[i].style.overflow = "visible"
                mouseOnControlBars[i].style.top = "15px"
                mouseOnControlBars[i].style.right = "15px"
                mouseOnControlBars[i].getElementsByTagName("hr")[0].style.opacity = "1";

                mouseOnControlBars[i].style.transition = "";

                mouseOnControlBars[i].parentElement.getElementsByClassName("DynamicBubbleTypeTitle")[0].style.filter =
                    mouseOnControlBars[i].parentElement.getElementsByClassName("DynamicBubbleFrame")[0].style.filter =
                        mouseOnControlBars[i].parentElement.getElementsByClassName("DynamicBubbleBottomBar")[0].style.filter = "";

                mouseOnControlBars[i].style.width =
                    mouseOnControlBars[i].style.height =
                        "28px";

                mouseOnControlBars[i].getElementsByClassName("DynamicBubbleControlBarHandle")[0].style.transition =
                    ""
                mouseOnControlBars[i].getElementsByClassName("DynamicBubbleControlBarHandle")[0].style.transform =
                    `translate(-50%,-50%) rotateZ(0deg)`

                mouseOnControlBars[i].getElementsByClassName("DynamicBubbleControlBarHandleRope")[0].style.transition =
                    mouseOnControlBars[i].getElementsByClassName("DynamicBubbleControlBarHandleGrip")[0].style.transition =
                        "";

                mouseOnControlBars[i].getElementsByClassName("DynamicBubbleControlBarHandleRope")[0].style.height = `18px`;
                mouseOnControlBars[i].getElementsByClassName("DynamicBubbleControlBarHandleGrip")[0].style.top = `43px`;

                mouseOnControlBars.pop();

            },0)
        }

        LastSelectControlButtonIndex = false;
        ControlBarIsDraw = false;


        for (let i in mouseOnButtons){
            if(!mouseOnButtons[i]) continue;
            if(!Cube.Buttons[Number(mouseOnButtons[i].id)]) continue;

            Cube.Buttons[Number(mouseOnButtons[i].id)].depth =
                CubePath[CubePath.length-1].Buttons[Number(mouseOnButtons[i].id)].depth;

            mouseOnButtons[i].style.fontSize = "15px";

            mouseOnButtons[i] .getElementsByClassName("buttonBackSide")[0].style.boxShadow =
                "black 0 0 10px 2px"

            moving(CubeInfo.LastXMoved,CubeInfo.LastYMoved);

            await sleep(100);

            mouseOnButtons[i] = null;
        }


        for (let ni = 0 ; ni < mouseOnBubbles.length; ni++) {
            const i = mouseOnBubbles.length - ni - 1;
            if(!mouseOnBubbles[i]) continue;

            mouseOnBubbles[i].classList.remove("MouseOnBubble");

            mouseOnBubbles.pop();
        }
    }

    let ControlBarPullUpAtX = 0;
    let ControlBarPullUpAtY = 0;
    let AlreadyInRecording = 0;

    let nowCursorAtX = 0;
    let nowCursorAtY = 0;

    let PullUpMoving = 0;


    let fingerMoving = async function(x,y){
        if(Locked) return;

        nowCursorAtX = x;
        nowCursorAtY = y;

        if(Holding){
            let CurrentXVectorFocus = (x - LastXOnOnMoving > 0) ? 1 : (x - LastXOnOnMoving === 0) ? 0 : -1;
            let CurrentYVectorFocus = (y - LastYOnOnMoving > 0) ? 1 : (y - LastYOnOnMoving === 0) ? 0 : -1;

            CubeInfo.XMoved = (x - xStartScreen)/ToStableValue + CubeInfo.LastXMoved;
            CubeInfo.YMoved = (y -  yStartScreen)/ToStableValue + CubeInfo.LastYMoved;

            if(CurrentXVectorFocus){
                if(CurrentXVectorFocus !== XVectorFocus){
                    XVertexRecordedAtTime = Date.now();
                    XVertex = x;
                }

                XVectorFocus = CurrentXVectorFocus;
            }

            if(CurrentYVectorFocus){
                if(CurrentYVectorFocus !== YVectorFocus){
                    YVertexRecordedAtTime = Date.now();
                    YVertex = y;
                }

                YVectorFocus = CurrentYVectorFocus;
            }

            LastXOnOnMoving = x;
            LastYOnOnMoving = y;

            moving(CubeInfo.XMoved, CubeInfo.YMoved);
        }else if (Controlling){
            if(ControlBarIsDraw === false){
                ControlBarPullUpAtX = ControlBarPullUpAtY = 0;
                AlreadyInRecording = 0

                if(y - yStartScreen >= 100){
                    StartAtElement.style.transition = "";

                    StartAtElement.parentElement.getElementsByClassName("DynamicBubbleTypeTitle")[0].style.filter =
                        StartAtElement.parentElement.getElementsByClassName("DynamicBubbleFrame")[0].style.filter =
                            StartAtElement.parentElement.getElementsByClassName("DynamicBubbleBottomBar")[0].style.filter = "blur(3px)";

                    ControlBarIsDraw = true;

                    setTimeout(async function (){
                        for (let index = 0; index < StartAtElement.getElementsByTagName("div").length; index++) {
                            await sleep(20)
                            StartAtElement.getElementsByTagName("div")[index].style.opacity = "1";
                        }
                    },120)
                }else{
                    StartAtElement.style.transition = "none";

                    StartAtElement.style.width = StartAtElement.style.height =
                        `${(y - yStartScreen > 0 ? (y - yStartScreen)*.2 : 0)+34}px`;



                    let tX = x - xStartScreen;
                    let tY = y - yStartScreen;

                    let tSlide = Math.sqrt(tX**2 + tY**2);

                    StartAtElement.getElementsByClassName("DynamicBubbleControlBarHandle")[0].style.transform =
                        `translate(-50%,-50%) rotateZ(${-(Math.asin(tX/tSlide) * 180/Math.PI)*0.2}deg)`
                    StartAtElement.getElementsByClassName("DynamicBubbleControlBarHandle")[0].style.transition = "none";

                    StartAtElement.getElementsByClassName("DynamicBubbleControlBarHandleRope")[0].style.transition =
                        StartAtElement.getElementsByClassName("DynamicBubbleControlBarHandleGrip")[0].style.transition =
                            "none";

                    StartAtElement.getElementsByClassName("DynamicBubbleControlBarHandleRope")[0].style.height = `${18 + (tY >= 0 ? tY : 0 )*0.4}px`;
                    StartAtElement.getElementsByClassName("DynamicBubbleControlBarHandleGrip")[0].style.top = `${43 + (tY >= 0 ? tY : 0 )*0.4}px`;
                }
            }


            if(ControlBarIsDraw)
            {
                if(!(ControlBarPullUpAtX || ControlBarPullUpAtY || AlreadyInRecording)) {
                    AlreadyInRecording = 1;
                    setTimeout(function () {
                        if (ControlBarIsDraw) {
                            StartAtElement.style.transition = "none";
                            ControlBarPullUpAtX = nowCursorAtX;
                            ControlBarPullUpAtY = nowCursorAtY;
                        }
                    }, 240)
                }

                StartAtElement.style.top = `${15 + (y - (ControlBarPullUpAtY ? ControlBarPullUpAtY : y)) / 20}px`;
                StartAtElement.style.right = `${15 + ((ControlBarPullUpAtX ? ControlBarPullUpAtX : x) - x) / 20}px`;
                StartAtElement.style.width =
                    `${120 + Math.abs(((ControlBarPullUpAtX ? ControlBarPullUpAtX : x) - x) / 50) - Math.abs((y - (ControlBarPullUpAtY ? ControlBarPullUpAtY : y)) / 50) * 0.6}px`;
                StartAtElement.style.height =
                    `${ControlButtons.length * 50 + Math.abs((y - (ControlBarPullUpAtY ? ControlBarPullUpAtY : y)) / 50) - Math.abs(((ControlBarPullUpAtX ? ControlBarPullUpAtX : x) - x) / 50) * 0.6}px`;

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
                    let isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if(finalButton === StartAtElement.getElementsByTagName("div")[index]){
                        thisElement.style.color = isDarkMode ? "#272727" : "#ffffff";

                        if(ControlButtons[index]["IMPORTANT?"])
                            thisElement.style.backgroundColor = isDarkMode ? "#EA5353E0" : "#bf3232E0"
                        else
                            thisElement.style.backgroundColor = isDarkMode ? "#E6E6E6E0" :"#393939E0";

                    }else{
                        if(ControlButtons[index]["IMPORTANT?"])
                            thisElement.style.color = isDarkMode ? "#EA5353" : "#bf3232"
                        else
                            thisElement.style.color = isDarkMode ? "#E6E6E6" :"#393939";

                        thisElement.style.backgroundColor = "";
                    }
                }

            }else{
                StartAtElement.style.overflow = "visible";
            }
        }else if(Pulling)
        {
            if(PullUpInfo.PullUpType === 3 && PullUpInfo.MainPullUpIndex === false){
                if(y-LastPullUpAtY > 140){
                    PullUpMoving = 1;

                    if(PullUpInfo.ChoseToPullUpIndex-1 >= 0){
                        LastPullUpAtY = y;

                        PullUpInfo.ChoseToPullUpIndex--;
                        PullUpDynamicBubbles(PullUpInfo.ChoseToPullUpIndex);
                    }
                }else if(y - LastPullUpAtY < - 140){
                    PullUpMoving = 1;

                    if(PullUpInfo.ChoseToPullUpIndex+1 < DynamicBubbles.length){
                        LastPullUpAtY = y;

                        PullUpInfo.ChoseToPullUpIndex++;
                        PullUpDynamicBubbles(PullUpInfo.ChoseToPullUpIndex);
                    }
                }

                document.getElementById("DynamicBubbleBase").style.top = `${30 + 50*(y - LastPullUpAtY)/140}px`;
            }
        }else if(Dragging){
            StartAtElement.style.transition = "none";

            let tX = x - xStartScreen;
            let tY = y - yStartScreen;

            StartAtElement.style.width = `${96 + Math.abs(tX*0.02) - Math.abs(tY*0.01)}%`;
            StartAtElement.style.height = `${98 + Math.abs(tY*0.04) - Math.abs(tX*0.02)}%`;

            StartAtElement.style.top = `calc(50% + ${tY*0.04}px)`;
            StartAtElement.style.left = `calc(50% + ${tX*0.04}px)`;
        }else if(Viewing){
            let Carrier = retIfParentMatch(StartAtElement,0,"DynamicBubbleFramePhotosCaseCarrier");
            Carrier.Parent.scrollLeft = ViewBase - (nowCursorAtX - xStartScreen);
        }
    }

    if(useTouchPad) {
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
    //### START OVER HERE ###

    //矯正他們的排序... 其實我不知道這樣有沒有用
    cubeSkin = "musicBox";
    cubeElement = document.getElementById(cubeSkin);
    moving(0,0);

    cubeSkin = "cube";
    cubeElement = document.getElementById(cubeSkin);
    moving(0,0);

    TweenUp(true,.14);
    moving(0,0);

    let defaultCube = await loadData("./cube/Default.JSON");

    cubeSkin = defaultCube.Skin;
    cubeElement = document.getElementById(cubeSkin);
    cubeElement.style.opacity = "1";
    moving(0,0);

    if(defaultCube)
    {
        SummonCube(defaultCube,true);

        for(let i = 0;i<Cube.Buttons.length;i++)
            Cube.Buttons[i].depth = 0;

        for (let i = 0;i<buttonElements.length;i++)
        {
            buttonElements[i].style.fontSize = "0px";
            buttonElements[i].style.opacity = "0";
        }
    }


    moving(CubeInfo.XMoved, CubeInfo.YMoved);
    TweenUp(true,.14);

    await sleep(740)

    await sleep(300);
    moving(0,10);
    await sleep(340);
    moving(-15,10);

    moving(-15,10);
    CubeInfo.XMoved = -15;
    CubeInfo.YMoved = 10;

    await sleep(100);

    TweenUp(true,.4);

    await sleep(120);

    if(defaultCube){
        Cube.Buttons = structuredClone(defaultCube.Buttons);

        for (let i = 0;i<buttonElements.length;i++){
            buttonElements[i].style.fontSize = "15px";
            buttonElements[i].style.opacity = "1";
        }
    }

    moving(CubeInfo.XMoved, CubeInfo.YMoved);

    await sleep(200);

    TweenUp(false);

    for (let j = 0;j<=360/5;j++){
        moving(-j*5 - 15,10);
        await sleep(0);
    }

    CubeInfo.LastXMoved = CubeInfo.XMoved = -375;
    CubeInfo.LastYMoved = CubeInfo.YMoved = 10;


    await sleep(240);

    if(!defaultCube)
        await CreateDynamicBubbles("Notification",[
            {
                "Title":"「娃娃大哭」",
                "Content":"ㄝ... 看起來我們好像沒辦法載入最主要的資料耶，你可重新載入頁面以重式，如果還是不行的話，幫我聯絡：me@hxx.lol"
            }]);
    else await CreateDynamicBubbles("Notification",[
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
            "Content":"喔對了，看到右上角的把手了嗎？向下拉他就「有機會」帶你離開這顆泡泡喔。"
        },
        {
            "Content":"還有丫，蘇東坡沒有講過這句話：蘇波哀東的笑容。"
        },
        {
            "Title":"極端的東西！",
            "Content":"某些瀏覽器或裝置會限制或影響網站程式的流暢度，導致畫面卡頓。這時候你就要大展鴻圖，關公都點頭，有料!。"
        },
        {
            "Content":"網站錯誤或意見回報：me@hxx.lol。"
        },
        {
            "Title":"版權宣告",
            "Content":"Copyright © from 2024 to PRESENT @CalledHxx. All rights reserved."
        },
        {
            "Content":"MIT License, open-source library: https://github.com/calledhxx/hxx.lol"
        }
    ])

    Locked = 0;
});