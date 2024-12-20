//CALLEDHXX Nov/2024

let Squares = [
    {

        Name:"歡迎光臨",

        Details:"按下 Enter 繼續。",

        Image:"",

        Page:"/f/welcome.json",

        Color: "3ca98a",

        id : ""

    },
    {

        Name:"个人档案",

        Details:"Hxx的個人檔案。",

        Image:"/f/img/0324.gif",

        Page:"/f/main.json",

        Color: "5d3ca9",

        id : "hxx"

    },
    {
        Name:"7SunFish",
        Details:"Hxx的好朋友",
        Image:"/f/img/a9a72e835d8a6266b636180a30014def.png",
        Page:"/f/7sf.json",
        Color: "c1842b",

        id : "7sf"

    },
    {
        Name:"我所對不起的你",
        Details:"獻給你，朋友。",
        Image:"",
        Page:"/f/sry.json",
        Color: "4e46b8",

        id : "sry"

    },
    {
        Name:"Uzi特寫",
        Details:"Uzi的特寫照外流。",
        Image:"/f/img/IMG_9089.jpg",
        Page:"/f/uzi.json",
        Color: "7946b8",

        id : "uzi"

    },
    {
        Name:"散文集：短",
        Details:"Hxx的個人散文專輯。",
        Image:"",
        Page:"/f/fshort.json",
        Color: "4699d9",

        id : "fshort"
    },
    {
        Name:"散文集：長",
        Details:"Hxx的個人散文專輯。",
        Image:"",
        Page:"/f/flong.json",
        Color: "d94646",

        id : "flong"
    },
    {
        Name:"Minecraft",
        Details:"Hxx的遊玩Minecraft的紀錄。",
        Image:"/f/img/minecraft.png",
        Page:"/f/minecraft.json",
        Color: "85471d",

        id : "minecraft"
    }
]

let Bubbles = [

];


let MidY = 0;
let MidX = 0;

let mapSize;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async  function tweenMsgMove(obj,toY,sec,lag){
    let perSecY = (toY-obj.style.bottom.substring(0,obj.style.bottom.length-2))/(sec*10);

    let Y = Number(obj.style.bottom.substring(0,obj.style.bottom.length-2));

    for (let i = 0;i<(10*sec);i++){

        obj.style.bottom = Y+perSecY+"px";

        await sleep(lag);


        Y = Number(obj.style.bottom.substring(0,obj.style.bottom.length-2));
    }

    obj.style.bottom = toY+"px";
}

async function MessageIt(Title,Reason){

    if (Title&&Reason){
        let AMessageCase = document.createElement("button");
        AMessageCase.classList.add("AMessageCase");
        await tweenMsgMove(AMessageCase,-300,1,1);
        await sleep(100);



        let MessageTouchBox = document.createElement("div");
        MessageTouchBox.classList.add("MessageTouchBox");

        let MessageImage = document.createElement("img");
        MessageImage.classList.add("MessageImage");
        MessageImage.src = "path248.png";

        let MessageContentCase = document.createElement("div");
        MessageContentCase.classList.add("MessageContentCase");

        let MessageContent1 = document.createElement("h1");
        MessageContent1.classList.add("MessageContent1");
        MessageContent1.textContent = Title;

        let MessageContent2 = document.createElement("h2");
        MessageContent2.classList.add("MessageContent2");
        MessageContent2.textContent = Reason;




        document.getElementById("MessagesCase").appendChild(AMessageCase);
        AMessageCase.appendChild(MessageTouchBox);
        AMessageCase.appendChild(MessageImage);
        AMessageCase.appendChild(MessageContentCase);
        MessageContentCase.appendChild(MessageContent1);
        MessageContentCase.appendChild(MessageContent2);

        AMessageCase.addEventListener("click", async function(){
            tweenMsgMove(AMessageCase,-500,3,1);
            await sleep(100);
            AMessageCase.remove();
            MessageIt();
        })



        await tweenMsgMove(AMessageCase,0,1,1);

    }




    let papa = document.getElementById("MessagesCase").children;
    //Number(papa[i].id.substring(0,papa[i].id.length-4))
    for (let i = 0;i<papa.length;i++){
        let Index = papa.length - i - 1;
        tweenMsgMove(papa[Index],20*(papa.length - i - 1),1,1);
        await sleep(10);

        papa[Index].style.zIndex = 100+i;
    }



}

