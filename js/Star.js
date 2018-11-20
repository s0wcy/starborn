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
      color: `hsl(
        ${Math.floor(Math.random() * 360)},
        ${Math.floor(Math.random() * (50 - 30 + 1) + 30)}%,
        ${Math.floor(Math.random() * (100 - 70 + 1) + 70)}%
      )`,
      x: positions.x,
      y: positions.y,
      speed: {
        x: Math.cos(this.angle)*18,
        y: Math.sin(this.angle)*6
      }
    }
  }

  // we draw our stars on canvas
  draw() {
    this.star.x += this.star.speed.x
    this.star.y += this.star.speed.y
    this.context.beginPath()
    this.context.arc(
      this.star.x,
      this.star.y,
      (this.star.radius ++) / 40,
      Math.PI * 2,
      false
    )
    this.context.fillStyle = this.star.color
    //add tail effect
    this.context.globalAlpha = 0.4
    this.context.closePath()
    this.context.fill()
  }
}