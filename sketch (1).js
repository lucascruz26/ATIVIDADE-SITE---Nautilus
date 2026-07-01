/* 
   NAUTILUS NOIR RAIN 
   Efeito de chuva cinematográfica e granulado de filme antigo.
*/

let drops = [];

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas-container');
    
    // Inicializa 200 gotas de chuva
    for (let i = 0; i < 200; i++) {
        drops.push(new Drop());
    }
}

function draw() {
    // Fundo quase preto com transparência para rastro
    background(0, 40);
    
    // Adiciona granulado de filme
    drawGrain();

    // Atualiza e desenha a chuva
    for (let drop of drops) {
        drop.fall();
        drop.show();
    }
}

function drawGrain() {
    loadPixels();
    for (let i = 0; i < pixels.length; i += 32) { // Pula alguns pixels para performance
        let val = random(255);
        pixels[i] = val;
        pixels[i+1] = val;
        pixels[i+2] = val;
        pixels[i+3] = 10; // Muito transparente
    }
    updatePixels();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

class Drop {
    constructor() {
        this.x = random(width);
        this.y = random(-500, -50);
        this.z = random(0, 20);
        this.len = map(this.z, 0, 20, 10, 20);
        this.yspeed = map(this.z, 0, 20, 4, 10);
    }

    fall() {
        this.y += this.yspeed;
        let grav = map(this.z, 0, 20, 0, 0.05);
        this.yspeed += grav;

        if (this.y > height) {
            this.y = random(-200, -100);
            this.yspeed = map(this.z, 0, 20, 4, 10);
        }
    }

    show() {
        let thick = map(this.z, 0, 20, 1, 2);
        strokeWeight(thick);
        stroke(180, 180, 180, 100);
        line(this.x, this.y, this.x, this.y + this.len);
    }
}
