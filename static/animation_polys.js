var poly_animation = function(){
    background(0)

    // grid.draw()

    for(var i = 0; i < polys.length; i++){
        polys[i].draw()
    }
}

var poly = function(x,y, c){
    this.position = createVector(x,y)
    this.scale = random(25, 75)
    this.size = this.scale
    this.c = c
    this.direction = createVector(0, -1)
    // this.direction = createVector(random(-1, 1), random(-1, 1))
    this.speed = 0.1
    
    this.transition = false

    // this.scale *= this.size
    this.speed = random(1, 5)

    this.draw = function(){
        if(this.scale > 0){            
            // fill(red(this.c), green(this.c), blue(this.c), 0)
            fill(this.c)
            // stroke(255)
            beginShape()
            vertex(this.position.x, this.position.y - this.scale * 1.1)
            vertex(this.position.x + this.scale, this.position.y - this.scale / 2)
            vertex(this.position.x + this.scale, this.position.y + this.scale / 2)
            vertex(this.position.x, this.position.y + this.scale * 1.1)
            vertex(this.position.x - this.scale, this.position.y + this.scale / 2)
            vertex(this.position.x - this.scale, this.position.y - this.scale / 2)
            endShape(CLOSE)
            
            if(!this.transition){
                this.move()
            } else {
                if(this.scale >= 0.2){                
                    this.scale -= this.scale / 10
                } else {
                    if(this.scale > 0){
                        this.scale = 0
                    }
                }
            }
        }
    }

    this.move = function(){
        // Move
        this.position.x += this.direction.x * this.speed
        this.position.y += this.direction.y * this.speed
        // Out of bounds
        /* DIAGONAL
        if(this.position.x > width + 50){
            // this.position.x = -50
            this.position.x = width / 2
        } else if(this.position.x < 0){
            this.position.x = width / 2
        }
        if(this.position.y < -50){
            // this.position.y = height + 50
            this.position.y = height / 2
        } else if(this.position.y > height){
            this.position.y = height / 2
        } */
        /* Z ACHSE
        if(this.position.x > width + 50 || this.position.x < 0 || this.position.y > height + 50 || this.position.y < 0){
            this.position.x = width / 2
            this.position.y = height / 2
            this.scale = 1
        }
        */
       if(this.position.y <= -100){
           this.position.y = height + 100
           this.scale = this.size
       }
        // this.scale += 0.2
    }
}

var flyOut = function(speed){
    for(var i = 0; i < polys.length; i++){
        polys[i].speed = speed
    }
}

var startTransitionPoly = function(){
    if(polys[0].transition == false){
        for(var i = 0; i < polys.length; i++){
            polys[i].transition = true
        }
    } else {
        for(var i = 0; i < polys.length; i++){
            polys[i].transition = false
            polys[i].scale = polys[i].size
        }
    }
}

var grid = function(){
    this.position = createVector(width / 2, height / 2)
    this.scale = width / 50 * 10

    this.draw = function(){
        for(var i = 0; i < width / 50; i++){
            for(var j = 0; j < height / 50; j++){
                noStroke()
                fill(255, 255, 255, 40)
                ellipse(i * 50, j *  50, 2, 2)   
            }
        }
    }
}