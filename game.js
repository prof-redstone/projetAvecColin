let Players = [];
let Balls = [];
let bgColor = "#101010";
let BorderColor = 3;
let GlobColor1 = 5;
let borderWidth = 1;
//cool color for néon : colorWheel(4.3,100,30) ; colorWheel(0.5,100,30) ; colorWheel(3,80,20) ; colorWheel(1.8,90,10) ; colorWheel(0,100,10) ; colorWheel(4.8,100,0)
var mode = "bird";
var PKeys = new Map();
var globLightDif = 0.8 //for shadows color option
var FPS = 60; //30;40;60
var IntervalTime;

let canvasH = 1080;
let canvasW = 1920;

var P1Xaxe = 0;
var P1Yaxe = 0;
var P2Xaxe = 0;
var P2Yaxe = 0;

const PIby180 = Math.PI/180

//test delet
var Tx = 0 ;

function Player(PlayerNumber) {
    this.playerNumber = PlayerNumber;
    this.X = 0;
    this.Y = 0;
    this.width = 20;
    this.height = 200;
    this.color = 5.5 //default color
    this.speed = 600;
    this.internalBorders = 40; //marge de bordure le l'aire de jeux
    this.MarCol = 5; //margin Collision 
    this.mode = "default";

    this.VarModeA = undefined; //variable to stoke value for differents mode
    this.VarModeB = undefined;
    this.VarModeC = undefined;

    // Mouvement
    this.Move = function () {
        var lastPos = [this.X, this.Y, this.width, this.height] // pour deplacer la balle si elle rentre en collision

        if (this.mode == "default") {
            if (this.playerNumber == 1) {
                this.Y += (P1Yaxe * this.speed) / FPS;
            }
            if (this.playerNumber == 2) {
                this.Y += (P2Yaxe * this.speed) / FPS;
            }

            if (this.Y + this.height / 2 + this.internalBorders > canvasH) {
                this.Y = canvasH - this.height / 2 - this.internalBorders;
            }
            if (this.Y - this.height / 2 - this.internalBorders < 0) {
                this.Y = 0 + this.height / 2 + this.internalBorders;
            }
        }

        if (this.mode == "freemove") {
            if (this.playerNumber == 1) {
                this.X += (P1Xaxe * this.speed) / FPS;
                this.Y += (P1Yaxe * this.speed) / FPS;

                if (this.X + this.width / 2 + this.internalBorders > canvasW/2) {// x axe border collisions
                    this.X = canvasW/2 - this.width / 2 - this.internalBorders;
                }
                if (this.X - this.width / 2 - this.internalBorders < 0) {
                    this.X = 0 + this.width / 2 + this.internalBorders;
                }
            }
            if (this.playerNumber == 2) {
                this.X += (P2Xaxe * this.speed) / FPS;
                this.Y += (P2Yaxe * this.speed) / FPS;
                
                if (this.X + this.width / 2 + this.internalBorders > canvasW) {
                    this.X = canvasW - this.width / 2 - this.internalBorders;
                }
                if (this.X - this.width / 2 - this.internalBorders < canvasW/2) {
                    this.X = canvasW/2 + this.width / 2 + this.internalBorders;
                }
            }
            
            if (this.Y + this.height / 2 + this.internalBorders > canvasH) { // Y axe boder collisons
                this.Y = canvasH - this.height / 2 - this.internalBorders;
            }
            if (this.Y - this.height / 2 - this.internalBorders < 0) {
                this.Y = 0 + this.height / 2 + this.internalBorders;
            }
        }

        if (this.mode == "tpY") {
            if (this.playerNumber == 1) {//deplacement
                this.Y += (P1Yaxe * this.speed) / FPS;
            }
            if (this.playerNumber == 2) {
                this.Y += (P2Yaxe * this.speed) / FPS;
            }

            if (this.Y - canvasH/2 > canvasH) { //tp
                this.Y = 0 - canvasH/2;
            }
            if (this.Y + canvasH/2 < 0) {
                this.Y = canvasH + canvasH/2;
            }
        }

        if (this.mode == "circle") {
            if (this.playerNumber == 1) { //this.Y: 0 on top of circle, this.Y: canvasH (1080) on bottom of cicle
                this.Y -= (P1Yaxe * this.speed) / FPS;
                if(this.Y > 600 && P1Yaxe == 0){
                    this.Y += (P1Xaxe * this.speed) / FPS;
                }
                if(this.Y < 480 && P1Yaxe == 0){
                    this.Y -= (P1Xaxe * this.speed) / FPS;
                }

            }
            if (this.playerNumber == 2) { //this.X is distance of ray circle
                this.Y += (P2Yaxe * this.speed) / FPS;
                if(this.Y > 600 && P2Yaxe == 0){
                    this.Y -= (P2Xaxe * this.speed) / FPS;
                }
                if(this.Y < 480 && P2Yaxe == 0){
                    this.Y += (P2Xaxe * this.speed) / FPS;
                }
            }

            if (this.Y  + this.internalBorders > canvasH) {
                this.Y = canvasH  - this.internalBorders;
            }
            if (this.Y - this.internalBorders < 0) {
                this.Y = 0  + this.internalBorders;
            }
        }

        if (this.mode == "bird") {
            
            if (this.playerNumber == 1) {

                if(P1Yaxe == -1 && this.VarModeC == 0){ //wait to start movement
                    this.VarModeB = 1;
                    this.VarModeA = -2;
                    this.VarModeC = 1;
                }
                this.VarModeA += 7 / FPS ;

                if(this.VarModeB == 1){//dont move if dont have start
                    this.Y += (this.VarModeA * this.speed) / FPS;
                }
                
                if(P1Yaxe == 0){ //buffer
                    this.VarModeC = 0
                }
                if(this.VarModeA > 2){
                    this.VarModeA = 2
                }
            }
            if (this.playerNumber == 2) {

                if(P2Yaxe == -1 && this.VarModeC == 0){ //wait to start movement
                    this.VarModeB = 1;
                    this.VarModeA = -2;
                    this.VarModeC = 1;
                }
                this.VarModeA += 7 / FPS ;

                if(this.VarModeB == 1){//dont move if dont have start
                    this.Y += (this.VarModeA * this.speed) / FPS;
                }

                if(P2Yaxe == 0){ //buffer
                    this.VarModeC = 0
                }
                if(this.VarModeA > 2){
                    this.VarModeA = 2
                }
            }

            if (this.Y + this.height / 2 + this.internalBorders > canvasH) {
                this.Y = canvasH - this.height / 2 - this.internalBorders;
            }
            if (this.Y - this.height / 2 - this.internalBorders < 0) {
                this.Y = 0 + this.height / 2 + this.internalBorders;
                this.VarModeA = 0
            }
        }

        Balls.forEach((ball) =>{
            if(CollisionRectCircle(this.X-this.width/2, this.Y-this.height/2, this.X+this.width/2, this.Y+this.height/2, ball.X, ball.Y, ball.radius)[0] !== false){
                ball.Y -= lastPos[1] - this.Y
                ball.X -= lastPos[0] - this.X
            }
        })

    };

    this.DrawSelf = function () {
        if(this.mode == "default" || this.mode == "freemove" || this.mode == "tpY" || this.mode == "bird"){ //basic padds draws
            RectNeon(this.X - this.width / 2, this.Y - this.height / 2, this.width, this.height, colorWheel(this.color, 30, 0, 1), false, 1, 10, 3, 30, colorWheel(this.color, 80, 10, globLightDif));
        }else if(this.mode == "circle"){
            if(this.playerNumber == 1){
                let angle = (this.Y/343.77) + Math.PI/2 //343.77 : canvasH / 2
                CourbRectNeon(canvasW/2, canvasH/2, this.X, angle, this.height, 20, colorWheel(this.color, 30, 0, 1), false, 10, 3, 30, colorWheel(this.color, 80, 10, globLightDif))
            }else{
                let angle = (this.Y / (canvasH/Math.PI)) - Math.PI/2
                CourbRectNeon(canvasW/2, canvasH/2, this.X, angle, this.height, 20, colorWheel(this.color, 30, 0, 1), false, 10, 3, 30, colorWheel(this.color, 80, 10, globLightDif))
            }
        }
    };
}

