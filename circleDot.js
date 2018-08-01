/*"use strict";*/

/*https://www.w3schools.com/css/css3_flexbox.asp



*/

let small = "small";
let medium = "medium";
let large = "large";
let ctx;
let size = 'small';
let numberCirclesVertical = 15;
let zeroArray = [];
let arrayCircles = [];
let count = 0;
let colors = ['azure','black','red'];

let x = 500;
let y = 50;
let mouseX = 0;
let mouseY = 0;

let testActualRedPos = 0;


let possibleNewReds = [];


//starting Red Position and Old Red Position at the same time.
let oldRedPosition = 84;

let arrayNewRed = [[]];

let arrayRoutes = [[]];
let arrayRoutes1 = [[]];
let route = [1,2,3,4,5,6];
let routePoss = [0];

let varRoute = 0;
let varRoutePoss = 0;

let routeXY = [[-20,-35],[+20,-35],[+20,0],[+20,+35],[-20,+35],[-20,0]];


let routeAddValue = true;
//let actualRedPos = [311, 253];
  let actualRedPos = 0;

let stopBluring = 0;



function chosePuzzleSize(fieldsize){
    
    if (fieldsize == small){
        let circleArray = new Array(15);
        let position = 0;
    }
        
    if (fieldsize == medium){
        let circleArray = new Array(50);
        let position = 0;
    }
    
    if (fieldsize == large){
        let circleArray = new Array(100);
        let position = 0;
    }
   
	createCircles();
    
}

let test = true;
function createCircles(){

     document.getElementById("p1").innerHTML = " ";
    
     for(let i=0; i<zeroArray.length; i++){
        if (zeroArray[i] != 0){
            document.getElementById("p1").innerHTML +="\n" +(i+1) + " was entered " + zeroArray[(i)];
            console.log(zeroArray);
            
            if (zeroArray[i] > 1){
                document.getElementById("p1").innerHTML += " times<br>";
                console.log(zeroArray);
            }
        }
	 }
    
	//Creates circles positions
    circlesPosition();
	//Get positions and creates circles in Canvas
    drawCircles();
	
	
	if (test){
		actualRedPos = 84;
		test = false;
	}
	
	calcRoute();
}




//creates circles positions
function circlesPosition(){
    let x = 578;
    let y = 48;
    let yoff = 0;
    if (size == 'small'){
         for(let i = 0; i < numberCirclesVertical; i++){
            let zz = 0;
            let xoff = 0;
            yoff += -5;
            if(i % 2 == 0){
                xoff = 20;                
            }
            while(zz <= 12){                
                x = x-41;
				
				if ((x+xoff) == 311 && (y+yoff) == 253){
					//alert("test x y :"+ x +" "+ y);
                   
                    arrayCircles[count] = [x+xoff,y+yoff,colors[2]];
                    
                     //saving first Reds Position.
                     arrayCircles[oldRedPosition][2] = "red";

                    
				}else{
					arrayCircles[count] = [x+xoff,y+yoff,colors[0]];	
				}
										
                zz++;
                count++;
            }
            x = 578;
            y = y+40;
            
        }
    }
	
}

//Get positions and creates circles in Canvas
function drawCircles(){
    let canvas = document.getElementById("canvas1");
    ctx = canvas.getContext("2d");
 
    if (size == 'small'){
        for(let i = 0; i < 169; i++){
            ctx.save();
            ctx.translate(arrayCircles[i][0],arrayCircles[i][1]);
            ctx.beginPath();
            ctx.arc(0,0,20,0,2*Math.PI);
			ctx.fillStyle=arrayCircles[i][2];
            
                            ctx.shadowBlur=20;
                ctx.shadowColor="black";
            
            /*
            for(let x = 0; x <= 1; x++){
                ctx.shadowBlur=20;
                ctx.shadowColor="black";
                ctx.fill();
                ctx.stroke();
            }
            stopBluring = 1;
            */
            ctx.fill();
            ctx.stroke(); 
            ctx.restore();
			/*ctx.font="12px Georgia";
			ctx.fillText(i,arrayCircles[i][0],arrayCircles[i][1]);*/
        }
    }
	
	
    return;    
}

//generic value for Radious.
let distanceRadious = 500;