let tweenMoveIndex = 0;
let tweenMoveObj;
async  function tweenMove(obj,toX,toY,sec,lag,moveOut){
    tweenMoveObj = obj;
    tweenMoveIndex++;
    let perSecX = (toX-obj.style.left.substring(0,obj.style.left.length-2))/(sec*10);
    let perSecY = (toY-obj.style.top.substring(0,obj.style.top.length-2))/(sec*10);

    let X =  Number(obj.style.left.substring(0,obj.style.left.length-2));
    let Y = Number(obj.style.top.substring(0,obj.style.top.length-2));

    let LastTMI = tweenMoveIndex;

    for (let i = 0;i<(10*sec);i++){
        if (moveOut) if (LastTMI!== tweenMoveIndex) if(obj === tweenMoveObj) {console.log("stop Move");return;}

        obj.style.left = X+perSecX+"px";
        obj.style.top = Y+perSecY+"px";

        await sleep(lag);


        X =  Number(obj.style.left.substring(0,obj.style.left.length-2));
        Y = Number(obj.style.top.substring(0,obj.style.top.length-2));
    }

    obj.style.left = toX+"px";
    obj.style.top = toY+"px";

}

let tweenSizeIndex = 0;
let tweenSizeObj;

async  function tweenSize(obj,toX,toY,sec,lag,sizeOut){
    tweenSizeObj = obj;
    tweenSizeIndex++;
    let perSecX = (toX-obj.style.width.substring(0,obj.style.width.length-2))/(sec*10);
    let perSecY = (toY-obj.style.height.substring(0,obj.style.height.length-2))/(sec*10);

    let X =  Number(obj.style.width.substring(0,obj.style.width.length-2));
    let Y = Number(obj.style.height.substring(0,obj.style.height.length-2));

    let LastTSI = tweenSizeIndex;


    for (let i = 0;i<(10*sec);i++){
        if (sizeOut) if (LastTSI!== tweenSizeIndex)  if(obj === tweenSizeIndex)  {console.log("stop Size");return;}


        obj.style.width = X+perSecX+"px";
        obj.style.height = Y+perSecY+"px";

        await sleep(lag);


        X =  Number(obj.style.width.substring(0,obj.style.width.length-2));
        Y = Number(obj.style.height.substring(0,obj.style.height.length-2));
    }

    obj.style.width = toX+"px";
    obj.style.height = toY+"px";


}

async  function tweenPos(obj,toX,toY,sec,lag){
    let perSecX = (toX-obj.style.backgroundPositionX.substring(0,obj.style.backgroundPositionX.length-2))/(sec*10);
    let perSecY = (toY-obj.style.backgroundPositionY.substring(0,obj.style.backgroundPositionY.length-2))/(sec*10);

    let X =  Number(obj.style.backgroundPositionX.substring(0,obj.style.backgroundPositionX.length-2));
    let Y = Number(obj.style.backgroundPositionY.substring(0,obj.style.backgroundPositionY.length-2));


    for (let i = 0;i<(10*sec);i++){

        obj.style.backgroundPositionX = X+perSecX+"px";
        obj.style.backgroundPositionY = Y+perSecY+"px";

        await sleep(lag);


        X =  Number(obj.style.backgroundPositionX.substring(0,obj.style.backgroundPositionX.length-2));
        Y = Number(obj.style.backgroundPositionY.substring(0,obj.style.backgroundPositionY.length-2));
    }

    obj.style.backgroundPositionX = toX+"px";
    obj.style.backgroundPositionY = toY+"px";


}

let Oy = 0;

let LastMidX = 0;
let LastMidY = 0;

let LimSquares = {
    "Moved100" : {

        Name:"100 Moveds!",

        Details:"致上最高的敬禮",

        Image:"",

        Page:"/f/m100.json",

        Color: "a93c74",

        id : "m100"

    }
}

