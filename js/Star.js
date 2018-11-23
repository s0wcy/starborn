import Interface from "./Interface.js"

// This class will define the properties of each stars
export default class Star extends Interface {
  // we define the context in which our stars will appear & their poping position
  constructor(context, positions) {
    super()
    this.context = context

    // random angle wich our star will navigate to
    this.angle = Math.random() * Math.PI * 3

    // our star properties
    this.star = {
      radius: Math.random(),
      color: `hsl(
        ${Math.floor(Math.random() * 360)},
        ${this.randCol(50,30)}%,
        ${this.randCol(100, 70)}%
      )`,
      x: positions.x,
      y: positions.y,
      speed: {
        x: Math.cos(this.angle)*24,
        y: Math.sin(this.angle)*12
      }
    }
  }

  // speed adapt
  reduceSpeed(value) {
    const speed = this.star.speed
    speed.x = speed.x / value
    speed.y = speed.y / value
  }

  // random color
  randCol(max, min) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  // we draw our stars on canvas
  draw() {
    if(this.isStarted){
      this.reduceSpeed(6)
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