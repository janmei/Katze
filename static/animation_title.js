var title = function(){
    background(currentColor)
    for(var i = 0; i < honeyPolys.length; i++){
        honeyPolys[i].draw()
    }
}

var honeyPoly = function(x,y){
    this.position = createVector(x,y)
    this.size = random(30, 50)
    this.scale = 0
    this.speed = random(0, 1)
    this.s = 0
    this.c = colors[round(random(0,2))]
    this.active = false
    this.bounds = createVector(40, 20)

    if(this.position.x < width / 2 - (width / 100 * this.bounds.x)){
        this.active = true
    } else if(this.position.x > width / 2 + (width / 100 * this.bounds.x)){
        this.active = true
    }
    if(this.position.y < height / 2 - (height / 100 * this.bounds.y)){
        this.active = true
    } else if(this.position.y > height / 2 + (height / 100 * this.bounds.y)){
        this.active = true
    }

    var nope = random(0,100)

    if(nope > 90){
        this.active = false
    }

    this.draw = function(){
        if(this.active){
            this.scale = this.size * sin(this.s)
            fill(this.c)
            beginShape()
            vertex(this.position.x, this.position.y - this.scale)
            vertex(this.position.x + this.scale, this.position.y - this.scale / 2)
            vertex(this.position.x + this.scale, this.position.y + this.scale / 2)
            vertex(this.position.x, this.position.y + this.scale)
            vertex(this.position.x - this.scale, this.position.y + this.scale / 2)
            vertex(this.position.x - this.scale, this.position.y - this.scale / 2)
            endShape(CLOSE)

            this.s += this.speed / 10
        }           
    }
}