let creatBubble = function(BubbleSqr){
    let BubblesTotal= 0;
    for (let _y =0;_y<Bubbles.length; _y++){
        for (let _x=0;_x<Bubbles[_y].length; _x++) BubblesTotal++ ;
    }

    let fit = Math.sqrt(BubblesTotal+1) - Math.floor(Math.sqrt(BubblesTotal+1)) === 0;

    let NewMapSize = fit ? Math.sqrt(BubblesTotal+1) : Math.floor(Math.sqrt(BubblesTotal+1))+1;

    let newBubbles = [];

    for (let i = 0; i <NewMapSize; i++) {
        newBubbles[i] = [];
    }


    for (let Y = 0; Y < NewMapSize; Y++){
        for (let X = 0; X < NewMapSize; X++){
            if (BubblesTotal<=Y*2+X) break;
            let v = 0;
            for (let yy = 0; yy < mapSize; yy++) {
                for (let xx = 0; xx < mapSize; xx++) {
                    if (Y*NewMapSize+X === yy*mapSize+xx){
                        v = Bubbles[yy][xx];
                        break;
                    }
                }
            }
            newBubbles[Y][X] = v;
        }
    }

    console.log(Bubbles,newBubbles);

    Bubbles = newBubbles;
    mapSize = NewMapSize;





    let button = document.createElement("button");
    let h2 = document.createElement("h2");
    let h6 = document.createElement("h6");
    let img = document.createElement("img");


    h2.textContent =BubbleSqr.Name;
    button.style.backgroundColor = "#" + BubbleSqr.Color;
    h2.style.color = "#" + hex(BubbleSqr.Color,"333333", +1);
    h6.style.color = "#" + hex(BubbleSqr.Color,"111111", +1);
    button.style.borderColor = "#" + hex(BubbleSqr.Color,"111111", -1);

    button.style.boxShadow = " 0 0 30px 3px #"+hex(BubbleSqr.Color,"111111", +1);






    button.style.left = window.innerWidth/2+"px";
    button.style.top = window.innerHeight/2+"px";

    button.style.width =  "50px";
    button.style.height = "50px";

    button.id = "bubble_"+BubbleSqr.id;

    button.classList.add("Square");

    button.classList.add(BubblesTotal);

    img.classList.add("Icon");

    button.appendChild(img);

    button.appendChild(h2);
    button.appendChild(h6);

    document.getElementById("Bubbles").appendChild(button);

    let db = 0;
    for (let Y = 0; Y < mapSize; Y++) {
        for (let X = 0; X < mapSize; X++) {
            if (Y === 0 && X === 0){}else{
                if (Bubbles[Y][X]){}else {
                    Bubbles[Y][X] = BubblesTotal;
                    db = 1;
                    break;
                }
            }
        }
        if (db){
            break;
        }
    }


}

