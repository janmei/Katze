var rad

var setup = function(){
    createCanvas(window.innerWidth, window.innerHeight)
    rad = new radius(width / 2, height / 2)
    background(0)
}

var draw = function(){    
    background(0)
    rad.draw()
}

var radius = function(x,y){
    this.position = createVector(x,y)
    this.r = 50
    this.target = createVector(x + this.r,y)

    this.draw = function(){
        // CENTER
        fill(255)
        ellipse(this.position.x, this.position.y, 10, 10)

        stroke(255)
        line(this.position.x, this.position.y, this.target.x, this.target.y)
        noStroke()

        this.moveTarget()
    }

    this.moveTarget = function(){
        this.target.y += sin(this.r)
        this.target.x += cos(this.r)
        this.r += 0.01
    }
}