function Ball() {
    this.X = canvasW/2;
    this.Y = canvasH/2+200;
    this.direction; //in degree 
    this.speed = 0
    this.radius = 30; //size of ball
    this.color = 5; //default color
    this.MarCol = 5; //margin Collision 
    this.mode = "default"; // mode of ball
    this.LineCollision = [[0,0,1920,0], [0,1080,1920,1080], [0,0,0,1080], [1920,0,1920,1080]] //wall

    this.Move = function (){
        this.Y += (-Math.sin(this.direction * PIby180) * this.speed) / FPS
        this.X += (Math.cos(this.direction * PIby180) * this.speed) / FPS

        this.LineCollision.forEach((lineAr) =>{
            if(CollisionLineCircle(lineAr[0],lineAr[1],lineAr[2],lineAr[3],this.X, this.Y, this.radius)[0] !== false){
                var collision = CollisionLineCircle(lineAr[0],lineAr[1],lineAr[2],lineAr[3],this.X, this.Y, this.radius)
                var colAngle = (collision[0] * 180/Math.PI)%180
                var newangle = colAngle - (this.direction - colAngle)
                this.direction = (newangle+360)%360
                this.Y += (-Math.sin(newangle * PIby180) * collision[1]) 
                this.X += (Math.cos(newangle * PIby180) * collision[1]) 
            }
        })

        Players.forEach((player) =>{
            //console.log(CollisionRectCircle(player.X-player.width/2, player.Y-player.height/2, player.X+player.width/2, player.Y+player.height/2, this.X, this.Y, this.radius))
            if(CollisionRectCircle(player.X-player.width/2, player.Y-player.height/2, player.X+player.width/2, player.Y+player.height/2, this.X, this.Y, this.radius)[0] !== false){

                var collision = CollisionRectCircle(player.X-player.width/2, player.Y-player.height/2, player.X+player.width/2, player.Y+player.height/2, this.X, this.Y, this.radius)

                var colAngle = (collision[0] * 180/Math.PI)%180
                var newangle = colAngle - (this.direction - colAngle)
                this.direction = (newangle+360)%360
                this.Y += (-Math.sin(newangle * PIby180) * collision[1]) 
                this.X += (Math.cos(newangle * PIby180) * collision[1]) 
            }
        })
    }

    this.DrawSelf = function () {
        ArcNeon(this.X,this.Y, this.radius, 0, Math.PI*2, colorWheel(this.color, 30, 0, 1), true, 10, 3, 30, colorWheel(this.color, 80, 10, globLightDif))
    };

}