function colorBlackCircles(){
	calcRoute();
	calcRoute1();
	mouseDeltaX = event.offsetX;
	mouseDeltaY = event.offsetY;
	
	for(let i=0; i < arrayCircles.length; i++){
		
		distanceRadious = Math.round(calcDistance(mouseDeltaX, mouseDeltaY, arrayCircles[i][0], arrayCircles[i][1]));
		
	
		if(distanceRadious < 20 && arrayCircles[i][2] != "red"){
			arrayCircles[i] = [arrayCircles[i][0],arrayCircles[i][1],"black"];
						
			document.getElementById("p1").innerHTML = distanceRadious +" : Mouse X, Y: "+ mouseDeltaX +" "+ + mouseDeltaY +". Circle X, Y: "+ arrayCircles[i][0]+" "+ arrayCircles[i][1];
			
		//	alert(distanceRadious +" : Mouse X, Y: "+ mouseDeltaX +" "+ + mouseDeltaY +". Circle X, Y: "+ arrayCircles[i][0]+" "+ arrayCircles[i][1]);
						
			moveRed();
						
			drawCircles();
						
		}
	}
}

	
function calcDistance(origemX, origemY, destinoX, destinoY){
	let deltaX = origemX - destinoX;
	let deltaY = origemY - destinoY;
	let distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
  
	return (distance);
}

//let z = 0;		


let youWon = false;

function moveRed(){
	//Saving old Red's positon and determining new CHECK Position for Red.
	for( let z = 0; z < 195; z++){
		if (arrayCircles[z][2] == "red"){
				
				//saving old red position
				oldRedPosition = z;

				//actualRedPos = z;
			
		        console.log("Old Red :" +oldRedPosition);
			}
		}
	        
        possibleNewReds[0] = oldRedPosition-1;
		   
		 distanceRadious = Math.round(calcDistance( arrayCircles[oldRedPosition][0],
													arrayCircles[oldRedPosition][1],
													arrayCircles[oldRedPosition-14][0], 
													arrayCircles[oldRedPosition-14][1]));
	
		//console.log("Old BLue - 14: "+ (oldRedPosition-14));
		//console.log("Distance radious: "+distanceRadious);
	
	if  (distanceRadious <=41){	
		  console.log(distanceRadious);
		  
           possibleNewReds[1] = oldRedPosition-13;
		   //arrayCircles[possibleNewReds[1]][2] = "purple";
		   possibleNewReds[2] = oldRedPosition-14;
  		   possibleNewReds[4] = oldRedPosition+12;
		   possibleNewReds[5] = oldRedPosition+13;

		
        }else{
            possibleNewReds[1] = oldRedPosition-12;
		    possibleNewReds[2] = oldRedPosition-13;
			possibleNewReds[4] = oldRedPosition+13;
			possibleNewReds[5] = oldRedPosition+14;
			
			
     	}

		possibleNewReds[3] = oldRedPosition+1;
			
/*		 if  ((distanceRadious = Math.round(calcDistance(arrayCircles[oldRedPosition][0],
													 arrayCircles[oldRedPosition][1],
													 arrayCircles[oldRedPosition-14][0], 
													 arrayCircles[oldRedPosition-14][1]))) <=41){
		}else{ 

	
		}*/
			
    
        for (let i=0; i <6; i++){
            
                if (arrayCircles[possibleNewReds[i]][2]  == "azure"){
                                    
					actualRedPos = i;
					testActualRedPos = i;
					
					//SETING NEW BLUE
                    arrayCircles[possibleNewReds[i]][2] = "red"; 
                    console.log("New Red :"+possibleNewReds[i]);
                    
                	//CLEANING OLD BLUE
			     	arrayCircles[oldRedPosition][2] = "azure";
                    
                    console.log("New red :"+ possibleNewReds[i]);
                    i = 6;
                }else{
					
						for ( i+1; i <6; i++){

							if (arrayCircles[possibleNewReds[i]][2]  == "azure"){

									arrayCircles[possibleNewReds[i]][2] = "red"; 

								let edtest = 
									//there is a new position for red
									//youWon = true;

									arrayCircles[oldRedPosition][2] = "azure";

									i = 6;
							}				
						}
					}			
		}  
	
        
		if (arrayCircles[oldRedPosition][2] == "red" ){
			youWon == true;
			alert("Congratulations! You wow! ");
		}
		
		if (oldRedPosition < 14 || oldRedPosition > 154 || 
			oldRedPosition == 26 ||
		   	oldRedPosition == 26 ||
		   	oldRedPosition == 39 ||
		   	oldRedPosition == 52 ||	
		   	oldRedPosition == 65 ||
			oldRedPosition == 78 ||
			oldRedPosition == 91 ||
			oldRedPosition == 104 ||
			oldRedPosition == 117 ||
			oldRedPosition == 130 ||
			oldRedPosition == 38){
			youWon == false;
			alert("You lost! Try again! ");
		}
		
	
	
	drawCircles();
	return true;
}
	
	

