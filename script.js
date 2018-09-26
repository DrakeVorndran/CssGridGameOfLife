function createHtml(size){
    container = document.getElementById("game");
    container.innerHTML = "";
    container.style="grid-template-columns: repeat("+size+",1fr); grid-template-rows: repeat("+size+",1fr);"
    for(var y = 0; y<size; y++){
        // console.log(y);
        for(var x = 0; x<size; x++){
            // console.log("<div class='box' id='"+String(x)+String(y)+"></div>");
            container.innerHTML+="<div class='box' id='"+String(x)+","+String(y)+"' onclick='update("+x+","+y+")'></div>";
        }

    }

}
function createList(size){
    var b = [];
    for(var i = 0; i<size; i++){
        b.push(new Array(size));
        b[i].fill(0);
    }
//   for(var i = 0; i<size*size/2;i++){
//       b[Math.floor(Math.random()*size)][Math.floor(Math.random()*size)] = 1
//   }
    return b;
}

function updateHtml(){
    for(var y = 0; y<board.length; y++){
        for(var x = 0; x<board.length; x++){
            box = document.getElementById(String(x)+","+String(y));
            // console.log(Math.floor(Math.random*colorl.length));
            if(board[y][x]>0){
                box.style.background = colors["black"];
            }
            else{
                box.style.background = colors["white"];
            }



        }
    }

}






function run(){
    updateHtml();
    if(running){
        updateGame();
    }

    window.setTimeout(run,100);
}


function updateGame(){
    var updates = []
    for(var y = 0;y<board.length;y++){
        for(var x = 0;x<board.length;x++){
            var checkY = [0]
            var checkX = [0]
            var neighbors = 0
            if(y>0){
                checkY.push(-1);
            }
            if(y<board.length-1){
                checkY.push(1);
            }
            if(x>0){
                checkX.push(-1);
            }
            if(x<board.length-1){
                checkX.push(1);
            }
            for(var i = 0 ; i<checkY.length ; i++){
                for(var j = 0 ; j<checkX.length ; j++){
                    var xAdd = checkX[j];
                    var yAdd = checkY[i];
                    if(!(yAdd===0 && xAdd==0)){
                        if(board[y][x]===1){
//                            console.log(xAdd,yAdd);
                        }
//                        console.log(xAdd,yAdd);
                        if(board[y+yAdd][x+xAdd]===1){
                            neighbors++;
//                            console.log("+1");
                        }
                    }
                }
            }
//            console.log(x,y,checkX,checkY,neighbors);
            if(board[y][x]===1){
//                console.log(x,y,checkX,checkY);
                if(!(neighbors === 2 || neighbors === 3)){
                    updates.push([y,x]);
                }
            }
            else{
                if(neighbors===3){
                    updates.push([y,x]);
//                    
                }
            }
        }
    }
    for(var i = 0;i<updates.length;i++){
        y = updates[i][0]
        x = updates[i][1]
        board[y][x]= (board[y][x]+1)%2;
    }
}

function update(x,y){
    board[y][x] = (board[y][x]+1)%2;
}

var colorl = ["red","black","blue","green","yellow"];

var colors = {
    "black" : "#000",
    "red" : "#F00",
    "green" : "#0F0",
    "blue" : "#00F",
    "white" : "#FFF"
};
var size;
var board;
var dir;
var running;
var htmlEmpty = true;

function start(){
    document.getElementById("startButton").disabled=true;
    size = 45;
    board = createList(size);
    running = true
    document.getElementById("startButton").disabled=false;

    if(htmlEmpty){
        createHtml(size);
        htmlEmpty = false;
    }


    run();
}
start()
