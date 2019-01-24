// +----------------------------------------------+ //
// BACKGROUND ANIMATION FOR INTERACTIVE FUTURE 2018 //
// +----------------------------------------------+ //

// Variables //

// Global
var colors
var currentColor

// Transitions
var transition
var drawTransition

// Countdown
var Countdown

// ANIMATION
var currentAnimation

// Animation 01 POLYS
var polys
var grid

// ANIMATION 02 TITLE
var honeyPolys

// ANIMATION 03 PROGRAM

// SETUP
var setup = function () {
    // Create canvas on whole page
    createCanvas(window.innerWidth, window.innerHeight)

    noStroke()

    // Main colors
    colors = [
        /*
        color(239, 128, 29), // Yellow
        color(254, 202, 25), // Yellow Variation
        color(246, 163, 29), // Orange
        color(96, 45, 58), // Red
        color(63, 115, 115), // Turquoise
        color(247, 180, 170), // Light Red
        color(226, 237, 201) // Light Green
        */
        color(163, 64, 64),
        color(194, 235, 214),
        color(252, 212, 120)
    ]

    randColor()

    // COUNTDOWN

    Countdown = new countdown()

    // ANIMATIONS

    currentAnimation = 1

    // ANIMATION 01 POLYS

    polys = []
    grid = new grid()

    for (var i = 0; i < 30; i++) {
        polys.push(new poly(random(0, width), random(0, height), colors[floor(random(0, colors.length))]))
        // polys.push(new poly(width / 2, height / 2, colors[floor(random(0, colors.length))]))
    }

    // ANIMATION 02 TITLE
    honeyPolys = []
    for (var i = 0; i < 21; i++) {
        for (var j = 0; j < 11; j++) {
            honeyPolys.push(new honeyPoly(i * width / 20, 15 + j * width / 20))
        }
    }

    // ANIMATION 03 PROGRAM

    // TRANSITIONS
    transition = new Transition()
    drawTransition = false
}

var randColor = function () {
    currentColor = colors[floor(random(0, colors.length))]
}

// MAIN
var draw = function () {
    // ANIMATION 00 / COUNTDOWN
    if (currentAnimation == 0) {
        background(0)
    }

    // ANIMATION 01 / COMING UP - COUNTDOWN / POLYS
    if (currentAnimation == 1) {
        poly_animation()
    }

    // ANIMATION 02 / TITLE - INTERACTIVE FUTURE / HONEYCOMB
    if (currentAnimation == 2) {
        title()
    }

    // ANIMATION 03 / PROGRAM / SPINNING
    if (currentAnimation == 3) {

    }

    // TRANSITION
    if (drawTransition) {
        transition.render()
    }

    // COUNTDOWN
    Countdown.render()
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// Transition Controller
var startTransition = function () {

    // new color    
    randColor()

    // stop old animation
    switch (currentAnimation) {
        case 1:
            startTransitionPoly()
            break
        case 2:
            console.log("yo")
            startTransitionPoly()
            break
    }

    // start transition overlay
    drawTransition = true
}

var endTransition = function () {
    // switch to new animation
    drawTransition = false
    if (currentAnimation == 1) {
        currentAnimation++
    } else {
        currentAnimation--
    }
}

var Transition = function () {
    this.speed = 30

    // POSITION
    this.rL = createVector(0, height / 2)
    this.rR = createVector(width, 0)

    // SIZE
    this.rLS = createVector(0, height / 2)
    this.rRS = createVector(0, height / 2)

    this.render = function () {
        fill(currentColor)
        rect(this.rL.x, this.rL.y, this.rLS.x, this.rLS.y)
        rect(this.rR.x, this.rR.y, this.rRS.x, this.rRS.y)
        this.move()
    }

    this.move = function () {
        if (this.rLS.x <= width) {
            // LEFT
            this.rLS.x += this.speed

            // RIGHT
            this.rRS.x -= this.speed
        } else {
            endTransition()
        }
    }
}