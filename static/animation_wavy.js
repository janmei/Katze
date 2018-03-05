// ------------------------------------------------
// BACKGROUND ANIMATION FOR INTERACTIVE FUTURE 2018
// ------------------------------------------------

// Variables //

// Global
var x
var triangles // array with all triangles
var colors // main colors
var a // agent
var e // ellipse for transition
var sliders // slider
var bg_c
var e_size
var transition

// to start transition use 
// e.active = true
// e.active = false


// SETUP
var setup = function(){
    createCanvas(window.innerWidth, window.innerHeight)

    colors = [color(239, 128, 29), color(254, 202, 25), color(246, 163, 29)]

    triangles = []
    sliders = []
    x = 60

    bg_c = [254, 202, 25]
    e_size = 0;
    transition = false

    a = new agent()
    e = new trans()

    sliders.push(new slider(100, colors[0]))
    sliders.push(new slider(600, colors[1]))
    sliders.push(new slider(800, colors[2]))

    for(var i = 0; i < width / 50 + 1; i++){
        for(var j = 0; j < height / 50 + 1; j++){
            triangles.push(new tri(-50 + i * 50, -50 + j * 50, i))
        }
    }
}

// MAIN
var draw = function(){
    // background(63, 115, 115)
    background(254, 202, 25)

    e.draw();

    fill(200)   
    noStroke()
    for(var i = 0; i < triangles.length; i++){
        triangles[i].draw()
    }
    a.move() 
    
    /*
    for(var i = sliders.length - 1; i >= 0; i--){
        sliders[i].draw()
    }
    */
   
    for(var i = 0; i < sliders.length; i++){
        sliders[i].draw()
    }
}

// TRANSITION
var trans = function(){
    this.position = createVector(width / 2, height / 2)
    this.size = 0

    this.active = false

    this.draw = function(){    
        fill(239, 128, 29)      
        // Transition Ellipse
        if(this.active){
            if(this.size <= 1){
                transition = true
            }
            if(transition && this.size < width * 2){
                this.size+=20
            }
        } else {
            if(this.size >= 0){
                this.size-= 20;
            }
        }
        // Draw the ellipse
        ellipse(width / 2, height / 2, this.size, this.size)
    }
}

// AGENT
// Moves around randomly to influence the triangles
var agent = function(){
    this.position = createVector(width / 2, height / 2)
    this.speed = 5
    this.direction = createVector(1,1)
    this.life = 0
    this.changeTimer = 100

    this.move = function(){
        this.position.x += this.direction.x * this.speed
        this.position.y += this.direction.y * this.speed
        if(this.life < this.changeTimer){
            this.life++
        } else {
            this.changeDirection()
            this.life = 0
        }
        
        fill(0)
        // ellipse(this.position.x,this.position.y, 20, 20)

        if(this.position.x < 0){
            this.direction.x = 1
        } else if(this.position.x > width){
            this.direction.x = -1
        }
        
        if(this.position.y < 0){
            this.direction.y = 1
        } else if(this.position.y > height){
            this.direction.y = -1
        }
    }

    this.changeDirection = function(){
        this.direction.x = random(-1, 1)
        this.direction.y = random(-1, 1)
    }
}

// TRIANGLE
var tri = function(x,y,r,target){
    this.position = createVector(x,y)
    this.row = r

    this.c = colors[round(random(0, colors.length - 1))]

    // Can change
    this.positionsX = [0, 50, 0]
    this.positionsY = [0, 25, 50]
    
    // Fixed
    this.oPositionsX = [0, 50, 0]
    this.oPositionsY = [0, 25, 50]

    // Translate down if even row
    if(this.row % 2){
        this.position.y += 25
    }

    this.speed = dist(this.position.x, this.position.y, a.position.x, a.position.y) / 4000

    this.draw = function(){  
        
        fill(this.c)

        if(dist(a.position.x, a.position.y, this.position.x, this.position.y) < 200){
            if(this.positionsX[0] + this.position.x < a.position.x){                
                this.positionsX[0]+=this.speed
                this.positionsX[1]-=this.speed
                this.positionsX[2]+=this.speed
                this.positionsY[0]+=this.speed
                this.positionsY[2]-=this.speed
            }
        } else {
            if(this.positionsX[0] > this.oPositionsX[0]){
                this.positionsX[0]-=this.speed
                this.positionsX[1]+=this.speed
                this.positionsX[2]-=this.speed
                this.positionsY[0]-=this.speed
                this.positionsY[2]+=this.speed
            }
        }

        beginShape()
        for(var i = 0; i < 3; i++){
            vertex(this.positionsX[i] + this.position.x, this.positionsY[i] + this.position.y)
        }
        endShape(CLOSE)
    }
}

// Slider
var slider = function(endPos, c){
    this.position = createVector(width, 0)
    this.c = c
    this.endPos = endPos

    this.draw = function(){
        fill(this.c)
        beginShape()
        vertex(this.position.x, height)
        vertex(this.position.x + width / 2, 0)
        vertex(width, 0)
        vertex(width, height)
        endShape(CLOSE)

        /*
        if(this.position.x > this.endPos){            
            this.position.x-= 60
        }
        */
    }
}