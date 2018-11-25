const BlackHole = function(ctx) {
  "use strict";

const { PI, cos, sin, abs, sqrt, pow, floor, round, random, atan2 } = Math;
const HALF_PI = 0.5 * PI;
const TAU = 2 * PI;
const rand = n => n * random();
const randIn = (min, max) => rand(max - min) + min;
const fadeOut = (t, m) => (m - t) / m;
const fadeInOut = (t, m) => {
	let hm = 0.5 * m;
	return abs((t + hm) % m - hm) / hm;
};
const dist = (x1, y1, x2, y2) => sqrt(pow(x2 - x1, 2) + pow(y2 - y1, 2));
const angle = (x1, y1, x2, y2) => atan2(y2 - y1, x2 - x1);
const lerp = (n1, n2, speed) => (1 - speed) * n1 + speed * n2;

const particleCount = 1000;
const eventHorizon = 40;
const gravStrength = 50;

let canvas;
let ctx;
let center;
let particles;
let mouse;
let hover;

Array.prototype.lerp = function(target, speed) {
	this.forEach((n, i) => (this[i] = lerp(n, target[i], speed)));
};

class Particle {
	constructor() {
		this.init();
	}
	get color() {
		return `hsla(${this.hue}, 50%, 80%, ${fadeInOut(this.life, this.ttl)})`;
	}
	init() {
		this.life = 0;
		this.ttl = randIn(50, 200);
		this.speed = randIn(3, 5);
		this.size = randIn(0.5, 2);
		this.position = [rand(canvas.a.width), rand(canvas.a.height)];
		this.lastPosition = [...this.position];
		this.direction = angle(...this.position, ...center) - HALF_PI;
		this.velocity = [
			cos(this.direction) * this.speed,
			sin(this.direction) * this.speed
		];
		this.hue = rand(360);
		this.reset = false;
	}
	die() {
		ctx.a.save();
		ctx.a.globalAlpha = 0.1;
		ctx.a.filter = "blur(4px)";
		ctx.a.lineWidth = 1;
		ctx.a.strokeStyle = this.color;
		ctx.a.beginPath();
		ctx.a.arc(...center, eventHorizon, 0, TAU);
		ctx.a.closePath();
		ctx.a.stroke();
		ctx.a.restore();

		this.init();
	}
	checkBounds() {
		const [x, y] = this.lastPosition;

		return x > canvas.a.width || x < 0 || y > canvas.a.height || y < 0;
	}
	update() {
		this.lastPosition = [...this.position];
		this.direction = lerp(
			angle(...this.lastPosition, ...center),
			angle(...this.position, ...center),
			0.01
		);
		this.speed = fadeOut(dist(...this.position, ...center), canvas.a.width) * gravStrength;
		this.velocity.lerp(
			[cos(this.direction) * this.speed, sin(this.direction) * this.speed],
			0.01
		);
		this.position[0] += this.velocity[0];
		this.position[1] += this.velocity[1];

		(this.checkBounds() || this.life++ > this.ttl) && this.init();
		dist(...this.position, ...center) <= eventHorizon && this.die();

		return this;
	}
	draw() {
		ctx.a.save();
		ctx.a.lineWidth = this.size;
		ctx.a.strokeStyle = this.color;
		ctx.a.beginPath();
		ctx.a.moveTo(...this.lastPosition);
		ctx.a.lineTo(...this.position);
		ctx.a.stroke();
		ctx.a.closePath();
		ctx.a.restore();

		return this;
	}
}

function setup() {
	createCanvas();
	resize();
	createParticles();
	draw();
}

function createCanvas() {
	canvas = {
		a: document.createElement("canvas"),
		b: document.createElement("canvas")
	};
	canvas.b.style = `
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	`;
	document.body.appendChild(canvas.b);
	ctx = {
		a: canvas.a.getContext("2d"),
		b: canvas.b.getContext("2d")
	};
	center = [0,0];
	mouse = [0,0];
	hover = false;
}

function createParticles() {
	particles = [];

	let i;

	for (i = 0; i < particleCount; i++) {
		particles.push(new Particle());
	}
}

function resize() {
	const { innerWidth, innerHeight } = window;

	canvas.a.width = canvas.b.width = innerWidth;
	canvas.a.height = canvas.b.height = innerHeight;

	center[0] = 0.5 * innerWidth;
	center[1] = 0.5 * innerHeight;
}

function mouseHandler(e) {
	const { type, clientX, clientY } = e;
	
	hover = type === "mousemove";
	
	mouse[0] = clientX;
	mouse[1] = clientY;
}

function renderToScreen() {
	ctx.b.save();
	ctx.b.filter = "blur(5px) saturate(200%) contrast(200%)";
	ctx.b.drawImage(canvas.a, 0, 0);
	ctx.b.restore();

	ctx.b.save();
	ctx.b.globalCompositeOperation = "lighter";
	ctx.b.drawImage(canvas.a, 0, 0);
	ctx.b.restore();
}

function draw() {
	ctx.a.clearRect(0, 0, canvas.a.width, canvas.a.height);

	ctx.a.save();
	ctx.a.beginPath();
	ctx.a.filter = "blur(2px)";
	ctx.a.fillStyle = "rgba(0,0,0,0.1)";
	ctx.a.arc(...center, eventHorizon, 0, TAU);
	ctx.a.fill();
	ctx.a.closePath();
	ctx.a.restore();

	ctx.b.fillStyle = "rgba(0,0,0,0.5)";
	ctx.b.fillRect(0, 0, canvas.a.width, canvas.a.height);

	center.lerp(hover ? mouse : [0.5 * canvas.a.width, 0.5 * canvas.a.height], 0.05);
	
	let i;

	for (i = 0; i < particleCount; i++) {
		particles[i].draw().update();
	}

	renderToScreen();

	window.requestAnimationFrame(draw);
}

window.addEventListener("load", setup);
window.addEventListener("resize", resize);
window.addEventListener("mousemove", mouseHandler);
window.addEventListener("mouseout", mouseHandler);
}