/* 
   NAUTILUS DYNAMIC BACKGROUND 
   Efeito de névoa profunda e partículas que interagem com o mouse.
*/

let particles = [];
let numParticles = 60;

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas-container');
    
    for (let i = 0; i < numParticles; i++) {
        particles.push(new DeepParticle());
    }
}

function draw() {
    // Fundo preto profundo
    background(0, 0, 5);
    
    // Desenha as partículas
    for (let p of particles) {
        p.update();
        p.show();
        p.attract(mouseX, mouseY);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

class DeepParticle {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(random(-0.5, 0.5), random(-0.5, 0.5));
        this.acc = createVector(0, 0);
        this.maxSpeed = 1.5;
        this.size = random(1, 4);
        this.baseAlpha = random(30, 100);
        this.color = color(0, 113, 227, this.baseAlpha); // Azul Nautilus
    }

    update() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.mult(0);

        // Bordas infinitas
        if (this.pos.x > width) this.pos.x = 0;
        if (this.pos.x < 0) this.pos.x = width;
        if (this.pos.y > height) this.pos.y = 0;
        if (this.pos.y < 0) this.pos.y = height;
    }

    attract(tx, ty) {
        let target = createVector(tx, ty);
        let force = p5.Vector.sub(target, this.pos);
        let d = force.mag();
        if (d < 200) {
            force.setMag(0.05);
            this.acc.add(force);
        }
    }

    show() {
        noStroke();
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.size);
        
        // Brilho sutil
        if (random(1) > 0.98) {
            fill(255, 255, 255, 150);
            ellipse(this.pos.x, this.pos.y, this.size + 1);
        }
    }
}
