//splash screen
document.querySelector(".splash-screen span").onclick=()=>{
    let yourName=prompt("enter your name");
    if(yourName==null||yourName===""){
        document.querySelector(".name span").innerHTML="Unknown";
    }else{
        document.querySelector(".name span").innerHTML=yourName;
    }
    document.querySelector(".splash-screen").remove();
}
// set duration
let duration=1000;
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
        firstBlock.classList.remove("flipped");
        secondBlock.classList.remove("flipped");
        firstBlock.classList.add("has-match");
        secondBlock.classList.add("has-match");
    }else{
        let trialsNumber=document.querySelector(".trials span");
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