let a = function(){
    let X = 0;
    let Y = 0;

    let XfirstPix = Math.floor(window.innerWidth/2)-Math.floor((mapSize/2)*55);
    let YfirstPix = Math.floor(window.innerHeight/2)-Math.floor((mapSize/2)*55);

    let xGen = 60;
    let yGen = 60;

    let CX = Math.floor(MidX/mapSize*30);
    let CY = Math.floor(MidY/mapSize*30);


    //
    let moved = document.cookie.replace(
        /(?:(?:^|.*;\s*)moved\s*\=\s*([^;]*).*$)|^.*$/,
        "$1",
    );

    if (Math.abs(MidX - LastMidX)){
        document.cookie = "moved="+(Number(moved)+1)+";";
    }
    if (Math.abs(MidY - LastMidY)){
        document.cookie = "moved="+(Number(moved)+1)+";";
    }



    if (Number(moved)>=100 && !document.getElementById("bubble_m100")){
        creatBubble(LimSquares["Moved100"]);
        MessageIt("好像有東西？","有神秘泡泡出來了，趕緊找找！");
    }




    //

    //

    tweenPos(document.getElementById("BackGround"),-MidX*20,-MidY*20,3,.1);



    //


    for (let y = 0;y<Bubbles.length;y++) {
        X = 0;
        for (let x = 0; x < Bubbles[y].length; x++) {

            if (MidY - y === 0){
                yGen = 120;
            }else{
                yGen = 60;
            }




            if (MidX - x === 0){
                //  document.getElementsByClassName(Bubbles[y][x])[0].style.backgroundColor = "red";

            }else{

                if (MidY - y === 0){
                    // document.getElementsByClassName(Bubbles[y][x])[0].style.backgroundColor = "blue";

                }else{
                    // document.getElementsByClassName(Bubbles[y][x])[0].style.backgroundColor = "red";
                }

            }


            let disY =  (MidX - x === 0 && MidY - y === 0) ? 60 : 0;
            let EasY = 0;

            let SqrData = Squares[y*mapSize + x];

            if(!SqrData) SqrData = getLim(x,y);

            if (SqrData){}else{break;}


            if (MidY - y <= -1){
                if (x === MidX || x === MidX+1){
                    //document.getElementsByClassName(Bubbles[y][x])[0].style.backgroundColor = "green";
                }else{
                    EasY =- 60;
                }
            }



            //+ (Number(document.getElementsByClassName(Bubbles[y][x])[0].style.width.substring(0,document.getElementsByClassName(Bubbles[y][x])[0].style.width.length-2)))/5
            //+  (Number(document.getElementsByClassName(Bubbles[y][x])[0].style.height.substring(0,document.getElementsByClassName(Bubbles[y][x])[0].style.height.length-2)))/5


            tweenMove(document.getElementsByClassName(Bubbles[y][x])[0]
                , -MidX*55+XfirstPix+X - CX
                ,-MidY*55+YfirstPix+Y + disY + EasY - CY
                ,
                1,
                6,true)




            if (MidX - x === 0 && MidY - y === 0){
                tweenSize(document.getElementsByClassName(Bubbles[y][x])[0],110,110,1,10,true);
                xGen = 120;

                document.getElementsByClassName(Bubbles[y][x])[0].children[1].textContent = SqrData.Name;
                document.getElementsByClassName(Bubbles[y][x])[0].children[2].textContent = SqrData.Details;
                document.getElementsByClassName(Bubbles[y][x])[0].children[1].style.fontSize = "20px";
                document.getElementsByClassName(Bubbles[y][x])[0].children[2].style.fontSize = "13px";



                if ( SqrData.Image === ""){

                }   else{
                    document.getElementsByClassName(Bubbles[y][x])[0].children[0].src = "";
                    document.getElementsByClassName(Bubbles[y][x])[0].children[0].style.width = "0";
                    document.getElementsByClassName(Bubbles[y][x])[0].children[1].textContent = SqrData.Name;
                    document.getElementsByClassName(Bubbles[y][x])[0].children[1].style.fontSize = "20px";

                    document.getElementsByClassName(Bubbles[y][x])[0].children[0].style.position = "absolute";


                }


            }else{
                tweenSize(document.getElementsByClassName(Bubbles[y][x])[0],50,50,1,10,true);
                xGen = 60;

                document.getElementsByClassName(Bubbles[y][x])[0].children[1].textContent = SqrData.Name.substring(0,1);
                document.getElementsByClassName(Bubbles[y][x])[0].children[1].style.fontSize = "26px";

                document.getElementsByClassName(Bubbles[y][x])[0].children[2].textContent = SqrData.Details;
                document.getElementsByClassName(Bubbles[y][x])[0].children[2].style.fontSize = "0";



                if ( SqrData.Image === ""){
                    document.getElementsByClassName(Bubbles[y][x])[0].children[0].style.position = "absolute";


                }   else{
                    document.getElementsByClassName(Bubbles[y][x])[0].children[1].style.fontSize = "0";
                    document.getElementsByClassName(Bubbles[y][x])[0].children[2].style.fontSize = "0";

                    document.getElementsByClassName(Bubbles[y][x])[0].children[0].style.width = "90%";
                    document.getElementsByClassName(Bubbles[y][x])[0].children[0].src = SqrData.Image;

                    document.getElementsByClassName(Bubbles[y][x])[0].children[0].style.position = "relative";


                }


            }


            // document.getElementsByClassName(Bubbles[y][x])[0].style.left = -MidX*55+XfirstPix+X+"px";
            // document.getElementsByClassName(Bubbles[y][x])[0].style.top = -MidY*55+YfirstPix+Y+"px";

            X = X+xGen;
        }

        Y = Y+yGen;
    }

    LastMidX = MidX;
    LastMidY = MidY;
};