function SetupMode() {
    if (mode == "default") {
        let player1 = new Player(1);
        let player2 = new Player(2);
        
        Players = [player1, player2];

        Players.forEach((player) => {
            player.Y = canvasH / 2;
            player.width = 20;
            player.height = 200;
            player.mode = "default";
            player.color = GlobColor1;
        });
        player1.X = 75;
        player2.X = canvasW - 75;

        let ball = new Ball();
        ball.color = GlobColor1;
        ball.direction = 27;
        ball.speed = 200;
        
        Balls = [ball]
    }

    if (mode == "freemove") {
        let player1 = new Player(1);
        let player2 = new Player(2);

        Players = [player1, player2];

        Players.forEach((player) => {
            player.Y = canvasH / 2;
            player.width = 20;
            player.height = 200;
            player.mode = "freemove";
            player.color = GlobColor1;
        });
        player1.X = 75;
        player2.X = canvasW - 75;

        let ball = new Ball();
        ball.color = GlobColor1;
        ball.direction = 27;
        ball.speed = 200;
        
        Balls = [ball]
    }

    if (mode == "tpY") {// optimisation possible à faire plus tard
        let player1A = new Player(1);
        let player1B = new Player(1);
        let player2A = new Player(2);
        let player2B = new Player(2);
        Players = [player1A,player1B, player2A,player2B];

        Players.forEach((player) => {
            player.Y = canvasH / 2;
            player.width = 20;
            player.height = 200;
            player.mode = "tpY";
        });
        
        player1B.Y = - canvasH / 2; 
        player2B.Y = - canvasH / 2; 
        player1A.X = 75;
        player1B.X = 75;
        player2A.X = canvasW - 75;
        player2B.X = canvasW - 75;

        let ball = new Ball();
        ball.color = GlobColor1;
        ball.direction = 27;
        ball.speed = 200;
        
        Balls = [ball]
    }

    if (mode == "circle") {
        let player1 = new Player(1);
        let player2 = new Player(2);

        Players = [player1, player2];

        Players.forEach((player) => {
            player.X = 500;
            player.Y = canvasH / 2;
            player.width = 20;
            player.height = 6;
            player.internalBorders = 80;
            player.mode = "circle";
        });
        
        let ball = new Ball();
        ball.color = GlobColor1;
        ball.direction = 27;
        ball.speed = 200;
        
        Balls = [ball]
    }
    
    if (mode == "bird") {
        let player1 = new Player(1);
        let player2 = new Player(2);

        Players = [player1, player2];

        Players.forEach((player) => {
            player.Y = canvasH / 2;
            player.width = 20;
            player.height = 80;
            player.mode = "bird";
            player.VarModeA = 0;
            player.VarModeB = 0;
            player.VarModeC = 1;
        });
        player1.X = 75;
        player2.X = canvasW - 75;

        Players = [player1, player2];

        let ball = new Ball();
        ball.color = GlobColor1;
        ball.direction = 27;
        ball.speed = 200;
        
        Balls = [ball]
    }
}



