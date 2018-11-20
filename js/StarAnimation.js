import Canvas from './Canvas.js' // importing our Canvas class
import Star from './Star.js' // importing ou Star class

// Creating a new class who is an extension of our class Canvas & Star,
// This class will animate our stars
export default class StarAnimation extends Canvas {
  constructor(_params) {
    // finish import Canvas class
    super(_params)

    this.stars = []
    this.starFlow = 2

    // init & animate
    this.loop = this.loop.bind(this)
    this.loop()
  }

  getRandomPos() {
    const res = {
      x: (this.screen.width / 2) + (Math.random()*10),
      y: (this.screen.height / 2) + (Math.random()*10)
    }
    return res
  }

  // the loop function will keep animate each of our stars every frames
  loop() {
    window.requestAnimationFrame(this.loop)
    
    this.drawBg()
    this.drawCircle()
    this.drawStars()
    this.updateStars()
    this.removeOldStars()
  }

  drawBg() {
    this.context.fillStyle = '#000'
    this.context.fillRect(0, 0, this.screen.width, this.screen.height)
  }

  drawCircle() {
    this.context.arc(this.screen.width + 100, this.screen.height + 100, 20, 0, Math.PI*2, true)
    this.context.stroke()
    this.context.closePath()

    this.context.arc(this.screen.width * (-1), this.screen.height * (-1), 20, 0, Math.PI * 2, true)
    this.context.stroke()
    this.context.closePath()
  }

  // We create a new star, add it to the stars[]
  drawStars() {
    for (let i = 0; i < this.starFlow; i++) {
      const star = new Star(
        this.context,
        this.getRandomPos()
      )
      this.stars.push(star)
    }
  }

  // We redraw all star in stars[]
  updateStars() {
    for (const _star of this.stars) {
      _star.draw()
    }
  }

  // remove star after it disapear from screen
  removeOldStars() {
    setTimeout(() => {
      for (let i = 0; i < this.starFlow; i++) {
        this.stars.shift()
      }
    }, 4000)
  }
}