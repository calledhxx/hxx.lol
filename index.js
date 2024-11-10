let Squares = [
    {

        Name:"个人档案",

        Details:"Hxx的個人檔案。",

        Image:"/f/img/0324.gif",

        Page:"/f/profile.json",

        Color: "472791",

        id : "main"

    },

    {

        Name:"哀居障号",

        Details:"Hxx的哀居帳號。",

        Image:"",

        Page:"/f/ig.json",

        Color: "deab34",

        id : "ig"

    },
    {
        Name:"低西連結",
        Details:"Hxx的低溪群族。",
        Image:"",
        Page:"/f/dc.json",
        Color: "2d6db3",

        id : "dc"

    },
    {
        Name:"Mione",
        Details:"Hxx的項目：程式語言。",
        Image:"",
        Page:"/f/mione.json",
        Color: "c65473",

        id : "mione"

    },
    {
        Name:"GitHub",
        Details:"Hxx的GitHub開源庫。",
        Image:"",
        Page:"/f/github.json",
        Color: "a4a4a4",

        id : "github"

    },
    {
        Name:"Spotify",
        Details:"Hxx的Spotify帳號。",
        Image:"",
        Page:"/f/spotify.json",
        Color: "63893e",

        id : "spty"

    },
    {
        Name:"Meow",
        Details:"meow meow meow",
        Image:"",
        Page:"/f/meow.json",
        Color: "735e8f",

        id : "meow"

    },
    {
        Name:"7SunFish",
        Details:"Hxx的好朋友",
        Image:"/f/img/a9a72e835d8a6266b636180a30014def.png",
        Page:"/f/7sf.json",
        Color: "ffb134",

        id : "7sf"

    },
]

let Bubbles = [

];


let MidY = 0;
let MidX = 0;

let fit;
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

let a = function(){
    let X = 0;
    let Y = 0;

    let XfirstPix = Math.floor(window.innerWidth/2)-Math.floor((mapSize/2)*55);
    let YfirstPix = Math.floor(window.innerHeight/2)-Math.floor((mapSize/2)*55);

    let xGen = 60;
    let yGen = 60;

    let CX = Math.floor(MidX/mapSize*30);
    let CY = Math.floor(MidY/mapSize*30);


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

                document.getElementsByClassName(Bubbles[y][x])[0].children[1].textContent = Squares[y*mapSize + x].Name;
                document.getElementsByClassName(Bubbles[y][x])[0].children[2].textContent = Squares[y*mapSize + x].Details;
                document.getElementsByClassName(Bubbles[y][x])[0].children[1].style.fontSize = "20px";
                document.getElementsByClassName(Bubbles[y][x])[0].children[2].style.fontSize = "13px";



                if ( Squares[y*mapSize + x].Image === ""){

                }   else{
                    document.getElementsByClassName(Bubbles[y][x])[0].children[0].src = "";
                    document.getElementsByClassName(Bubbles[y][x])[0].children[0].style.width = "0";
                    document.getElementsByClassName(Bubbles[y][x])[0].children[1].textContent = Squares[y*mapSize + x].Name;
                    document.getElementsByClassName(Bubbles[y][x])[0].children[1].style.fontSize = "20px";

                    document.getElementsByClassName(Bubbles[y][x])[0].children[0].style.position = "absolute";


                }


            }else{
                tweenSize(document.getElementsByClassName(Bubbles[y][x])[0],50,50,1,10);
                xGen = 60;

                document.getElementsByClassName(Bubbles[y][x])[0].children[1].textContent = Squares[y*mapSize + x].Name.substring(0,1);
                document.getElementsByClassName(Bubbles[y][x])[0].children[1].style.fontSize = "26px";

                document.getElementsByClassName(Bubbles[y][x])[0].children[2].textContent = Squares[y*mapSize + x].Details;
                document.getElementsByClassName(Bubbles[y][x])[0].children[2].style.fontSize = "0";



                if ( Squares[y*mapSize + x].Image === ""){
                    document.getElementsByClassName(Bubbles[y][x])[0].children[0].style.position = "absolute";


                }   else{
                    document.getElementsByClassName(Bubbles[y][x])[0].children[1].style.fontSize = "0";
                    document.getElementsByClassName(Bubbles[y][x])[0].children[2].style.fontSize = "0";

                    document.getElementsByClassName(Bubbles[y][x])[0].children[0].style.width = "90%";
                    document.getElementsByClassName(Bubbles[y][x])[0].children[0].src = Squares[y*mapSize + x].Image;

                    document.getElementsByClassName(Bubbles[y][x])[0].children[0].style.position = "relative";


                }


            }


           // document.getElementsByClassName(Bubbles[y][x])[0].style.left = -MidX*55+XfirstPix+X+"px";
           // document.getElementsByClassName(Bubbles[y][x])[0].style.top = -MidY*55+YfirstPix+Y+"px";

            X = X+xGen;
        }

        Y = Y+yGen;
    }
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

    fit = Math.sqrt(Squares.length) - Math.floor(Math.sqrt(Squares.length)) === 0;

    mapSize = fit ? Math.sqrt(Squares.length) : Math.floor(Math.sqrt(Squares.length))+1;


    for (let i = 0; i <mapSize; i++) {
        Bubbles[i] = [];
    }

    for (let i = 0; i < Squares.length; i++) {
        Bubbles[Math.floor(i/mapSize)][i-Math.floor(i/mapSize)*mapSize] = i;
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

});

