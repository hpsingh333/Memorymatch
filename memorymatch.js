var clickedArray=[];
var interval;
var started=false;
var time=0;
var ready=true;
var numcompleted=0;

setup();

function random(){
    var ans=[1,1,2,2,3,3,4,4,5];
    ans.sort(function(item){
        return .5-Math.random();
    })
    return ans;
}

function reveal(cell){
    cell.style.backgroundColor = "red";
    cell.innerHTML = cell.value;
    cell.clicked = true;
}

function startTimer(){
    if(started==false){
        interval=setInterval(function(){
            time++;
            document.getElementById("timer").innerHTML="Time Elapsed: "+time;
        },1000);
        started=true;
    }
}

function hide(cell){
    cell.style.backgroundColor = "blue";
    cell.innerHTML = "";
    cell.clicked = false;
}

function complete(cell){
    numcompleted++;
    cell.completed = true;
    cell.style.backgroundColor = "purple";
}

function setup(){
    var grid=document.getElementsByTagName("td");
    var ans=random();

    for(var i=0;i<grid.length;i++){
        var cell=grid[i];
        cell.completed=false;
        cell.clicked=false;
        cell.value=ans[i];
    

        cell.addEventListener('mouseenter',function(){
            if(this.completed==false && this.clicked==false){
                this.style.backgroundColor="orange";
            }
        });
        cell.addEventListener("mouseleave",function(){
            if(this.completed == false && this.clicked == false)
                this.style.background = "blue";
        });

        cell.addEventListener('click',function(){
            if(ready == false)
                return;
            startTimer();
            if(this.clicked == false && this.completed == false){
                clickedArray.push(this);
                reveal(this);}
            
            if(clickedArray.length == 2){
                
                if(clickedArray[0].value == clickedArray[1].value){
                    complete(clickedArray[0]);
                    complete(clickedArray[1]);
                    clickedArray = [];
                    
                    if(numcompleted == 8){
                        alert("You won in " + time + " seconds!");
                        clearInterval(interval);
                    }
                
                }
                else{
                            
                    ready = false;
                    document.getElementById("gridtable").style.border = "5px solid red";
                
                    setTimeout(function(){
                                    
                        hide(clickedArray[0]);
                        hide(clickedArray[1]);
                        
                        clickedArray = [];
                        
                        ready = true;
                        document.getElementById("gridtable").style.border = "5px solid black";
                
                },500);

                }
                
            }
        });
}
document.addEventListener('keydown', function(event){
    if(event.key > 0 && event.key < 10 ){
        grid[event.key - 1].click();
    }

});
document.getElementById('res').addEventListener('click', function(){
    location.reload();
});
}