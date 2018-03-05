// +----------------------------------------------+ //
// BACKGROUND ANIMATION FOR INTERACTIVE FUTURE 2018 //
// +----------------------------------------------+ //

// To start transition use 
// e.active = true
// e.active = false
// To change current animation use
// currentAnimation = 1

// Variables //

// Global
var colors // main colors
var sliders // slider
var bg_c
var transition

// ANIMATION
var currentAnimation

// ANIMATION 01 WAVY
var a // agent
var e // ellipse for transition
var e_size
var triangles // array with all triangles
var x

// ANIMATION 04 TIMETABLE
var rows

// SETUP
var setup = function(){
    // Create canvas on whole page
    createCanvas(window.innerWidth, window.innerHeight)

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

    triangles = []
    sliders = []
    x = 60

    // ANIMATION 04 TIMETABLE
        rows = []
        rows.push(new row(0, 0, 1, 6, 50))
        rows.push(new row(0, 50, -1, 2, 30))
        rows.push(new row(0, 100, 1, 1, 40, true))
        rows.push(new row(0, 150, -1, 4, 10))

        rows.push(new row(0, height - 0, 1, 10, 20))
        rows.push(new row(0, height - 60, -1, 8, 40))
        rows.push(new row(0, height - 100, 1, 6, 15))
        rows.push(new row(0, height - 150, -1, 4, 10))

    currentAnimation = 4

    bg_c = [254, 202, 25]
    e_size = 0;
    transition = false

    a = new agent()
    e = new trans()

    sliders.push(new slider(100, colors[0]))
    sliders.push(new slider(600, colors[1]))
    sliders.push(new slider(800, colors[2]))

    for(var i = 0; i < width / 50 + 1; i++){
        for(var j = 0; j < height / 50 + 1; j++){
            triangles.push(new tri(-50 + i * 50, -50 + j * 50, i))
        }
    }
}

// MAIN
var draw = function(){
    // ANIMATION 01 WAVY
    if(currentAnimation == 1){
        wavy()
    }

    // ANIMATION 04 TIMETABLE
    if(currentAnimation == 4){
        timeTable()
    }        
}

// Slider
var slider = function(endPos, c){
    this.position = createVector(width, 0)
    this.c = c
    this.endPos = endPos

    this.draw = function(){
        fill(this.c)
        beginShape()
        vertex(this.position.x, height)
        vertex(this.position.x + width / 2, 0)
        vertex(width, 0)
        vertex(width, height)
        endShape(CLOSE)

        /*
        if(this.position.x > this.endPos){            
            this.position.x-= 60
        }
        */
    }
}