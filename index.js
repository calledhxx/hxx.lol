let CubeSideSize = 220;


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function checkIfMobile() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

let blockObjs = [
    {
        "id":"box",
        "class":null,
        "return":0
    },
    {
        "id":"DynamicBubbleBase",
        "class":null,
        "return":1
    }
];


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
    let Pushing = 0;


    let buttons = [
        {
            "Side": 1,
            "Chunk": 1,
            "Color":"#e8a428",
            "depth":24,
            "Icon": "./img/a9a72e835d8a6266b636180a30014def.png",
            "Name":"太陽魚",
            "Tag":"Sunfish"
        },

        {
            "Side": 6,
            "Chunk": 1,
            "Color":"#512509",
            "depth":24,
            "Icon": null,
            "Name":"太陽魚",
            "Tag":"Sunfish"
        },

        {
            "Side": 5,
            "Chunk": 1,
            "Color":"#72a830",
            "depth":24,
            "Icon": "./img/a9a72e835d8a6266b636180a30014def.png",
            "Name":"太陽魚",
            "Tag":"Sunfish"
        },

        {
            "Side": 5,
            "Chunk": 4,
            "Color":"#cf4343",
            "depth":24,
            "Icon": "./img/a9a72e835d8a6266b636180a30014def.png",
            "Name":"太陽魚",
            "Tag":"Sunfish"
        },


        {
            "Side": 1,
            "Chunk": 2,
            "Color":"#e4e4e4",
            "depth":24,
            "Icon": "./img/32f8f2203ecb889671ddd843e2d737b9.png",
            "Name":"破魚大帝",
            "Tag":"ProFish"

        },


        {
            "Side": 1,
            "Chunk": 4,
            "Color":"#7441cd",
            "depth":24,
            "Icon": "./img/160889760.png",
            "Name":"黃太妃",
            "Tag":"Hxx"

        },
        {
            "Side": 1,
            "Chunk": 3,
            "Color":"#e4e4e4",
            "depth":24,
            "Icon": "./img/3cefb2f1f8b976328364daafe647af0d.png",
            "Name":"彭搭特",
            "Tag":"DrPon"
        },


        {
            "Side": 2,
            "Chunk": 1,
            "Color":"#0a85b1",
            "depth":24,
            "Icon": "./img/52929faad24d847a8c75de0d10dd082e.png",
            "Name":"JD大臣",
            "Tag":"JD"
        },

        {
            "Side": 2,
            "Chunk": 4,
            "Color":"#bac5a3",
            "depth":24,
            "Icon": "./img/IMG_20250408_223421_737.jpg",
            "Name":"Weason",
            "Tag":"Weason"
        },
        {
            "Side": 2,
            "Chunk": 3,
            "Color":"#fa7965",
            "depth":24,
            "Icon": "./img/148810bbcbcc4db37d2ec8188a8a6399.png",
            "Name":"Ira Nomas",
            "Tag":"ironman"
        },
        {
            "Side": 2,
            "Chunk": 2,
            "Color":"#202020",
            "depth":24,
            "Icon": "./img/62993182ae16f24ad926f01f9bafa892.png",
            "Name":"水泥人",
            "Tag":"Dummy"
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


        let frontMain = document.createElement("div");


        if(buttons[i].Icon)
        {
            let frontIcon = document.createElement("img");
            frontIcon.style.borderColor = hex(buttons[i].Color,"404040",-1);
            frontIcon.src = buttons[i].Icon;
            frontMain.appendChild(frontIcon);
        }
        else
        {
            let frontTitle = document.createElement("h1");
            frontTitle.style.borderColor = hex(buttons[i].Color,"404040",-1);
            frontTitle.textContent = buttons[i].Name.substring(0, 1);
            frontMain.appendChild(frontTitle);
        }


        frontMain.style.borderColor = hex(buttons[i].Color,"252525",-1);
        frontMain.style.backgroundColor = hex(buttons[i].Color,"181818",-1);

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
        newLeftSide.children[0].textContent = buttons[i].Name;
        newRightSide.children[0].textContent = buttons[i].Tag;

        newOne.style.color = hex(buttons[i].Color,"121212",1);

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



    function TweenUp(db,smoothSec){
        smoothSec = smoothSec ? smoothSec : 0.1;
        if(db){
            document.getElementById("passZFront").style.transition =
                document.getElementById("passZBack").style.transition =
                    document.getElementById("passZBack").style.transition =
                        document.getElementById("passXFront").style.transition =
                            document.getElementById("passXBack").style.transition =
                                document.getElementById("passYFront").style.transition =
                                    document.getElementById("passYBack").style.transition = `all ${smoothSec}s ease-out`;



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

            buttonElements[i].getElementsByClassName("buttonRightSide")[0].style.transform =
                buttons[i].Side < 5 ? `rotateX(${yMoved}deg) rotateY(${xMoved+90}deg) translateX(${String(addZ)}px) translateY(${String(addY)}px) translateZ(${String(addX+40)}px)`
                    : `rotateX(${(buttons[i].Side === 6 ? -1 : 1 )*(yMoved+90)}deg) rotateY(${(-xMoved-270)}deg) rotateZ(${(buttons[i].Side === 6 ? 1 : 1 )*270}deg) translateX(${String(addZ)}px)  translateY(${String(addY+(buttons[i].Side === 6 ? 110 : 0 ))}px) translateZ(${String(addX+40)}px)`


            buttonElements[i].getElementsByClassName("buttonLeftSide")[0].style.transform =
                buttons[i].Side < 5  ? `rotateX(${yMoved}deg) rotateY(${xMoved-90}deg) translateX(${String(-addZ)}px) translateY(${String(addY)}px) translateZ(${String(-addX + 40)}px)`
                    : `rotateX(${(buttons[i].Side === 6 ? -1 : 1 )*(yMoved+90)}deg) rotateY(${-xMoved-90 }deg) rotateZ(${(buttons[i].Side === 6 ? 1 : 1 )*90}deg) translateX(${String(-addZ)}px)  translateY(${String(addY+(buttons[i].Side === 6 ? 110 : 0 ))}px) translateZ(${String(-addX + 40 )}px)`;


            if(
                buttons[i].Side < 5 ?
                    (YtoFXnFZDeg < 90  ? toFXDeg < 90 : toFXDeg > 90)
                    :
                    (toFYDeg < 90  ? (buttons[i].Side  !== 6 ? toFXDeg < 90 :  toFXDeg > 90) : (buttons[i].Side  !== 6 ? toFXDeg > 90 :  toFXDeg < 90))
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

    TweenUp(true,.1);

    moving(0,0);

    await sleep(400);
    moving(0,-10);
    await sleep(400);
    moving(-15,-10);
    await sleep(400);

    for (let i = 0; i < 4; i++){
        moving(-90*(i+1) - 15,-10);
        await sleep(100);
    }

    await sleep(120);

    let xMoved = 0,yMoved = 0;


    xLastMoved = xMoved =  -375;
    yLastMoved = yMoved = -10;

    let startAt = 0;

    let mouseOnButtons = [];
    let depthOfButtons = {};

    let StartAtElement;

    function getFinalElementWitchAtPoint(x,y){
        let FinalElement = null;
        let ElementsWitchAtPoint = document.elementsFromPoint(x,y);

        let IfFindBlockObj = function(ifHasToRETURN){
            for (let i = 0;i<blockObjs.length;i++)
                if(blockObjs[i].return === ifHasToRETURN)
                    if (retIfParentMatch(ElementsWitchAtPoint[i],blockObjs[i].id,blockObjs[i].class,false)) return true;


            return false;
        }

        for (let i = 0; i < ElementsWitchAtPoint.length; i++) {
            if(IfFindBlockObj(1)) return -1;
            if(IfFindBlockObj(0)) return 1;

            FinalElement = retIfParentMatch(ElementsWitchAtPoint[i],0,"button",true);
            if(FinalElement) break;
        }

        return FinalElement;
    }

    let startMove = async function (x,y)
    {
        if(Date.now() - startAt < 140) return;

        let FinalElement = getFinalElementWitchAtPoint(x,y);

        if(FinalElement && FinalElement !== -1 && FinalElement !== 1){
            if(mouseOnButtons[FinalElement.id]) return;
            StartAtElement = FinalElement;
            mouseOnButtons[FinalElement.id] = FinalElement;

            Pushing = true;



            FinalElement.style.fontSize = "0px";


            TweenUp(true);

            depthOfButtons[FinalElement.id] =  buttons[Number(FinalElement.id)].depth;
            buttons[Number(FinalElement.id)].depth = 6;


            FinalElement.getElementsByClassName("buttonBackSide")[0].style.boxShadow =
                "black 0 0 5px 1px"


            FinalElement.getElementsByClassName("buttonTopSide")[0].children[0].style.height =
                FinalElement.getElementsByClassName("buttonBottomSide")[0].children[0].style.height =
                    FinalElement.getElementsByClassName("buttonLeftSide")[0].children[0].style.width =
                        FinalElement.getElementsByClassName("buttonRightSide")[0].children[0].style.width = String(buttons[Number(FinalElement.id)].depth)+"px";

            moving(xLastMoved,yLastMoved);
        }else if(!Holding && !Pushing && FinalElement !== -1){
            Holding = true;

            TweenUp(false);


            xStartScreen = x;
            yStartScreen = y;

            xMoved = (x - xStartScreen)/3 + xLastMoved;
            yMoved = (-y +   yStartScreen)/3 + yLastMoved;

            startAt = Date.now();
        }


    }

    let lastToX = 0;
    let lastToY = 0;

    let lastDbX = -1;
    let lastDbY = -1;

    let endMove = async function (x,y){
        if(Holding){
            Holding = false;

            let totalMs = Date.now() - startAt;


            let toX =(xMoved - xLastMoved)/(totalMs/200);
            let toY = (yMoved - yLastMoved)/(totalMs/200);

            let dbX = (xMoved - xLastMoved) > 0;
            let dbY = (yMoved - yLastMoved) > 0;

            if(lastDbX===dbX && lastToX !== 0 && Math.abs(lastToX) < Math.abs(toX)) toX += lastToX;
            if(lastDbY===dbY && lastToY !==0 && Math.abs(lastToY) < Math.abs(toY)) toY+=lastToY;

            lastToX = toX;
            lastToY = toY;

            lastDbX = dbX;
            lastDbY = dbY;

            xLastMoved = xMoved;
            yLastMoved = yMoved;

            moving(xMoved,yMoved);

            for (let index = 0;;index++){

                if(dbX ? toX > 0 : toX < 0) toX= dbX ? toX-2 : toX+2; else toX = 0;
                if(dbY ? toY > 0 : toY < 0)  toY= dbY ? toY-2 : toY+2; else toY = 0;


                if(
                    ((dbX ? toX <= 0 : toX >= 0) && (dbY ? toY <= 0 : toY >= 0)) ||
                    Holding || Pushing
                ) break;

                await moving(xMoved+toX/50,yMoved+toY/50);

                xLastMoved = xMoved = xMoved+toX/50;
                yLastMoved = yMoved = yMoved+toY/50;

                await sleep(1);
            }


        }else if(Pushing){
            Pushing = false;

            for (let i in mouseOnButtons){
                if(!mouseOnButtons[i]) continue;
                buttons[Number(mouseOnButtons[i].id)].depth = depthOfButtons[mouseOnButtons[i].id];

                mouseOnButtons[i].style.fontSize = "15px";

                mouseOnButtons[i] .getElementsByClassName("buttonBackSide")[0].style.boxShadow =
                    "black 0 0 10px 2px"

                mouseOnButtons[i] .getElementsByClassName("buttonTopSide")[0].children[0].style.height =
                    mouseOnButtons[i] .getElementsByClassName("buttonBottomSide")[0].children[0].style.height =
                        mouseOnButtons[i] .getElementsByClassName("buttonLeftSide")[0].children[0].style.width =
                            mouseOnButtons[i] .getElementsByClassName("buttonRightSide")[0].children[0].style.width = String(buttons[Number(mouseOnButtons[i] .id)].depth)+"px";

                moving(xLastMoved,yLastMoved);

                await sleep(100);


                TweenUp(false);

                mouseOnButtons[i] = null;
            }

            let FinalElement = getFinalElementWitchAtPoint(x,y);


            if(FinalElement === StartAtElement){
                await CreateDynamicBubbles("Page",[
                    {
                        "Title":"太陽魚",
                        "Content":"這是一尾有高智商的翻車魚，俗名太陽魚。名稱中的7是指第七代傳人。同時他也是陪伴了我三年之久的動物，我很捨不得吃，導致他皮肉豐厚，重量來到了1,000公噸，可賣好幾億阿！",
                    },
                    {
                        "Content":"這是一尾有高智商的翻車魚，俗名太陽魚。名稱中的7是指第七代傳人。同時他也是陪伴了我三年之久的動物，我很捨不得吃，導致他皮肉豐厚，重量來到了1,000公噸，可賣好幾億阿！",
                    },
                    {
                        "Content":"這是一尾有高智商的翻車魚，俗名太陽魚。名稱中的7是指第七代傳人。同時他也是陪伴了我三年之久的動物，我很捨不得吃，導致他皮肉豐厚，重量來到了1,000公噸，可賣好幾億阿！",
                    },
                    {
                        "Content":"這是一尾有高智商的翻車魚，俗名太陽魚。名稱中的7是指第七代傳人。同時他也是陪伴了我三年之久的動物，我很捨不得吃，導致他皮肉豐厚，重量來到了1,000公噸，可賣好幾億阿！",
                    },
                    {
                        "Content":"這是一尾有高智商的翻車魚，俗名太陽魚。名稱中的7是指第七代傳人。同時他也是陪伴了我三年之久的動物，我很捨不得吃，導致他皮肉豐厚，重量來到了1,000公噸，可賣好幾億阿！",
                    }
                ]);
            }
        }


        // moving((Math.floor((xMoved-45)/90)+1)*90,(Math.floor((yMoved-45)/90)+1)*90) ;
        //
        // xLastMoved = (Math.floor((xMoved-45)/90)+1)*90;
        // yLastMoved = (Math.floor((yMoved-45)/90)+1)*90;
    }

    let ToStableValue = checkIfMobile() ? 3 : 5;

    let Mmoving = function(x,y){
        xMoved = (x - xStartScreen)/ToStableValue + xLastMoved;
        yMoved = (-y +   yStartScreen)/ToStableValue + yLastMoved;

        moving(xMoved, yMoved);
    }

    document.addEventListener("mousedown", function (m) {

        startMove(m.clientX,m.clientY);
    });

    document.addEventListener("touchstart", function (m) {


        startMove(m.touches[0].clientX,m.touches[0].clientY);
    });



    if(checkIfMobile()) document.addEventListener("touchend", function (m ){
        console.log(m.changedTouches);
        endMove(m.changedTouches[0].clientX,m.changedTouches[0].clientY);
    }); else document.addEventListener("mouseup", function (m ){
        endMove(m.clientX,m.clientY);
    });



    document.addEventListener("mousemove", function (m) {
        if(!Holding) return;

        Mmoving(m.clientX,m.clientY);
    });

    document.addEventListener("touchmove", function (m) {
        if(!Holding) return;

        Mmoving(m.touches[0].clientX,m.touches[0].clientY);
    });


    function retIfParentMatch(e,id,cname,notFirst){
        if (!e.parentElement) return false;

        if(id){
            if(e ? (e.id === id) : false){
                if(notFirst) return false;
                return e;
            }else{
                return retIfParentMatch(e.parentElement, id,cname);
            }
        }else{
            if(e ? (e.classList.contains(cname)) : false){
                if(notFirst) return false;
                return e;
            }else{
                return retIfParentMatch(e.parentElement, id,cname);
            }
        }
    }

});

let DynamicBubbles = [];

async function TidyUpDynamicBubbles(){
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
        if(!DynamicBubbles[i]) break;
        DynamicBubbles[i].style.top = `${8 * (DynamicBubbles.length-1-i)}`;
        DynamicBubbles[i].style.width = `${100 - 5 * (DynamicBubbles.length-1-i)}%`;
        DynamicBubbles[i].style.opacity = `${1 - 0.25*(DynamicBubbles.length-1-i)}`;

        if(i !== DynamicBubbles.length-1){
            DynamicBubbles[i].style.height = "120px";
        }
    }

};

function FullViewBubble(){

}

async function CreateDynamicBubbles(BubbleType,Content){
    let Base = document.getElementById("DynamicBubbleBase");

    let newBubble = document.createElement("div");
    newBubble.classList.add("DynamicBubble");


    let newBubbleTypeTitle = document.createElement("h1");
    newBubbleTypeTitle.classList.add("DynamicBubbleTypeTitle");

    let newBubbleFrame = document.createElement("div");
    newBubbleFrame.classList.add("DynamicBubbleFrame");

    let newBubbleFrameBottomBar = document.createElement("div");
    newBubbleFrameBottomBar.classList.add("DynamicBubbleFrameBottomBar");

    switch (BubbleType){
        case "Notification": {
            newBubbleTypeTitle.innerText = "A Notification";

            setTimeout(async function(){
                newBubble.classList.add("NotificationBubble");
                newBubble.style.height = "120px";
            },280);
            break;
        }
        case "Page":{
            newBubbleTypeTitle.innerText = "A Page";

            setTimeout(async function(){
                newBubble.classList.add("PageBubble")
                newBubble.style.height = "330px";
            },280);
            break;
        }
    }

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

    newBubbleFrame.appendChild(newBubbleFrameBottomBar);
    newBubble.appendChild(newBubbleTypeTitle);
    newBubble.appendChild(newBubbleFrame);
    Base.appendChild(newBubble);



    await TidyUpDynamicBubbles();

};