function setup() {
    //fonction de setup executer 1 fois
    canvas = document.getElementById("PongGame");
    ctx = canvas.getContext("2d");

    IntervalTime = setInterval(Frame, 1000 / FPS);

    window.addEventListener("keydown", checkKeyPress, true); //fonction pour mettre emplace les boutons
    window.addEventListener("keyup", checkKeyRelease, true);

    SetupMode();
}

function Frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    LineNeon(960, 0, 960, 1080, colorWheel(BorderColor, 25), 5, -2, 15, colorWheel(BorderColor, 100)); //ligne de séparation
    LineNeon(-10, 0, canvasW + 10, 0, colorWheel(BorderColor, 25), 3, borderWidth, 50, colorWheel(BorderColor, 100)); // Ligne du haut
    LineNeon(-10, canvasH, canvasW + 10, canvasH, colorWheel(BorderColor, 25), 3, borderWidth, 30, colorWheel(BorderColor, 100)); // Ligne du bas


    Players.forEach((player) => {
        player.Move();
        player.DrawSelf();
        //player.color += 0.01
    });


    Balls.forEach((ball) => {
        ball.Move();
        ball.DrawSelf();
    });

    /*RectNeon(200, 200, 200, 200, colorWheel(0, 30, 10, 1), false, 0, 10, 3, 30, colorWheel(0, 80, 10, 1))
    ArcNeon(300,160, 50, 0, Math.PI*2)
    console.log(CollisionRectCircle(200,200,400,400, 300,160, 50))*/

    LineNeon(200, 300, 500, 300,  colorWheel(BorderColor, 25), 7, 3, 20, colorWheel(BorderColor, 100));
    ArcNeon(120+Tx, 295, 50,  0, Math.PI*2, colorWheel(BorderColor, 25), false, 7, 3, 20, colorWheel(BorderColor, 100)) 

    var oui =  CollisionLineCircle(200, 300, 500, 300, 120+Tx, 295, 50);

    if(oui === false){
        console.log("nan ça touche po frairo")
    }else{
    }
    
    Tx += 0.5

    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = bgColor;
    ctx.fillRect(0 - 20, 0 - 20, canvas.width + 20, canvas.height + 20); // +20 pour quand l'écran tremble
    ctx.globalCompositeOperation = 'source-over';
}


function CollisionRectCircle(x1,y1,x2,y2, cx,cy,r, round = 0){

    if(round == 0){
        if(CollisionLineCircle(x1,y1,x2,y1, cx,cy,r)[0] != false){ //check center fist ( pour eviter les bugs de collisions)
            return CollisionLineCircle(x1,y1,x2,y1, cx,cy,r)
        }

        if(CollisionLineCircle(x1,y1,x2,y1, cx,cy,r)[0] != false){
            return CollisionLineCircle(x1,y1,x2,y1, cx,cy,r)
        }
        if(CollisionLineCircle(x2,y1,x2,y2, cx,cy,r)[0] != false){
            return CollisionLineCircle(x2,y1,x2,y2, cx,cy,r)
        }
        if(CollisionLineCircle(x2,y2,x1,y2, cx,cy,r)[0] != false){
            return CollisionLineCircle(x2,y2,x1,y2, cx,cy,r)
        }
        if(CollisionLineCircle(x1,y2,x1,y1, cx,cy,r)[0] != false){
            return CollisionLineCircle(x1,y2,x1,y1, cx,cy,r)
        }
        return [false]
    }



    /*if(CollisionPointCircle(x1,y1, cx,cy,r) || CollisionPointCircle(x1,y2, cx,cy,r) || CollisionPointCircle(x2,y1, cx,cy,r) || CollisionPointCircle(x2,y2, cx,cy,r)){
        return true
    }

    if((x1 - r) <= cx && cx <= (x2 + r)){
        if((y1 - r) <= cy && cy <= (y2 + r)){
            return true
        }
    }
*/
    //return [false]
}

