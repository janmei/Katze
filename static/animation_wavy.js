var x
var triangles
var colors
var a

var bg_c
var e_size
var transition

var setup = function(){
    createCanvas(window.innerWidth, window.innerHeight)

    colors = [color(239, 128, 29), color(254, 202, 25), color(246, 163, 29)]

    triangles = []
    x = 60

    bg_c = [254, 202, 25]
    e_size = 0;
    transition = false

    a = new agent()

    for(var i = 0; i < width / 50 + 1; i++){
        for(var j = 0; j < height / 50 + 1; j++){
            triangles.push(new tri(-50 + i * 50, -50 + j * 50, i))
        }
    }
}

var draw = function(){
    // background(63, 115, 115)
    background(254, 202, 25)


    // Transition Ellipse
    if(a.position.x < width / 2){        
        fill(254, 202, 25)
    } else {
        fill(239, 128, 29)
        if(e_size <= 1){
            transition = true
        }
        if(transition && e_size < width){
            e_size+=20
        } else {
            transition = false
            e_size -=20
        }
    }

    ellipse(width / 2, height / 2, e_size, e_size)

    fill(200)   
    noStroke()
    for(var i = 0; i < triangles.length; i++){
        triangles[i].draw()
    }
    a.move()    
}

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

        /*        
        if(dist(mouseX, mouseY, this.position.x, this.position.y) < 200){
            for(var i = 0; i < 3; i++){ 
                if(mouseX < this.position.x + this.positionsX[i]){
                    this.positionsX[i] -= this.speed
                } else {
                    this.positionsX[i] += this.speed
                }
                if(mouseY < this.position.y + this.positionsY[i]){
                    this.positionsY[i] -= this.speed
                } else {
                    this.positionsY[i] += this.speed
                }
            }
        } else {
            for(var i = 0; i < 3; i++){
                if(this.positionsX[i] < this.oPositionsX[i]){
                    this.positionsX[i]+=this.speed;
                } else {
                    this.positionsX[i]-=this.speed;
                }
                if(this.positionsY[i] < this.oPositionsY[i]){
                    this.positionsY[i]+=this.speed;
                } else {
                    this.positionsY[i]-=this.speed;
                }
            }            
        }
        */

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