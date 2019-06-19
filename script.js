function create_space(sp) {
    'use strict';
    var img = document.createElement("IMG");
    sp = sp + '.gif';
    img.setAttribute("src", sp);
    img.setAttribute("width", "150");
    img.setAttribute("height", "150");
    return img;
}

var board = new Array(9);
var sp = 'x';
var computer = false;

function move(n, swch) {
    'use strict';
    if (!board[n]) {
        var id = "sq" + n;
        var p = create_space(sp);
        board[n] = sp;
        document.getElementById(id).appendChild(p);
        document.getElementById(id).disabled = true;
        
        if (over(board)) {
            for (var i = 0; i<9; i++){
                document.getElementById('sq' + i).disabled = true;
            }
            
            document.getElementById('game-over').style.display = 'block';
            document.getElementById('ending').innerHTML = sp.toUpperCase() + ' Wins!';
            computer = false;
            
        } else if(!board.includes(undefined)){
            document.getElementById('game-over').style.display= 'block';
            document.getElementById('ending').innerHTML = "It's a Draw!";
            computer = false;
        }
        
        if (sp === 'x'){
            sp = 'o';
        } else{
            sp = 'x';
        }
        
        if(computer && swch==0){
            minimax(board);
            
        }
    } 
}

function over(b){
    for (var i = 0; i<=6; i+=3){
        if(b[i] && (b[i]===b[i+1]) && (b[i]===b[i+2]) && (b[i+1]===b[i+2])){
            return true;
        }
    }
    
    for(var i = 0; i<=2; i++){
        if(b[i] && (b[i]===b[i+3]) && (b[i]===b[i+6]) && (b[i+3]===b[i+6])){
            return true;
        }
    }
    
    if(b[0] && (b[0]===b[4]) && (b[0]===b[8]) && (b[4]===b[8])){
        return true;
    }
    
    if(b[2] && (b[2]===b[4]) && (b[2]===b[6]) && (b[4]===b[6])){
        return true;
    }
    
    return false;
}

function minimax(b){
    
    var best_move = b.findIndex(function(element){
        return !element;
    });
    var best_score = Number.NEGATIVE_INFINITY;
    
    for(var i = 0; i<9; i++){
        if(!b[i]){
            var clone = b.concat();
            clone[i] = sp;
            var score = mini(clone);
            if (score > best_score){
                best_move = i;
                best_score = score;
            }
        }
    }
    
    move(best_move, 1);
}

function mini(b){
    if(over(b)){
        return 1;
    } else if (!b.includes(undefined)){
        return 0;
    }
    
    var best_score = Number.POSITIVE_INFINITY;
    
    for(var i = 0; i<9; i++){
        if(!b[i]){
            var clone = b.concat();
            if(sp === 'x'){
                clone[i] = 'o';
            } else {
                clone[i] = 'x';
            }
            var score = max(clone);
            if(score < best_score){
                best_score = score;
            }
        }
    }
    return best_score;
}

function max(b){
    if(over(b)){
        return -1;
    } else if(!b.includes(undefined)){
        return 0;
    }
    
    var best_score = Number.NEGATIVE_INFINITY;
    
    for(var i = 0; i<9; i++){
        if(!b[i]){
            var clone = b.concat();
            clone[i] = sp;
            score = mini(clone);
            if(score > best_score){
                best_score = score;
            }
        }
    }
    return best_score;
}

function reset_func(){
    for(var i = 0; i < 9; i++){
        document.getElementById('sq'+i).innerHTML="";
        document.getElementById('sq'+i).disabled = false;
    }
    board = new Array(9);
    sp = 'x'
    document.getElementById('game-over').style.display = 'none';
    document.getElementById('start-modal').style.display = 'block';
    computer = false;
}

function two(){
    document.getElementById('start-modal').style.display= 'none';
}

function one(){
    two();
    document.getElementById('computer-modal').style.display = "block";
    computer = true;
}

function first(){
    document.getElementById('computer-modal').style.display = "none";
}

function second(){
    first();
    var corners = [0, 2, 6, 8];
    var rando = corners[Math.floor(Math.random()*corners.length)];
    
    move(rando, 1);
    
}