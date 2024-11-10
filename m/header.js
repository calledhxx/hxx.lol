document.addEventListener("DOMContentLoaded", function() {
    console.log("Hello");
    const Div = document.createElement("div");
    const Link = document.createElement("a");
    const C1 = document.createElement("h4");
    const C2 = document.createElement("h4");
    const MsgBox = document.createElement("div");
    Div.id = "lit-msg";
    Div.style = ""
        +"Position: fixed;"
        +"width : 430px !important; "
        +"height : 40px !important;"
        +"right:0;"
        +"bottom:0;"

    MsgBox.id  = "msg-box"
    MsgBox.style = ""
        +"background : linear-gradient(180deg,  black, #16092C);"

        +"width : 430px !important;"
        +"height : 40px !important;"
        +"position: absolute;"
        +"bottom : 0px;"
        +"right: 0 !important;"
        +"border-top-left-radius : 90px !important;"
        +"display: flex;\n" +
        "    justify-content: center;\n" +
        "    align-items: center;"
    Link.href = "https://hxx.lol"
    Link.textContent = "Hxx.lol"
    C1.textContent = " Main page : "
    C1.style = ""
        +"color : rgb(100,100,100);"
    +"font-size:0.1em;"+" text-shadow: black 0.1em 0.1em 1em"
    Link.style = ""
        +"color : rgb(150,150,150);"
        +"font-size:0.1em;"+" text-shadow: black 0.1em 0.1em 1em"
    C2.textContent = "You might get everything there."
    C2.style =  ""
        +"color : rgb(100,100,100);"
        +"font-size:0.1em;"+" text-shadow: black 0.1em 0.1em 1em"

    document.getElementById("body").appendChild(Div);
    MsgBox.appendChild(C1);
    MsgBox.appendChild(Link);
    MsgBox.appendChild(C2);
    Div.appendChild(MsgBox);
})