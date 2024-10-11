//trigger get data from local storage function
getDataFromLocalStorage();
// set vars
let duration=1000;
let matches=0;
let trialsNumber=document.querySelector(".trials span");
let playersArray=[];
//ger data from local storage
if(localStorage.getItem("playersData")){
    playersArray=JSON.parse(localStorage.getItem("playersData"));
}
//splash screen
document.querySelector(".splash-screen span").onclick=()=>{
    let yourName=prompt("enter your name");
    if(yourName==null||yourName===""){
        document.querySelector(".name span").innerHTML="Unknown";
    }else{
        document.querySelector(".name span").innerHTML=yourName;
    }
    document.querySelector(".splash-screen").remove();
    //set timer
    let time=0;
 let cnt=setInterval(()=>{
    time++;
    document.querySelector(".timer span").innerHTML= time<10?`0${time}`:time;
    if(matches==orderRange.length/2){
        clearInterval(cnt);
        document.querySelector(".timer").style.backgroundColor="#F44336";
        document.querySelector(".timer span").style.color="white";
        addPlayerDataToArray(((yourName==null||yourName=="")?"Unknown":yourName));
    }
},duration);
}
// create add player data to array
function addPlayerDataToArray(name){
    //player object
    let playerData={
        playerName:name,
        timeTaken:document.querySelector(".timer span").innerHTML,
        wrongTrials:trialsNumber.innerHTML,
    };
    playersArray.push(playerData);
    addPlayerToTable(playersArray);
    addToLocalStorage(playersArray);
}
//create add data to table
function addPlayerToTable(array){
    let tableBody=document.querySelector("table tbody");
    tableBody.innerHTML="";
   array.forEach(player=>{
    let row=document.createElement("tr");
    let nameCell=document.createElement("td");
    nameCell.innerHTML=player.playerName;
    row.appendChild(nameCell);
    let timeCell=document.createElement("td");
    timeCell.innerHTML=player.timeTaken;
    row.appendChild(timeCell);
    let trialsCell=document.createElement("td");
    trialsCell.innerHTML=player.wrongTrials; 
    row.appendChild(trialsCell);
    tableBody.appendChild(row);
   })
}
//add data to local storage
function addToLocalStorage(array){
    window.localStorage.setItem("playersData",JSON.stringify(playersArray));
}
//get data from local storage function
function getDataFromLocalStorage(){
    let data=localStorage.getItem("playersData");
    if(data){
        let PLAYERSDATA=JSON.parse(data);
        addPlayerToTable(PLAYERSDATA);
    }
}
//blocks container
let blocksContainer=document.querySelector(".memory-blocks-container");
let blocks=Array.from(blocksContainer.children);
//create order keys
let orderRange=Array.from(Array(blocks.length).keys());
//shuffle orderRange Array
shuffle(orderRange);
//Array(number) creates an empty array with length=number
blocks.forEach((block,index)=>{
    block.style.order=orderRange[index];
    //add flipped class
    block.addEventListener("click",()=>{
        addFlippedClass(block);
    });
    //collect flipped blocks array

});
//add flipped class function
function addFlippedClass(selectedBlock){
    selectedBlock.classList.add("flipped");
    let allFlippedBlocks=blocks.filter(flippedBlock =>flippedBlock.classList.contains("flipped"));
    if(allFlippedBlocks.length===2){
        //stop clicking
        stopClicking();
        //checkmatches
        checkMatches(allFlippedBlocks[0],allFlippedBlocks[1]);
    }
}
//create stop clicking function
function stopClicking(){
    blocksContainer.classList.add("no-clicking");
    setTimeout(()=>{
        blocksContainer.classList.remove("no-clicking");
    },duration);
}
//create check matches function
function checkMatches(firstBlock,secondBlock){
    if(firstBlock.getAttribute("data-animal")===secondBlock.getAttribute("data-animal")){
        matches++;
        firstBlock.classList.remove("flipped");
        secondBlock.classList.remove("flipped");
        firstBlock.classList.add("has-match");
        secondBlock.classList.add("has-match");
    }else{
        trialsNumber.innerHTML=parseInt(trialsNumber.innerHTML)+1;
        setTimeout(()=>{
            firstBlock.classList.remove("flipped");
            secondBlock.classList.remove("flipped");
        },duration);
    }
}
//create shuffle function
function shuffle(array){
    let current=array.length;
    let temp;
    let random;
    while(current>0){
        random=Math.floor(Math.random()*current);
        current--;
        //swap
        temp=array[current];
        array[current]=array[random];
        array[random]=temp;
    }
    return array;
}
