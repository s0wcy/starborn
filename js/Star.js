// This class will define the properties of each stars
export default class Star {
  // we define the context in which our stars will appear & their poping position
  constructor(context, positions, isSlow) {
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
        x: Math.cos(this.angle)*24,
        y: Math.sin(this.angle)*12
      }
    }

    // interractions
    this.isSlow = isSlow
  }

  // speed adapt
  reduceSpeed(value) {
    const speed = this.star.speed
    speed.x = speed.x / value
    speed.y = speed.y / value
  }

  // we draw our stars on canvas
  draw() {
    if(this.isSlow) {
      this.reduceSpeed(6)
      console.log('reduced')
    }
    this.star.x += this.star.speed.x
    this.star.y += this.star.speed.y
    this.context.beginPath()
    this.context.arc(
      this.star.x,
      this.star.y,
      (this.star.radius ++) / 10,
      Math.PI * 2,
      false
    )
    this.context.fillStyle = this.star.color
    //add tail effect
    this.context.globalAlpha = 0.2
    this.context.closePath()
    this.context.fill()
  }
}