var colors
var beat

var amplitude

var level
var s

var circles

var preload = function(){
    beat = loadSound('deephouse.wav')
}

var setup = function(){    
    createCanvas(window.innerWidth, window.innerHeight)

    amplitude = new p5.Amplitude()

    level = 0
    s = 0

    circles = []

    for(var i = 0; i < width / 50; i++){
        for(var j = 0; j < height / 50; j++)
        circles.push(new e(i * 50, j * 50))
    }

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
    
    level = amplitude.getLevel()
    s = map(level, 0, 1, 0, 200)
    
    for(var i = 0; i < circles.length; i++){
        circles[i].draw(s, s)
    }
}

var e = function(x, y){
    this.position = createVector(x, y)
    this.scale = random(0, 10)

    this.draw = function(s, s){
        fill(colors[0])
        ellipse(this.position.x, this.position.y, this.scale + s, this.scale + s)
    }
}

function mousePressed() {
    if ( beat.isPlaying() ) { // .isPlaying() returns a boolean
      beat.stop();
      background(255,0,0);
    } else {
      beat.play();
      background(0,255,0);
    }
}