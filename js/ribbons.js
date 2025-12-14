(function() {
    // Create a canvas element
    var canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    document.body.appendChild(canvas);

    var context = canvas.getContext('2d');
    var width, height;

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    window.addEventListener('resize', resize);
    resize();

    // Ribbon class
    function Ribbon() {
        this.x = Math.random() * width;
        this.y = 0;
        this.width = Math.random() * 10 + 2; // Ribbon width
        this.height = Math.random() * 50 + 20; // Ribbon height
        this.alpha = Math.random() * 0.5 + 0.2; // Opacity
        var blueLevel = Math.random() * 200 + 10; // Lighter blues
        var redLevel = Math.random() * 200 + 10; // Lighter blues
        var greenLevel = Math.random() * 200 + 10; // Lighter blues
        // this.color = 'rgba(0, 0, ' + blueLevel + ', ' + this.alpha + ')'; // Random shades of blue
        this.color = 'rgba(' + redLevel + ', ' + greenLevel + ', ' + blueLevel + ', ' + this.alpha + ')';
        this.speedY = Math.random() * 3 + 0.5; // Slower speed
        this.angle = Math.random() * Math.PI * 2; // Random rotation angle
    }

    Ribbon.prototype.update = function() {
        this.y += this.speedY;
        if (this.y > height) {
            this.y = 0; // Restart from the top
        }
    };

    Ribbon.prototype.draw = function(context) {
        context.save(); // Save the current transformation matrix
        context.translate(this.x, this.y); // Move to the ribbon's position
        context.rotate(this.angle); // Rotate by the ribbon's angle
        context.fillStyle = this.color;
        context.fillRect(-this.width / 2, 0, this.width, this.height); // Draw the ribbon
        context.restore(); // Restore the previous transformation matrix
    };

    var ribbons = [];
    for (var i = 0; i < 30; i++) { // Adjust the number of ribbons as needed
        ribbons.push(new Ribbon());
    }

    function animate() {
        context.clearRect(0, 0, width, height);
        for (var i = 0; i < ribbons.length; i++) {
            ribbons[i].update();
            ribbons[i].draw(context);
        }
        requestAnimationFrame(animate);
    }

    animate();
})();