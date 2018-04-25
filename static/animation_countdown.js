var countdown = function () {
    this.currentTime = 10
    this.realTime = second()
    this.checkTime = second() + 100
    this.position = createVector(width / 2, height / 2)
    this.rendering = false
    this.textSize = 50
    this.scale = 20
    this.c = 0

    this.render = function () {
        if (this.rendering) {
            this.countDown()
            this.decoration()
            textFont('Montserrat')
            textAlign(CENTER)
            textSize(this.textSize)
            fill(255)
            //noFill()
            //stroke(255)
            //strokeWeight(10)
            text(this.currentTime, this.position.x, this.position.y - 100)
            if (this.currentTime <= 0) {
                this.reset()
            }
        }
    }

    this.startCountdown = function () {
        this.checkTime = second()
        this.rendering = true
        currentAnimation = 0
    }

    this.countDown = function () {
        if (this.checkTime <= second() - 1) {
            // Logic
            this.currentTime -= 1
            this.checkTime = second()

            if (this.c < colors.length - 1) {
                this.c++
            } else {
                this.c = 0
            }

            // Scaling reset
            this.textSize = 50
            this.position.y = height / 2
            this.scale = 0
        } else {
            // Scaling
            this.textSize += 20
            this.position.y += 9
            this.scale += 20
        }
    }

    this.reset = function () {
        this.rendering = false
        this.currentTime = 10
    }

    this.decoration = function () {
        background(colors[this.c])


    }
}