function CollisionLineCircle(x1, y1, x2, y2, cx, cy, r){
    //function return false with no collision or angle of line (tangente) if collisions
    //extremité du segment en contact
    var bout1 = CollisionPointCircle(x1,y1, cx,cy,r); //line extrimity
    var bout2 = CollisionPointCircle(x2,y2, cx,cy,r);
    var distance = Math.sqrt( Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) ); //line lenth 


    // get dot product of the line and circle
    var dot = ( ((cx-x1)*(x2-x1)) + ((cy-y1)*(y2-y1)) ) / Math.pow(distance,2);

    // find the closest point on the line
    var closestX = x1 + (dot * (x2-x1));
    var closestY = y1 + (dot * (y2-y1));

    // is this point actually on the line segment?
    // if so keep going, but if not, chek the corner and find tangente 
    var onSegment = CollisionLinePoint(x1,y1,x2,y2, closestX,closestY);

    if (!onSegment){
        if(bout1 || bout2){ //si le cercle touche une des bouts de la ligne
            if(bout1){
                var angle = Math.asin((x1-cx) / (Math.sqrt( Math.pow(x1-cx,2) + Math.pow(y1-cy,2) )))
                if(cy > y1){
                    angle = Math.PI - angle
                }
                return [angle, r - Math.sqrt( Math.pow(x1 - cx,2) + Math.pow(y1 - cy,2))]
            }else if(bout2){
                
                var angle = Math.asin((x2-cx) / (Math.sqrt( Math.pow(x2-cx,2) + Math.pow(y2-cy,2) )))
                if(cy < y2){
                    angle = Math.PI + angle
                    return [angle, r - Math.sqrt( Math.pow(x2 - cx,2) + Math.pow(y2 - cy,2))]
                }
                return [-angle, r - Math.sqrt( Math.pow(x2 - cx,2) + Math.pow(y2 - cy,2))]
            }
        }else{
            return [false];
        }
    }

    // get distance to closest point
    var distX = closestX - cx;
    var distY = closestY - cy;
    distance = Math.sqrt( (distX*distX) + (distY*distY) );

    if (distance <= r) {
        //return line angle (true) 
        var angle = Math.acos((x1-x2) / (Math.sqrt( Math.pow(x1-x2,2) + Math.pow(y1-y2,2) )))
        if(y2 < y1){
            angle = Math.PI - angle;
        }
        return [angle % Math.PI, r - distance];
    }else{
        return [false]
    }
}

function CollisionLinePoint(x1, y1, x2, y2, px, py){  //need for Collision LineCi!rcle
    // get distance from the point to the two ends of the line
    //var d1 = dist(px,py, x1,y1);
    var d1 = Math.sqrt(Math.pow(px - x1,2) + Math.pow(py - y1,2))
    //var d2 = dist(px,py, x2,y2);
    var d2 = Math.sqrt(Math.pow(px - x2,2) + Math.pow(py - y2,2))

    // get the length of the line
    //var lineLen = dist(x1,y1, x2,y2);
    var lineLen = Math.sqrt(Math.pow(x1 - x2,2) + Math.pow(y1 - y2,2))

    // since floats are so minutely accurate, add
    // a little buffer zone that will give collision
    var buffer = 0.1;    // higher # = less accurate

    // if the two distances are equal to the line's
    // length, the point is on the line!
    // note we use the buffer here to give a range,
    // rather than one #
    if (d1+d2 >= lineLen-buffer && d1+d2 <= lineLen+buffer) {
        return true;
    }else{
        return false;
    }

}

function CollisionPointCircle(px, py, cx, cy, r){ //need for CollisionLinePoint and CollisionLineCircle
    var distance = Math.sqrt( Math.pow(px - cx,2) + Math.pow(py - cy,2) )
    if( distance <= r){
        return true
    }else{
        return false
    }
}


function colorWheel(hueC, saturation = 100, darkness = 0, alpha = 1) {
    /*
    hue :: 0 : red ; 1 : yellow ; 2 : green ; 3 : cyan ; 4 : blue ; 5 : purple ; 6 : red
    hue  0 == 6   6 is one cycle rotation
    saturation [0;100]
    darkness [0;100]
    alpha [0;1]
    */

    let red;
    let green;
    let blue;
    let hue = hueC % 6;

    if (hue >= 0 && hue < 1) {
        red = 255;
        green = hue * 255;
        blue = 0;
    } else if (hue >= 1 && hue < 2) {
        green = 255;
        red = 255 - (hue - 1) * 255;
        blue = 0;
    } else if (hue >= 2 && hue < 3) {
        green = 255;
        blue = (hue - 2) * 255;
        red = 0;
    } else if (hue >= 3 && hue < 4) {
        blue = 255;
        green = 255 - (hue - 3) * 255;
        red = 0;
    } else if (hue >= 4 && hue < 5) {
        blue = 255;
        red = (hue - 4) * 255;
        green = 0;
    } else if (hue >= 5 && hue < 6) {
        red = 255;
        blue = 255 - (hue - 5) * 255;
        green = 0;
    }

    let sat = (100 - saturation) / 100;
    red = red + (255 - red) * sat;
    green = green + (255 - green) * sat;
    blue = blue + (255 - blue) * sat;

    let dark = (100 - darkness) / 100;
    red = red * dark;
    green = green * dark;
    blue = blue * dark;

    return "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";
}

