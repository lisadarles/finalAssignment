
// Lisa Darles: A0145094E

require(
    [],

    function () {
            
        console.log("yo, I'm alive!");

        var paper = new Raphael(document.getElementById("mySVGCanvas"));

        var pWidth = paper.canvas.offsetWidth;
        var pHeight = paper.canvas.offsetHeight;
        console.log("pWidth is " + pWidth + ", and pHeight is " + pHeight);

        //Initialization of variables
        var counter = 0;
        var maxCount = 10;
        var starttime;
        var totaltime;

        var startButton = paper.circle(300, 200, 40);
        var startText = paper.text(300, 200, 'START');
        startButton.attr({
        	stroke: "black",
        	fill: "yellow"
        });

        
        //Creation of the object to drag
        var object = paper.circle(300,200,20);
        object.attr({
            "fill-opacity":1,
            "stroke-opacity":0,
            "fill": "tortue.jpg"
        })

        startButton.hide();
        startText.hide();
        
        // Define an array that creates the dots
        var dot = [];
        var counter=0
        var numDots=100;
        var i = 0;

        //Creation of a paper
        var bgRect = paper.rect(0,0,pWidth, pHeight);
        bgRect.attr({
            "fill-opacity":0,
            "stroke-opacity": 0
        })
        

        var randInt = function( m, n ) {
            var range = n-m+1;
            var frand = Math.random()*range;
            return m+Math.floor(frand);
        }

        map = function(x,a,b,m,n){
            return(x-a)*(n-m)/(b-a)+m;
        }

        var distance = function(x1, y1, x2, y2){
            var xd = x2-x1;
            var xs = xd*xd;
            var yd = y2-y1;
            var ys = yd*yd;
            return Math.sqrt(xs+ys);}

        //Initialization of first dots of the array
        while(i<numDots){
            dot[i]=paper.circle(100,100,1).attr({'fill':"black"});
            dot[i].xrate = 0;
            dot[i].yrate = 0;
            dot[i].xpos = 0;
            dot[i].ypos = 0;
            i++;

        }
        
        //-------------------------------------------------------------------------------------------------------------------

        //Creation of the function that we make the game ready
        var ready = function(){
        	startButton.show();
        	startText.show();
            object.hide();
        }


        //Creation of the function that will launch the game
        var interval1;
        var interval2;
        var timeout1;
        var timeout2;

        var start = function (){
        	var difficulty = prompt("Please select a difficulty level: \n\n 1 = novice \n 2 = professional \n 3 = master");
            
            object.show();
            ox=object.offsetX;
            oy=object.offsetY;
            

                if(difficulty === "1") {
                    interval1 = setInterval(emit, 1000);
                    interval2 = setInterval(draw, 40);

                    object.attr({
                        'r':20,
                    });

                }

                if(difficulty === "2") {
                    interval1 = setInterval(emit,500);
                    interval2 = setInterval(draw,40);

                    object.attr({
                        'r':25,
                    });
 
                }

                if(difficulty === "3") {
                    interval1 = setInterval(emit,100);
                    interval2 = setInterval(draw,40);

                    object.attr({
                        'r':35,
                    });
                }


                console.log("game is starting");
            	startButton.hide();
            	startText.hide();
                            	
                counter++;
            	starttime = Date.now();
            	console.log("time = " + starttime); 

        }
    
        //Creation of the function that will reset the game
        var reset = function(){
                    clearInterval(interval1);
                    clearInterval(interval2);
 
                    if(dot[i].xpos < pWidth){dot[i].xpos > pWidth};
                    if(dot[i].ypos < pHeight){dot[i].ypos > pHeight};
                    if(dot[i].xpos > 0){dot[i].xpos < 0};
                    if(dot[i].ypos > 0){dot[i].ypos < 0};
                    ready();
                    confirm("Game is over! Try again!"); 
                
        }



        startButton.node.addEventListener('click', start);
        

        //--------------------------------------------------------------------------------------------------------

        //Functin that will emit the dots of the array in random directions
        var emit = function(){
            
            dot[counter]=paper.circle(Math.random(pWidth), Math.random(pHeight), 20);

            //dot[counter].colorString = "hsl(" + Math.random()+ ",1, .75)";
            dot[counter].attr({"fill": "black" , "fill-opacity" : 0.5, "stroke-opacity":0});
               // 'url(http://vignette4.wikia.nocookie.net/kingdomheartsfanon/images/e/eb/Nemo-Summon-KH-DDD-Pohlranda3.png/revision/latest?cb=20140615064456)'

            // assign6:5 Add some properties to dot just to keep track of it's "state"
            dot[counter].xpos=Math.random(pWidth);
            dot[counter].ypos=Math.random(pHeight);
            // assign6.6 Add properties to keep track of the rate the dot is moving
            //assign7: MAPPING of ranges (here, [0,1] -> [-5,5])
           // dot[counter].xrate= -5+10*Math.random();
           // dot[counter].yrate= -7+14*Math.random();

            dot[counter].xrate= 5;
            dot[counter].yrate= 5;
            
            dot[counter].xrate= map(Math.random(),0,1,-5,5);
            dot[counter].yrate= map(Math.random(),0,1,-5,5);

            counter++;
            //counter = counter%40;
            
            
        }

        console.log("Number of dots " + dot.length);


        //----------------------------------------------------------------------------------------------------

        //Add an event listener to the object to drag in order to create the game
        var mouseDown = false;

        var mx;
        var my;
       
        object.node.addEventListener('mousedown', function(ev){
            mouseDown=true;
            console.log("got a click");
        });

        object.node.addEventListener('mousemove', function(ev){
                         
                mx = ev.offsetX;
                my = ev.offsetY;
                
                console.log("The coordinates of the mouse are: x= " + mx + " , y= " + my);
                
                if(mouseDown){
                    console.log("Mousedown, will move the circle")
                    object.attr({
                        'cx' : mx,
                        'cy' : my
                    })
                }
                
                for(i=0; i<numDots; i++) {
                    if (distance(mx, my, dot[i].xpos, dot[i].ypos)<30){
                        reset();
                        console.log("The distance of the line is " + distance(mx, my, dot[i].xpos, dot[i].ypos));
                    } 
                } 

        });

        object.node.addEventListener('mouseup', function(ev){
            mouseDown=false;
        }); 


        //---------------------------------------------------------------------------------------------

        //Creation of the draw function that will update the position of the dots
        var count=0;
        
       
        var draw = function(){
            
            for (i=0; i<numDots; i++){
            // Count and keep track of the number of times this function is called
                count++;
                console.log("count = " + count);
                console.log("dot pos is ["+ dot[i].xpos + "," + dot[i].ypos + "]");

                dot[i].xpos += dot[i].xrate;
                dot[i].ypos += dot[i].yrate;

                dot[i].attr({'cx': dot[i].xpos, 'cy': dot[i].ypos});

                // keep the object on the paper
                if (dot[i].xpos < 0) {dot[i].xrate = -dot[i].xrate;}
                if (dot[i].ypos < 0) (dot[i].yrate = -dot[i].yrate); 

                
                
            }
        }


        // Reset the game after the number of dots have been emitted
        if (i>numDots+20){
            reset();
        };

        ready(); // Put the start button on the screen 
        
    }
);