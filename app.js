let gameseq=[];
let userseq=[];

let btns=["red","blue","yellow","green"];


let start=false;
let level=0;
let body=document.querySelector("body")
let h2=document.querySelector("h2");
let allBtn=document.querySelectorAll(".btn");

allBtn.forEach(btn => btn.classList.add("disabled"));

body.addEventListener("keypress",function () {
    if(start==false){
        start=true;

        allBtn.forEach(btn => btn.classList.remove("disabled"));
    levelup();
    }
})

//Next level:
function flash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    },300);
}

function userFlash(btn) {
    btn.classList.add("blackflash");
    setTimeout(function () {
        btn.classList.remove("blackflash");
    },300);
}

function levelup() {
    userseq=[];
    level++;
    h2.innerHTML=`Level ${level}`;
    let random=Math.floor(Math.random()*3);
    let randColor=btns[random];
    let ranBtn=document.querySelector(`.${randColor}`);
    gameseq.push(randColor);
    // console.log(gameseq);
    
flash(ranBtn);
}



function checkAns(idx) {
    console.log("curr level:",level);
    if(userseq[idx]===gameseq[idx]){
        if(userseq.length===gameseq.length){
        setTimeout(levelup,1000);
        }
    }
    else {
       h2.innerHTML=`Game Over!Your Score is:${(gameseq.length)-1}<br>Press any key to start`;
       body.style.backgroundColor="red"
       setTimeout(()=>{
        body.style.backgroundColor="white"
       },200)

       allBtn.forEach(btn => btn.classList.add("disabled"));
        reset();
    }
    
} 

function btnPress(){
    if(!start)return;
    let btn=this;
flash(btn);
userFlash(btn);
usercolor=btn.getAttribute("id");
userseq.push(usercolor);//push usercolor
checkAns(userseq.length-1);
}

for(b of allBtn){
    b.addEventListener("click",btnPress);
}


 function reset(params) {
     
    start=false;
    gameseq=[];
    userseq=[];
    level=0;
 }