function LineNeon(Xs, Ys, Xa, Ya, StrokeColor, brightness = 10, width = 10, blur = 30, ShadowColor = 0, dotted = [0, 0]) {
    //int,int, int,int, string : "rgba(255,0,50,1)", string : "rgba(0,0,250,1)"
    //ctx.globalCompositeOperation = "lighter";
    if (ShadowColor == 0) {
        ShadowColor = StrokeColor;
    }
    ctx.shadowColor = ShadowColor; //neon light color, ex : "rgba(255,0,50,1)"
    ctx.shadowBlur = blur;
    ctx.setLineDash(dotted);
    ctx.lineJoin = "round"; //smooth border angle
    ctx.strokeStyle = ShadowColor; //stroke color, ex : "rgba(0,0,250,1)"
    ctx.fillStyle = StrokeColor;

    ctx.lineWidth = width + 8;
    ctx.strokeStyle = StrokeColor;
    ctx.beginPath();
    ctx.moveTo(Xs, Ys);
    ctx.lineTo(Xa, Ya);
    ctx.closePath();
    ctx.stroke();
    ctx.globalCompositeOperation = 'lighter';
    for (var W = brightness; W > 4; W -= 2.5) {
        //diminue W (width) de 2.5 a chaque tour
        ctx.lineWidth = W + width;
        ctx.beginPath();
        ctx.moveTo(Xs, Ys);
        ctx.lineTo(Xa, Ya);
        ctx.closePath();
        ctx.stroke();
    }
    ctx.globalCompositeOperation = 'source-over';
    ctx.shadowBlur = 0;
    ctx.strokeStyle = StrokeColor;
    ctx.stroke();

    ctx.setLineDash([0, 0]); //resest for other function
}

function TextNeon(x, y, text, font, StrokeColor, Fill = true, brightness = 10, width = 10, blur = 30, ShadowColor = 0, textAligne = "center") {
    if (ShadowColor == 0) {
        ShadowColor = StrokeColor;
    }
    ctx.shadowColor = ShadowColor; //neon light color, ex : "rgba(255,0,50,1)"
    ctx.shadowBlur = blur;
    ctx.strokeStyle = ShadowColor; //stroke color, ex : "rgba(0,0,250,1)"
    ctx.font = font;
    ctx.fillStyle = StrokeColor;
    ctx.textAlign = textAligne;
    ctx.lineWidth = 1;
    //ctx.strokeText(text, x, y);

    ctx.lineWidth = width + 8;
    ctx.strokeStyle = StrokeColor;
    ctx.strokeText(text, x, y);
    ctx.globalCompositeOperation = 'lighter';
    for (var W = brightness; W > 4; W -= 3) {
        //diminue W (width) de 2.5 a chaque tour
        ctx.lineWidth = W + width;
        ctx.strokeText(text, x, y);
    }
    ctx.globalCompositeOperation = 'source-over';
    ctx.shadowBlur = 0;
    if (Fill) {
        ctx.fillText(text, x, y);
    }
    ctx.strokeStyle = StrokeColor;
    ctx.lineWidth += 7;
    ctx.strokeText(text, x, y);
}