function hex(a,b,c){
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


    re = re + (str[ Math.floor(Red/16)] ? str[Math.floor(Red/16)] : "f")  +  (str[Red%16] ? str[Red%16] : "f");
    re = re + (str[ Math.floor(Green/16)] ? str[Math.floor(Green/16)] : "f")  +  (str[Green%16] ? str[Green%16] : "f");
    re = re + (str[ Math.floor(Blue/16)] ? str[Math.floor(Blue/16)] : "f")  +  (str[Blue%16] ? str[Blue%16] : "f");





    return re;
}

document.addEventListener("DOMContentLoaded", function(){
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        window.location.href = "https://hxx.lol/m";
    }

    let fit = Math.sqrt(Squares.length) - Math.floor(Math.sqrt(Squares.length)) === 0;

    mapSize = fit ? Math.sqrt(Squares.length) : Math.floor(Math.sqrt(Squares.length))+1;


    for (let i = 0; i <mapSize; i++) {
        Bubbles[i] = [];
    }

    for (let i = 0; i < Squares.length; i++) {
        Bubbles[Math.floor(i/mapSize)][i-Math.floor(i/mapSize)*mapSize] = i;
    }


    if (document.cookie === ""){
        document.cookie = "moved=0;";
    }

    for (let i = 0; i < Squares.length; i++){
        let button = document.createElement("button");
        let h2 = document.createElement("h2");
        let h6 = document.createElement("h6");
        let img = document.createElement("img");


        h2.textContent = Squares[i].Name;
        button.style.backgroundColor = "#" + Squares[i].Color;
        h2.style.color = "#" + hex(Squares[i].Color,"333333", +1);
        h6.style.color = "#" + hex(Squares[i].Color,"111111", +1);
        button.style.borderColor = "#" + hex(Squares[i].Color,"111111", -1);

        button.style.boxShadow = "0 0  30px 3px  #"+hex(Squares[i].Color,"111111", +1);



        button.style.left = window.innerWidth/2+"px";
        button.style.top = window.innerHeight/2+"px";

        button.style.width =  "50px";
        button.style.height = "50px";

        button.id = "bubble_"+Squares[i].id;

        button.classList.add("Square");
        button.classList.add(i);

        img.classList.add("Icon");

        button.appendChild(img);

        button.appendChild(h2);
        button.appendChild(h6);


        document.getElementById("Bubbles").appendChild(button);
    }


    //document.getElementsByClassName(Bubbles[y][x])[0].style.left = -MidX*55+XfirstPix+X+"px";
    //document.getElementsByClassName(Bubbles[y][x])[0].style.top = -MidY*55+YfirstPix+Y+"px";






    document.getElementById("CloseButton").addEventListener("click", function(event) {
        if (inUi)  ent();
    });

    let parts = new URLSearchParams(  window.location.search);
    let Found = 0;
    for (let i = 0;i<Squares.length;i++){
        if (parts.get('bubble')){} else {Found= 1;break;}
        if (Squares[i].id.toLowerCase() === parts.get('bubble').toLowerCase()){
            MidY = Math.floor(i/mapSize);
            MidX = i%mapSize;
            Found = 1;
        }
    }

    if(Found){}else{
        MessageIt("找不到泡泡。","鴨鴨說他很不好意思，他找不到你想要的泡泡。🤔");
    }

    a();
});



let inUi = false;

function getLim(_x,_y){
    if (Bubbles[_y][_x]){}else{return 0;};
    if (document.getElementsByClassName(Bubbles[_y][_x])[0].id === "bubble_m100") return LimSquares["Moved100"];
}

let lastTimeEnt = new Date().getTime();

