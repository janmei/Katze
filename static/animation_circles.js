var circle_animation = function(){
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

var o = function(x, y){
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