function RectNeon(X, Y, Width, Height, StrokeColor, Fill = false, Round = 0, brightness = 10, width = 10, blur = 30, ShadowColor = 0) {
    //int,int, int,int, string : "rgba(255,0,50,1)", string : "rgba(0,0,250,1)", bool, float (0;1)
    //source : https://codepen.io/agar3s/pen/pJpoya
    //a normal rectangle have Round = 0
    if (ShadowColor == 0) {
        ShadowColor = StrokeColor;
    }
    ctx.shadowColor = ShadowColor; //neon light color, ex : "rgba(255,0,50,1)"
    ctx.shadowBlur = blur;
    ctx.lineJoin = "round"; //smooth border angle
    ctx.strokeStyle = ShadowColor; //stroke color, ex : "rgba(0,0,250,1)"
    ctx.fillStyle = StrokeColor;

    if (Round == 0) {  //sans bord arondie
        ctx.lineWidth = width + 8;
        ctx.strokeStyle = StrokeColor;
        ctx.strokeRect(X, Y, Width, Height);
        ctx.globalCompositeOperation = 'lighter';
        for (var W = brightness; W >= 4; W -= 2.5) {
            //diminue W (width) de 2.5 a chaque tour
            ctx.lineWidth = W + width;
            ctx.strokeRect(X, Y, Width, Height);
        }
        ctx.globalCompositeOperation = 'source-over';
        ctx.shadowBlur = 0;
        if (Fill) {
            ctx.fillRect(X, Y, Width, Height);
        }
        ctx.strokeStyle = StrokeColor;
        ctx.lineWidth += 7;
        ctx.strokeRect(X, Y, Width, Height);
    } else { //rectangle avec bord arrondie
        var borderLength = (Math.min(Width, Height) / 2) * Round;

        ctx.lineWidth = width + 8;
        ctx.strokeStyle = StrokeColor;
        ctx.beginPath();
        ctx.arc(X + borderLength, Y + borderLength, borderLength, Math.PI, -0.5 * Math.PI);
        ctx.arc(X + Width - borderLength, Y + borderLength, borderLength, -0.5 * Math.PI, 0);
        ctx.arc(X + Width - borderLength, Y + Height - borderLength, borderLength, 0, 0.5 * Math.PI);
        ctx.arc(X + borderLength, Y + Height - borderLength, borderLength, 0.5 * Math.PI, Math.PI);
        ctx.closePath();
        ctx.stroke();
        ctx.globalCompositeOperation = 'lighter';
        for (var W = brightness; W >= 4; W -= 2.5) {
            ctx.lineWidth = W + width;
            ctx.beginPath();
            ctx.arc(X + borderLength, Y + borderLength, borderLength, Math.PI, -0.5 * Math.PI);
            ctx.arc(X + Width - borderLength, Y + borderLength, borderLength, -0.5 * Math.PI, 0);
            ctx.arc(X + Width - borderLength, Y + Height - borderLength, borderLength, 0, 0.5 * Math.PI);
            ctx.arc(X + borderLength, Y + Height - borderLength, borderLength, 0.5 * Math.PI, Math.PI);
            ctx.closePath();
            ctx.stroke();
        }
        ctx.globalCompositeOperation = 'source-over';
        ctx.shadowBlur = 0;
        if (Fill) {
            ctx.beginPath();
            ctx.arc(X + borderLength, Y + borderLength, borderLength, Math.PI, -0.5 * Math.PI);
            ctx.arc(X + Width - borderLength, Y + borderLength, borderLength, -0.5 * Math.PI, 0);
            ctx.arc(X + Width - borderLength, Y + Height - borderLength, borderLength, 0, 0.5 * Math.PI);
            ctx.arc(X + borderLength, Y + Height - borderLength, borderLength, 0.5 * Math.PI, Math.PI);
            ctx.closePath();
            ctx.fill();
        }
        ctx.strokeStyle = StrokeColor;
        ctx.lineWidth += 7;
        ctx.stroke();
    }
}

function ArcNeon(X, Y, Radius, Sangle, Aangle, StrokeColor, Fill = false, brightness = 10, width = 10, blur = 30, ShadowColor = 0) {
    //int,int, int, int,int, string : "rgba(255,0,50,1)", string : "rgba(0,0,250,1)", bool
    //source : https://codepen.io/agar3s/pen/pJpoya
    if (ShadowColor == 0) {
        ShadowColor = StrokeColor;
    }
    ctx.shadowColor = ShadowColor; //neon light color, ex : "rgba(255,0,50,1)"
    ctx.shadowBlur = blur;
    ctx.lineJoin = "round"; //smooth border angle
    ctx.strokeStyle = ShadowColor; //stroke color, ex : "rgba(0,0,250,1)"
    ctx.fillStyle = StrokeColor;

    ctx.lineWidth = width + 8;
    ctx.strokeStyle = StrokeColor;
    ctx.beginPath();
    ctx.arc(X, Y, Radius, Sangle, Aangle);
    ctx.stroke();
    ctx.globalCompositeOperation = 'lighter';
    for (var W = brightness; W > 4; W -= 2.5) {
        //diminue W (width) de 2.5 a chaque tour
        ctx.lineWidth = W + width;
        ctx.beginPath();
        ctx.arc(X, Y, Radius, Sangle, Aangle);
        ctx.stroke();
    }
    ctx.globalCompositeOperation = 'source-over';
    ctx.shadowBlur = 0;
    if (Fill) {
        ctx.beginPath();
        ctx.arc(X, Y, Radius, Sangle, Aangle);
        ctx.fill();
    }
    ctx.strokeStyle = StrokeColor;
    ctx.lineWidth += 7;
    ctx.stroke();
}

