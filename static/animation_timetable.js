var timeTable = function(){
    background(63, 115, 115)
    // LINES
    fill(254, 202, 25)
    rect(0, 25, width, 10)
    rect(0, 65, width, 65)
    
    rect(0, height - 45, width, 15)

    for(var i = 0; i < rows.length; i++){
        rows[i].draw()
    }
}

var row = function(x, y, dir, speed, scale, c){
    this.units = []
    this.position = createVector(x, y)
    this.direction = dir
    this.speed = speed
    this.scale = scale
    if(c){
        this.c = colors[4]
    } else {
        this.c = colors[1]
    }

    this.row = this
    
    for(var i = 0; i < width / 100; i++){
        this.units.push(new unit(i * -this.scale * this.direction, this.position.y, this.row))
    }

    this.draw = function(){
        for(var i = 0; i < this.units.length; i++){
            this.units[i].render()
        }
    }
}

var unit = function(x, y, row){
    this.position = createVector(x,y)
    this.row = row
    this.scale = this.row.scale

    this.render = function(){
        fill(this.row.c)
        noStroke()
        if(this.row.direction == 1){                
            beginShape()
            vertex(this.position.x - this.scale * 0.3, this.position.y - this.scale / 2)
            vertex(this.position.x + this.scale / 2, this.position.y)
            vertex(this.position.x - this.scale * 0.3, this.position.y + this.scale / 2)
            endShape(CLOSE)
        } else {            
            beginShape()
            vertex(this.position.x + this.scale * 0.3, this.position.y + this.scale / 2)
            vertex(this.position.x - this.scale / 2, this.position.y)
            vertex(this.position.x + this.scale * 0.3, this.position.y - this.scale / 2)
            endShape(CLOSE)
        }
        this.move()
    }

    this.move = function(){
        // MOVE RIGHT
        if(this.row.direction == 1){
            this.position.x += this.row.speed            
            if(this.position.x > width){
                this.position.x -= width
            }
        } 
        // MOVE LEFT
        else {
            this.position.x -= this.row.speed
            if(this.position.x < 0){
                this.position.x += width
            }
        }
    }
}