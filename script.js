const canvas = document.getElementById("canva");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var numberofparticle = 5;
//numberofparticle, size 입력받아서 구현하기
let particlearray = [];
let titleElement = document.getElementById("doodle");
let titleMeasurements = titleElement.getBoundingClientRect();
let title = {
  x: titleMeasurements.left,
  y: titleMeasurements.top,
  width: titleMeasurements.width,
  height: titleMeasurements.height,
};
var xPos;
var yPos;
window.addEventListener("mousemove", (e) => {
  xPos = e.clientX;
  yPos = e.clientY;
});
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 0.8 + 0.3;
    this.weight = 0.5;
    this.directionX = 0;
    this.color = "#" + ((Math.random() * 0xffffff) << 0).toString(16);
  }
  update() {
    this.x += this.directionX;
    this.weight += 0.005;
    this.y += this.weight;
    if (this.y > canvas.height || this.x > canvas.width || this.x < 0) {
      this.y = 0;
      this.weight = 0.5;
      this.x = Math.random() * canvas.width;
      this.directionX = 0;
      numberofparticle++;
    }
    if (
      this.x <= title.x + title.width &&
      this.x + this.size >= title.x &&
      this.y < title.y + title.height &&
      this.y + this.size > title.y
    ) {
      this.directionX = Math.random() * -5 + 2.5;
      this.y -= 3;
      this.weight *= -0.2;
    }
    if (
      this.x <= xPos + 40 &&
      this.x + this.size >= xPos - 40 &&
      this.y < yPos + 40 &&
      this.y + this.size > yPos - 40
    ) {
      this.weight *= -(yPos - this.y) % 0.5;
      this.y -= (yPos - this.y) / 4;
      this.directionX = -(xPos - this.x) / 30;
    }
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}
function numbering() {
  for (let i = 0; i < numberofparticle; i++) {
    let w = Math.random() * canvas.width;
    let h = Math.random() * canvas.height;
    particlearray.push(new Particle(w, h));
  }
}
numbering();

function animate() {
  numbering();
  document.getElementById("doodle").innerHTML =
    "particles: " + numberofparticle;
  ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < numberofparticle; i++) {
    particlearray[i].update();
    particlearray[i].draw();
  }

  requestAnimationFrame(animate);
}
animate();
