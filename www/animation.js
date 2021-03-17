function loadImage(path) {
    let img = document.createElement("img");
    img.src = path;

    return new Promise(resolve => {
        img.addEventListener("load", () => resolve(img));
        document.body.appendChild(img);
    });
};

function toDegrees(deg) {
    return deg * Math.PI / 180;
}

let canvas = document.getElementsByTagName("canvas")[0];

let w = window.innerWidth;
let h = window.innerHeight;

canvas.width = w;
canvas.height = h;

let ctx = canvas.getContext("2d");

let sprites = {};

loadImage("https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/face-with-tears-of-joy_1f602.png").then((img) => {
    console.log(img);
    sprites.pin = {
        img,
        pw: img.width,
        ph: img.height,
        hw: img.width * .5,
        hh: img.height * .5
    };
    requestAnimationFrame(loop);
});

let deg = 0;
let c = 0;

const count = 800;
const degadd = 0.005;

function loop() {
    ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.translate(w*.5, h*.5);

    for (let i = 0; i < count; i++) {
        ctx.translate(10, 10);
        // deg += degadd * 14;
        ctx.rotate(toDegrees(i + deg));
        ctx.drawImage(sprites.pin.img, -sprites.pin.hw, -sprites.pin.hw);
    }
    ctx.restore();

    deg += degadd;

    requestAnimationFrame(loop);
}

