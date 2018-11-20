// This class will define the properties of each stars
export default class Star {
  // we define the context in which our stars will appear & their poping position
  constructor(context, positions) {
    this.context = context

    // random angle wich our star will navigate to
    this.angle = Math.random() * Math.PI * 3

    // our star properties
    this.star = {
      radius: Math.random(),
      // random colors
      color: `hsl(
        ${Math.floor(Math.random() * 360)},
        ${this.randIn(40, 20)}%,
        ${this.randIn(70, 100)}%
      )`,
      x: positions.x,
      y: positions.y,
      speed: {
        x: Math.cos(this.angle)*4,
        y: Math.sin(this.angle)*8
      }
    }
  }

  // create random between 2 values
  randIn(min, max) {
    return Math.floor(Math.random(max - min) + min)
  }

  // we draw our stars on canvas
  

  draw() {
    this.star.x += (this.star.speed.x) * 2
    this.star.y += (this.star.speed.y) * 0.4
    this.star.radius += this.star.radius / 60

    this.context.beginPath()
    this.context.lineWidth = this.star.radius
    this.context.lineTo(this.star.x, this.star.y)
    this.context.lineCap = 'round'
    this.context.strokeStyle = this.star.color
    this.context.shadowColor = this.star.color
    this.context.shadowBlur = 15
    this.context.stroke()
    this.context.closePath()
  }
}