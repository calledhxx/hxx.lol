//CALLEDHXX Nov/2024

let Squares = [
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

        id : "sry"

    },
]

let Bubbles = [

];


let MidY = 0;
let MidX = 0;

let mapSize;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async  function tweenMove(obj,toX,toY,sec,lag){
    let perSecX = (toX-obj.style.left.substring(0,obj.style.left.length-2))/(sec*10);
    let perSecY = (toY-obj.style.top.substring(0,obj.style.top.length-2))/(sec*10);

    let X =  Number(obj.style.left.substring(0,obj.style.left.length-2));
    let Y = Number(obj.style.top.substring(0,obj.style.top.length-2));


    for (let i = 0;i<(10*sec);i++){

        obj.style.left = X+perSecX+"px";
        obj.style.top = Y+perSecY+"px";

        await sleep(lag);


        X =  Number(obj.style.left.substring(0,obj.style.left.length-2));
        Y = Number(obj.style.top.substring(0,obj.style.top.length-2));
    }

    obj.style.left = toX+"px";
    obj.style.top = toY+"px";

}

async  function tweenSize(obj,toX,toY,sec,lag){
    let perSecX = (toX-obj.style.width.substring(0,obj.style.width.length-2))/(sec*10);
    let perSecY = (toY-obj.style.height.substring(0,obj.style.height.length-2))/(sec*10);

    let X =  Number(obj.style.width.substring(0,obj.style.width.length-2));
    let Y = Number(obj.style.height.substring(0,obj.style.height.length-2));


    for (let i = 0;i<(10*sec);i++){

        obj.style.width = X+perSecX+"px";
        obj.style.height = Y+perSecY+"px";

        await sleep(lag);


        X =  Number(obj.style.width.substring(0,obj.style.width.length-2));
        Y = Number(obj.style.height.substring(0,obj.style.height.length-2));
    }

    obj.style.width = toX+"px";
    obj.style.height = toY+"px";


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
    console.log(Bubbles);

    for (let i = 0; i <NewMapSize; i++) {
        newBubbles[i] = [];
    }

    console.log(mapSize,NewMapSize);

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

    Bubbles = newBubbles;
    mapSize = NewMapSize;

    console.log(newBubbles);




    let button = document.createElement("button");
    let h2 = document.createElement("h2");
    let h6 = document.createElement("h6");
    let img = document.createElement("img");


    h2.textContent =BubbleSqr.Name;
    button.style.backgroundColor = "#" + BubbleSqr.Color;
    h2.style.color = "#" + hex(BubbleSqr.Color,"333333", +1);
    h6.style.color = "#" + hex(BubbleSqr.Color,"111111", +1);
    button.style.borderColor = "#" + hex(BubbleSqr.Color,"111111", -1);

    button.style.boxShadow = "0 0 10px #"+hex(BubbleSqr.Color,"111111", +1);





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
    }




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

            if(!SqrData) SqrData = getLim(y,x);


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
                6)




            if (MidX - x === 0 && MidY - y === 0){
                tweenSize(document.getElementsByClassName(Bubbles[y][x])[0],110,110,1,10);
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
                tweenSize(document.getElementsByClassName(Bubbles[y][x])[0],50,50,1,10);
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

        button.style.boxShadow = "0 0 10px #"+hex(Squares[i].Color,"111111", +1);



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

    let parts = new URLSearchParams(  window.location.href);

    for (let i = 0;i<Squares.length;i++){
        if (parts.get('bubble')){} else break;
        if (Squares[i].id.toLowerCase() === parts.get('bubble').toLowerCase()){
            MidY = Math.floor(i/mapSize);
            MidX = i%mapSize;
        }
    }


    a();

    document.getElementById("CloseButton").addEventListener("click", function(event) {
        if (inUi)  ent();

    });

});

let isHolding = false;

let OXPix = 0;
let OYPix = 0;

let inUi = false;

function getLim(_x,_y){
    if (document.getElementsByClassName(Bubbles[_y][_x])[0].id === "bubble_m100") return LimSquares["Moved100"];
}

