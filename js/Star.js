// This class will define the properties of each stars
export default class Star {
  // we define the context in which our stars will appear & their poping position
  constructor(context, positions) {
    this.context = context

    // our star properties
    this.star = {
      radius: Math.random() * 6,
      color: '#FFF',
      x: positions.x,
      y: positions.y
    }
  }

  // we draw our stars on canvas
  draw() {
    this.context.beginPath()
    this.context.arc(
      this.star.x,
      this.star.y,
      this.star.radius,
      Math.PI * 2,
      false
    )
    this.context.fillStyle = this.star.color
    this.context.closePath()
    this.context.fill()
  }
}