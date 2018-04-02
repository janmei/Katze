var split_flap = function(){
    background(254, 202, 25)

    for(var i = 0; i < triangles_split_flap.length; i++){
        triangles_split_flap[i].draw()
    }

    // Flip random triangle
    if(randomMode){
        var r = round(Math.random() * (triangles_split_flap.length))
        if(triangles_split_flap[r] != null){
            triangles_split_flap[r].flipping = true;
        }        
    }

    // Flip All
    if(flippingAll){        
        if(fAIndex < triangles_split_flap.length){
            triangles_split_flap[fAIndex].flipping = true
            triangles_split_flap[fAIndex].cc = true
            fAIndex++
        }
    }
}

// TRIANGLE
var t = function(x,y,index){
    this.index = index
    this.position = createVector(x,y)
    this.flipspeed = 10
    this.flipped = false
    this.flipping = false
    this.c = color(239, 128, 29)
    this.cc = false
    
    // Translate down if even row
    if(this.index % 2){
        this.position.y += 25
    }

    // Can change
    this.positionsX = [0, 50, 0]
    this.positionsY = [0, 25, 50]
    
    // Fixed
    this.oPositionsX = [0, 50, 0]
    this.oPositionsY = [0, 25, 50]

    this.flip = function(){
        if(this.flipping && this.flipped){
            if(this.positionsX[1] < this.oPositionsX[1]){
                this.positionsX[1] += this.flipspeed
            }
        } else
        if(this.positionsX[1] > this.oPositionsX[1] * -1 && this.flipped == false){
            this.positionsX[1] -= this.flipspeed
        } else if(this.positionsX[1] < this.oPositionsX[1]){
            this.flipped = true
            this.flipping = false
            // this.positionsX[1] += this.flipspeed
        } else {
            this.flipped = false
        }
    }

    this.draw = function(){
        noStroke()
        fill(this.c)
        beginShape()
        for(var i = 0; i < 3; i++){
            vertex(this.positionsX[i] + this.position.x, this.positionsY[i] + this.position.y)
        }
        endShape(CLOSE)

        if(this.flipping){
            this.flip()
            if(this.cc){
                this.c = changeColor(this.c, color(254, 202, 25), 20)
            }
        }        

    }
}

var changeColor = function(currentColor, targetColor, speed){
    var r1 = red(currentColor)
    var g1 = green(currentColor)
    var b1 = blue(currentColor)
    var r2 = red(targetColor)
    var g2 = green(targetColor)
    var b2 = blue(targetColor)

    var speed = speed

    if(r1 < r2){
        r1 += speed
    } else if(r1 > r2){
        r1 -= speed
    }
    
    if(g1 < g2){
        g1 += speed
    } else if(g1 > g2){
        g1 -= speed
    }
    
    if(b1 < b2){
        b1 += speed
    } else if(b1 > b2){
        b1 -= speed
    }

    var c = color(r1,g1,b1)

    return c
}

var flipAll = function(){
    randomMode = false
    flippingAll = true    
}

var reset = function(){
    this.triangles_split_flap = []
    noLoop
}