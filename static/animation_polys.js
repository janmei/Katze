var colors

var polys

var grid

var setup = function(){    
    createCanvas(window.innerWidth, window.innerHeight)

    polys = []    
    grid = new grid()

    // Main colors
    colors = [
        color(239, 128, 29),    // Yellow
        color(254, 202, 25),    // Yellow Variation
        color(246, 163, 29),    // Orange
        color(96, 45, 58),      // Red
        color(63, 115, 115),    // Turquoise
        color(247, 180, 170),   // Light Red
        color(226, 237, 201)    // Light Green
    ]

    for(var i = 0; i < 100; i++){        
        // var p = polys.push(new poly(random(width / 8, width - width / 8), random(height / 8, height - height / 8), colors[floor(random(0, colors.length))]))
        polys.push(new poly(random(0, width), random(0, height), colors[floor(random(0, colors.length))]))
    }    
}

var draw = function(){
    background(0)

    grid.draw()

    for(var i = 0; i < polys.length; i++){
        polys[i].draw()
    }
}

var poly = function(x,y, c){
    this.position = createVector(x,y)
    this.scale = random(1, 50)
    this.size = 1
    this.c = c
    this.direction = createVector(1, -0.5)
    // this.direction = createVector(random(-1, 1), random(-1, 1))
    this.speed = 0.1

    this.scale *= this.size
    this.speed *= this.scale / 10

    this.draw = function(){
        // fill(red(this.c), green(this.c), blue(this.c), 0)
        fill(this.c)
        // stroke(255)
        beginShape()
        vertex(this.position.x, this.position.y - this.scale)
        vertex(this.position.x + this.scale, this.position.y - this.scale / 2)
        vertex(this.position.x + this.scale, this.position.y + this.scale / 2)
        vertex(this.position.x, this.position.y + this.scale)
        vertex(this.position.x - this.scale, this.position.y + this.scale / 2)
        vertex(this.position.x - this.scale, this.position.y - this.scale / 2)
        endShape(CLOSE)
        
        this.move()
    }

    this.move = function(){
        // Move
        this.position.x += this.direction.x * this.speed
        this.position.y += this.direction.y * this.speed
        // Out of bounds
        if(this.position.x > width + 50){
            this.position.x = -50
        }
        if(this.position.y < -50){
            this.position.y = height + 50
        }
    }
}

var flyOut = function(speed){
    for(var i = 0; i < polys.length; i++){
        polys[i].speed = speed
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