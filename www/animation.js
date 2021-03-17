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

let sprite = null;

let images = {
    heart: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/heavy-black-heart_2764.png",
    lmao: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/face-with-tears-of-joy_1f602.png",
    pudding: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/custard_1f36e.png",
    ferris: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/ferris-wheel_1f3a1.png",
}

loadImage(images.lmao).then((img) => {
    sprite = {
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

let num = 1;
const degadd = 0.005;
const numadd = 0.5;

function loop() {
    // ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.translate(w*.5, h*.5);

    const count = Math.floor(num);
    let trans = (30 * Math.sin(num * 0.01)) + 15;
    for (let i = 0; i < count; i++) {
        ctx.translate(trans, trans);
        // deg += degadd * 14;
        ctx.rotate(toDegrees(i + deg));
        ctx.drawImage(sprite.img, -sprite.hw, -sprite.hw);
    }
    ctx.restore();

    deg += degadd;
    num += numadd;

    requestAnimationFrame(loop);
}

