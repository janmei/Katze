var rows

var setup = function(){
    createCanvas(window.innerWidth, window.innerHeight)

    rows = []

    rows.push(new row(0, 200, 1))
}

var draw = function(){
    background(63, 115, 115)

    rows[0].draw()
}

var row = function(x, y, dir){
    this.units = []
    this.position = createVector(x, y)
    this.direction = dir
    this.speed = 10

    this.row = this
    
    for(var i = 0; i < width / 50; i++){
        this.units.push(new unit(i * -50, this.position.y, this.row))
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

    this.render = function(){
        fill(96, 45, 58)
        beginShape()
        vertex(this.position.x - 10, this.position.y - 5)
        vertex(this.position.x + 5, this.position.y)
        vertex(this.position.x - 10, this.position.y + 5)
        endShape(CLOSE)
        this.move()
    }

    this.move = function(){
        if(this.row.direction == 1){
            this.position.x += this.row.speed
        }
    }
}