async function ent(a){
    if(a){
        console.log(a,inUi);
        if(inUi){
            tweenMove(document.getElementById("Card"),window.innerWidth/2,window.innerHeight/2,1,1);
            tweenMove(document.getElementById("CloseButton"),window.innerWidth/2,100,1,1);

        }
        return;
    }


    if (((new Date().getTime()) - lastTimeEnt)>=150){
        lastTimeEnt= new Date().getTime();
    }else{
        return;
    }



    let SqrData = Squares[MidY*mapSize+MidX];

    if(!SqrData) SqrData = getLim(MidX,MidY);




    if (inUi){
        inUi = false;



        tweenSize(document.getElementById("Card"),100,0,1,6);
        tweenMove(document.getElementById("Card"),window.innerWidth/2,window.innerHeight,0.000001,1);

        document.getElementById("TopBar").style.borderWidth =  "0";
        document.getElementById("TopBar").style.borderColor = "rgba(0,0,0,0)";


        await sleep(100);

        document.getElementById("TopBarImg").src = "";
        document.getElementById("TopBarText").textContent = "";

        tweenMove(document.getElementById("Card"),0,-300,0.000001,1);
        tweenMove(document.getElementById("CloseButton"),window.innerWidth/2,-200,2,1);

        let n = document.getElementsByClassName("Case").length;
        for (let i =0 ;i<n;i++){
            document.getElementById("Page").removeChild(document.getElementsByClassName("Case")[document.getElementsByClassName("Case").length-1]);
        }


        async function _blur(){
            for (let i = 10;i>3;i--){
                document.getElementById("BackGround").style.filter = "blur("+i+"px)";
                await sleep(50);
            }

        }
        _blur();



    }else{
        inUi = true;

        tweenSize(document.getElementsByClassName(Bubbles[MidY][MidX])[0],96,96,1,10,true);
        await sleep(70);
        tweenSize(document.getElementsByClassName(Bubbles[MidY][MidX])[0],110,110,1,10,true);

        if (SqrData.id === "7sf") MessageIt("太陽魚！","太陽魚是Hxx最好的好友。Hxx對我的愛都轉移到了他身上啊！！！😭");
        if (SqrData.id === "m100") MessageIt("100次移動！","恭喜完成100次移動！😗");
        if (SqrData.id === "minecraft") MessageIt("Minecraft！","話說你玩過Minecraft嗎？ 如果有，你可以想盡辦法聯繫到Hxx並與他共玩！");

        document.getElementById("Card").style.backgroundColor = "#" + SqrData.Color+"AA";
        document.getElementById("Card").style.borderColor = "#" + hex(SqrData.Color,"111111",-1);
        document.getElementById("Card").style.color = "#" + hex(SqrData.Color,"311141", 1);

        document.getElementById("TopBar").style.backgroundColor =  "#" + hex(SqrData.Color,"112211",-1)+"7A";
        document.getElementById("TopBar").style.borderWidth =  "3px";
        document.getElementById("TopBar").style.borderColor =  "#" + hex(SqrData.Color,"111111",-1);


        document.getElementById("Card").style.boxShadow = "0 0 300px 30px #"+hex(SqrData.Color,"111111", +1);
        document.getElementById("TopBar").style.boxShadow =  "0 0 30px #"+hex(SqrData.Color,"333333",+1);

        document.getElementById("TopBarText").style.color =  "#" + hex(SqrData.Color,"311141", 1);


        document.getElementById("CloseButton").style.border =  "3px solid  #" + hex(SqrData.Color,"311141", +1);
        document.getElementById("CloseButton").style.boxShadow =  "0 0 30px   #" + hex(SqrData.Color,"311141", 1);
        document.getElementById("CloseButton").style.backgroundColor =  "#" + SqrData.Color+"EA";


        let Emojis = [
            '🫠','🤔','🥸','💪','💩','📖','😶‍🌫️','🤐','🙄','😯','😪','🐟'
        ]
        document.getElementById("CloseButton").textContent = Emojis[Math.floor(Math.random()*Emojis.length)];






        document.getElementById("TopBarImg").src = SqrData.Image;
        document.getElementById("TopBarText").textContent = SqrData.Name;





        tweenMove(document.getElementById("Card"),window.innerWidth/2,window.innerHeight,0.000001,1);
        await tweenMove(document.getElementById("CloseButton"),window.innerWidth/2,-200,0.000001,1);

        tweenMove(document.getElementById("CloseButton"),window.innerWidth/2,100,4,1);


        await sleep(100);
        document.getElementById("Card").style.height = "auto";
        document.getElementById("Card").style.width = "auto";

        await tweenSize(document.getElementById("Card"),
            500,
            500
            ,.1,1);


        tweenMove(document.getElementById("Card"),window.innerWidth/2,window.innerHeight/2,1,10);

        let LoadCase =  document.createElement('div');
        let LoadBox =  document.createElement('h1');
        LoadBox.textContent = "🧋";
        LoadCase.style.display = "flex";
        LoadCase.style.justifyContent = "center";
        LoadCase.style.alignItems = "center";

        LoadCase.classList.add("Case");
        LoadBox.classList.add("LoadBox");



        LoadCase.appendChild(LoadBox);
        document.getElementById("Page").appendChild(LoadCase);

        async function _blur(){
            for (let i = 3;i<10;i++){
                document.getElementById("BackGround").style.filter = "blur("+i+"px)";
                await sleep(50);
            }
        }
        _blur();


        const Http = new XMLHttpRequest();
        const url= SqrData.Page;
        Http.open("GET", url);
        Http.send();


        Http.onload = async function() {
            document.getElementById("Page").removeChild(LoadCase);

            if (inUi){
                await sleep(10);

                let Data = JSON.parse(Http.responseText);
                for (let i = 0;i<Data.length;i++){

                    let CaseE = document.createElement('div');
                    if (i === 0) CaseE.style.paddingTop="30px";
                    CaseE.classList.add("Case");

                    let Title = Data[i]["Title"];
                    let TitleE = document.createElement('h1');
                    TitleE.textContent = Data[i]["Title"];
                    TitleE.classList.add("Title");
                    TitleE.style.color = "#" + hex(SqrData.Color,"444444", +1);
                    CaseE.appendChild(TitleE);



                    let Content = Data[i]["Content"];
                    let ContentE = document.createElement('h6');
                    ContentE.textContent = Data[i]["Content"];
                    ContentE.classList.add("Content");
                    ContentE.style.color = "#" + hex(SqrData.Color,"222222", +1);
                    CaseE.appendChild(ContentE);


                    let Images = Data[i]["Images"];

                    if (Images){
                        let ImagesCaseE = document.createElement('div');
                        ImagesCaseE.classList.add("ImagesCase");


                        for (let ImageIndex = 0 ;ImageIndex<Images.length; ImageIndex++){
                            let ImageE = document.createElement('img');
                            ImageE.classList.add("Image");
                            ImageE.src = Images[ImageIndex]["Image"];
                            ImageE.alt = Images[ImageIndex]["Text"];
                            ImageE.style.borderColor = "#" + hex(SqrData.Color,"222222", +1);




                            ImagesCaseE.appendChild(ImageE);

                        }
                        CaseE.appendChild(ImagesCaseE);
                    }

                    let Links = Data[i]["Links"];


                    if (Images){
                        let LinksCaseE = document.createElement('div');
                        LinksCaseE.classList.add("LinksCase");


                        for (let LinksIndex = 0 ;LinksIndex<Links.length; LinksIndex++){
                            let LinkE = document.createElement('a');
                            LinkE.classList.add("Link");
                            LinkE.href = Links[LinksIndex]["Link"];
                            LinkE.text = Links[LinksIndex]["Text"];
                            LinkE.style.color = "#" + hex(SqrData.Color,"444444", +1);




                            LinksCaseE.appendChild(LinkE);

                        }
                        CaseE.appendChild(LinksCaseE);
                    }

                    let Line = Data[i]["Line"];

                    if (Line){
                        let LineE = document.createElement('div');
                        LineE.classList.add("Line");
                        LineE.style.backgroundColor = "#" + hex(SqrData.Color,"222222", +1);
                        CaseE.appendChild(LineE);
                    }



                    document.getElementById("Page").appendChild(CaseE);
                }
            }
        }

    }




}