function CourbRectNeon(X,Y, RayDistance, angle, Height, Width, StrokeColor, Fill = false, brightness = 10, width = 10, blur = 30, ShadowColor = 0){
    //X;Y center of circle, angle: position on circle to draw in Radiant, Height [0; 100] % of filling circle, 
    var Pangle = Height * Math.PI /100 //Pangle Pourcentage angle

    if (ShadowColor == 0) {
        ShadowColor = StrokeColor;
    }
    ctx.shadowColor = ShadowColor; //neon light color, ex : "rgba(255,0,50,1)"
    ctx.shadowBlur = blur;
    ctx.lineJoin = "round"; //smooth border angle
    ctx.strokeStyle = ShadowColor; //stroke color, ex : "rgba(0,0,250,1)"
    ctx.fillStyle = StrokeColor;

    
    ctx.lineWidth = width + 8;
    ctx.strokeStyle = StrokeColor;
    ctx.beginPath();
    ctx.arc(X, Y, RayDistance, angle-Pangle, angle+Pangle);
    ctx.arc(X, Y, RayDistance+Width, angle+Pangle, angle-Pangle, true);
    ctx.closePath();
    ctx.stroke();
    ctx.globalCompositeOperation = 'lighter';
    for (var W = brightness; W > 4; W -= 2.5) {
        //diminue W (width) de 2.5 a chaque tour
        ctx.lineWidth = W + width;
        ctx.beginPath();
        ctx.arc(X, Y, RayDistance, angle-Pangle, angle+Pangle);
        ctx.arc(X, Y, RayDistance+Width, angle+Pangle, angle-Pangle, true);
        ctx.closePath();
        ctx.stroke();
    }
    ctx.globalCompositeOperation = 'source-over';
    ctx.shadowBlur = 0;
    if (Fill) {  //fill inside shape
        ctx.beginPath();
        ctx.arc(X, Y, RayDistance, angle-Pangle, angle+Pangle);
        ctx.arc(X, Y, RayDistance+Width, angle+Pangle, angle-Pangle, true);
        ctx.closePath();
        ctx.fill();
    }
    ctx.strokeStyle = StrokeColor;
    ctx.lineWidth += 7
    ctx.stroke(); //to clean border 
}

function checkKeyPress(key) {
    PKeys.set(key.code, 1);
    //console.log(PKeys);
    //CheckAxes();

    if (key.code == "KeyW") {
        P1Yaxe = -1;
    }
    if (key.code == "KeyS") {
        P1Yaxe = 1;
    }
    if (key.code == "KeyD") {
        P1Xaxe = 1;
    }
    if (key.code == "KeyA") {
        P1Xaxe = -1;
    }
    if (key.code == "ArrowUp") {
        P2Yaxe = -1;
    }
    if (key.code == "ArrowDown") {
        P2Yaxe = 1;
    }
    if (key.code == "ArrowRight") {
        P2Xaxe = 1;
    }
    if (key.code == "ArrowLeft") {
        P2Xaxe = -1;
    }
}

function checkKeyRelease(key) {
    PKeys.set(key.code, 0);
    //CheckAxes();

    if (key.code == "KeyW") {
        P1Yaxe = 0;
        if (PKeys.get("KeyS") == 1) {
            P1Yaxe = 1;
        }
    }
    if (key.code == "KeyS") {
        P1Yaxe = 0;
        if (PKeys.get("KeyW") == 1) {
            P1Yaxe = -1;
        }
    }
    if (key.code == "KeyA") {
        P1Xaxe = 0;
        if (PKeys.get("KeyD") == 1) {
            P1Xaxe = 1;
        }
    }
    if (key.code == "KeyD") {
        P1Xaxe = 0;
        if (PKeys.get("KeyA") == 1) {
            P1Xaxe = -1;
        }
    }

    if (key.code == "ArrowUp") {
        P2Yaxe = 0;
        if (PKeys.get("ArrowDown") == 1) {
            P2Yaxe = 1;
        }
    }
    if (key.code == "ArrowDown") {
        P2Yaxe = 0;
        if (PKeys.get("ArrowUp") == 1) {
            P2Yaxe = -1;
        }
    }
    if (key.code == "ArrowRight") {
        P2Xaxe = 0;
        if (PKeys.get("ArrowLeft") == 1) {
            P2Xaxe = -1;
        }
    }
    if (key.code == "ArrowLeft") {
        P2Xaxe = 0;
        if (PKeys.get("ArrowRight") == 1) {
            P2Xaxe = 1;
        }
    }
}

function CheckAxes() {
    P1Xaxe = 0;
    P1Yaxe = 0;
    P2Xaxe = 0;
    P2Yaxe = 0;

    if (PKeys.get("KeyW") == 1) {
        P1Yaxe -= 1;
    }
    if (PKeys.get("KeyS") == 1) {
        P1Yaxe += 1;
    }
    if (PKeys.get("KeyD") == 1) {
        P1Xaxe += 1;
    }
    if (PKeys.get("KeyA") == 1) {
        P1Xaxe -= 1;
    }
    if (PKeys.get("ArrowUp") == 1) {
        P2Yaxe -= 1;
    }
    if (PKeys.get("ArrowDown") == 1) {
        P2Yaxe += 1;
    }
    if (PKeys.get("ArrowRight") == 1) {
        P2Xaxe += 1;
    }
    if (PKeys.get("ArrowLeft") == 1) {
        P2Xaxe -= 1;
    }
}

setup();
