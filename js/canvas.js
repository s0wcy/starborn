const $canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

// Star properties
const star = {
  radius: 10,
  stars: [],
  starsIndex: 0,
  twoPI: Math.PI*2,
  color: '#FFF'
}

class Star {
  constructor(x, y, z) {
    star.starsIndex++
    star.stars[star.starsIndex] = this
    this.id = star.starsIndex
    // canvas draw
    context.beginPath()
    context.arc(x, y, star.radius, star.twoPI, false)
    context.fillStyle = star.color
    context.closePath()
    context.fill()
  }
}

// Screen size
screenWidth = window.innerWidth
screenHeight = window.innerHeight

$canvas.width = screenWidth
$canvas.height = screenHeight

// Random positions
let x, z = Math.random()*screenWidth
let y = Math.random()*screenHeight

// Animation loop
const loop = () => {
  requestAnimationFrame(loop)

  context.fillStyle = '#000'
  context.fillRect(0, 0, screenWidth, screenHeight)
  new Star(x, y, z)
}

loop()