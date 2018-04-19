var transition_polys = function(){

    fill(colors[0])
    rect(trans_polys[trans_polys.length-1].position.x - width * 2, 0, width * 2, height)

    for(var i = 0; i < trans_polys.length; i++){
        trans_polys[i].draw()
    }
}

var trans_poly = function(x,y, c){
    this.position = createVector(x,y)
    this.scale = random(60,80)
    this.size = 1
    this.c = c
    this.direction = createVector(1, 0)
    this.speed = 0.1

    this.scale *= this.size
    this.speed *= this.scale

    this.draw = function(){
        fill(this.c)
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
        if(this.position.x > width + 100){
            this.speed = 0
        }
        if(this.position.y < -50){
            this.position.y = height + 50
        }
    }
}