document.addEventListener("keydown", function(event) {
    if (inUi) return;
    if (event.key === "ArrowUp") {

        if ( MidY-1 >= 0 && (typeof Bubbles[MidY-1][MidX]) === "number" ){
            MidY += -1;
        }else{

            return;
        }


        a();
    }
    if (event.key === "ArrowDown") {
        if ( MidY+1<=mapSize-1 &&  typeof Bubbles[MidY+1][MidX]  === "number" ){
            MidY += 1;
        }else{
            return;
        }

        a();
    }

    if (event.key === "ArrowLeft") {
        if (  MidX-1 >= 0 && typeof  Bubbles[MidY][MidX-1] === "number"){
            MidX += -1;
        }else{
            return;
        }

        a();
    }
    if (event.key === "ArrowRight") {
        if ( MidX+1<=mapSize-1  && typeof  Bubbles[MidY][MidX+1] === "number" ){
            MidX += 1;
        }else{
            return;
        }

        a();
    }


});
document.addEventListener("keypress", function(event) {
    if (inUi) return;

    if (event.key === "Enter") {
        ent()
    }

});


let hasBeenMoved = false;
let isHolding = false;

document.addEventListener('mousedown', (m) => {
    if (inUi) return;

    isHolding = true;
    hasBeenMoved = false;

    X0 = m.clientX;
    Y0 = m.clientY;

    console.log( m.clientX, m.clientY);
});
document.addEventListener('mouseup', (m) => {

    isHolding = false;

    if (!hasBeenMoved)  {
        if (m.target.classList[0] !== "MessageTouchBox")
        {
            let sa = function(zzz){

                if (zzz) {
                    if(zzz.id === "body")return false;
                }else{
                    return false;
                }

                if (zzz.id === "Card" ||zzz.id === "CloseButton"){

                    return true;
                }else{

                    return sa( zzz.parentElement);
                }
            }
            if (sa( m.target)){

            }else{

                ent();
            }
        }

    }

});


