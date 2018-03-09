var colors

var circles

var trans
var trans_circle

var setup = function(){    
    createCanvas(window.innerWidth, window.innerHeight)

    circles = []
    trans = false

    for(var i = 0; i < width / 100; i++){
        for(var j = 0; j < height / 100; j++)
        circles.push(new e(i * 100 + 25, j * 100 + 25))
    }

    trans_circle = circles[round(random(0, circles.length))]

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
}

var draw = function(){
    background(colors[5])
    
    fill(colors[0])
    strokeWeight(5)
    stroke(colors[5])
    
    for(var i = 0; i < circles.length / 2; i++){
        circles[i].draw()
    }

    for(var i = circles.length / 2; i < circles.length; i++){
        circles[i].draw()
    }

    if(trans && trans_circle.scale < width * 3){
        trans_circle.scale += 40    
    } else if(trans && trans_circle.scale >= width * 2){
        circles = []
    }

    trans_circle.draw()
}

var e = function(x, y){
    this.position = createVector(x, y)
    this.scale = random(20, 80)
    this.a = 0
    this.speed = random(0, 1)

    this.draw = function(){
        fill(colors[0])
        
        var si = (sin(this.a) * 1) + 1
        ellipse(this.position.x, this.position.y, this.scale + si, this.scale + si)
        this.a += this.speed * 0.5
    }
}