let isHolding = false;

let OXPix = 0;
let OYPix = 0;

let inUi = false;

async function ent(){

    tweenSize(document.getElementsByClassName(Bubbles[MidY][MidX])[0],90,90,1,10);
    await sleep(70);
    tweenSize(document.getElementsByClassName(Bubbles[MidY][MidX])[0],110,110,1,10);




    if (inUi){
        inUi = false;

        tweenSize(document.getElementById("Page"),100,0,1,6);
        tweenMove(document.getElementById("Page"),window.innerWidth/2,window.innerHeight,0.000001,1);

        document.getElementById("Title").textContent =  "";
        document.getElementById("Content").innerHTML =  "";
        document.getElementById("Image").src =  "";
        document.getElementById("Image").style.borderWidth = "0";
        document.getElementById("Image").style.borderColor = "rgba(0,0,0,0)";

        document.getElementById("TopBar").style.borderWidth =  "0";
        document.getElementById("TopBar").style.borderColor = "rgba(0,0,0,0)";


        await sleep(100);

        tweenMove(document.getElementById("Page"),0,-100,0.000001,1);


    }else{
        inUi = true;

        document.getElementById("Page").style.backgroundColor = "#" + Squares[MidY*mapSize+MidX].Color;
        document.getElementById("Page").style.borderColor = "#" + hex(Squares[MidY*mapSize+MidX].Color,"222222",-1);
        document.getElementById("Page").style.color = "#" + hex(Squares[MidY*mapSize+MidX].Color,"311141", 1);

        document.getElementById("TopBar").style.backgroundColor =  "#" + hex(Squares[MidY*mapSize+MidX].Color,"112211",-1);
        document.getElementById("TopBar").style.borderWidth =  "0";
        document.getElementById("TopBar").style.borderColor =  "#" + hex(Squares[MidY*mapSize+MidX].Color,"112211",-1);



        tweenMove(document.getElementById("Page"),window.innerWidth/2,window.innerHeight,0.000001,1);


        await sleep(100);
        document.getElementById("Page").style.height = "auto";
        await tweenSize(document.getElementById("Page"),500,500,.1,1);
        document.getElementById("Page").style.height = "auto";

        tweenMove(document.getElementById("Page"),window.innerWidth/2,window.innerHeight/2,1,10);





        const Http = new XMLHttpRequest();
        const url= Squares[MidY*mapSize+MidX].Page;
        Http.open("GET", url);
        Http.send();


        Http.onreadystatechange = async function() {
           if (inUi){
               await sleep(10);

               document.getElementById("Title").textContent =  JSON.parse(Http.responseText)["title"];
               document.getElementById("Content").innerHTML =  JSON.parse(Http.responseText)["content"];
               document.getElementById("Image").src =  JSON.parse(Http.responseText)["image"];
               document.getElementById("Image").style.borderWidth = "3px";
               document.getElementById("Image").style.borderColor =  "#" + hex(Squares[MidY*mapSize+MidX].Color,"222222",1);



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

    if (event.key === "Enter") {
        ent()
    }

});

document.addEventListener('mousedown', () => {


    isHolding = true;
    OYPix =  window.event.clientY;
    OXPix =  window.event.clientX;
});

let moved = false;

document.addEventListener('mouseup', () => {


    isHolding = false;
    if (moved){}else{
        ent();
    }
    moved = false;

});



document.addEventListener('mousemove', () => {



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



