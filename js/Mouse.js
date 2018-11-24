import Canvas from "./Canvas.js"

export default class Mouse extends Canvas {
  constructor(context) {
    super()

    this.context = context
    
    this.cursor = {
      x: 0,
      y: 0,
      speed: 0.125
    }

    this.mouse = {
      x: 0,
      y: 0
    }

    window.addEventListener('mousemove', _e => this.updateMouse(_e))

    this.loop = this.loop.bind(this)
    this.loop()
  }

  loop() {
    window.requestAnimationFrame(this.loop)
    this.followMouse()
  }

  updateMouse(_e) {
    this.mouse = {
      x: _e.clientX,
      y: _e.clientY
    }
  }

  followMouse() {
    this.cursor = {
      x: this.mouse.x * this.cursor.speed,
      y: this.mouse.y * this.cursor.speed
    }
  }

  drawCursor() {
    this.context.beginPath()
    this.context.arc(
      this.cursor.x,
      this.cursor.y,
      this.cursor.radius,
      0,
      Math.PI*2,
      false
    )
    this.context.strokeStyle = '#ffffff'
    this.context.stroke()
    this.context.closePath()
  }
}