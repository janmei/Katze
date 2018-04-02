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
var bg_c

// Transitions
var sliders
var slidersActive
var transition

// ANIMATION
var currentAnimation
var animation_duration
var animation_currentTime

// ANIMATION 01 WAVY
var a // agent
var e // ellipse for transition
var e_size
var triangles // array with all triangles
var x

// Animation 02 SPLIT FLAP
var triangles_split_flap
var flippingAll
var fAIndex
var randomMode

// Animation 03 POLYS
var polys
var grid

// ANIMATION 04 TIMETABLE
var rows

// ANIMATION 05 CIRCLES
var circles
var trans
var trans_circle

// SETUP
var setup = function(){
    // Create canvas on whole page
    createCanvas(window.innerWidth, window.innerHeight)

    // ANIMATION TIMING
    animation_duration = 10
    animation_duration *= 60
    animation_currentTime = 0

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

    // ANIMATION 01 TRIANGLES

    triangles = []
    sliders = []
    slidersActive = false
    x = 60

    // ANIMATION 02 SPLIT FLAP

    triangles_split_flap = []

    randomMode = true
    flippingAll = false
    fAIndex = 0

    var scale = 50

    for(var i = 0; i < width / scale + 1; i++){
        for(var j = 0; j < height / scale + 1; j++){
            triangles_split_flap.push(new t(-scale + i * scale, -scale + j * scale, i))
        }
    }

    // ANIMATION 03 POLYS

    polys = []    
    grid = new grid()

    for(var i = 0; i < 100; i++){        
        // var p = polys.push(new poly(random(width / 8, width - width / 8), random(height / 8, height - height / 8), colors[floor(random(0, colors.length))]))
        polys.push(new poly(random(0, width), random(0, height), colors[floor(random(0, colors.length))]))
    } 

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

    currentAnimation = 1

    bg_c = [254, 202, 25]
    e_size = 0;
    transition = false

    a = new agent()
    e = new trans()

    // ANIMATION 05 CIRCLES
    circles = []
    trans = false

    for(var i = 0; i < width / 100; i++){
        for(var j = 0; j < height / 100; j++)
        circles.push(new o(i * 100 + 25, j * 100 + 25))
    }

    trans_circle = circles[round(random(0, circles.length))]

    // Set Sliders for Transition    
    sliders.push(new slider(-width, colors[3]))
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

    // ANIMATION 02 SPLIT FLAP
    if(currentAnimation == 2){
        split_flap()
    }

    // ANIMATION 03 POLYS
    if(currentAnimation == 3){
        poly_animation()
    }

    // ANIMATION 04 TIMETABLE
    if(currentAnimation == 4){
        timeTable()
    }       

    // ANIMATION 05 CIRCLES
    if(currentAnimation == 5){
        circle_animation()
    }       
    
    // Slider Transition
    if(slidersActive){
        for(var i = 0; i < sliders.length; i++){
            sliders[i].draw()
        }
    }

    // Change Animations
    if(animation_currentTime > animation_duration){
        animation_currentTime = 0
        if(currentAnimation < 5){
            currentAnimation++
        } else {
            currentAnimation = 1
        }
    } else {
        animation_currentTime += 1
    }
}

// Slider
var slider = function(endPos, c){
    this.position = createVector(width, 0)
    this.c = c
    this.endPos = endPos
    this.a = 0
    this.speed = Math.random() * 10

    this.draw = function(){
        fill(this.c)
        stroke(0,0,0,20)
        strokeWeight(20)
        beginShape()
        vertex(this.position.x, height)
        vertex(this.position.x + width / 2, 0)
        vertex(width, 0)
        vertex(width, height)
        endShape(CLOSE)

        if(this.position.x > this.endPos){            
            this.position.x-= 60
        }        
        if(this.position.x <= this.endPos){            
            var s = (sin(this.a) * width/2) + width / 2
            this.position.x -= s * 0.001
            this.a += this.speed * 0.01
        }
    }
}