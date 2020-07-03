var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext('2d'),
    width = canvas.width,
    height = canvas.height,
    gravity = .5,
    bounceFactor = .7;

function ball(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 10;
    this.color = '#' + parseInt(Math.random() * 0xffffff).toString(16);
    this.velX = 0;
    this.velY = 1;
}

ball.prototype = {
    draw: function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath;
    },

    update: function() {
        this.y += this.velY;
        this.velY += gravity;
        if (this.y + this.radius > height) {
            this.y = height - this.radius;
            this.velY *= -bounceFactor;
        }
    }
};

function clear() {
    ctx.clearRect(0, 0, width, height);
}

var balls = [];

canvas.addEventListener('click', function(event) {
    var rect = this.getBoundingClientRect(), //adjust mouse position
        x = event.clientX - rect.left,
        y = event.clientY - rect.top;
    balls.push(new ball(x, y));
});

(function update() {
    clear();

    for (var i = 0, ball; ball = balls[i]; i++) {
        ball.draw();
        ball.update();
    }

    requestAnimationFrame(update);
})();