async function ent(){

    tweenSize(document.getElementsByClassName(Bubbles[MidY][MidX])[0],96,96,1,10);
    await sleep(70);
    tweenSize(document.getElementsByClassName(Bubbles[MidY][MidX])[0],110,110,1,10);
    
    
    let SqrData = Squares[MidY*mapSize+MidX];

    if(!SqrData) SqrData = getLim(MidY,MidX);


    if (inUi){
        inUi = false;

        tweenSize(document.getElementById("Page"),100,0,1,6);
        tweenMove(document.getElementById("Page"),window.innerWidth/2,window.innerHeight,0.000001,1);

        document.getElementById("TopBar").style.borderWidth =  "0";
        document.getElementById("TopBar").style.borderColor = "rgba(0,0,0,0)";


        await sleep(100);

        tweenMove(document.getElementById("Page"),0,-100,0.000001,1);
        tweenMove(document.getElementById("CloseButton"),window.innerWidth/2,-200,2,1);

        let n = document.getElementsByClassName("Case").length;
        for (let i =0 ;i<n;i++){
            document.getElementById("Page").removeChild(document.getElementsByClassName("Case")[document.getElementsByClassName("Case").length-1]);
        }


    }else{
        inUi = true;

        document.getElementById("Page").style.backgroundColor = "#" + SqrData.Color+"AA";
        document.getElementById("Page").style.borderColor = "#" + hex(SqrData.Color,"222222",-1);
        document.getElementById("Page").style.color = "#" + hex(SqrData.Color,"311141", 1);

        document.getElementById("TopBar").style.backgroundColor =  "#" + hex(SqrData.Color,"112211",-1)+"EA";
        document.getElementById("TopBar").style.borderWidth =  "0";
        document.getElementById("TopBar").style.borderColor =  "#" + hex(SqrData.Color,"112211",-1);

        document.getElementById("Page").style.boxShadow = "0 0 30px #"+hex(SqrData.Color,"111111", +1);
        document.getElementById("TopBar").style.boxShadow =  "0 0 30px #"+hex(SqrData.Color,"112211",-1);

        document.getElementById("TopBarText").style.color =  "#" + hex(SqrData.Color,"311141", 1);


        document.getElementById("CloseButton").style.border =  "3px solid  #" + hex(SqrData.Color,"311141", +1);
        document.getElementById("CloseButton").style.boxShadow =  "0 0 30px   #" + hex(SqrData.Color,"311141", 1);
        document.getElementById("CloseButton").style.backgroundColor =  "#" + SqrData.Color+"EA";

        let Emojis = [
            '🫠','🤔','🥸','💪','💩','📖','😶‍🌫️','🤐','🙄','😯','😪'
        ]
        console.log(Math.floor(Math.random()*Emojis.length));
        document.getElementById("CloseButton").textContent = Emojis[Math.floor(Math.random()*Emojis.length)];



        document.getElementById("TopBarImg").src = SqrData.Image;
        document.getElementById("TopBarText").textContent = SqrData.Name;





        tweenMove(document.getElementById("Page"),window.innerWidth/2,window.innerHeight,0.000001,1);
        await tweenMove(document.getElementById("CloseButton"),window.innerWidth/2,-200,0.000001,1);

        tweenMove(document.getElementById("CloseButton"),window.innerWidth/2,100,4,1);


        await sleep(100);
        document.getElementById("Page").style.height = "auto";
        document.getElementById("Page").style.width = "auto";

        await tweenSize(document.getElementById("Page"),
            500,
            500
            ,.1,1);


        tweenMove(document.getElementById("Page"),window.innerWidth/2,window.innerHeight/2,1,10);





        const Http = new XMLHttpRequest();
        const url= SqrData.Page;
        Http.open("GET", url);
        Http.send();


        Http.onload = async function() {
            if (inUi){
                await sleep(10);

                let Data = JSON.parse(Http.responseText);
                console.log(Data);
                for (let i = 0;i<Data.length;i++){
                    let CaseE = document.createElement('div');
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

document.addEventListener('mousedown', () => {
    if (inUi) return;


    isHolding = true;
    OYPix =  window.event.clientY;
    OXPix =  window.event.clientX;
});

let moved = false;

document.addEventListener('mouseup', () => {
    if (inUi) return;


    isHolding = false;
    if (moved){}else{
        console.log("aaa");
        ent();
    }
    moved = false;

});



document.addEventListener('mousemove', () => {
    if (inUi) return;



    if (isHolding) {
        if (Math.floor(Math.abs((OXPix - window.event.clientX)/80))>0){
            let db = (OXPix - window.event.clientX)/80>0;

            let IF = db ? (MidX+1<=mapSize-1 && (typeof Bubbles[MidY][MidX+1] === "number")): (MidX-1 >= 0 && (typeof Bubbles[MidY][MidX-1] === "number"));


            if (IF ){
                moved = true;
                if (db){
                    MidX += 1;

                }else{
                    MidX += -1;
                }
            }else{
                return;
            }


            a();
            OXPix =  window.event.clientX;
        }
        if (Math.floor(Math.abs((OYPix - window.event.clientY)/80))>0){
            let db = (OYPix - window.event.clientY)/80>0;

            let IF = db ? (MidY+1<=mapSize-1 && (typeof Bubbles[MidY+1][MidX] === "number")) : (MidY-1 >= 0 && (typeof Bubbles[MidY-1][MidX] === "number"));

            if (IF ){
                moved = true;
                if (db) {
                    MidY += 1;

                } else {
                    MidY += -1;
                }

            }else{
                return;
            }

            a();

            OYPix =  window.event.clientY;
        }
    }

})



window.addEventListener('resize', function() {
    a();
});