let X0 = 0;
let Y0 = 0;

document.addEventListener('mousemove', (m) => {

    if (isHolding){
        if (inUi){
            X0 = m.clientX;
            Y0 = m.clientY;

            return;
        }

        if (X0&&Y0){}else{
            X0 = m.clientX;
            Y0 = m.clientY;
        }


        if (Math.abs(m.clientX - X0  ) > 75){
            let db =  X0-m.clientX > 0;
            let IF = db?(MidX+1<mapSize ? (typeof  Bubbles[MidY][MidX+1]) === "number":false): (MidX-1>=0 ? (typeof  Bubbles[MidY][MidX-1]) === "number" : false);


            if (IF){
                hasBeenMoved = true;

                if (db){
                    MidX=MidX+1;
                }else{
                    MidX=MidX-1;

                }

                a();

            }
            X0 = m.clientX;


        }

        console.log(m.clientY,Y0);
        if (Math.abs(m.clientY -Y0) > 75){
            let db =  Y0-m.clientY > 0;
            let IF = db?(MidY+1<mapSize ? (typeof  Bubbles[MidY+1][MidX]) === "number":false): (MidY-1>=0 ? (typeof  Bubbles[MidY-1][MidX]) === "number" : false);

            console.log(db);

            if (IF){
                hasBeenMoved = true;
                if (db){
                    MidY=MidY+1;
                }else{
                    MidY=MidY-1;

                }

                a();


            }
            Y0 = m.clientY;

        }
    }else{
        if (m.target.classList[0] === "MessageTouchBox"){
            let SizeBoxX_P2 =m.target.getBoundingClientRect().width/2;
            let SizeBoxY_P2 =m.target.getBoundingClientRect().height/2;

            let PosBoxX =m.target.getBoundingClientRect().left;
            let PosBoxY =m.target.getBoundingClientRect().top;

            let MouseX = m.clientX;
            let MouseY = m.clientY;

            let _X = ( MouseX -PosBoxX )-SizeBoxX_P2;
            let _Y = (MouseY - PosBoxY )-SizeBoxY_P2;

            for (let i = 0;i<   document.getElementById("MessagesCase").children.length;i++){
                document.getElementById("MessagesCase").children[i].style.transform = "rotate3d("+(_X/SizeBoxX_P2*7)+" ,"+(_Y/SizeBoxY_P2*7)+ ","+((_X/SizeBoxX_P2)*(_Y/SizeBoxY_P2))+",18deg) translate(-50%,-50%)";
            }

        }
    }


})



window.addEventListener('resize', function() {
    a();
    ent(true);
});