function getRoundNewXY() {
    return Math.floor(Math.random() * (40 - (-40)) ) + (-40);
}




let colRoute = 0;
let rowRoute = 0;

function calcRoute(){
	actualRedPos;
	
	
	for (rowRoute = 0; rowRoute < 6; rowRoute++){
					//arrayRoutes[rowRoute] = [];
				console.log("arrayRoutes :"+arrayRoutes);
		
	for (let a=0; a < 6; a++){
		
		for (let i=0; i < 195; i++){
		//console.log("ANTES DE ENTRAR");
		
			if (
				(arrayCircles[i][0] == arrayCircles[actualRedPos][0]+routeXY[rowRoute][rowRoute] &&
				 arrayCircles[i][1] == arrayCircles[actualRedPos][1]+routeXY[rowRoute][rowRoute+1]) ||

				(arrayCircles[i][0] == arrayCircles[actualRedPos][0]+(routeXY[rowRoute][rowRoute]-1) && 
				 arrayCircles[i][1] == arrayCircles[actualRedPos][1]+routeXY[rowRoute][rowRoute+1]) ||

				(arrayCircles[i][0] == arrayCircles[actualRedPos][0]+(routeXY[rowRoute][rowRoute]+1) && 
				 arrayCircles[i][1] == arrayCircles[actualRedPos][1]+routeXY[rowRoute][rowRoute+1])
			   ){
				
				let testteee  = arrayCircles[actualRedPos][0]+routeXY[rowRoute][rowRoute];
				console.log("X :"+testteee);
				console.log("Y :"+[arrayCircles[actualRedPos][1]+routeXY[rowRoute][rowRoute]+1]);
				
				//console.log("ENTROU, Circle "+i+ ":  "+arrayCircles[i] );

				if (arrayCircles[i][2] != "black"){
					colRoute ++;
							
					arrayRoutes[rowRoute][colRoute] = i;
										
					actualRedPos = i;
					
								
					console.log("rowRoute :"+rowRoute);
					console.log("actualRedPos :"+actualRedPos);
			
				}
	
					varRoutePoss++;
					routePoss++;			
			
				}
//if (actualRedPos == 194 ){ actualRedPos = 84}
			}
		
	}
}
}









								function calcRoute1(){
									actualRedPos;
									colRoute = 0;
									actualRedPos = 84;

									for (rowRoute = 0; rowRoute < 6; rowRoute++){
													//arrayRoutes1[rowRoute] = [];
												console.log("arrayRoutes1 :"+arrayRoutes1);

									for (let a=0; a < 6; a++){

										for (let i=0; i < 195; i++){
										//console.log("ANTES DE ENTRAR");

											if (
												(arrayCircles[i][0] == arrayCircles[actualRedPos][0]+20 &&
												 arrayCircles[i][1] == arrayCircles[actualRedPos][1]-35) ||

												(arrayCircles[i][0] == arrayCircles[actualRedPos][0]+19 && 
												 arrayCircles[i][1] == arrayCircles[actualRedPos][1]-35) ||

												(arrayCircles[i][0] == arrayCircles[actualRedPos][0]+21 && 
												 arrayCircles[i][1] == arrayCircles[actualRedPos][1]-35)

											   ){

												let testteee  = arrayCircles[actualRedPos][0]+routeXY[rowRoute][rowRoute];
												console.log("X1 :"+testteee);
												console.log("Y1 :"+[arrayCircles[actualRedPos][1]+routeXY[rowRoute][rowRoute]+1]);

												//console.log("ENTROU, Circle "+i+ ":  "+arrayCircles[i] );

												if (arrayCircles[i][2] != "black"){
													colRoute ++;

													arrayRoutes1[rowRoute][colRoute] = i;

													actualRedPos = i;


													console.log("rowRoute1 :"+rowRoute);
													console.log("actualRedPos1 :"+actualRedPos);

												}

													varRoutePoss++;
													routePoss++;			

												}
								
											}

									}
								}
							}